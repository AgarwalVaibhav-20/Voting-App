import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [isLogin, setIsLogin] = useState(false); // State to toggle between Candidate and Admin login

  const handleLogin = async (data) => {
    setIslogin(true);
    const response = await toast.promise(
      fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }),
      {
        pending: 'Signing up ....',
        success: 'Sign-Up success 👌',
        error: 'User with this email or aadhaar already exists 🤯'
      }
    )
    setIsLogin(false);
    console.log("Login Data response:", response);
  };

  return (
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
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-orange-600 hover:bg-orange-400 active:bg-orange-500 focus:outline-none"
                >
                  {isLogin ? <div className='flex items-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Logging in..</div></div> : "Log In"}
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
  );
}
