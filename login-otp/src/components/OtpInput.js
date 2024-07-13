import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length=4,onOtpSubmit= () =>{}}) => {
  const[otp,setOtp] = useState(new Array(length).fill(""))
  const inputRefs = useRef([]);

  // console.log(inputRefs,'Refs');
  // console.log(otp,'OTP');

  const handleChange = (i,e) =>{
    const value = e.target.value
    if(isNaN(value)) return
    const newOtp = [...otp]
    // allow only one input
    newOtp[i] = value.substring(value.length-1);
    setOtp(newOtp);
    
    const combinedOtp = newOtp.join("");
    if(combinedOtp.length === length){
      onOtpSubmit(combinedOtp)
    }


    //Move to next input id current field is filled
    if(value && i < length-1 && inputRefs.current[i+1]){
      inputRefs.current[i+1].focus();
    }
  }

  const handleClick = (i) =>{
    inputRefs.current[i].setSelectionRange(1,1)
  }

  const handleKeyDown = (i,e) =>{
   if(e.key === "Backspace" && !otp[i] && i>0 && inputRefs.current[i-1]){
    inputRefs.current[i-1].focus()
   }
  }

  useEffect(()=>{
   if(inputRefs.current[0]){
    inputRefs.current[0].focus();
   }
  },[])

  return (
    <div>
      {otp.map((value,index)=>(
       <input
       ref = {(input)=>(inputRefs.current[index]=input)}
        key={index}
        type='text'
        value={value}
        onChange={(e)=>handleChange(index,e)}
        onClick={()=>handleClick(index)}
        onKeyDown={(e)=>handleKeyDown(index,e)}
        className='otpInput'
       />
      ))}
    </div>
  )
}

export default OtpInput