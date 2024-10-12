import React, { useState } from 'react'
import OtpInput from './OtpInput'
import { CgSpinner, CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';

const VerifyUser = () => {

  const [enteredOtp, setEnteredOtp] = useState(null);
  const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(true)
  const [isBtnClicked, setisBtnClicked] = useState(false);
  const [isResendOtpClicked, setIsResendOtpClicked] = useState(false)
  const navigate= useNavigate();

  const onOtpSubmit = (otp) => {
    setEnteredOtp(otp)
    setIsInputFieldEmpty(false)
  }

  const handleClick = async() => {
    setisBtnClicked(true);  
    const token = localStorage.getItem('token')
    const response = await toast.promise(
      axios.get(`https://voting-app-backend-node.vercel.app/user/verify/${enteredOtp}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      ),
      {
        pending: 'Verifying ...',
        success: 'Verified successfully',
        error: 'Some error occured while verifying 🤯'
      }
    )
    if (response.data.token) {
      // console.log('token found')
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } else {
      toast(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

  }
  const handleResendOtp = () => {
    setIsResendOtpClicked(true);
  }

  return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className='h-screen w-full'>
        <div className='flex justify-center items-center h-full'>
          <div className='flex  flex-col space-y-8 bg-blue-400 p-4'>
            <h1 className='text-center font-bold text-black text-3xl -mt-24'>Verify yourself</h1>
            <div className='flex justify-center'>
              <OtpInput length={6} onOtpSubmit={onOtpSubmit}/>
            </div>
            <div className='flex items-center justify-between'>
              <button type='button' onClick={handleClick} className="py-3 px-4 text-sm tracking-wider font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none disabled:bg-orange-400 disabled:cursor-not-allowed" disabled={isBtnClicked || isInputFieldEmpty}>{
                  isBtnClicked ? <div className='flex items-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Verifying..</div></div> : 'Verify'
                }</button>
              <button type='button' onClick={handleResendOtp} className="py-3 px-4 text-sm tracking-wider font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none disabled:bg-orange-400 disabled:cursor-not-allowed" disabled={isResendOtpClicked || isBtnClicked}>{
                  isResendOtpClicked ? 'wait' : 'Resend'
                }</button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default VerifyUser