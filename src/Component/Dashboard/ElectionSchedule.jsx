import StateElectionCard from "./StateElectionCard";

function ElectionSchedule() {
  const electionData = [
    {
      phase: "Phase 1",
      electionDate: "19 Nov 2024",
      p1: "102 Constituencies",
      p2: "21 States",
    },
    {
      phase: "Phase 2",
      electionDate: "26 April, 2024",
      p1: "88 Constituencies",
      p2: "13 States",
    },
    {
      phase: "Phase 3",
      electionDate: "07 May, 2024",
      p1: "94 Constituencies",
      p2: "11 States",
    },
    {
      phase: "Phase 4",
      electionDate: "13 May, 2024",
      p1: "96 Constituencies",
      p2: "10 States",
    },
    {
      phase: "Phase 5",
      electionDate: "20 May, 2024",
      p1: "49 Constituencies",
      p2: "8 States",
    },
    {
      phase: "Phase 6",
      electionDate: "25 May, 2024",
      p1: "58 Constituencies",
      p2: "8 States",
    },
    {
      phase: "Phase 7",
      electionDate: "01 June, 2024",
      p1: "58 Constituencies",
      p2: "8 States",
    },
    // Add more state election data here
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen py-10 ">
      <h1 className="text-center text-[#253237] mt-2 text-4xl mb-6 font-medium">General Election 2024</h1>
      <h1 className="text-2xl font-bold text-center mb-8">Schedule</h1>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-wrap justify-between gap-5 ">
          {electionData.map((election, index) => (
            <StateElectionCard
              key={index}
              phase={election.phase}
              electionDate={election.electionDate}
              p1={election.p1}
              p2={election.p2}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <span className="text-4xl max-sm:text-xl mt-16 mb-8">
          Date of Counting - 4 June 2024
        </span>
      </div>
    </div>
  );
}

export default ElectionSchedule;
