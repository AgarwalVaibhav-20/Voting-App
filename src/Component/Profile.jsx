import { useContext } from "react";
import { PartiesName } from "../context/ContextApi"; // Ensure you have a valid context here
import profileImage from "../assets/profileImage.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthState";
import { GiCircleClaws } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";

export default function ProfilePage() {
  const parties = useContext(PartiesName); // Get party names from context

  const { loggedUser, isLoggedIn, logout, fetchUser, status } = useAuth();

  if (status) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ImSpinner9 className='text-orange-500 size-20 animate-spin' />
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              className="w-28 h-28 rounded-full object-cover shadow-lg"
              src={loggedUser?.profilePic ? loggedUser.profilePic : 'https://res.cloudinary.com/dljgidqrq/image/upload/v1728844361/ljmzm14uujnfl1nqwlxi.jpg'}
              alt="Profile"
            />
            <div className="flex flex-col">
              <h2 className="text-3xl  font-bold text-gray-800">{loggedUser?.name}</h2>
              <NavLink to="/editprofile">
                {" "}
                <button className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                  Edit Profile
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="flex justify-center items-center">
            {loggedUser?.votedFor?.party ?
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-800">
                  Voted for{" "}
                  <span className="font-bold text-blue-500">
                    {loggedUser?.votedFor?.party}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Date: {loggedUser?.votedFor?.votedAt.split('T')[0]}</p>
              </div>
              :
              <p className="text-gray-800 text-center bg-white p-6 rounded-lg shadow-md">No recent voting activity found.</p>
            }
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            More details
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className='flex flex-col space-y-3'>
              <div className='flex gap-10'>
                <div className="font-bold text-gray-800">Email : </div>
                <p className="text-gray-800 max-sm:text-sm">
                {loggedUser?.email}
              </p></div>
              <div className='flex gap-10'>
                <div className="font-bold text-gray-800">Aadhaar Id : </div>
                <p className="text-gray-800">{loggedUser?.adhaarNum}</p>
              </div>
              <div className='flex gap-10'>
                <div className="font-bold text-gray-800">Age : </div>
                <p className="text-gray-800">{loggedUser?.age}</p>
              </div>
              <div className='flex gap-10'>
                <div className="font-bold text-gray-800">User type : </div>
                <p className="text-gray-800">{loggedUser?.userType}</p>
              </div>
              <div className='flex gap-10'>
                <div className="font-bold text-gray-800">Is Voted : </div>
                <p className="text-gray-800">{loggedUser?.userType === 'admin' ? <div className='text-red-500 font-bold'>Admin is not allowed to vote</div> : loggedUser?.isVoted ? <div className='text-green-500 font-bold'>Voted successfully</div> : <div className='text-orange-500 font-bold'>Didn't casted vote yet.</div> }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
