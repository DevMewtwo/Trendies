import React from 'react';
import { Radar } from 'react-chartjs-2';

const data:any = {
  labels: ['MMM', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO', 'KO', 'DOW', 'GS', 'HD', 'HON', 'IBM', 
  'INTC', 'JNJ', 'JPM', 'MCD', 'MSFT', 'MRK', 'NKE', 'PG', 'CRM', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS'],
  datasets: [
    {
      label: 'Trending',
      data: [12, 39, 23, 15, 22, 43, 47, 20, 19, 33, 15, 25, 73, 35, 22, 29, 63, 15, 22, 43, 47, 30, 19, 33, 15, 42, 43, 55, 38, 19],
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
    },
  ],
};

const options:any = {
  scales: {
    ticks: {
        beginAtZero: true,
        backdropColor:'rgba(255, 99, 132, 0.3)'
    },
  },
};

const GraphLeft = () => (
  <>
    <div className='header'>
      <h1 className='title'>Dow</h1>
    </div>
    <Radar data={data} options={options} type={undefined}/>
  </>
)


export default GraphLeft;