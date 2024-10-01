import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [isAdminLogin, setIsAdminLogin] = useState(false); // State to toggle between Candidate and Admin login

  const handleCandidateLogin = (data) => {
    console.log("Candidate Login Data:", data);
  };

  const handleAdminLogin = (data) => {
    console.log("Admin Login Data:", data);
  };

  return (
    <div className="flex flex-wrap flex-col justify-center font-[sans-serif] min-h-screen p-4">
      <div className="max-w-6xl w-full mx-auto border mb-16 flex-wrap border-gray-300 rounded-2xl max-sm:h-[80vh] p-8">
        <div className="text-center mb-5 ">
          <h1 className="text-3xl font-bold text-gray-800">
            {isAdminLogin ? "Admin Log-In" : "Candidate Log-In"}
          </h1>
        </div>
        <div className="text-start mb-6">
          <h1 className="text-lg font-medium text-gray-800 max-sm:text-center">
            Welcome Back, Fill your Details
          </h1>
        </div>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
              !isAdminLogin ? "bg-[#e85d04] text-white" : "bg-gray-300"
            }`}
            onClick={() => setIsAdminLogin(false)}
          >
            Candidate Login
          </button>
          <button
            className={`px-4 py-2 mx-2 text-sm font-medium rounded-md ${
              isAdminLogin ? "bg-[#e85d04] text-white" : "bg-gray-300"
            }`}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin Login
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(isAdminLogin ? handleAdminLogin : handleCandidateLogin)}
          >
            <div className="space-y-6">
              {/* Common Email Field */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block" htmlFor="email">
                  Email Address
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-orange-500"
                  placeholder="Enter email"
                  {...register("email")}
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

              {/* Admin-only field */}
              {isAdminLogin && (
                <div>
                  <label className="text-gray-800 text-sm mb-2 block" htmlFor="adminCode">
                    Admin Code
                  </label>
                  <input
                    name="adminCode"
                    type="password"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-orange-500"
                    placeholder="Enter admin code"
                    {...register("adminCode")}
                  />
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-orange-600 hover:bg-orange-400 active:bg-orange-500 focus:outline-none"
                >
                  {isAdminLogin ? "Admin Log In" : "Candidate Log In"}
                </button>
              </div>
              <div>
              {isAdminLogin?"":
              <div className="flex gap-1 justify-center items-center max-sm:text-md">
                <p>Don’t have an account yet?</p>
                <NavLink to="/home" className="text-blue-700 hover:text-orange-400">
                  Sign-up
                </NavLink>
              </div>
              }

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
