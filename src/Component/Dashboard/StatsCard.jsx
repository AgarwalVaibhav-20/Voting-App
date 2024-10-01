import PropTypes from 'prop-types';
const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // or PropTypes.number.isRequired, depending on the type of value
};

export default StatsCard;
 