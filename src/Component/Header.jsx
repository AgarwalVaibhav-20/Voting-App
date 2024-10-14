import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { CiLogout,CiLogin, CiUser } from "react-icons/ci";
import { TfiHelpAlt } from "react-icons/tfi";
import { RiAdminLine } from "react-icons/ri";
import profileImage from "../assets/profileImage.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthState";


export default function Myhead() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile dropdown


  const navigate = useNavigate();

  const { loggedUser, isLoggedIn, logout, fetchUser , status} = useAuth();


  

  const handleClickOnLogout = () => {
    closeProfileDropdown();
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Function to close profile dropdown after link is clicked
  const closeProfileDropdown = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      <header
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
        className="bg-white flex justify-between items-center px-6 py-3 shadow z-50 max-sm:relative"
      >
        <h1 className="text-2xl">VoteGov</h1>
        {}
        <div>
          <div
            className="lg:hidden text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            {isOpen ? <MdClose /> : <MdMenu />}
          </div>
          <nav
            className={`lg:flex items-center justify-center lg:space-x-8 ${
              isOpen ? "block" : "hidden"
            } lg:block`}
          >
            <ul
              className={`flex text-lg max-lg:bg-white items-center justify-center max-lg:items-start ${
                isOpen ? "block" : "hidden"
              } lg:flex  lg:space-x-8 max-lg:absolute max-lg:top-[45.9px] max-lg:right-[-1px] max-lg:border max-lg:w-full max-lg:flex max-lg:flex-col max-lg:translate-y-[2px]`}
            >
              <li className="max-lg:w-[100%] ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white  lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="max-lg:w-[100%]">
                <NavLink
                  to="/voting"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white  lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Voting
                </NavLink>
              </li>
              <li className="max-lg:w-[100%]">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white  lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              {/* Profile Dropdown */}
              <li className="relative max-lg:w-[100%]">
                {
                  isLoggedIn ? 
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 py-2 pr-4 pl-3 text-gray-700 bg-white  lg:border-0 hover:text-orange-700 lg:p-0"
                  >
                    {/* Profile image */}
                    <img
                      src={!status && loggedUser?.profilePic ? loggedUser.profilePic : 'https://res.cloudinary.com/dljgidqrq/image/upload/v1728844361/ljmzm14uujnfl1nqwlxi.jpg'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className='font-bold'>{loggedUser?.name.split(' ')[0]}</span>
                  </button> : <NavLink to="/login" className="block px-4 py-2 font-bold text-orange-400 hover:text-orange-600" onClick={closeProfileDropdown}>Login / Signup</NavLink> 
                }

                {/* Dropdown menu */}
                {isProfileOpen && isLoggedIn && (
                  <ul
                    className="absolute sm:right-1 top-[45px] 
                   mt-2 w-48 bg-white rounded-md shadow-lg"
                  >
                    <li className="flex items-center space-x-2 p-4">
                      {/* Display the profile image inside the dropdown */}
                      <img
                        src={!status && loggedUser?.profilePic  ? loggedUser.profilePic : 'https://res.cloudinary.com/dljgidqrq/image/upload/v1728844361/ljmzm14uujnfl1nqwlxi.jpg'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-gray-800">{loggedUser?.name}</span>
                    </li>
                    <li>
                      {/* PROFILE */}
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={closeProfileDropdown} // Close dropdown when clicked
                      >
                        <div className="flex gap-2 items-center">
                          <CiUser className="text-xl" />
                          <span>Profile</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={closeProfileDropdown} // Close dropdown when clicked
                      >
                        <div className="flex gap-2 items-center">
                          <TfiHelpAlt className="text-xl" />
                          <NavLink to="/help&support">Help & Support</NavLink>
                        </div>
                      </NavLink>
                    </li>
                    {/* ADMIN */}
                    {
                      loggedUser.userType === 'admin' &&
                      <li>
                        <NavLink
                          to="/admin"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={closeProfileDropdown} // Close dropdown when clicked
                        >
                          <div className="flex gap-2 items-center">
                            <RiAdminLine className="text-xl" />
                            <span>Admin</span>
                          </div>
                        </NavLink>
                      </li>
                    }

                    {/* LOGOUT */}
                    <li>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={handleClickOnLogout}
                      >
                        <div className="flex gap-2 items-center">
                          <CiLogout className="text-xl" />
                          <span>Logout</span>
                        </div>
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
