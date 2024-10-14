import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthState";


export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [isLogin, setIsLogin] = useState(false); 

  const { loggedUser, isLoggedIn, logout, fetchUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLogin(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if(!response.ok){
      toast.error(res.message, {
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
    }else{
      toast.success(res.message, {
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
      localStorage.setItem('token', res.token);
      fetchUser(res.token);
      navigate('/');
    }
    setIsLogin(false);
  };

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
      <div className="flex flex-wrap flex-col justify-center font-[sans-serif] min-h-screen p-4">
        <div className="max-w-6xl w-full mx-auto border mb-16 flex-wrap border-gray-300 rounded-2xl max-sm:h-[80vh] p-8">
          <div className="text-center mb-5 ">
            <h1 className="text-3xl font-bold text-gray-800"> Login
            </h1>
          </div>
          <div className="text-start mb-6">
            <h1 className="text-lg font-medium text-gray-800 text-center">
              Welcome Back, Fill your Details
            </h1>
          </div>
          <div className="flex justify-center mb-6">
          </div>
          <div>
            <form
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="space-y-6">
                {/* Common Email Field */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    name="cred"
                    type="text"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-orange-500"
                    placeholder="Enter email or aadhaar number"
                    {...register("cred")}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block" htmlFor="password">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-orange-500"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-orange-600 hover:bg-orange-400 active:bg-orange-500 disabled:cursor-not-allowed focus:outline-none disabled:bg-orange-400"
                  >
                    {isLogin ? <div className='flex items-center justify-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Logging in..</div></div> : "Log In"}
                  </button>
                </div>
                <div>
                <div className="flex gap-1 justify-center items-center max-sm:text-md">
                  <p>Don't have an account yet?</p>
                  <NavLink to="/Sign-up" className="text-blue-700 hover:text-orange-400">
                    Sign-up
                  </NavLink>
                </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
