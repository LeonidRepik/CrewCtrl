import { NavLink } from 'react-router-dom';
import ButtonAddCrew from '../flightTable/ButtonAddCrew';
import AssignMember from '../AssignMember/AssignMember';
//MISSING isMobileView id togglefunction
function FlightItemWithCrew({
  flight,
  flightId,
  isMobileView,
  toggleModalCrew,
  showModalAssignMember,
}) {
  const { flightNumber, from, to, status, aircraftType } = flight;
  // console.log(flightId);
  return (
    <>
      <li className="flightTable1__item">
        <div className="flightTable1__flightAndAbbrev">
          {flightNumber}{' '}
          <div className="flightTable1__fromTo">
            {from} - {to}
          </div>
        </div>
        <div className="flightTable1__containerForStatus">
          <div className="flightTable1__status">
            <p id="statusM">{status}</p>
          </div>
          <div className="flightTable1__aircraft">
            <p>{aircraftType}</p>
          </div>
        </div>

        <div className="flightTable1__btn-container">
          {isMobileView ? (
            <NavLink className="crew-link" to={`/crew/${flightId}`}>
              <ButtonAddCrew isMobileView={isMobileView}/>
            </NavLink>
          ) : (
            <ButtonAddCrew
              flightId={flightId}
              toggleModalCrew={toggleModalCrew}
              isMobileView={isMobileView}
            />
          )}
          {/* <NavLink>
          <ButtonAddCrew flightId={flightId} />
        </NavLink> */}
          {/* <span>add</span> */}
          <span>Crew</span>
        </div>
      </li>
      {showModalAssignMember && (
        <div
          className={
            showModalAssignMember
              ? 'sliding-modal2 modal-animation2'
              : 'sliding-modal2'
          }
        >
          <div className="modal-content">
            <AssignMember onClickClose={toggleModalCrew} flightId={flightId} />
          </div>
        </div>
      )}
    </>
  );
}

export default FlightItemWithCrew;
