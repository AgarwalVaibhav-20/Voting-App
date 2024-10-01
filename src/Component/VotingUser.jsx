import { useState } from "react";
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

const VotingPage = () => { 
  const [selectedParty, setSelectedParty] = useState("");
  const [submitted, setSubmitted] = useState(false);

  
  const parties = [
    { name: "BJP", candidate: "Narendra Modi", logo: BJPLOGO },
    { name: "INC", candidate: "Rahul Gandhi", logo: INCLOGO },
    { name: "SPA", candidate: "Akhilesh Yadav", logo: SPALOGO},
    { name: "AAP", candidate: "Arvind Kejriwal", logo: AAPLOGO },
    { name: "AITC", candidate: "Mamata Banerjee", logo: aitc },
    { name: "DMK", candidate: "M K Stalin", logo: dmk },
    { name: "TDP", candidate: "N. Chandrababu Naidu", logo: tdp },
    {name:"JD(U)" ,candidate:"Nitish Kumar" , logo:jdu},
    {name:"SHSUBT" , candidate:"Uddhav Thackeray" , logo:shsubt},
    {name:"NCPSP" , candidate:"Sharadchandra Pawar " , logo:ncpsp},
    {name:"SHS" , candidate:"Eknath Shinde" , logo:SHS}
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedParty) {
      setSubmitted(true);
      console.log(`You voted for ${selectedParty}`);
    }
  };

  return (
    <>
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-100 p-6">
      {!submitted ? (
        <div className="w-full max-w-screen-xl">
          <h2 className="text-4xl font-bold text-center mb-10 max-sm:text-2xl">
            Electronic Voting Machine
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap w-full justify-center items-center gap-3">
              {parties.map((party) => (
                <div
                  key={party.name}
                  className={` flex w-full justify-between items-center p-6 md:p-8 border-2 rounded-xl bg-white shadow-lg cursor-pointer transition-all hover:scale-105 transform ${
                    selectedParty === party.name
                      ? "border-blue-500 ring-4 ring-blue-400 shadow-xl"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedParty(party.name)}
                >
                  <img
                    src={party.logo}
                    alt={party.name}
                    className="w-24 h-24 mb-6 max-sm:w-12 max-sm:h-12 max-sm:mb-2 max-sm:mr-3"
                  />
                  <div className="flex justify-center items-center w-full max-sm:mr-auto max-sm:ml-auto">
                  <div className=" flex justify-center items-center max-sm:flex-col gap-3 max-sm:gap-2 ">
                      <span className="text-2xl max-sm:text-base font-bold">
                        {party.name}
                      </span>
                      <p className="text-lg text-center font-light max-sm:text-xs max-sm:font-semibold">
                        Candidate: {party.candidate}
                      </p>
                    </div>
                  </div>
                 <div>
                 <div
                    className={` inline-block w-[25px] h-[25px] max-sm:h-5 max-sm:w-5 bg-green-600 rounded-full ${
                      selectedParty === party.name
                        ? "bg-green-800"
                        : "bg-red-600"
                    }`}
                  ></div>
                 </div>
                  {selectedParty === party.name && (
                    <div className="absolute inset-0 bg-blue-100 opacity-5 rounded-xl"></div>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 mt-10 w-full sm:w-64 mx-auto block rounded-lg text-xl max-sm:text-base hover:bg-green-700 transition duration-300"
              disabled={!selectedParty}
            >
              Confirm Vote
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
