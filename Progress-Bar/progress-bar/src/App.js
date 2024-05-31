import { useEffect, useState } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';

function App() {
  const[value,setValue] = useState(0);
  const[success,setSuccess] = useState(false);

  useEffect(()=>{
    setInterval(()=>{
      setValue((val)=>val +1)
    },100)
  },[])
  return (
    <div>
    <h1 className="text-center text-3xl text-black font-semibold">Progress Bar</h1>
    <ProgressBar value={value} onComplete={()=>setSuccess(true)}/>
    <span className='flex justify-center'>{success ? "Complete" : 'Loading'}</span>  
    </div>
  );
}

export default App;
