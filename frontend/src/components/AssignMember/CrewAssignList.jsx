import PropTypes from 'prop-types';
// import TabsForFlightTableWithCrew from './TabsForFlightTableWithCrew';
import '../../../SASS/components/_flightTableWithCrew.scss';
import Tabs from './Tabs';
import CrewAssignItem from './CrewAssignItem';

//1fake data structure
import { useEffect, useState } from 'react';
// import FlightItemWithCrew from './FlightItemWithCrew';

function CrewAssignList({ handleClick }) {
  const [crews, setCrews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(
    function () {
      async function fetchCrews() {
        try {
          setIsLoading(true);
          const res = await fetch('/api/v1/crew');
          let data = await res.json();
          //   console.log(data.data.CrewMembers);

          let refinedData = data.data.CrewMembers.map((crew) => {
            if (crew.role === 'second_pilot') {
              crew.role = 'Co-Pilot';
            }
            return crew;
          });
          //   console.log(refinedData);

          if (activeTab === 'all') {
            setCrews(refinedData);
          }
          if (activeTab === 'pilot') {
            const filteredData = refinedData.filter(
              (crew) => crew.role === activeTab
            );
            setCrews(filteredData);
          }
          if (activeTab === 'second_pilot') {
            const filteredData = refinedData.filter(
              (crew) => crew.role === 'Co-Pilot'
            );
            setCrews(filteredData);
          }
          if (activeTab === 'cabin') {
            const filteredData = refinedData.filter(
              (crew) => crew.role === activeTab
            );
            setCrews(filteredData);
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCrews();
    },
    [activeTab]
  );

  let crewList = crews;
  return (
    <>
      <h3 className="addCrew__header">Select Crew</h3>{' '}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="addCrew__tableFrame">
        <ul className="addCrew__table">
          {/* map method return an array of FlightItem */}
          {crewList.map((crew) => (
            <CrewAssignItem
              name={crew.name}
              role={crew.role}
              hours={crew.flightHours.total}
              key={crew._id}
              crewId={crew._id}
              handleClick={handleClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
//2tabs to toggle flights with or without crew

//3

export default CrewAssignList;
