import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../upload/uploadImageToCloudinary";
import { useAuth } from "../context/AuthState";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";

const EditProfile = () => {
  
  const { loggedUser, isLoggedIn, logout, fetchUser , status} = useAuth();
  
  const [name, setName] = useState(loggedUser?.name);
  const [email, setEmail] = useState(loggedUser?.email);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setName(loggedUser?.name)
    setEmail(loggedUser?.email)
  }, [loggedUser?.email, loggedUser?.name])
  

  const [picToDIsplay, setPicToDIsplay] = useState(null)

  const handleProfilePictureChange = (e) => {
    setPicToDIsplay(URL.createObjectURL(e.target.files[0]))
    setProfilePicture(e.target.files[0]);
  };
  
  const [isSubmit, setIsSubmit] = useState(false)

  const [token, setToken] = useState(localStorage.getItem('token'));

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmit(true);
    
    let profilePictureUrl = "";
    if (profilePicture) {
      // profilePic has image and also loggedUser.profilePic has image
      if(loggedUser?.profilePic){
        const profDelete = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/profile/deleteImage`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({imgUrl:loggedUser?.profilePic})
        })
        // console.log('res of prof img delete',profDelete);
      }
      // no profilepic updation on other fields changes
      profilePictureUrl = await uploadImageToCloudinary(profilePicture);
    }
    const profileData = {
      name:name,
      email:email,
      profilePic:profilePicture ? profilePictureUrl : loggedUser?.profilePic, 
    };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/profile/otherFields`, {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
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
    }
    fetchUser(token)
    setIsSubmit(false);
    // console.log("Profile Data to Submit:", res);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg max-sm:translate-y-[-60px]">
          <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {profilePicture && (
              <div className="mb-5 flex justify-center">
                <img
                  src={picToDIsplay}
                  alt="Profile Preview"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="profilePicture"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleProfilePictureChange}
                className="block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 focus:outline-none px-4 rounded disabled:cursor-not-allowed disabled:bg-blue-400 focus:shadow-outline transition duration-300 " disabled={isSubmit}
            >
              {
                isSubmit ? <div className='flex items-center justify-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Updating...</div></div> : "Save Changes"
              }
            </button>
          </form>
        </div>
      </div>
    
    </>
  );
};

export default EditProfile;
