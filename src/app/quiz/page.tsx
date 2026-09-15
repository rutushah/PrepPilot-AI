"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { set } from "react-hook-form";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";



const questions = [
    {
        questionText: "What is React?",
        answers:[
            {
                answerText: "A Library for building user interfaces", isCorrect: true, id:1 
            },
            {
                answerText: "A Front-end framework", isCorrect: false, id:2 
            },
            {
                answerText: "A Backend Framework", isCorrect: false, id:3 
            },
            {
                answerText: "A Database", isCorrect: false, id:4 
            },
        ]
    },
    {
        questionText: "How do you embed dynamic JavaScript expressions inside JSX?",
        answers:[
            {
                answerText: 'Using quotes " "', isCorrect: false, id:1 
            },
            {
                answerText: "Using parenthetical brackets ()", isCorrect: false, id:2 
            },
            {
                answerText: "Using curly braces {}", isCorrect: true, id:3 
            },
            {
                answerText: "Using angle brackets < > ", isCorrect: false, id:4 
            },
        ]
    },
    {
        questionText: "What does JSX stand for?",
        answers:[
            {
                answerText: "JavaScript Extension", isCorrect: false, id:1 
            },
            {
                answerText: "JavaScript XML", isCorrect: true, id:2 
            },
            {
                answerText: "Java eXtended", isCorrect: false, id:3 
            },
            {
                answerText: "JavaScript XSL", isCorrect: false, id:4 
            },
        ]
    },
    
]

export default function Home() {

    // check if the user has started filling out the survey or not
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState < number | null > (null);
    const[isCorrect,  setIsCorrect] = useState<boolean | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleNext =() =>{
        console.log("START/NEXT BUTTON CLICKED");
        console.log("started before:", started);

        if(!started){
            console.log("setting started to true");
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length-1){
            setCurrentQuestion(currentQuestion + 1);
        }else{
            setSubmitted(true);
            return;
        }
        setSelectedAnswer(null);
        setIsCorrect(null);
    }

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer.id);
        const isCurrentCorrect = answer.isCorrect;
        if  (isCurrentCorrect){
            setScore(score + 1);
        }
        setIsCorrect(isCurrentCorrect);
    }

    const scorePercentage: number =  Math.round((score / questions.length) * 100);

    if(submitted){
        return (
            <QuizSubmission 
                score={score}
                scorePercentage={scorePercentage}
                totalQuestions={questions.length}
            />
        )
    }

  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto] 
            grid-flow-col items-center justify-between py-2
            gap-2">
                <Button size="icon" variant="outline"> <ChevronLeft/> </Button>
                <ProgressBar value={(currentQuestion / questions.length) * 100} ></ProgressBar>
                <Button size="icon" variant="outline"> <X/> </Button>
            </header>
        </div>
        <main className="flex justify-center flext-1">
          {!started ? <h1 className="text-3xl font-bold">Welcome to the quiz Page 👋</h1> : (
            <div>
                <h2 className="text-3xl font-bold"> {questions[currentQuestion].questionText} </h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                   {
                    questions[currentQuestion].answers.map(
                        answer => {
                            const variant = 
                            selectedAnswer === answer.id 
                            ? answer.isCorrect
                                ? "neoSuccess"
                                : "neoDanger"
                            : "neoOutline";
                            return(
                                <Button key={answer.id} variant={variant} size ="xl"
                                onClick={() => handleAnswer(answer)}> 
                                    <p className="whitespace-normal">
                                        {answer.answerText}
                                    </p>
                                </Button>
                            )
                        }
                    )
                   }

                </div>
            </div>
          )}
        </main>
        <footer className="footer pb-10 px-8 relative mb-1">
          <ResultCard isCorrect ={isCorrect} 
          correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText}/>
          <Button variant ="neo" size="lg" onClick={handleNext}> {!started ? 'Start': (currentQuestion === questions.length -1 ) ? 
          'Submit': 'Next'} </Button>
        </footer>
    </div>
  )
}
