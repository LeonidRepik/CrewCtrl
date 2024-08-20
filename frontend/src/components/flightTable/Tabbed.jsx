import PropTypes from 'prop-types';
import Tab from './Tab';

function Tabbed({ activeTab, setActiveTab }) {
  // console.log(activeTab);

  return (
    <div className="flightTable__tabs">
      <Tab
        value="in progress"
        num={0}
        activeTab={activeTab}
        onClick={setActiveTab}
      >
        In Progress
      </Tab>
      <Tab value="done" num={1} activeTab={activeTab} onClick={setActiveTab}>
        Done
      </Tab>
      <Tab value="delay" num={2} activeTab={activeTab} onClick={setActiveTab}>
        Delay
      </Tab>
      <Tab value="cancel" num={3} activeTab={activeTab} onClick={setActiveTab}>
        Cancel
      </Tab>
    </div>
  );
}
Tabbed.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default Tabbed;

