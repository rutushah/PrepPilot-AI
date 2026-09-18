import { db } from "@/db";
import {quiz, questions as dbQuestions, questionAnswers} from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type Quiz = InferInsertModel<typeof quiz>;
type Question = InferInsertModel<typeof dbQuestions>;
type Answer = InferInsertModel<typeof questionAnswers>;

interface SaveQuizData extends Quiz {
    questions: Array<Question & {answers?: Answer[]}>;
}

export default async function saveQuiz(quizData: SaveQuizData) {
    const { name, description, userId } = quizData;
    
    const newQuiz = await db.insert(quiz).values({
        name,
        description
    })
    .returning({insertedId: quiz.id});
    const quizId = newQuiz[0].insertedId;

    await db.transaction(async(tx) =>{
        for (const question of quizData.questions){
            const[{questionId}] = await tx
            .insert(dbQuestions)
            .values({
                questionText: question.questionText,
                quizId
            })
            .returning({questionId: dbQuestions.id});

            if(question.answers && question.answers.length > 0){
                await tx.insert(questionAnswers).values(
                    question.answers.map((answer) => ({
                        answerText : answer.answerText,
                        isCorrect: answer.isCorrect,
                        questionId
                    }))
                )
            }
        }
    })

    return {quizId};
}