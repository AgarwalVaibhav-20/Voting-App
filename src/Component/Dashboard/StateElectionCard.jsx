function StateElectionCard({ phase, electionDate, p1, p2 }) {
  return (
    <div className="max-w-md mx-auto p-6 md:p-8 bg-white shadow-lg rounded-lg border transition-transform duration-300 hover:scale-105 border-b-0">
      <h3 className="text-xl md:text-2xl font-semibold text-center mb-4 text-[#ff6700]">
        {phase}
      </h3>
      <p className="text-[#202020] text-base md:text-lg mb-2">
        <strong className="font-bold">Election Date: </strong>
        {electionDate}
      </p>
      <p className="text-[#0d1321] text-sm md:text-base mb-2 font-light">{p1}</p>
      <p className="text-[#0d1321] text-sm md:text-base font-light">{p2}</p>
    </div>
  );
}

export default StateElectionCard;
