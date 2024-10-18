import PropTypes from 'prop-types';

const VoterTable = ({ voters }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 overflow-auto">
      <h3 className="text-xl font-semibold mb-4">Voter Participation</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Voted For</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{voter?._id}</td>
              <td className="py-2">{voter?.name}</td>
              <td className="py-2">{voter?.votedFor?.party}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


VoterTable.propTypes = {
  voters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      votedFor: PropTypes.shape({
        party: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default VoterTable;
