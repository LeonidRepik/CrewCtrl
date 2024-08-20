// To render the Upcoming flights on the dashboard, call the UpcomningFlights component with a prop named crew={true}
// To render the Upcoming flights with no crew on the Reservation, call the UpcomningFlights component with a prop named crew={false}

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FlightCard from '../components/FlightCard';

export default function UpcomingFlights({ crew }) {
  useEffect(() => {
    fetch('/api/v1/flights')
      .then((res) => res.json())
      .then((data) => {
        const filteredFlights = flightFilter(data.data.flights);
        console.log(filteredFlights)
        setFlights(filteredFlights);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const flightFilter = (flights) => {
    const currentTime = new Date();
    const fourHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    return flights.filter((flight) => {
      if (flight.departure && typeof flight.departure === 'string' && flight.departure.trim() !== '') {
        const departureParts = flight.departure.split(/[-T:]/);
        const departureDate = new Date(
          departureParts[0],
          departureParts[1] - 1,
          departureParts[2],
          departureParts[3],
          departureParts[4],
          departureParts[5].split('.')[0] 
        );
        return departureDate >= currentTime && departureDate < fourHoursLater;
      } else {
        return false;
      }
    });
  };

  const [flights, setFlights] = useState([]);

  return (
    <div>
      <div className='upcoming__flights__title'>
        <h2>{crew ? 'Upcoming Flights' : 'Upcoming Flights with no crew'}</h2>
        <p>(next 4hrs)</p>
      </div>
      <div className="upcoming__flights">
        {flights.length > 0 ? (
          flights.map((flight, index) => {
            if (crew){
              return (
                <FlightCard key={index} flight={flight} crew={crew}/>
              );
            } else {
              if (flight.crewMembers[0].member1 === '' || flight.crewMembers[0].member2 === ''){
                return (
                  <FlightCard key={index} flight={flight} crew={crew}/>
                );
              }
            } 
          }
        )) : (
          <p>No upcoming flights</p>
        )}
      </div>
    </div>
  );
}

UpcomingFlights.propTypes = {
  crew: PropTypes.bool
};