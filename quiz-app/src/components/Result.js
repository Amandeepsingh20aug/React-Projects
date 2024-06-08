import React, { useEffect, useState } from 'react'

const Result = ({userAnswer,questions,resetQuiz}) => {
  const[answer,setAnswer] = useState([]);
  const correctAnswer = () =>{
    let cnt  = 0;
   for(let i=0 ;i<userAnswer.length;i++){
     if(userAnswer[i]===true)
      cnt = cnt +1;
   }
   return cnt;
  }


  const filterAnswer = () =>{
    const updatedAnswers =questions.flatMap(question=>
      question.answerOptions.filter((option)=>(
          option.isCorrect !== false
      ))
    )
    setAnswer(updatedAnswers)
  }


  useEffect(() => {
    filterAnswer();
  }, [questions]);


  return (
    <div className='text-center my-4 border border-gray-400'>
      <h2 className='py-2 text-2xl font-medium'>Results</h2>
      <p className='pb-2 text-xl font-medium'>You answered {correctAnswer()} out of {questions.length} questions correctly.</p>
      <span className='pb-2 text-lg font-medium text-red-500 underline cursor-pointer' onClick={resetQuiz}>Click here to Retry</span>
      <ul className='py-2'>
        {questions.map((question,index)=>(
          <li className={userAnswer[index] === true ? 'py-2 font-semibold text-xl text-green-300': 'py-2 font-semibold text-xl text-red-300'} key={index}>
            Q{index+1}. {question.question}
            {userAnswer[index] === false ? <p className='text-black'>{answer[index] ? answer[index].text : ""}</p> : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Result