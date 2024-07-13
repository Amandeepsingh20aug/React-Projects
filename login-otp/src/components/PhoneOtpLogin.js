import React, { useState } from 'react'
import OtpInput from './OtpInput';

export const PhoneOtpLogin = () => {
  const [phoneNumber,setPhoneNumber] = useState("")
  const [showOtpInput,setShowOtpInput] = useState(false);
  const handlePhoneNumber = (e) =>{
    setPhoneNumber(e.target.value)
  }

  const handlePhoneSubmit = (e) =>{
    e.preventDefault();

    // Phone Validations
    const regex = /[^0-9]/g;
    if(phoneNumber.length < 10 || regex.test(phoneNumber)){
      alert('Invalid Phone number')
      return
    }
    //Call BE API 
    //Show OTP Field
    setShowOtpInput(true)
  }

  const onOtpSubmit = (opt) =>{
   console.log("OTP Success");
  } 

  return (
    <div>
      {!showOtpInput ? <form onSubmit={handlePhoneSubmit}>
        <input
          type='text'
          value={phoneNumber}
          onChange={handlePhoneNumber}
          placeholder='Enter Phone Number'
        />
        <button type='submit'>Sumbit</button>
      </form>  : 
      <div>
        <p>Enter Otp sent to {phoneNumber}</p>
        <OtpInput length={4} onOtpSubmit = {onOtpSubmit}/>
      </div>}
    </div>
  )
}
