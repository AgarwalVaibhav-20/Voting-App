import React from 'react'
import OtpInput from './OtpInput'

const VerifyUser = () => {

  const onOtpSubmit = (otp) => {
    console.log('hey otp is', otp)
  }

  return (
    <div className='h-screen w-full'>
      <div className='flex justify-center items-center flex-col h-full space-y-5'>
        <h1 className='text-center font-bold text-black text-3xl -mt-24'>Verify yourself</h1>
        <div className='flex justify-center'>
          <OtpInput length={6} onOtpSubmit={onOtpSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default VerifyUser