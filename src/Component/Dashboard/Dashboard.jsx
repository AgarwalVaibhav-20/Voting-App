import { useState } from 'react';
import HeaderDash from './HeaderDash'
import StatsCard from './StatsCard';
import VoteChart from './VoterChart';
import VoterTable from './VoterTable';

const Dashboard = () => {
  // Simulated Data
  const [voters, setVoters] = useState([
    { id: 1, name: 'Shivam Shukla', vote: 'BJP' },
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

  const voteData = {
    BJP: 240,
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
  };

  const sumOfVotes = Object.values(voteData).reduce((acc, curr) => acc + curr, 0);
  
  // Set a limit on the total number of votes to 543
  const totalVotes = sumOfVotes >= 543 ? "543/543" : `${sumOfVotes}/543`;
  const leadingCandidate = Object.keys(voteData).reduce((a, b) => (voteData[a] > voteData[b] ? a : b));

  return (
    <>
      <HeaderDash/>
      <div className="container mx-auto p-4">
        {/* Top Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard title="Total Votes" value={totalVotes} />
          <StatsCard title="Leading Candidate" value={leadingCandidate} />
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

