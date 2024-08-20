import PropTypes from 'prop-types';
import Tab from './TabForBar';

function TabsForBar({activeTab, setActiveTab}) {
    
    return (
        <div className="bar-chart__tabs">
          <Tab
            value="delay"
            num={0}
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Delay
          </Tab>
          <Tab value="done" num={1} activeTab={activeTab} onClick={setActiveTab}>
            Done
          </Tab>
          <Tab value= "cancel" num={1} activeTab={activeTab} onClick={setActiveTab}>
            Canceled
          </Tab>
          
        </div>
      );
}

TabsForBar.propTypes = {
    activeTab: PropTypes.string,
    setActiveTab: PropTypes.func,
  };
  export default TabsForBar;