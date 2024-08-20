import PropTypes from 'prop-types';
import Tab from './Tab';
import '../../../SASS/components/_flightTableWithCrew.scss';
function TabsForFlightTableWithCrew({ activeTab, setActiveTab }) {
  // console.log(activeTab);
  return (
    <div className="addCrew__tabs">
      <Tab value="all" num={0} activeTab={activeTab} onClick={setActiveTab}>
        All Crew
      </Tab>
      <Tab value="pilot" num={1} activeTab={activeTab} onClick={setActiveTab}>
        Pilots
      </Tab>
      <Tab
        value="second_pilot"
        num={2}
        activeTab={activeTab}
        onClick={setActiveTab}
      >
        Co-Pilots
      </Tab>
      <Tab value="cabin" num={3} activeTab={activeTab} onClick={setActiveTab}>
        Cabin Crew
      </Tab>
    </div>
  );
}

TabsForFlightTableWithCrew.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default TabsForFlightTableWithCrew;
