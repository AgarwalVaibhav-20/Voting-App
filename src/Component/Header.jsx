import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

export default function Myhead() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
        className="bg-white flex justify-between items-center px-6 py-3 shadow z-50 max-sm:relative"
      >
        <h1>VoteGov</h1>
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
              className={`flex max-lg:bg-white items-center justify-center   max-lg:items-start ${
                isOpen ? "block" : "hidden"
              } lg:flex  lg:space-x-8 max-lg:absolute max-lg:top-[45.9px] max-lg:right-[-1px] max-lg:border max-lg:w-full max-lg:flex max-lg:flex-col max-lg:translate-y-[2px]`}
            >
              <li className="max-lg:w-[100%] ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white hover:bg-gray-50 lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="max-lg:w-[100%]">
                <NavLink
                  to="/create-poll"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white hover:bg-gray-50 lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Create Poll
                </NavLink>
              </li>
              <li className="max-lg:w-[100%]">
                <NavLink
                  to="/result"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b bg-white hover:bg-gray-50 lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Result
                </NavLink>
              </li>
              <li className="max-lg:w-[100%]">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } bg-white hover:bg-gray-50 lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Log In
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
