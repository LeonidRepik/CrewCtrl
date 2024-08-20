import { useEffect, useState } from 'react';
import '../../../SASS/components/_crewMemberLatestFlight.scss';
import CrewMemberAssignItem from './CrewMemberAssignItem';
import DoubleCheck from '../AssignMember/DoubleCheck';
function CrewMemberAssignflightTable({ expand, crewId }) {
  //////important the flight data that is passed into this component should came from crew member we're using flight list as placeholder now
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [updateInfo, setUpdateInfo] = useState({});
  const [showDoubleCheck, setShowDoubleCheck] = useState(false);
  useEffect(
    function () {
      // console.log(updateInfo);
    },
    [updateInfo]
  );

  useEffect(function () {
    async function fetchFlights() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/v1/flights');
        let data = await res.json();

        setFlights(data.data.flights);
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
    <>
      <div className="flightTableForCrew">
        <div className="flightTableForCrew__container">
          <div className="flightTableForCrew__frame">
            <div className="flightTableForCrew__frame__title">
              <h3 className="flightTableForCrew__title">Flight Table</h3>{' '}
              <span className="flightTableForCrew__count">
                {'('}
                {flights.length}
                {')'}
              </span>
            </div>
          </div>

          <div className="flightTableForCrew__table">
            <ul className="flightTableForCrew__list">
              {/* map method return an array of FlightItem */}
              {flightlist.slice(0, 15).map((flight) => (
                <CrewMemberAssignItem
                  flight={flight}
                  key={flight._id}
                  crewId={crewId}
                  flightId={flight._id}
                  onSave={() => {
                    const newInfo = { flight, crewId, flightId: flight._id };
                    console.log(newInfo);
                    setUpdateInfo(newInfo);
                    setShowDoubleCheck(true);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showDoubleCheck && (
        <DoubleCheck
          setShowDoubleCheck={setShowDoubleCheck}
          updateInfo={updateInfo}
        />
      )}
    </>
  );
}
//2tabs to toggle flights with or without crew

//3

export default CrewMemberAssignflightTable;
