import { useEffect, useState } from 'react';
import HeaderDash from './HeaderDash'
import StatsCard from './StatsCard';
import VoteChart from './VoterChart';
import VoterTable from './VoterTable';
import { ImSpinner9 } from 'react-icons/im';

const Dashboard = () => {

  // Simulated Data
  const [voters, setVoters] = useState([
    { id: 1, name: 'Umang Sinha', vote: 'BJP' },
    { id: 2, name: 'Priyanshu Patel', vote: 'INC' },
    { id: 3, name: 'Aniket Mishra', vote: 'BJP' },
    { id: 4, name: 'Amit Kumar', vote: 'INC' },
    { id: 5, name: 'Vishal Kumar', vote: 'INC' },
    { id: 6, name: 'Nayan Chaturvedi', vote: 'BJP' },
    { id: 7, name: 'Arvind yadav', vote: 'AITC' },
    { id: 8, name: 'Mohan Banerjee', vote: 'AITC' },
    { id: 9, name: 'M K Gandhi', vote: 'DMK' },
    { id: 10, name: 'Nischay Gupta', vote: 'TDP' },
    { id: 11, name: 'Nitish Agarwal', vote: 'JD(U)' },
    { id: 12, name: 'Varun Dhawan', vote: 'SHSUBT' },
    { id: 13, name: 'Sharad pawar', vote: 'NCPSP' },
    { id: 14, name: 'Ravi Shinde', vote: 'SHS' },
    { id: 15, name: 'Subash ghosh', vote: 'AITC' },
  ]);


  const [fetchingVoters, setFetchingVoters] = useState(false);
  const [fetchingCandidates, setFetchingCandidates] = useState(false);
  const [fetchingCount, setFetchingCount] = useState(false);
  const [voteData, setVoteData] = useState({
    BJP: 340,
    INC: 99,
    SP: 37,
    AITC: 29,
    DMK: 22,
    TDP: 22,
    JDU:12,
    SHSUBT:9,
    NCPSP:8,
    SHS:7,
    Other:64
  });
  const [candidates, setCandidates] = useState([]);
  const [totalUserVoted, setTotalUserVoted] = useState();
  // const [voters, setVoters] = useState([]);

  const fetchVoters = async () => {
    setFetchingVoters(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/totalVoters`, {
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
      setTotalUserVoted(res.totalVoters);
      setVoters([...res.usersVoted]);
    }
    setFetchingVoters(false);
  }

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

  const fetchCount = async () => {
    setFetchingCount(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/vote/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await response.json()
    // console.log("data :",res)
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
      setVoteData(res.record);
      console.log(res.record);
    }
    setFetchingCount(false);
  }

  useEffect(() => {
    fetchVoters();
    fetchCandidates();
    fetchCount();
  }, [])


  if (fetchingVoters && fetchingCandidates && fetchingCount) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ImSpinner9 className='text-orange-500 size-20 animate-spin' />
    </div>
  }



  const sumOfVotes = candidates.reduce((total, candidate) => total + candidate?.voteCount, 0);
  
  // Set a limit on the total number of votes to 543
  const totalVotes = sumOfVotes === totalUserVoted ? `${sumOfVotes}/${totalUserVoted}` : `${voters.length}/${totalUserVoted}`  ;
  const leadingCandidate = candidates.reduce((highest, candidate) => {
    return (candidate?.voteCount > highest?.voteCount) ? candidate : highest;
  }, candidates[0]);

  return (
    <>
      <HeaderDash/>
      <div className="container mx-auto p-4">
        {/* Top Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard title="Total Votes" value={totalVotes} />
          <StatsCard title="Leading Candidate" value={leadingCandidate?.party} />
          <StatsCard title="Voter Turnout" value={`${voters.length} Voters`} />
        </div>

        {/* Chart and Voter List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Voting Distribution</h3>
            <VoteChart data={voteData} />
          </div>
          <VoterTable voters={voters} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

