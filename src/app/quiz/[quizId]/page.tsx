import {db} from  "@/db";
import {quiz} from "@/db/schema";
import {eq} from 'drizzle-orm';
import QuizQuestions from "../new/QuizQuestions";
import exp from "constants";

const page = async({ params }: {
    params: {
        quizId: string
    }
}) => {
    const quizId = params.quizId;
    const quizz= await db.query.quiz.findFirst({
        where : eq(quiz.id, parseInt(quizId)),
        with: {
            questions: {
                with: {
                    answers:true 
                }
            }
        }
    })

    console.log(quizz)

    if(!quizId || !quizz || quizz.questions.length === 0){
        return <div>Quiz Not Found</div>
    }
    return (
         <QuizQuestions quiz ={quizz}/> 
    )
}

export default page;