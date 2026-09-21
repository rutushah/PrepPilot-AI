import {NextRequest, NextResponse} from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from '@langchain/core/messages';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from "zod";
import { desc } from "drizzle-orm";
import saveQuiz from "./saveToDb";


export async function POST(req: NextRequest){
    const body = await req.formData();
    const document = body.get("pdf");

    try{
        const pdfLoader = new PDFLoader(document as Blob,{
            parsedItemSeparator: ""
        });

        const docs = await pdfLoader.load();

        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        const prompt = "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quiz object with fields: name, description and questions. The questions is an array of objecs with fields: questionText, answers. The answers is an array of objects with fields : answerText, isCorrect."

        const provider = "google" as "google" | "openai" | "groq";

        if (provider === "openai" && !process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                {error: "Open AI API Key is not provided"},
                {status: 500}
            ) 
        }
        if (provider === "groq" && !process.env.GROQ_API_KEY) {
            return NextResponse.json(
                {error: "Groq API Key is not provided"},
                {status: 500}
            )
        }

        if (provider === "google" && !process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                {error: "Google API Key is not provided"},
                {status: 500}
            )
        }
        //commenting openai
        const openAIModel = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-5-nano",
        });

        //using groq model for testing
        // const groqModel = new ChatGroq({
        //     apiKey: process.env.GROQ_API_KEY, 
        //     model: "meta-llama/llama-4-scout-17b-16e-instruct",
        //   });

        // const googleModel = new ChatGoogleGenerativeAI({
        //     apiKey: process.env.GOOGLE_API_KEY,
        //     model: "gemini-3.5-flash",
        // });

        const quizSchema = z.object({
            quiz: z.object({
                name: z.string(),
                description: z.string(),
                questions: z.array(
                    z.object({
                        questionText :  z.string(),
                        answers: z.array(
                            z.object({
                                answerText: z.string(),
                                isCorrect: z.boolean(),
                            })
                        ),
                    })
                ),
            }),
        })

        const runnable = openAIModel.withStructuredOutput(quizSchema);
   
        const message = new HumanMessage({
            content:[
                {
                    type: "text",
                    text: prompt + "\n" + texts.join("\n")
                }
            ]
        })

        const result = await runnable.invoke([message]);
        console.log("Generated Quiz", result);

        const {quizId} = await saveQuiz(result.quiz)

        return NextResponse.json(
            {
                message : "Quiz Created Successfully",
                quizId
            },
            {
                status: 200
            }
        );
    }  catch(e:any){
        return NextResponse.json(
            {
                error : e.message
            },
            {
                status: 500
            }
        )
    }

}