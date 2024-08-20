import PropTypes from 'prop-types';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 8);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${month} ${day}, ${year} @ ${time}`;
};

const FlightCard = ({ flight, crew }) => {
  const numberOfCrew = (crewList) => {
    let count = 0;
    Object.keys(crewList).forEach((key) => {
      crewList[key] !== '' && count++;
    });
    return count - 1;
  };

  return (
    <div
      className={
        numberOfCrew(flight.crewMembers[0]) >= 2
          ? 'flight__card'
          : !crew
          ? 'flight__card no__crew'
          : 'flight__card not_assigned'
      }
    >
      <div className="flight__info">
        <h1>Flight {flight.flightNumber}</h1>
        <p>
          {flight.from} - {flight.to}, {formatDate(flight.departure)}
        </p>
      </div>
      {crew && (
        <div className="crew__names">
          <ul>
            <li>
              {flight.crewMembers[0].member1 !== ''
                ? flight.crewMembers[0].member1
                : 'No Pilot'}
            </li>
            <li>
              {flight.crewMembers[0].member2 !== ''
                ? flight.crewMembers[0].member2
                : 'No Co-Pilot'}
            </li>
            <li>
              {flight.crewMembers[0].member3 !== '' ||
              numberOfCrew(flight.crewMembers[0]) >= 2
                ? flight.crewMembers[0].member3
                : 'No Co-Pilot'}
            </li>
          </ul>
        </div>
      )}
      <div className="cta_upcoming_flights">
        {crew && (
          <button>
            See current crew{' '}
            {numberOfCrew(flight.crewMembers[0]) !== 0 &&
              `(${numberOfCrew(flight.crewMembers[0])})`}
          </button>
        )}
        <button>Tap to see Crew Available</button>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.object,
  crew: PropTypes.bool,
};

export default FlightCard;
