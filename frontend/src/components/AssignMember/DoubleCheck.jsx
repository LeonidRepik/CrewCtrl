import { useEffect, useState } from 'react';
import '../../../SASS/components/__doublecheck.scss';
import axios from 'axios';
function DoubleCheck({ setShowDoubleCheck, updateInfo }) {
  const [singleCrew, setSingleCrew] = useState({});
  useEffect(function () {
    async function fetchCrew() {
      try {
        const res = await fetch(`/api/v1/crew/${updateInfo.crewId}`);
        let data = await res.json();
        const profile = await data.data.CrewMember;
        // console.log(profile);
        setSingleCrew(profile);

        //for pilot info we're still missing photo
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchCrew();
  }, []);
  const updateMemberFlightRecords = async (updateInfo) => {
    try {
      // Fetch the flight data

      const flightData = updateInfo.flight;

      // Update each crew member's flightRecord

      await axios.patch(`/api/v1/crew/${updateInfo.crewId}`, {
        $push: { flightRecord: flightData },
      });

      // console.log('Flight records updated successfully');
    } catch (error) {
      console.error(error);
    }
  };
  const updateCrewMembersInFlight = async (updateInfo) => {
    try {
      const currentCrewMembers = updateInfo.flight.crewMembers[0];

      const newCrewMember = singleCrew.name;
      if (!currentCrewMembers.member1) {
        currentCrewMembers.member1 = newCrewMember;
      } else if (!currentCrewMembers.member2) {
        currentCrewMembers.member2 = newCrewMember;
      } else if (!currentCrewMembers.member3) {
        currentCrewMembers.member3 = newCrewMember;
      } else {
        throw new Error('No available member slots');
      }
      const response = await axios.patch(
        `/api/v1/flights/${updateInfo.flightId}`,
        {
          crewMembers: [currentCrewMembers],
        }
      );

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="wrapper-doubleCheck">
        <div className="doubleCheck">
          <p>Send Notification to crew assign?</p>
          <p>
            You are about to send a notification to the selected crew for flight
          </p>

          <div className="doubleCheck__btns">
            <button
              className="doubleCheck__btns__btn1"
              onClick={() => {
                // console.log(updateInfo);
                updateMemberFlightRecords(updateInfo);
                updateCrewMembersInFlight(updateInfo);
                setShowDoubleCheck(false);
              }}
            >
              Book and do not notify
            </button>
            <button
              className="doubleCheck__btns__btn2"
              onClick={() => {
                // console.log(updateInfo);
                updateMemberFlightRecords(updateInfo);
                updateCrewMembersInFlight(updateInfo);
                setShowDoubleCheck(false);
              }}
            >
              Book and notify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoubleCheck;
