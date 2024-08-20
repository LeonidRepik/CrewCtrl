import PropTypes from 'prop-types';

import '../../../SASS/components/_flightTableWithCrew.scss';
import CrewAssignList from './CrewAssignList';
//1fake data structure
import { useEffect, useState } from 'react';
import ReturnHeader from '../ReturnHeader';
import ConfirmPage from './ConfirmPage';
import { useParams } from 'react-router-dom';

function AssignMember({ assignMemberRef }) {
  const [showConfirmPage, setShowConfirmPage] = useState(false);
  const { flightId } = useParams();
  const [flights, setFlights] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [pilots, setPilots] = useState([]);
  const [copilots, setCopilots] = useState([]);
  const [cabinCrew, setCabinCrew] = useState([]);
  const [crewIdForUpdate, setCrewIdForUpdate] = useState([]);
  const [flightDataForPatch, setFlightDataForPatch] = useState({
    crewMembers: [
      {
        member1: null,
        member2: null,
        member3: null,
        cabinCrew: {
          cabin1: null,
          cabin2: null,
          cabin3: null,
          cabin4: null,
          cabin5: null,
          cabin6: null,
        },
      },
    ],
  });

  // let id = '65e2cf76b21bd035fac6ed05';
  const handleConfirmClick = () => {
    setShowConfirmPage(true);
    assignMemberRef.current.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  const handleCancelClick = () => {
    setShowConfirmPage(false);
  };

  const handleClick = async (id) => {
    // ... fetch crew member ...
    // console.log('click');
    const res = await fetch(`/api/v1/crew/${id}`);
    let data = await res.json();
    // console.log(data);
    const selectedCrew = data.data.CrewMember;

    let updatedFlightData = { ...flightDataForPatch };

    // console.log(crewIdForUpdate);

    if (selectedCrew.role === 'pilot' && pilots.length < 1) {
      setPilots([...pilots, selectedCrew]);
      setCrewIdForUpdate((prevIds) => [...prevIds, id]);
      updatedFlightData.crewMembers[0].member1 = selectedCrew.name;
    } else if (selectedCrew.role === 'second_pilot' && copilots.length < 2) {
      setCopilots([...copilots, selectedCrew]);
      setCrewIdForUpdate((prevIds) => [...prevIds, id]);
      if (!updatedFlightData.crewMembers[0].member2) {
        updatedFlightData.crewMembers[0].member2 = selectedCrew.name;
      } else {
        updatedFlightData.crewMembers[0].member3 = selectedCrew.name;
      }
    } else if (selectedCrew.role === 'Cabin Crew' && cabinCrew.length < 6) {
      setCabinCrew([...cabinCrew, selectedCrew]);
      setCrewIdForUpdate((prevIds) => [...prevIds, id]);
      for (let i = 1; i <= 6; i++) {
        if (!updatedFlightData.crewMembers[0].cabinCrew[`cabin${i}`]) {
          updatedFlightData.crewMembers[0].cabinCrew[`cabin${i}`] =
            selectedCrew.name;
          break;
        }
      }
    }

    setFlightDataForPatch(updatedFlightData);
    // console.log(flightDataForPatch);
  };

  useEffect(() => {
    // console.log(flights);
  });
  useEffect(function () {
    async function fetchFlightInfoForAssign() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/flights/${flightId}`);
        // 65e2cf76b21bd035fac6ed05
        // /api/v1/flights/65e1519735fcf23c9fd95c2c
        let data = await res.json();

        // const selectedflight = data.crewMembers[0];
        const selectedflight = data.data.flight;

        setFlights(selectedflight);
        // console.log(flights);

        selectedflight.crewMembers.forEach((crewMember) => {
          if (crewMember.member1) {
            setPilots((prevPilots) => [...prevPilots, crewMember.member1]);
          }
          if (crewMember.member2) {
            setCopilots((prevCopilots) => [
              ...prevCopilots,
              crewMember.member2,
            ]);
          }
          if (crewMember.member3) {
            setCopilots((prevCopilots) => [
              ...prevCopilots,
              crewMember.member3,
            ]);
          }
          Object.values(crewMember.cabinCrew).forEach((cabinMember) => {
            if (cabinMember) {
              setCabinCrew((prevCabinCrew) => [...prevCabinCrew, cabinMember]);
            }
          });
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // console.log(pilots + ' and ' + copilots + ' and ' + cabinCrew);
    fetchFlightInfoForAssign();
  }, []);

  return (
    <div className="assginMember__body">
      {showConfirmPage ? (
        <ConfirmPage
          id={flightId}
          crewIdForUpdate={crewIdForUpdate}
          flightDataForPatch={flightDataForPatch}
          flights={flights}
          handleCancelClick={handleCancelClick}
        />
      ) : (
        <div className="frame219">
          <div className="addCrew">
            <div className="addCrew__firstCard">
              <div className="addCrew__firstCard__title">
                <h1>
                  {'Flight'} {flights.flightNumber}
                </h1>
              </div>
              <div className="addCrew__firstCard__info">
                <p className="addCrew__firstCard__info__info1">
                  <span className="addCrew__firstCard__info__info1__left">
                    {pilots.length}/1
                  </span>

                  <span className="addCrew__firstCard__info__info1__right">
                    {' '}
                    Pilots
                  </span>
                </p>
                <p className="addCrew__firstCard__info__info2">
                  <span className="addCrew__firstCard__info__info2__left">
                    {copilots.length}/2
                  </span>

                  <span className="addCrew__firstCard__info__info2__right">
                    {' '}
                    Co-Pilots
                  </span>
                </p>
                <p className="addCrew__firstCard__info__info3">
                  <span className="addCrew__firstCard__info__info3__left">
                    {cabinCrew.length}/6
                  </span>

                  <span className="addCrew__firstCard__info__info3__right">
                    {' '}
                    Cabin Crew
                  </span>
                </p>
              </div>
            </div>
            <CrewAssignList handleClick={handleClick} />
          </div>
          <div className="frame72">
            <button onClick={handleConfirmClick}>Continue to Summary</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignMember;
