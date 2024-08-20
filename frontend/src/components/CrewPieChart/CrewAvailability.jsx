import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

Chart.register(ArcElement);

export const CrewAvailability = () => {
  const [crew, setCrew] = useState([]);
  // const [crewAvailable, setCrewAvailable] = useState([]);
  // const [crewUnavailable, setCrewUnavailable] = useState([]);
  // const [crewPto, setCrewPto] = useState([]);
  // const [isLOaded, setIsLOaded] = useState(false);

  const [pieChartData, setPieChartData] = useState({
    datasets: [
      {
        data: [1, 4, 3],
        backgroundColor: ['#e7a238', '#359471', '#d93728'],
        display: true,
        borderColor: 'transparent',
      },
    ],
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const [activeTab, setActiveTab] = useState(true);

  const splitCrew = (crewArr) => {
    const uCrew = [];
    const aCrew = [];
    const pCrew = [];

    crewArr.forEach((item) => {
      item.flightHours.available === 'Unavailable' && uCrew.push(item);
      // setCrewUnavailable([...crewUnavailable, { item }]);
      item.flightHours.available === 'PTO' && pCrew.push(item);
      // setCrewPto([...crewPto, { item }]);
      item.flightHours.available === 'available' && aCrew.push(item);
      // setCrewAvailable([...crewAvailable, { item }]);
    });

    // setCrewUnavailable(uCrew);
    // setCrewPto(pCrew);
    // setCrewAvailable(aCrew);

    setPieChartData({
      datasets: [
        {
          data: [aCrew.length, uCrew.length, pCrew.length],
          backgroundColor: ['#e7a238', '#359471', '#d93728'],
          display: true,
          borderColor: 'transparent',
        },
      ],
    });
  };

  const {
    data: crewData,
    isLoading: crewLoading,
    isError: crewError,
  } = useQuery({
    queryKey: ['crew'],
    queryFn: () => axios.get('/api/v1/crew/'),
    onSuccess: (data) => setCrew(data.data.data.CrewMembers),
  });

  // console.log(`Pie Chart ${crew}`);

  useEffect(() => {
    splitCrew(crew);
  }, [crew]);

  return (
    <div className="origin-box">
      <h3 className="bold-text-pie-chart">Crew Availability</h3>
      <div className="wrapper-flex">
        <div className="pie-chart__box">
          <div className="canvas-pie-chart">
            <Doughnut
              className="canvas-chart"
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
                rotation: -90,
                circumference: 180,
                cutout: '85%',
                maintainAspectRatio: true,
                responsive: true,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '70%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <div className="pie-chart__box-total">
              Total Crew{' '}
              <p className="pie-chart__box-total-number">{crew.length}</p>
            </div>
          </div>
          <div className="pie-chart__box__colors">
            <div className="pie-chart__box__colors-box">
              <div className="pie-chart__box__colors-green"></div>
              <p>Available</p>
            </div>
            <div className="pie-chart__box__colors-box">
              <div className="pie-chart__box__colors-orange"></div>
              <p>Unavailable</p>
            </div>
            <div className="pie-chart__box__colors-box">
              <div className="pie-chart__box__colors-red"></div>
              <p>PTO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
