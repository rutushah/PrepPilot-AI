"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { set } from "react-hook-form";

const questions = [
    {
        questionText: "What is React?",
        answers:[
            {
                answerText: "A Library for building user interfaces", incorrect: true, id:1 
            },
            {
                answerText: "A Front-end framework", incorrect: false, id:2 
            },
            {
                answerText: "A Backend Framework", incorrect: false, id:3 
            },
            {
                answerText: "A Database", incorrect: false, id:4 
            },
        ]
    },
    {
        questionText: "How do you embed dynamic JavaScript expressions inside JSX?",
        answers:[
            {
                answerText: 'Using quotes " "', incorrect: false, id:1 
            },
            {
                answerText: "Using parenthetical brackets ()", incorrect: false, id:2 
            },
            {
                answerText: "Using curly braces {}", incorrect: true, id:3 
            },
            {
                answerText: "Using angle brackets < > ", incorrect: false, id:4 
            },
        ]
    },
    {
        questionText: "What does JSX stand for?",
        answers:[
            {
                answerText: "JavaScript Extension", incorrect: false, id:1 
            },
            {
                answerText: "JavaScript XML", incorrect: true, id:2 
            },
            {
                answerText: "Java eXtended", incorrect: false, id:3 
            },
            {
                answerText: "JavaScript XSL", incorrect: false, id:4 
            },
        ]
    },
    
]

export default function Home() {

    // check if the user has started filling out the survey or not
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleNext =() =>{
        if(!started){
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length-1){
            setCurrentQuestion(currentQuestion + 1);
        }
        
    }


  return (
    <div className="flex flex-col flex-1">
        <main className="flex justify-center flext-1">
          {!started ? <h1 className="text-3xl font-bold">Welcome to the quiz Page 👋</h1> : (
            <div>
                <h2 className="text-3xl font-bold"> {questions[currentQuestion].questionText} </h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                   {
                    questions[currentQuestion].answers.map(
                        answer => {
                            return(
                                <Button key={answer.id} variant = {"secondary"}> {answer.answerText}</Button>
                            )
                        }
                    )
                   }

                </div>
            </div>
          )}
        </main>
        <footer className="footer pb-9 px-6 relative mb-0">
          <Button onClick={handleNext}> {!started ? 'Start': 'Next'} </Button>
        </footer>
    </div>
  )
}
