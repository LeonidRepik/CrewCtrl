import PropTypes from 'prop-types';

export default function SelectedCrew({ capt, cop, cabinCrew }) {
  const cabinCrewCount = numberOfCabinCrew();
  function numberOfCabinCrew() {
    let count = 0;
    for (let i = 0; i < cabinCrew.length; i++) {
      if (cabinCrew[i]!== '') {
        count++;
      }
    }
    return count;
  }

  return (
    <div className="firstCardContainer">
      <h3>Crew selected</h3>
      <div className='assignedCrewNumbers'>
        <div className='infoCrew'>
          <div className={capt !== '' ? "ready" : ""}>{capt === '' ? '0/1' : '1/1'}</div>
          <p className={capt !== '' ? "ready" : ""}>Pilots</p>
        </div>
        <div className='infoCrew'>
          <div className={cop !== '' ? "ready" : ""}>{cop === '' ? '0/1' : '1/1'}</div>
          <p className={cop !== '' ? "ready" : ""}>Co-Pilots</p>
        </div>
        <div className='infoCrew'>
          <div className={cabinCrewCount === 6 ? "ready" : ""}>{cabinCrewCount}/6</div>
          <p className={cabinCrewCount === 6 ? "ready" : ""}>Cabin Crew</p>
        </div>
      </div>
    </div>
  );
}

SelectedCrew.propTypes = {
  capt: PropTypes.string,
  cop: PropTypes.string,
  cabinCrew: PropTypes.object,
};
