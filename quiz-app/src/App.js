import { useEffect, useState } from "react";
import questions from "./constant/question.json";
import Question from "./components/Question";
import Result from "./components/Result";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  // Kepp All of the logic in App.js

  const handleNextQuestion = (option) => {
    setCurrentQuestion(currentQuestion+1);
    setUserAnswer([...userAnswer,option])
  };

  const resetQuiz = () =>{
    setCurrentQuestion(0);
    setUserAnswer([]);
  }

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-semibold my-3">Quiz App</h1>
      </div>
      <div>
        {/* Question component */}
        {
          currentQuestion < questions.length && (
        <Question questions={questions[currentQuestion]} onAnswerClick={(option)=>handleNextQuestion(option)}/>
        )}
        {/* Result component */}
        {currentQuestion === questions.length && <Result userAnswer={userAnswer} questions={questions} resetQuiz={resetQuiz}/>}
      </div>
    </>
  );
}

export default App;
