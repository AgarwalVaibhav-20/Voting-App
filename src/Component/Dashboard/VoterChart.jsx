import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';


ChartJS.register(ArcElement, Tooltip, Legend);

const VoteChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ['orange', 'blue', 'red', 'green', 'purple','#606c38','#00b4d8','#e63946', 'black' ,'#c9ada7', 'gray'],
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
  };

  return <Doughnut data={chartData} options={options} />;
};

export default VoteChart;
