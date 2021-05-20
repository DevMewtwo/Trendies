import React from 'react';
import '../App.css';
import { Scatter } from 'react-chartjs-2';

const rand = () => Math.round(Math.random() * 20 - 10);

const data:any = {
  datasets: [
    {
      label: 'A dataset',
      data: [
        2,5,1,0,8,7,5,7,2
      ],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
  labels: [0, 1, 4, 9, 5, 2, 7, 6, 3]
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'hour'
            }
        }
    }
  },
};

const GraphLarge = () => (
  <>
    <div className='header'>
      <h1 className='title'>Timeline</h1>
    </div>
    <Scatter data={data} /* options={options} */ type={undefined} height={0} />
  </>
);

export default GraphLarge;