import React from "react";

const Question = ({ questions, onAnswerClick }) => {
  const { answerOptions, question } = questions;
  return (
    <div
      className="w-[60%] border border-gray-300 flex
    justify-center items-center mx-auto"
    >
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-center text-4xl my-8 font-semibold">{question}</h2>
        <ul className="grid gap-10 [grid-template-columns:auto_auto] w-[100%] mb-5">
          {answerOptions.map((option) => (
            <li key={option.text}>
              <button
                className="w-[100%] py-3 px-5 rounded-lg bg-slate-200 text-2xl font-medium hover:bg-slate-400"
                onClick={() => onAnswerClick(option.isCorrect)}
              >
                {option.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
