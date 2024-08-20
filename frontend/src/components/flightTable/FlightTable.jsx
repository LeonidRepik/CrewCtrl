import { useEffect, useState } from 'react';
import FlightItem from './FlightItem';
import Tabbed from './Tabbed';
// import CrewMember from './CrewMember';

function FlightTable({ expand }) {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(
    function () {
      async function fetchFlights() {
        try {
          setIsLoading(true);
          const res = await fetch('/api/v1/flights');
          let data = await res.json();
          //fake data for testing
          
          data = {
            "status": "success",
            "data": {
                "flights": [
                    {
                        "_id": "1",
                        "flightNumber": "BA123",
                        "aircraftType": "Boeing 747",
                        "from": "LHR",
                        "to": "JFK",
                        "weather": "Clear",
                        "dateCreated": "2023-03-01T00:00:00.000Z",
                        "departure": "2023-03-01T00:00:00.000Z",
                        "arriving": "2023-03-01T01:00:00.000Z",
                        "actuallArrive": "2023-03-01T01:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "John Smith"
                            },
                            {
                                "copilot": "Jane Johnson"
                            },
                            {
                                "flightAttendant": "Robert Brown"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "1"
                            }
                        ],
                        
                    },
                    {
                        "_id": "2",
                        "flightNumber": "DL456",
                        "aircraftType": "Airbus A380",
                        "from": "LAX",
                        "to": "NRT",
                        "weather": "Rainy",
                        "dateCreated": "2023-03-01T02:00:00.000Z",
                        "departure": "2023-03-01T02:00:00.000Z",
                        "arriving": "2023-03-01T03:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Emily Miller"
                            },
                            {
                                "copilot": "Frank Thomas"
                            },
                            {
                                "flightAttendant": "Grace Anderson"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "2"
                            }
                        ]
                    },
                    {
                        "_id": "3",
                        "flightNumber": "AF789",
                        "aircraftType": "Boeing 777",
                        "from": "CDG",
                        "to": "SFO",
                        "weather": "Sunny",
                        "dateCreated": "2023-03-01T04:00:00.000Z",
                        "departure": "2023-03-01T04:00:00.000Z",
                        "arriving": "2023-03-01T05:00:00.000Z",
                        "actuallArrive":"2023-03-01T05:00:00.000Z",
                        "crewMembers": [],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "3"
                            }
                        ]
                        
                    },
                    {
                        "_id": "4",
                        "flightNumber": "LH012",
                        "aircraftType": "Airbus A350",
                        "from": "FRA",
                        "to": "PEK",
                        "weather": "Cloudy",
                        "dateCreated": "2023-03-01T06:00:00.000Z",
                        "departure": "2023-03-01T06:00:00.000Z",
                        "arriving": "2023-03-01T07:00:00.000Z",
                        "actuallArrive":"2023-03-01T07:00:00.000Z",
                        "cancel": true,
                        "crewMembers": [
                            {
                                "captain": "Henry Martinez"
                            },
                            {
                                "copilot": "Ivy Taylor"
                            },
                            {
                                "flightAttendant": "Jack White"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "4"
                            }
                        ]
                    },
                    {
                        "_id": "5",
                        "flightNumber": "EK345",
                        "aircraftType": "Boeing 787",
                        "from": "DXB",
                        "to": "SYD",
                        "weather": "Windy",
                        "dateCreated": "2023-03-01T08:00:00.000Z",
                        "departure": "2023-03-01T08:00:00.000Z",
                        "arriving": "2023-03-01T09:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Alice Anderson"
                            },
                            {
                                "copilot": "Bob Brown"
                            },
                            {
                                "flightAttendant": "Charlie Clark"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "5"
                            }
                        ],
                        condition: "cancel"
                    },
                    {
                        "_id": "6",
                        "flightNumber": "AA789",
                        "aircraftType": "Boeing 737",
                        "from": "MIA",
                        "to": "LAX",
                        "weather": "Sunny",
                        "dateCreated": "2023-03-01T10:00:00.000Z",
                        "departure": "2023-03-01T10:00:00.000Z",
                        "arriving": "2023-03-01T11:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "George Washington"
                            },
                            {
                                "copilot": "Thomas Jefferson"
                            },
                            {
                                "flightAttendant": "Abraham Lincoln"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "6"
                            }
                        ]
                    },
                    {
                        "_id": "7",
                        "flightNumber": "UA123",
                        "aircraftType": "Airbus A320",
                        "from": "ORD",
                        "to": "EWR",
                        "weather": "Cloudy",
                        "dateCreated": "2023-03-01T12:00:00.000Z",
                        "departure": "2023-03-01T12:00:00.000Z",
                        "arriving": "2023-03-01T13:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Theodore Roosevelt"
                            },
                            {
                                "copilot": "Franklin Roosevelt"
                            },
                            {
                                "flightAttendant": "John Kennedy"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "7"
                            }
                        ]
                    },
                    {
                        "_id": "8",
                        "flightNumber": "DL456",
                        "aircraftType": "Boeing 767",
                        "from": "ATL",
                        "to": "JFK",
                        "weather": "Rainy",
                        "dateCreated": "2023-03-01T14:00:00.000Z",
                        "departure": "2023-03-01T14:00:00.000Z",
                        "arriving": "2023-03-01T15:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Lyndon Johnson"
                            },
                            {
                                "copilot": "Richard Nixon"
                            },
                            {
                                "flightAttendant": "Ronald Reagan"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "8"
                            }
                        ]
                    },
                    {
                        "_id": "9",
                        "flightNumber": "BA789",
                        "aircraftType": "Boeing 777",
                        "from": "LHR",
                        "to": "CDG",
                        "weather": "Clear",
                        "dateCreated": "2023-03-01T16:00:00.000Z",
                        "departure": "2023-03-01T16:00:00.000Z",
                        "arriving": "2023-03-01T17:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "George Bush"
                            },
                            {
                                "copilot": "Bill Clinton"
                            },
                            {
                                "flightAttendant": "Barack Obama"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "9"
                            }
                        ],
                        "cancel": true
                    },
                    {
                        "_id": "10",
                        "flightNumber": "AF123",
                        "aircraftType": "Airbus A380",
                        "from": "CDG",
                        "to": "LHR",
                        "weather": "Windy",
                        "dateCreated": "2023-03-01T18:00:00.000Z",
                        "departure": "2023-03-01T18:00:00.000Z",
                        "arriving": "2023-03-01T19:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Donald Trump"
                            },
                            {
                                "copilot": "Joe Biden"
                            },
                            {
                                "flightAttendant": "Kamala Harris"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "10"
                            }
                        ],
                        "cancel": true
                    },
                    {
                        "_id": "11",
                        "flightNumber": "LH456",
                        "aircraftType": "Airbus A350",
                        "from": "FRA",
                        "to": "MUC",
                        "weather": "Sunny",
                        "dateCreated": "2023-03-01T20:00:00.000Z",
                        "departure": "2023-03-01T20:00:00.000Z",
                        "arriving": "2023-03-01T21:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Angela Merkel"
                            },
                            {
                                "copilot": "Emmanuel Macron"
                            },
                            {
                                "flightAttendant": "Boris Johnson"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "11"
                            }
                        ]
                    },
                    {
                        "_id": "12",
                        "flightNumber": "EK789",
                        "aircraftType": "Boeing 787",
                        "from": "DXB",
                        "to": "SYD",
                        "weather": "Rainy",
                        "dateCreated": "2023-03-01T22:00:00.000Z",
                        "departure": "2023-03-01T22:00:00.000Z",
                        "arriving": "2023-03-01T23:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Vladimir Putin"
                            },
                            {
                                "copilot": "Xi Jinping"
                            },
                            {
                                "flightAttendant": "Narendra Modi"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "12"
                            }
                        ]
                    },
                    {
                        "_id": "13",
                        "flightNumber": "QF789",
                        "aircraftType": "Boeing 737",
                        "from": "SYD",
                        "to": "MEL",
                        "weather": "Sunny",
                        "dateCreated": "2023-03-02T00:00:00.000Z",
                        "departure": "2023-03-02T00:00:00.000Z",
                        "arriving": "2023-03-02T01:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Scott Morrison"
                            },
                            {
                                "copilot": "Jacinda Ardern"
                            },
                            {
                                "flightAttendant": "Justin Trudeau"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "13"
                            }
                        ]
                    },
                    {
                        "_id": "14",
                        "flightNumber": "SQ123",
                        "aircraftType": "Airbus A320",
                        "from": "SIN",
                        "to": "KUL",
                        "weather": "Cloudy",
                        "dateCreated": "2023-03-02T02:00:00.000Z",
                        "departure": "2023-03-02T02:00:00.000Z",
                        "arriving": "2023-03-02T03:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Lee Hsien Loong"
                            },
                            {
                                "copilot": "Muhyiddin Yassin"
                            },
                            {
                                "flightAttendant": "Joko Widodo"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "14"
                            }
                        ]
                    },
                    {
                        "_id": "15",
                        "flightNumber": "NH456",
                        "aircraftType": "Boeing 767",
                        "from": "HND",
                        "to": "KIX",
                        "weather": "Rainy",
                        "dateCreated": "2023-03-02T04:00:00.000Z",
                        "departure": "2023-03-02T04:00:00.000Z",
                        "arriving": "2023-03-02T05:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Yoshihide Suga"
                            },
                            {
                                "copilot": "Moon Jae-in"
                            },
                            {
                                "flightAttendant": "Rodrigo Duterte"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "15"
                            }
                        ]
                    },
                    {
                        "_id": "16",
                        "flightNumber": "EK789",
                        "aircraftType": "Boeing 777",
                        "from": "DXB",
                        "to": "DOH",
                        "weather": "Clear",
                        "dateCreated": "2023-03-02T06:00:00.000Z",
                        "departure": "2023-03-02T06:00:00.000Z",
                        "arriving": "2023-03-02T07:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Mohammed bin Rashid Al Maktoum"
                            },
                            {
                                "copilot": "Tamim bin Hamad Al Thani"
                            },
                            {
                                "flightAttendant": "Salman of Saudi Arabia"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "16"
                            }
                        ]
                    },
                    {
                        "_id": "17",
                        "flightNumber": "TK123",
                        "aircraftType": "Airbus A380",
                        "from": "IST",
                        "to": "ATH",
                        "weather": "Windy",
                        "dateCreated": "2023-03-02T08:00:00.000Z",
                        "departure": "2023-03-02T08:00:00.000Z",
                        "arriving": "2023-03-02T09:00:00.000Z",
                        "crewMembers": [
                            {
                                "captain": "Recep Tayyip Erdoğan"
                            },
                            {
                                "copilot": "Kyriakos Mitsotakis"
                            },
                            {
                                "flightAttendant": "Boyko Borissov"
                            }
                        ],
                        "specialRequirements": [
                            {
                                "LVP": false,
                                "PBN": true,
                                "_id": "17"
                            }
                        ]
                    }
                ]
            }
        }
          

          let refinedData = data.data.flights.map((flight) => {
            const currentTime = new Date();
            const departureTime = new Date(flight.departure);
            const arrivingTime = new Date(flight.arriving);
            
            let condition;

            
            if (flight.cancel || flight.condition === "cancel") {
              condition = 'cancel';
          } else if (currentTime >= departureTime && currentTime <= arrivingTime) {
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
          //   if an activeTab is selected use its value to filter
          if (activeTab !== 'all') {
            const filteredData = refinedData.filter(
              (flight) => flight.condition === activeTab
            );
            setFlights(filteredData);
          } else {
            setFlights(refinedData);
          }

          // console.log(refinedData);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchFlights();
    },
    [activeTab]
  );
  //use expand props to decide whether to show the full flights list
  let flightlist = expand ? flights : flights.slice(0, 2);

  return (
    <div className="flightTable">
      <div className="flightTable__frame">
        <div className="flightTable__frame__title">
          <h3 className="flightTable__title">Flight tables</h3>{' '}
          <span className="flightTable__count">{flights.length}</span>
        </div>

        <Tabbed activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <ul className="flightTable__list">
        {/* map method return an array of FlightItem */}
        {flightlist.map((flight) => (
          <FlightItem flight={flight} key={flight.flightNumber} />
        ))}
      </ul>
    </div>
  );
}

export default FlightTable;
