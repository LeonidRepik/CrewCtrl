import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import TabsForBar from './TabsForBar';
import '../../../SASS/components/_barChart.scss';

let labels = [];
for (let i = 0; i <= 24; i++) {
  let time = i < 10 ? `0${i}:00` : `${i}:00`;
  labels.push(time);
}
function BarChart() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [counts, setCounts] = useState();

  useEffect(
    function () {
      async function fetchFlights() {
        try {
          setIsLoading(true);
          const res = await fetch('/api/v1/flights');
          let data = await res.json();
          // data = {
          //   status: 'success',
          //   data: {
          //     flights: [
          //       {
          //         _id: '1',
          //         flightNumber: 'BA123',
          //         aircraftType: 'Boeing 747',
          //         from: 'LHR',
          //         to: 'JFK',
          //         weather: 'Clear',
          //         dateCreated: '2023-03-01T00:00:00.000Z',
          //         departure: '2023-03-01T00:00:00.000Z',
          //         arriving: '2023-03-01T01:00:00.000Z',
          //         actuallArrive: '2023-03-01T01:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'John Smith',
          //           },
          //           {
          //             copilot: 'Jane Johnson',
          //           },
          //           {
          //             flightAttendant: 'Robert Brown',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '1',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '2',
          //         flightNumber: 'DL456',
          //         aircraftType: 'Airbus A380',
          //         from: 'LAX',
          //         to: 'NRT',
          //         weather: 'Rainy',
          //         dateCreated: '2023-03-01T02:00:00.000Z',
          //         departure: '2023-03-01T02:00:00.000Z',
          //         arriving: '2023-03-01T03:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Emily Miller',
          //           },
          //           {
          //             copilot: 'Frank Thomas',
          //           },
          //           {
          //             flightAttendant: 'Grace Anderson',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '2',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '3',
          //         flightNumber: 'AF789',
          //         aircraftType: 'Boeing 777',
          //         from: 'CDG',
          //         to: 'SFO',
          //         weather: 'Sunny',
          //         dateCreated: '2023-03-01T04:00:00.000Z',
          //         departure: '2023-03-01T04:00:00.000Z',
          //         arriving: '2023-03-01T05:00:00.000Z',
          //         actuallArrive: '2023-03-01T05:00:00.000Z',
          //         crewMembers: [],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '3',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '4',
          //         flightNumber: 'LH012',
          //         aircraftType: 'Airbus A350',
          //         from: 'FRA',
          //         to: 'PEK',
          //         weather: 'Cloudy',
          //         dateCreated: '2023-03-01T06:00:00.000Z',
          //         departure: '2023-03-01T06:00:00.000Z',
          //         arriving: '2023-03-01T07:00:00.000Z',
          //         actuallArrive: '2023-03-01T07:00:00.000Z',
          //         cancel: true,
          //         crewMembers: [
          //           {
          //             captain: 'Henry Martinez',
          //           },
          //           {
          //             copilot: 'Ivy Taylor',
          //           },
          //           {
          //             flightAttendant: 'Jack White',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '4',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '5',
          //         flightNumber: 'EK345',
          //         aircraftType: 'Boeing 787',
          //         from: 'DXB',
          //         to: 'SYD',
          //         weather: 'Windy',
          //         dateCreated: '2023-03-01T08:00:00.000Z',
          //         departure: '2023-03-01T08:00:00.000Z',
          //         arriving: '2023-03-01T09:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Alice Anderson',
          //           },
          //           {
          //             copilot: 'Bob Brown',
          //           },
          //           {
          //             flightAttendant: 'Charlie Clark',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '5',
          //           },
          //         ],
          //         condition: 'cancel',
          //       },
          //       {
          //         _id: '6',
          //         flightNumber: 'AA789',
          //         aircraftType: 'Boeing 737',
          //         from: 'MIA',
          //         to: 'LAX',
          //         weather: 'Sunny',
          //         dateCreated: '2023-03-01T10:00:00.000Z',
          //         departure: '2023-03-01T10:00:00.000Z',
          //         arriving: '2023-03-01T11:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'George Washington',
          //           },
          //           {
          //             copilot: 'Thomas Jefferson',
          //           },
          //           {
          //             flightAttendant: 'Abraham Lincoln',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '6',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '7',
          //         flightNumber: 'UA123',
          //         aircraftType: 'Airbus A320',
          //         from: 'ORD',
          //         to: 'EWR',
          //         weather: 'Cloudy',
          //         dateCreated: '2023-03-01T12:00:00.000Z',
          //         departure: '2023-03-01T12:00:00.000Z',
          //         arriving: '2023-03-01T13:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Theodore Roosevelt',
          //           },
          //           {
          //             copilot: 'Franklin Roosevelt',
          //           },
          //           {
          //             flightAttendant: 'John Kennedy',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '7',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '8',
          //         flightNumber: 'DL456',
          //         aircraftType: 'Boeing 767',
          //         from: 'ATL',
          //         to: 'JFK',
          //         weather: 'Rainy',
          //         dateCreated: '2023-03-01T14:00:00.000Z',
          //         departure: '2023-03-01T14:00:00.000Z',
          //         arriving: '2023-03-01T15:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Lyndon Johnson',
          //           },
          //           {
          //             copilot: 'Richard Nixon',
          //           },
          //           {
          //             flightAttendant: 'Ronald Reagan',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '8',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '9',
          //         flightNumber: 'BA789',
          //         aircraftType: 'Boeing 777',
          //         from: 'LHR',
          //         to: 'CDG',
          //         weather: 'Clear',
          //         dateCreated: '2023-03-01T16:00:00.000Z',
          //         departure: '2023-03-01T16:00:00.000Z',
          //         arriving: '2023-03-01T17:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'George Bush',
          //           },
          //           {
          //             copilot: 'Bill Clinton',
          //           },
          //           {
          //             flightAttendant: 'Barack Obama',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '9',
          //           },
          //         ],
          //         cancel: true,
          //       },
          //       {
          //         _id: '10',
          //         flightNumber: 'AF123',
          //         aircraftType: 'Airbus A380',
          //         from: 'CDG',
          //         to: 'LHR',
          //         weather: 'Windy',
          //         dateCreated: '2023-03-01T18:00:00.000Z',
          //         departure: '2023-03-01T18:00:00.000Z',
          //         arriving: '2023-03-01T19:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Donald Trump',
          //           },
          //           {
          //             copilot: 'Joe Biden',
          //           },
          //           {
          //             flightAttendant: 'Kamala Harris',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '10',
          //           },
          //         ],
          //         cancel: true,
          //       },
          //       {
          //         _id: '11',
          //         flightNumber: 'LH456',
          //         aircraftType: 'Airbus A350',
          //         from: 'FRA',
          //         to: 'MUC',
          //         weather: 'Sunny',
          //         dateCreated: '2023-03-01T20:00:00.000Z',
          //         departure: '2023-03-01T20:00:00.000Z',
          //         arriving: '2023-03-01T21:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Angela Merkel',
          //           },
          //           {
          //             copilot: 'Emmanuel Macron',
          //           },
          //           {
          //             flightAttendant: 'Boris Johnson',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '11',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '12',
          //         flightNumber: 'EK789',
          //         aircraftType: 'Boeing 787',
          //         from: 'DXB',
          //         to: 'SYD',
          //         weather: 'Rainy',
          //         dateCreated: '2023-03-01T22:00:00.000Z',
          //         departure: '2023-03-01T22:00:00.000Z',
          //         arriving: '2023-03-01T23:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Vladimir Putin',
          //           },
          //           {
          //             copilot: 'Xi Jinping',
          //           },
          //           {
          //             flightAttendant: 'Narendra Modi',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '12',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '13',
          //         flightNumber: 'QF789',
          //         aircraftType: 'Boeing 737',
          //         from: 'SYD',
          //         to: 'MEL',
          //         weather: 'Sunny',
          //         dateCreated: '2023-03-02T00:00:00.000Z',
          //         departure: '2023-03-02T00:00:00.000Z',
          //         arriving: '2023-03-02T01:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Scott Morrison',
          //           },
          //           {
          //             copilot: 'Jacinda Ardern',
          //           },
          //           {
          //             flightAttendant: 'Justin Trudeau',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '13',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '14',
          //         flightNumber: 'SQ123',
          //         aircraftType: 'Airbus A320',
          //         from: 'SIN',
          //         to: 'KUL',
          //         weather: 'Cloudy',
          //         dateCreated: '2023-03-02T02:00:00.000Z',
          //         departure: '2023-03-02T02:00:00.000Z',
          //         arriving: '2023-03-02T03:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Lee Hsien Loong',
          //           },
          //           {
          //             copilot: 'Muhyiddin Yassin',
          //           },
          //           {
          //             flightAttendant: 'Joko Widodo',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '14',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '15',
          //         flightNumber: 'NH456',
          //         aircraftType: 'Boeing 767',
          //         from: 'HND',
          //         to: 'KIX',
          //         weather: 'Rainy',
          //         dateCreated: '2023-03-02T04:00:00.000Z',
          //         departure: '2023-03-02T04:00:00.000Z',
          //         arriving: '2023-03-02T05:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Yoshihide Suga',
          //           },
          //           {
          //             copilot: 'Moon Jae-in',
          //           },
          //           {
          //             flightAttendant: 'Rodrigo Duterte',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '15',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '16',
          //         flightNumber: 'EK789',
          //         aircraftType: 'Boeing 777',
          //         from: 'DXB',
          //         to: 'DOH',
          //         weather: 'Clear',
          //         dateCreated: '2023-03-02T06:00:00.000Z',
          //         departure: '2023-03-02T06:00:00.000Z',
          //         arriving: '2023-03-02T07:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Mohammed bin Rashid Al Maktoum',
          //           },
          //           {
          //             copilot: 'Tamim bin Hamad Al Thani',
          //           },
          //           {
          //             flightAttendant: 'Salman of Saudi Arabia',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '16',
          //           },
          //         ],
          //       },
          //       {
          //         _id: '17',
          //         flightNumber: 'TK123',
          //         aircraftType: 'Airbus A380',
          //         from: 'IST',
          //         to: 'ATH',
          //         weather: 'Windy',
          //         dateCreated: '2023-03-02T08:00:00.000Z',
          //         departure: '2023-03-02T08:00:00.000Z',
          //         arriving: '2023-03-02T09:00:00.000Z',
          //         crewMembers: [
          //           {
          //             captain: 'Recep Tayyip Erdoğan',
          //           },
          //           {
          //             copilot: 'Kyriakos Mitsotakis',
          //           },
          //           {
          //             flightAttendant: 'Boyko Borissov',
          //           },
          //         ],
          //         specialRequirements: [
          //           {
          //             LVP: false,
          //             PBN: true,
          //             _id: '17',
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // };
          //style={{ height: '65vw', width: '80vw', overflow: 'auto' }}
          //style={{ height: '16.25rem', width: '20rem', overflow: 'auto' }} // 65vw and 80vw respectively

          //calculate the condition...
          let refinedData = data.data.flights.map((flight) => {
            const currentTime = new Date();
            const departureTime = new Date(flight.departure);
            const arrivingTime = new Date(flight.arriving);
            let condition;

            if (flight.cancel || flight.condition === 'cancel') {
              condition = 'cancel';
            } else if (
              currentTime >= departureTime &&
              currentTime <= arrivingTime
            ) {
              condition = 'in progress';
            } else if (flight.actuallArrive) {
              condition = 'done';
            } else if (currentTime > arrivingTime && !flight.actuallArrive) {
              condition = 'delay';
            } else {
              condition = 'pending';
            }
            return {
              ...flight,
              condition,
            };
          });

          //tabs' logic
          if (activeTab !== 'all') {
            refinedData = refinedData.filter(
              //if the value of the tab match the value of the flight.conditon then put the flight into refined
              (flight) => flight.condition === activeTab
            );
          }

          //use an extra local variable to solve the rednering problem caused by async execution
          let countsLocal = new Array(24).fill(0);
          // increment for the corresoponding hours
          for (let flight of refinedData) {
            //get the value of hour
            let departureHour = new Date(flight.departure).getHours();
            countsLocal[departureHour]++;
          }

          setFlights(refinedData);
          setCounts(countsLocal);
        } catch (err) {
          err.message;
        } finally {
          setIsLoading(false);
        }
      }
      fetchFlights();
    },
    [activeTab]
  );

  return (
    <div className="bar-chart__box">
      <div className="bar-chart__box__inner">
        <div className="bar-chart__box__tabsBox">
          <h1 className="bar-chart__title">{'Flight Information'}</h1>
          <TabsForBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="bar-chart__boxContainer">
          <div
            className="bar-chart__barGraph"
            // style={{ height: '65vw', width: '900px' }}
          >
            <Bar
              data={{
                labels: labels,
                datasets: [
                  {
                    label: '',
                    data: counts,
                    barPercentage: 0.3,
                    categoryPercentage: 0.3,
                    backgroundColor: '#336999',
                    inflateAmount: 'auto',
                  },
                ],
              }}
              //chart customizations
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },

                maintainAspectRatio: false,
                //axis
                scales: {
                  //y-axis
                  y: {
                    beginAtZero: true,

                    ticks: {
                      max: 200,
                      //(value of tick, index of tick, and values)
                      callback: function (value, index, values) {
                        //display integers only
                        if (Math.floor(value) === value) {
                          return value;
                        }
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      maxRotation: 0,
                      minRotation: 0,
                      autoSkip: false,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
