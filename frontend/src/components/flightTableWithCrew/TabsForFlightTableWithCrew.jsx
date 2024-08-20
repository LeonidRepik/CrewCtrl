import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tab from './TabForFlightTableWithCrew';
import '../../../SASS/components/_flightTableWithCrew.scss';
function TabsForFlightTableWithCrew({ activeTab, setActiveTab }) {
  // console.log(activeTab);

  useEffect(() => {
    setActiveTab("no crew");
  }, [])

  return (
    <div className="flightTable1__tabs">
      <Tab value="no crew" num={0} activeTab={activeTab} onClick={setActiveTab}>
        Flight with no crew
      </Tab>
      <Tab
        value="crew not complete"
        num={1}
        activeTab={activeTab}
        onClick={setActiveTab}
      >
        Crew not completed
      </Tab>
    </div>
  );
}

TabsForFlightTableWithCrew.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default TabsForFlightTableWithCrew;
