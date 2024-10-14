import React, { useEffect, useState } from 'react'
import OtpInput from './OtpInput'
import { CgSpinner, CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';

const VerifyUser = () => {

  const [enteredOtp, setEnteredOtp] = useState(null);
  const [isInputFieldEmpty, setIsInputFieldEmpty] = useState(true)
  const [isBtnClicked, setisBtnClicked] = useState(false);
  const [isResendOtpClicked, setIsResendOtpClicked] = useState(true)
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);
  const [expiryTimestamp, setExpiryTimestamp] = useState(time);

  const { start, restart, minutes, seconds } = useTimer({ expiryTimestamp })

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    start();
    setTimeout(() => {
      setIsResendOtpClicked(false);
    }, 120000);
  }, [])

  const enableCount = () => {
    const resetTime = new Date();
    resetTime.setSeconds(resetTime.getSeconds() + 120);
    restart(resetTime)
    setTimeout(() => {
      setIsResendOtpClicked(false);
    }, 120000);

  }

  const handleResendOtp = async () => {
    setIsResendOtpClicked(true);
    enableCount();
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/resendOtp`, null,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    // console.log(session);
    if (res.data) {
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.error('Internal server error', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    // enableCount();
  }

  const onOtpSubmit = (otp) => {
    setEnteredOtp(otp)
    setIsInputFieldEmpty(false)
  }

  const handleClick = async () => {
    setisBtnClicked(true);
    toast('Verifing', {
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
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/verify/${enteredOtp}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    setisBtnClicked(false);
    if(response.data){
      if (response.data.success) {
        toast.success('Verified successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        // console.log('token found')
        // localStorage.setItem('token', response.data.token);
        // navigate('/');
        localStorage.setItem('token', response.data.token);
        fetchUser(response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }else{
      toast.error("Internal server error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

  }
  // const handleResendOtp = () => {
  //   setIsResendOtpClicked(true);
  // }

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
          <div className='flex  flex-col space-y-8 p-4'>
            <h1 className='text-center font-bold text-black text-3xl -mt-24'>Verify yourself</h1>
            <p className='text-gray-600 text-center'>A verification email has been sent to your email, its better to check your spam also</p>
            <div className='flex justify-center'>
              <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
            </div>
            <div className='flex items-center justify-between'>
              <button type='button' onClick={handleClick} className="py-3 px-4 text-sm tracking-wider font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none disabled:bg-orange-400 disabled:cursor-not-allowed" disabled={isBtnClicked || isInputFieldEmpty}>{
                isBtnClicked ? <div className='flex items-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Verifying..</div></div> : 'Verify'
              }</button>
              <button type='button' onClick={handleResendOtp} className="py-3 px-4 text-sm tracking-wider font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none disabled:bg-orange-400 disabled:cursor-not-allowed" disabled={isResendOtpClicked || isBtnClicked}>{
                isResendOtpClicked ? <><span>{minutes}</span>:<span>{seconds}</span></> : 'Resend otp'
              }</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VerifyUser