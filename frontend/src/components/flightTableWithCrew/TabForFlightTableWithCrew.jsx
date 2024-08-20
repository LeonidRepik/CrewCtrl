import PropTypes from 'prop-types';
import '../../../SASS/components/_flightTableWithCrew.scss';
function Tab({ value, children, activeTab, onClick }) {
  return (
    <button
      className={`flightTable1__tab ${
        activeTab === value ? 'flightTable1__tab--active' : ''
      }`}
      // onClick(value) === setActiveTab(value)
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
}

Tab.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
  activeTab: PropTypes.string,
  onClick: PropTypes.func,
};
export default Tab;
