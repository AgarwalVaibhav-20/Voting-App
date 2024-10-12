import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ length, onOtpSubmit }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''))
    const inputRef = useRef([])

    useEffect(() => {
      if(inputRef.current[0]){
        inputRef.current[0].focus();
      }
    }, [])
    


    const handleChange = (index,e) => {
        const value = e.target.value;
        if(isNaN(value)) return
        const newOtp = [...otp]

        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp)

        const combinedOtp = newOtp.join('');
        if(combinedOtp.length === length) onOtpSubmit(combinedOtp)
        
        if(value && index < length - 1 && inputRef.current[index + 1]){
            inputRef.current[index + 1].focus();
        }
    }
    const handleClick = (index) => {
        inputRef.current[index].setSelectionRange(1,1);
    }
    const handleKeyDown = (index,e) => {
        if(e.key === 'Backspace' && !otp[index] && index > 0 && inputRef.current[index - 1]){
            inputRef.current[index - 1].focus();
        }
    }



    return (
        <div>{
            otp.map((element, index) => {
                return (
                    <input ref={(input) => inputRef.current[index] = input} className='md:w-14 w-10  md:h-14 h-10  m-1.5 text-center text-xl border-2 border-orange-300 focus:border-orange-500 focus:border-[3px] focus:outline-none rounded-[8px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" value={element} key={index} onChange={(e) => handleChange(index, e)} onClick={() => handleClick(index)} onKeyDown={(e) => handleKeyDown(index,e)} />
                )
            })


        }</div>
    )
}

export default OtpInput