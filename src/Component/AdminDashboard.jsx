import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { useAuth } from "../context/AuthState";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgSpinner } from "react-icons/cg";
import { uploadImageToCloudinary } from "../upload/uploadImageToCloudinary";

const AdminDashboard = () => {

  const { loggedUser, isLoggedIn, logout, fetchUser, status } = useAuth();

  const navigate = useNavigate();

  const [picToDIsplay, setPicToDIsplay] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    setPicToDIsplay(URL.createObjectURL(e.target.files[0]))
    setProfilePicture(e.target.files[0]);
  };

  const [dataOption, setDataOption] = useState(undefined);

    const options = ["BJP", "INC", "SPA","DMK","AITC", "AAP", "TDP", "JD(U)", "SHSUBT", "NCPSP", "SHS"];
    const onOptionChangeHandler = (event) => {
        setDataOption(event.target.value);
    };

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Doe",
      party: "Democratic Party",
      votes: 120,
      logo: "https://via.placeholder.com/40", // Replace with real party logo URL
    },
    {
      id: 2,
      name: "Jane Smith",
      party: "Republican Party",
      votes: 85,
      logo: "https://via.placeholder.com/40", // Replace with real party logo URL
    },
    {
      id: 3,
      name: "Mike Johnson",
      party: "Green Party",
      votes: 45,
      logo: "https://via.placeholder.com/40", // Replace with real party logo URL
    },
  ]);

  const [newCandidateName, setNewCandidateName] = useState("");
  const [newPartyName, setNewPartyName] = useState("");
  const [editCandidateId, setEditCandidateId] = useState(null);
  const [editCandidateName, setEditCandidateName] = useState("");

  const totalVotes = candidates.reduce(
    (acc, candidate) => acc + candidate.votes,
    0
  );

  const handleClickToLogout = () => {
    logout();
    navigate('/login');
  }

  useEffect(() => {
    
  }, [])
  

  const [isSubmit, setIsSubmit] = useState(false)

  const handleAddCandidate = async () => {
    if (newCandidateName.trim() === "" || dataOption === null || profilePicture === null) {
      toast.error("Please fill all the fields to continue", {
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
      return;
    };

    setIsSubmit(true);

    let profilePictureUrl = "";
    if (profilePicture) {
      profilePictureUrl = await uploadImageToCloudinary(profilePicture);
    }
    const candidateData = {
      name: newCandidateName,
      party: newPartyName,
      profilePic: profilePicture ? profilePictureUrl : loggedUser?.profilePic,
    };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/admin/candidate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(candidateData)
    })
    const res = await response.json()

    if (!response.ok) {
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
    } else {
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
      const newCandidate = {
        id: candidates.length + 1,
        name: newCandidateName,
        party: dataOption,
        votes: 0,
        logo: res.response.profilePic, // Placeholder logo
      };
      setCandidates([...candidates, newCandidate]);
      setNewCandidateName("");
      setNewPartyName("");
    }

    setIsSubmit(false);

  };

  const handleEditCandidate = (id) => {
    setEditCandidateId(id);
    const candidate = candidates.find((c) => c.id === id);
    setEditCandidateName(candidate.name);
  };

  const saveEditCandidate = () => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === editCandidateId
          ? { ...candidate, name: editCandidateName }
          : candidate
      )
    );
    setEditCandidateId(null);
  };

  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  const handleResetVotes = (id) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, votes: 0 } : candidate
      )
    );
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
      <div className="min-h-screen bg-[#e9ecef] p-10 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl text-[#0d0a0b] font-[200]">Admin Dashboard</h1>
          <div className="max-sm:translate-y-[-40px] max-sm:text-xs">
            <button onClick={handleClickToLogout} className="bg-white max-sm:font-bold w-full   text-slate-600 px-6 py-2 rounded-lg shadow-lg hover:text-white hover:bg-black transition duration-300">
              Log Out
            </button>
          </div>
        </div>

        {/* Add New Candidate Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10 text-gray-800">
          <div className="flex items-center justify-between mb-5 md:h-24 md:flex-row flex-col">

            <h2 className="text-2xl font-semibold mb-4">Add a New Candidate</h2>
            {profilePicture && (
              <div className="flex justify-end">
                <img
                  src={picToDIsplay}
                  alt="Profile Preview"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Candidate Name
              </label>
              <input
                type="text"
                id='name'
                value={newCandidateName}
                onChange={(e) => setNewCandidateName(e.target.value)}
                placeholder="Candidate Name"
                className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="party"
              >
                Party Name
              </label>
              {/* <input
                type="text"
                id='party'
                value={newPartyName}
                onChange={(e) => setNewPartyName(e.target.value)}
                placeholder="Party Name"
                className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black"
              /> */}
              <select onChange={onOptionChangeHandler} id='party'>
                <option value={null} className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black">Please choose a party</option>
                {options.map((option, index) => {
                    return (
                        <option className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black" key={index} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
            </div>
            <div className='mb-5'>
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
          </div>
          <button
            onClick={handleAddCandidate}
            data-ripple-light="true"
            className="rounded-md font-bold flex items-center border border-orange-500 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-orange-600 hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-700 focus:border-orange-700 active:border-orange-800 active:text-white active:bg-orange-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  disabled:cursor-not-allowed" disabled={isSubmit}
          >
            {
                isSubmit ? <div className='flex items-center justify-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Adding...</div></div> : "Add candidate"
              }
          </button>
        </div>

        {/* Candidates Table */}
        <div className="flex flex-col md:overflow-x-hidden overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-white">
                  <thead className="text-xs text-black uppercase  bg-gray-50 border-b dark:bg-[#adb5bd">
                    <tr>
                      <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">
                        Candidate
                      </th>
                      <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">
                        Party
                      </th>
                      <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">
                        Logo
                      </th>
                      <th
                        scope="col"
                        className="text-center px-3 py-2 sm:px-6 sm:py-3"
                      >
                        Votes
                      </th>
                      <th
                        scope="col"
                        className=" text-center px-3 py-2 sm:px-6 sm:py-3"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-[#adb5bd]bg-gray-50 border-b text-black dark:border-slate-200"
                      >
                        {/* Candidate Info */}
                        <td className="py-3 px-3 sm:px-6">
                          {editCandidateId === candidate.id ? (
                            <input
                              type="text"
                              value={editCandidateName}
                              onChange={(e) =>
                                setEditCandidateName(e.target.value)
                              }
                              className="p-2 border border-gray-300 rounded-md w-full text-black"
                            />
                          ) : (
                            <span>{candidate.name}</span>
                          )}
                        </td>

                        {/* Party Info */}
                        <td className="py-3 px-3 sm:px-6 text-left">
                          <span>{candidate.party}</span>
                        </td>

                        {/* Party Logo */}
                        <td className="py-3 text-center px-2  sm:px-6 ">
                          <img
                            src={candidate.logo}
                            alt={`${candidate.party} logo`}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          />
                        </td>

                        {/* Vote Info */}
                        <td className="py-3 px-3 sm:px-6 text-center">
                          <span>{candidate.votes}</span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 flex flex-wrap gap-2 px-3 sm:px-6 justify-center">
                          {editCandidateId === candidate.id ? (
                            <button
                              onClick={saveEditCandidate}
                              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition text-xs sm:text-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditCandidate(candidate.id)}
                              className="bg-[#252422] text-white px-2 py-1 rounded-md hover:bg-[#8a817c] transition text-xs sm:text-sm"
                            >
                              <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteCandidate(candidate.id)}
                            className="bg-[#ae2012] text-white px-2 py-1 rounded-md hover:bg-red-600 transition ml-1 sm:ml-2 text-xs sm:text-sm"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>

                          <button
                            onClick={() => handleResetVotes(candidate.id)}
                            className="bg-[#22333b] text-white px-2 py-1 rounded-md hover:bg-gray-600 transition ml-1 sm:ml-2 text-xs sm:text-sm"
                          >
                            <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Total Votes */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">
            Total Votes: {totalVotes}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
