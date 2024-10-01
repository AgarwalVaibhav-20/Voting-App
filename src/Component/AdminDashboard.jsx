import { useState } from "react";
import { FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";

const AdminDashboard = () => {
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

  const handleAddCandidate = () => {
    if (newCandidateName.trim() === "" || newPartyName.trim() === "") return;
    const newCandidate = {
      id: candidates.length + 1,
      name: newCandidateName,
      party: newPartyName,
      votes: 0,
      logo: "https://via.placeholder.com/40", // Placeholder logo
    };
    setCandidates([...candidates, newCandidate]);
    setNewCandidateName("");
    setNewPartyName("");
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
    <div className="min-h-screen bg-[#e9ecef] p-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl text-[#0d0a0b] font-[200]">Admin Dashboard</h1>
        <div className="max-sm:translate-y-[-40px] max-sm:text-xs">
          <button className="bg-white max-sm:font-bold w-full   text-slate-600 px-6 py-2 rounded-lg shadow-lg hover:text-white hover:bg-black transition duration-300">
            Log Out
          </button>
        </div>
      </div>

      {/* Add New Candidate Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-10 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Add a New Candidate</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newCandidateName}
            onChange={(e) => setNewCandidateName(e.target.value)}
            placeholder="Candidate Name"
            className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black"
          />
          <input
            type="text"
            value={newPartyName}
            onChange={(e) => setNewPartyName(e.target.value)}
            placeholder="Party Name"
            className="p-3 border border-gray-300 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-slate-100 text-black"
          />
        </div>
        <button
          onClick={handleAddCandidate}
          data-ripple-light="true"
          className="rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Add Candidate
        </button>
      </div>

      {/* Candidates Table */}
      <div className="flex flex-col overflow-x-auto">
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
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
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
                      <td className="py-3  px-3 sm:px-6 text-center">
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
  );
};

export default AdminDashboard;
