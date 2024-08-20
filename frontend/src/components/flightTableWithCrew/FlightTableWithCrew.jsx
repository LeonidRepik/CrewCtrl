import PropTypes from 'prop-types';
import TabsForFlightTableWithCrew from './TabsForFlightTableWithCrew';
import '../../../SASS/components/_flightTableWithCrew.scss';

import ModalAssignMember from '../AssignMember/ModalAssignMember';
import { useEffect, useState } from 'react';
import FlightItemWithCrew from './FlightItemWithCrew';
{
  /* <div className="flightTable1__table">
<div className="flightTable1__labels">
  <div className="flightTable1__label1">
    <p>Flight</p>
  </div>
  <div className="flightTable1__wrapperSA"></div>
  <div className="flightTable1__label2">
    <p>Status</p>
  </div>
  <div className="flightTable1__label3">
    <p>Aircraft Type</p>
  </div>
  <div className="flightTable1__label4">
    <p>Actions</p>
  </div>
</div> */
}
{
  /* <div className="flightTable1__labels">
              <div className="flightTable1__label1">
                <p>Flight</p>
              </div>
              <div className="flightTable1__wrapperSA">
                <div className="flightTable1__label2">
                  <p>Status</p>
                </div>
                <div className="flightTable1__label3">
                  <p>Aircraft Type</p>
                </div>
              </div>

              <div className="flightTable1__label4">
                <p>Actions</p>
              </div>
            </div> */
}
function FlightTableWithCrew({ expand }) {
  let id = '';
  const [showModalAssignMember, setShowModalAssignMember] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 393);
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const toggleModalCrew = () => {
    setShowModalAssignMember((prevShowModalCrewInfo) => !prevShowModalCrewInfo);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 393);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(
    function () {
      async function fetchFlightsWithCrew() {
        try {
          setIsLoading(true);
          const res = await fetch('/api/v1/flights');
          let data = await res.json();
          console.log(data);

          data.data.flights.reverse();
          let refinedData = data.data.flights.map((flight) => {
            let status = '';
            id = flight._id;

            let checkCaptain =
              flight.crewMembers[0].member1 !== null &&
              flight.crewMembers[0].member1 !== 'null' &&
              flight.crewMembers[0].member1 !== '';
            let checkCoPilot =
              flight.crewMembers[0].member2 !== null &&
              flight.crewMembers[0].member2 !== 'null' &&
              flight.crewMembers[0].member2 !== '' &&
              flight.crewMembers[0].member3 !== null &&
              flight.crewMembers[0].member3 !== 'null' &&
              flight.crewMembers[0].member3 !== '';
            let checkFlightAttendant = Object.values(
              flight.crewMembers[0].cabinCrew
            ).some(
              (member) => member !== null && member !== 'null' && member !== ''
            );

            if (!checkCaptain && !checkCoPilot && !checkFlightAttendant) {
              status = 'no crew';
            } else if (checkCaptain && checkCoPilot && checkFlightAttendant) {
              status = 'crew complete';
            } else if (!checkCaptain) {
              status = 'no captain';
            } else if (!checkCoPilot) {
              status = 'no co-pilot';
            } else if (!checkFlightAttendant) {
              status = 'no cabin crew';
            }

            return {
              ...flight,
              status,
            };
          });
          // console.log(refinedData);
          // old code
          if (activeTab === 'all') {
            setFlights(refinedData);
          }

          if (activeTab === 'crew not complete') {
            const filteredData = refinedData.filter(
              (flight) =>
                flight.status === 'no captain' ||
                flight.status === 'no co-pilot' ||
                flight.status === 'no cabin crew'
            );

            setFlights(filteredData);
          }

          if (activeTab === 'no crew') {
            const filteredData = refinedData.filter(
              (flight) => flight.status === 'no crew'
            );

            setFlights(filteredData);
            // console.log(filteredData);
            // console.log(activeTab);
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchFlightsWithCrew();
      // setFlights(expand ? flights.slice(0, 15) : flights.slice(0, 2));
    },
    [activeTab, expand]
  );
  // let flightlist = expand ? flights : flights.slice(0, 2);

  return (
    <>
      <div className="flightTable1">
        <div className="flightTable1__container">
          <div className="flightTable1__frame">
            <div className="flightTable1__frame__title">
              <h3 className="flightTable1__title">Flight tables</h3>{' '}
              <span className="flightTable1__count">
                {'('}
                {flights.length}
                {')'}
              </span>
            </div>

            <TabsForFlightTableWithCrew
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="flightTable1__table">
            <div className="flightTable1__labels">
              <div className="flightTable1__label1">
                <p>Flight</p>
              </div>
              <div className="flightTable1__wrapperSA">
                <div className="flightTable1__label2">
                  <p>Crew detail</p>
                </div>
                <div className="flightTable1__label3">
                  <p>Aircraft Type</p>
                </div>
              </div>

              <div className="flightTable1__label4">
                <p>Actions</p>
              </div>
            </div>
            <ul className="flightTable1__list">
              {/* map method return an array of FlightItem */}
              {flights.slice(0, 15).map((flight) => (
                <FlightItemWithCrew
                  flight={flight}
                  key={flight._id}
                  flightId={flight._id}
                  isMobileView={isMobileView}
                  toggleModalCrew={toggleModalCrew}
                  showModalAssignMember={showModalAssignMember}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showModalAssignMember && (
        <div
          className={
            showModalAssignMember
              ? 'sliding-modal2 modal-animation2'
              : 'sliding-modal2'
          }
        >
          <div className="modal-content">
            <ModalAssignMember onClickClose={toggleModalCrew} />
          </div>
        </div>
      )}
    </>
  );
}

export default FlightTableWithCrew;
