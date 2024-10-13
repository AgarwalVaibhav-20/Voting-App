import { useContext } from "react";
import { PartiesName } from "./ContextApi"; // Ensure you have a valid context here
import profileImage from "../assets/profileImage.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthState";

export default function ProfilePage() {
  const parties = useContext(PartiesName); // Get party names from context

  const { loggedUser, isLoggedIn, logout, fetchUser } = useAuth();

  // Assuming the array is provided by context and has at least 3 parties
  const user = {
    name: "Vaibhav Agarwal",
    email: "vaibhav@example.com",
    phone: "+91-123-456-7890",
    profilePic: profileImage,
    recentVotes: [
      { party: parties[1], date: "September 28, 2019" },
      { party: parties[2], date: "July 10, 2024" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              className="w-28 h-28 rounded-full object-cover shadow-lg"
              src={user.profilePic}
              alt="Profile"
            />
            <div className="flex flex-col">
              <h2 className="text-3xl  font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 max-sm:text-sm hidden">
                {user.email}
              </p>
              <p className="text-gray-600 max-sm:hidden">{user.phone}</p>
              <NavLink to="/editprofile">
                {" "}
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.recentVotes.length > 0 ? (
              user.recentVotes.map((vote, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-800">
                    Voted for{" "}
                    <span className="font-bold text-blue-500">
                      {vote.party}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">Date: {vote.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent voting activity found.</p>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Phone</label>
                <input
                  type="text"
                  value={user.phone}
                  readOnly
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-right">
                <NavLink to="/editprofile">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Update Info
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
