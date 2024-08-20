import PropTypes from 'prop-types';

import CrewMemberLatestFlightItem from './CrewMemberLatestFlightItem';

import { useEffect, useState } from 'react';
import '../../../SASS/components/_crewMemberLatestFlight.scss';

function CrewMemberLatestFlight({ expand, ticket }) {
  //////important the flight data that is passed into this component should came from crew member we're using flight list as placeholder now
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const [isMobilePhone, setIsMobile] = useState(window.innerWidth);

  useEffect(function() {
    setIsMobile(window.innerWidth <= 430);
  }, [])

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 430);
  };
  

  window.addEventListener('resize', handleResize);

  useEffect(function () {
    async function fetchFlights() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/v1/flights');
        let data = await res.json();

        setFlights(data.data.flights.reverse());
        // console.log(flights);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFlights();
  }, []);
  //   useEffect(() => {
  //     console.log(flights);
  //   }, [flights]);

  let flightlist = expand ? flights : flights.slice(0, 5);

  return (
    <div className="flightTableForCrew">
      <div className="flightTableForCrew__container">
        <div className="flightTableForCrew__frame">
          <div className="flightTableForCrew__frame__title">
            {/* Here I need to add the header of the bug batch */}
            {isMobilePhone && (
              <h3 className="flightTableForCrew__title">
                Recent Flights Schedule
              </h3>
            )}
            {/* <span className="flightTableForCrew__count">
              {'('}
              {flights.length}
              {')'}
            </span> */}
          </div>
        </div>
        <div className="flightTableForCrew__table">
          <ul className="flightTableForCrew__list">
            {!ticket && <li className='FlightTableHeader'>
              <div className='first'>Flight</div>
              <div>Date</div>
              <div>Time</div>
              <div>Aircraft Time</div>
              <div>Restrictions</div>
              <div>Actions</div>
            </li>}
            {/* map method return an array of FlightItem */}
            {flightlist.map((flight) => (
              <CrewMemberLatestFlightItem
                flight={flight}
                key={flight._id}
                isMobilePhone={isMobilePhone}
                ticket={ticket}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
//2tabs to toggle flights with or without crew

//3

export default CrewMemberLatestFlight;
