import PropTypes from 'prop-types';

export default function ListOfCrew({ crew, handleAdding }) {
  return (
    <div className="crewCard">
      <div className="crewNameRole">
        <img src="#" alt="" />
        <div>
          <h3>{crew.name}</h3>
          <p>{crew.role}</p>
        </div>
      </div>
      <div className='crewHours'>
        <h3>{crew.flightHours.total}</h3>
        <p>Flight hours</p>
      </div>
      <div className='crewAddButton'>
        <button onClick={() => handleAdding(crew)}>+</button>
      </div>
    </div>
  );
}

ListOfCrew.propTypes = {
  crew: PropTypes.object,
  handleAdding: PropTypes.func,
};
