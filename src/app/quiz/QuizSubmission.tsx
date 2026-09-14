import Bar from "@/components/Bar";
import Image from "next/image";

type Props = {
    scorePercentage: number,
    score: number,
    totalQuestions: number,
}


const QuizSubmission = (props: Props) => {
    const {scorePercentage, score, totalQuestions} = props;
    return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24">
                <h2 className="text-3xl font-bold"> Quiz Complete !!!</h2>
                <p> You scored : {scorePercentage}%</p>
                { scorePercentage == 100 ? 
                    <div>
                        <p> Congratulations </p>
                        <div>
                            <Image src = "/images/success.png"
                            alt = "Success Image" width={400} 
                            height={400}/>
                        </div>
                    </div> : 
                <></>}
                
                <div className="flex flex-row gap-8 mt-6">
                    <Bar percentage={scorePercentage} color="green" />
                    <Bar percentage={100-scorePercentage} color="red"/>

                </div>
                    <div className="flex flex-row gap-8"> 
                        <p> {score} Correct </p>
                        <p> {totalQuestions - score} Incorrect </p>
                    </div>
               
            </main>
        </div>
    )
}

export default QuizSubmission;