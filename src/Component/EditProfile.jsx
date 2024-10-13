import { useState } from "react";
import { uploadImageToCloudinary } from "../upload/uploadImageToCloudinary";
// import axios from "axios";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const [picToDIsplay, setPicToDIsplay] = useState(null)

  const handleProfilePictureChange = (e) => {
    setPicToDIsplay(URL.createObjectURL(e.target.files[0]))
    setProfilePicture(e.target.files[0]);
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    let profilePictureUrl = "";
    if (profilePicture) {
      profilePictureUrl = await uploadImageToCloudinary(profilePicture);
    }
    const profileData = {
      name,
      email,
      phone,
      profilePictureUrl, 
    };

    console.log("Profile Data to Submit:", profileData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg max-sm:translate-y-[-60px]">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {profilePicture && (
            <div className="mb-5 flex justify-center">
              <img
                src={picToDIsplay}
                alt="Profile Preview"
                className="rounded-full w-24 h-24"
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
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
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
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
