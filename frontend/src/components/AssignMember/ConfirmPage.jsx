import { useEffect, useState } from 'react';
import axios from 'axios';
import UserIcon from '../../assets/userIcon';
import Notification from './Notification';
function ConfirmPage({
  crewIdForUpdate,
  flightDataForPatch,
  id,
  flights,
  handleCancelClick,
}) {
  const [showNotification, setShowNotification] = useState(false);
  // console.log(crewIdForUpdate, flightDataForPatch);
  function handleConfirm() {
    const flightId = id;
    const newCrewMembers = flightDataForPatch.crewMembers[0];
    updateCrewMembers(flightId, newCrewMembers);
    updateCrewFlightRecords(crewIdForUpdate, flights);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 800);
  }
  const updateCrewFlightRecords = async (id, flights) => {
    try {
      // Fetch the flight data

      const flightData = flights;

      // Update each crew member's flightRecord
      for (const crewId of id) {
        await axios.patch(`/api/v1/crew/${crewId}`, {
          $push: { flightRecord: flightData },
        });
      }

      console.log('Flight records updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const updateCrewMembers = async (flightId, newCrewMembers) => {
    try {
      const response = await axios.patch(`/api/v1/flights/${flightId}`, {
        crewMembers: newCrewMembers,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {showNotification && <Notification />}
      <div className="confirm__up">
        <h3 className="confirm__up__header">Flight Summary Details</h3>
        <div className="confirm__up__list">
          <div className="confirm__up__list__top">
            {flightDataForPatch.crewMembers[0].member1 && (
              <>
                <p className="confirm__up__list__top__role">Pilots</p>
                <div className="confirm__up__list__top__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].member1}</p>
                </div>
              </>
            )}
          </div>
          <div className="confirm__up__list__mid">
            {flightDataForPatch.crewMembers[0].member2 && (
              <>
                <h3 className="confirm__up__list__mid__role">Co-Pilots</h3>
                <div className="confirm__up__list__mid__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].member2}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].member3 && (
              <>
                <h3 className="confirm__up__list__mid__role">Co-Pilots</h3>
                <div className="confirm__up__list__mid__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].member3}</p>
                </div>
              </>
            )}
          </div>
          <div className="confirm__up__list__low">
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin1 && (
              <>
                <h3 className="confirm__up__list__low__role">Cabin Crew</h3>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin1}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin2 && (
              <>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin2}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin3 && (
              <>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin3}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin4 && (
              <>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin4}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin5 && (
              <>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin5}</p>
                </div>
              </>
            )}
            {flightDataForPatch.crewMembers[0].cabinCrew.cabin6 && (
              <>
                <div className="confirm__up__list__low__name">
                  <UserIcon />
                  <p>{flightDataForPatch.crewMembers[0].cabinCrew.cabin6}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="confirm__down">
        <button
          className="confirm__down__cancel"
          onClick={() => handleCancelClick()}
        >
          Cancel
        </button>
        <button className="confirm__down__confirm" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </>
  );
}
export default ConfirmPage;
