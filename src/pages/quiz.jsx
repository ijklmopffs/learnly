import { useState } from "react";
import { Link } from "react-router";
import questionsData from "../../questions.json";
import DraggableQuiz from "./draggablequiz";

const optionLabels = ["A", "B", "C", "D"];

export default function Quiz() {
  const [step, setStep] = useState("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [quizType, setQuizType] = useState(questionsData[0].type);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questionsData[currentQuestion].answer) {
      setScore(score + 6);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
    setTimeout(() => {
      if (currentQuestion + 1 < questionsData.length) {
        const nextQuestionType = questionsData[currentQuestion + 1].type;
        setQuizType(nextQuestionType);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setStep("result");
      }
    }, 1000);
  };

  const handleDragAndDropComplete = (newScore) => {
    setScore(score + newScore);
    if (currentQuestion + 1 < questionsData.length) {
      const nextQuestionType = questionsData[currentQuestion + 1].type;
      setQuizType(nextQuestionType);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("result");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#f4f7fd]">
      {step === "quiz" && quizType === "multiple-choice" && (
        <div className="bg-white w-4/5 md:w-[30rem] p-6 rounded-lg text-center text-black">
          <div className="bg-purple-800 text-white flex justify-between items-center p-4 rounded-lg">
            <h1 className="text-xl font-bold">Goal: 30 points</h1>
            <p className="capitalize text-sm">current points: {score}</p>
          </div>

          <div className="text-start mt-5">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion + 1}
            </h2>
            <h2 className="font-semibold">
              {questionsData[currentQuestion].question}
            </h2>
            <div className="mt-4">
              {questionsData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`block w-full text-start text-sm my-4 px-4 py-4 mt-2 border-2 border-[#979797] cursor-pointer rounded-lg font-semibold transition-colors ${
                    selectedOption === option
                      ? feedback === "correct"
                        ? "border-green-500 border-[3px]"
                        : "border-[#ea5555] border-[3px]"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={!!feedback}
                >
                  {optionLabels[index]}. {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "quiz" && quizType === "drag-and-drop" && (
        <DraggableQuiz onComplete={handleDragAndDropComplete} />
      )}

      {step === "result" && (
        <div className="text-center bg-white p-6 rounded-lg shadow-md w-96 text-black">
          <h1 className="text-3xl font-bold">Quiz Completed!</h1>
          <p className="mt-2 text-lg">Your Score: {score}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              setStep("quiz");
              setCurrentQuestion(0);
              setScore(0);
              setSelectedOption(null);
              setFeedback(null);
              setQuizType(questionsData[0].type);
            }}
          >
            Restart Quiz
          </button>
          <Link to="/" className="block">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer">
              Go Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
