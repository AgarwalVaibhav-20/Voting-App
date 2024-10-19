import { useEffect, useState } from "react";
import BJPLOGO from "../assets/BJPLOGO.png";
import INCLOGO from "../assets//INCLOGO.png";
import SPALOGO from "../assets/SPALOGO.png";
import AAPLOGO from "../assets/AAPLOGO.png";
import aitc from "../assets/aitc.png";
import dmk from "../assets/dmk.png";
import tdp from "../assets/tdp.png";
import jdu from '../assets/jdu.png';
import shsubt from '../assets/shsubt.png';
import ncpsp from '../assets/ncpsp.png'
import SHS from '../assets/ssh.png'
import { useAuth } from "../context/AuthState";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiCircleClaws } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";
import { CgSpinner } from "react-icons/cg";

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loggedUser, isLoggedIn, logout, fetchUser, status } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [fetchingCandidates, setFetchingCandidates] = useState(false);


  const parties = {
    'BJP':BJPLOGO,
    'INC':INCLOGO,
    'SPA':SPALOGO,
    'AAP':AAPLOGO,
    'AITC':aitc,
    'DMK':dmk,
    'TDP':tdp,
    'JD(U)':jdu,
    'SHSUBT':shsubt,
    'NCPSP':ncpsp,
    'SHS':SHS,
  }

  const [candidates, setCandidates] = useState([]);



  const fetchCandidates = async () => {
    setFetchingCandidates(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/candidates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
      // console.log("data :",res)
      setCandidates([...res.data]);
    }
    setFetchingCandidates(false);
  }

  useEffect(() => {
    fetchCandidates()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (selectedPartyId) {
      const candidate = candidates.find((c) => c._id === selectedPartyId);
      setSelectedParty(candidate.name);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/vote/${selectedPartyId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
        setSubmitted(true);
      }
      setIsSubmitting(false)
      console.log(`You voted for ${selectedParty}`);
    }
  };

  if (fetchingCandidates) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ImSpinner9 className='text-orange-500 size-20 animate-spin' />
    </div>
  }

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
      <div className="min-h-screen flex w-full items-center justify-center bg-gray-100 p-6">
        {!submitted ? (
          <div className="w-full max-w-screen-xl">
            <h2 className="text-4xl font-bold text-center mb-10 max-sm:text-2xl">
              Electronic Voting Machine
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap w-full justify-center items-center gap-3">
                {candidates.map((party, index) => (
                  <div
                    key={index}
                    className={` flex w-full justify-between items-center p-6 md:p-8 border-2 rounded-xl bg-white shadow-lg cursor-pointer transition-all hover:scale-105 transform ${selectedPartyId === party?._id
                        ? "border-blue-500 ring-4 ring-blue-400 shadow-xl"
                        : "border-gray-300"
                      }`}
                    onClick={() => setSelectedPartyId(party?._id)}
                  >
                    <img
                      src={party?.profilePic}
                      alt={party?.party}
                      className="w-24 h-24 mb-6 max-sm:w-12 max-sm:h-12 max-sm:mb-2 max-sm:mr-3 rounded-full object-cover shadow-lg"
                    />
                    <div className="flex justify-center items-center w-full max-sm:mr-auto max-sm:ml-auto">
                      <div className=" flex flex-col justify-center items-center max-sm:flex-col gap-3 max-sm:gap-2 ">
                        <span className="text-2xl max-sm:text-base font-bold flex items-center gap-2">
                          {party?.party}
                          <img
                            src={parties[party?.party]}
                            alt={party?.party}
                            className="w-10 h-10 max-sm:w-12 max-sm:h-12 max-sm:mb-2 max-sm:mr-3 rounded-full object-cover shadow-lg"
                          />
                        </span>
                        <p className="text-lg text-center font-light max-sm:text-xs max-sm:font-semibold">
                          Candidate: {party?.name}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div
                        className={` inline-block w-[25px] h-[25px] max-sm:h-5 max-sm:w-5 bg-green-600 rounded-full ${selectedPartyId === party?._id
                            ? "bg-green-800"
                            : "bg-red-600"
                          }`}
                      ></div>
                    </div>
                    {selectedPartyId === party?._id && (
                      <div className="absolute inset-0 bg-blue-100 opacity-5 rounded-xl"></div>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="disabled:cursor-not-allowed disabled:bg-green-400 bg-green-600 text-white py-3 px-6 mt-10 w-full sm:w-64 mx-auto block rounded-lg text-xl max-sm:text-base hover:bg-green-700 transition duration-300"
                disabled={!selectedPartyId || isSubmitting}
              >
                {isSubmitting ? <div className='flex items-center justify-center space-x-2'><CgSpinner className='animate-spin size-5' /><div>Voting...</div></div> : "Confirm Vote"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-6 max-sm:text-xl">
              Thank you for voting!
            </h2>
            <p className="text-lg max-sm:text-base">
              You voted for:{" "}
              <span className="font-semibold">{selectedParty}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default VotingPage;
