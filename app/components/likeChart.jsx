import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function LikeChart() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [likechart, setLikeChartData] = useState([]);
console.log(likechart);
  useEffect(() => { 
    if (token) {
      fetchLikeChart();
    }
  }, [token]);

  const fetchLikeChart = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/likecount`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLikeChartData(data.likecount);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Failed to fetch data',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    }
  };
  const data = {
    labels: likechart.map(car => car.car.c_name),
    datasets: [
        {
            label: 'จำนวนชอบ',
            data: likechart.map(car => car.count),
            backgroundColor: '#d000ff',
            borderColor: '#d000ff',
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'white',
                font: {
                    size: 14,
                    family: "'Kanit', sans-serif",
                }
            }
        },
        title: {
            display: true,
            text: 'Car hot',
            color: 'white',
            font: {
                size: 30,
                family: "'Kanit', sans-serif",
            }
        },
    },
    scales: {
        x: {
            ticks: {
                color: 'white',
                font: {
                    family: "'Kanit', sans-serif",
                }
            },
        },
    }
}; 

  // ตรวจสอบว่ามีข้อมูลหรือไม่
  if (likechart.length === 0) {
    return <div>Loading...</div>; // หรือสามารถแสดงข้อความอื่นๆ ได้
  }

  return <Bar options={options} data={data} />;
}
