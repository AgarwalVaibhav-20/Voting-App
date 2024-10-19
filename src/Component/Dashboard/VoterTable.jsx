import PropTypes from 'prop-types';
import BJPLOGO from "../../assets/BJPLOGO.png";
import INCLOGO from "../../assets//INCLOGO.png";
import SPALOGO from "../../assets/SPALOGO.png";
import AAPLOGO from "../../assets/AAPLOGO.png";
import aitc from "../../assets/aitc.png";
import dmk from "../../assets/dmk.png";
import tdp from "../../assets/tdp.png";
import jdu from '../../assets/jdu.png';
import shsubt from '../../assets/shsubt.png';
import ncpsp from '../../assets/ncpsp.png'
import SHS from '../../assets/ssh.png'

const VoterTable = ({ voters }) => {

  const parties = {
    'BJP': BJPLOGO,
    'INC': INCLOGO,
    'SPA': SPALOGO,
    'AAP': AAPLOGO,
    'AITC': aitc,
    'DMK': dmk,
    'TDP': tdp,
    'JD(U)': jdu,
    'SHSUBT': shsubt,
    'NCPSP': ncpsp,
    'SHS': SHS,
  }

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
              <td className="py-2 flex gap-1 items-center justify-center">{voter?.votedFor?.party}
                <img
                  src={parties[voter?.votedFor?.party]}
                  alt={voter?.votedFor?.party}
                  className="w-8 h-8 max-sm:w-12 max-sm:h-12 max-sm:mb-2 max-sm:mr-3 rounded-full object-cover shadow-lg min-[0px]:max-md:hidden"
                />
              </td>
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
