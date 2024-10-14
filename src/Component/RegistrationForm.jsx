import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyUser from "./VerifyUser";
import { useNavigate} from 'react-router-dom';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate= useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // const res = await axios.post(`https://voting-app-backend-node.vercel.app/user/signup`, data);
    const response = await toast.promise(
      axios.post(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/signup`, data),
      {
        pending: 'Signing up ....',
        success: 'Sign-Up success 👌',
        error: 'User with this email or aadhaar already exists 🤯'
      }
    )
    // console.log('resData', response.data)
    if (response.data && response.data.token) {
      // console.log('token found')
      // localStorage.setItem('token', response.data.token);
      // navigate('/verify');
      localStorage.setItem('token', response.data.token);
        fetchUser(response.data.token);
        navigate('/verify');
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
  };

  // Watching the password value to validate against confirm password
  const passwordValue = watch("password");

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
        <div className="max-w-7xl w-full mx-auto border flex-wrap border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Create an account</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* First Name and Last Name Fields */}
              <div className="flex max-md:block gap-6 w-full">
                {/* First Name */}
                <div className="w-full">
                  <label className="text-gray-800 text-sm sm:text-base md:text-lg mb-2 block">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 mb-2"
                    placeholder="Alok Gupta"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Age */}
                <div className="w-full">
                  <label className="text-gray-800 text-sm sm:text-base md:text-lg mb-2 max-sm:mt-4 block">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="23"
                    {...register("age", { required: "Age is required" })}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age.message}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="text-gray-800 md:text-lg sm:text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="abc@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Aadhaar Field */}
              <div>
                <label className="text-gray-800 text-sm sm:text-base md:text-lg mb-2 block">
                  Aadhaar Number
                </label>
                <input
                  name="aadhaar"
                  type="text"
                  pattern="[0-9]{12}"
                  maxLength="12"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter your 12-digit Aadhaar number"
                  {...register("adhaarNum", {
                    required: "Aadhaar number is required",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Aadhaar number must be 12 digits",
                    },
                  })}
                />
                {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar.message}</p>}
              </div>

              {/* Date of Birth Field
              <div>
                <label className="text-gray-800 text-sm sm:text-base md:text-lg mb-2 block">
                  Date of Birth
                </label>
                <input
                  name="dob"
                  type="date"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  {...register("dob", { required: "Date of birth is required" })}
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
              </div> */}

              {/* Password Field */}
              <div className="relative w-full">
                <label className="text-gray-800 md:text-lg sm:text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  {...register('password', {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
                <div
                  className="absolute right-0 top-[51px] max-sm:top-[48px] pr-3 flex justify-center items-center text-gray-600 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative w-full">
                <label className="text-gray-800 sm:text-sm md:text-lg mb-2 block">Confirm Password</label>
                <input
                  name="cpassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                  {...register("cpassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match", // Compare with the password
                  })}
                />
                {errors.cpassword && (
                  <p className="text-red-500 text-sm">{errors.cpassword.message}</p>
                )}
                <div
                  className="absolute right-0 top-[51px] max-sm:top-[48px] pr-3 flex items-center text-gray-600 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </div>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>

            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <NavLink to="/login" className={"text-orange-600 hover:text-orange-700"}>Login</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
