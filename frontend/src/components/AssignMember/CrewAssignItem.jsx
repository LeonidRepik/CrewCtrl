import ButtonAddCrew from '../flightTable/ButtonAddCrew';
import BtnAssignMember from './BtnAssignMember';

function CrewAssignItem({ name, role, hours, crewId, handleClick }) {
  return (
    // <li className="flightTable__item">
    //   <div className="flightTable__flightAndAbbrev">
    //     {flightNumber}{' '}
    //     <div className="flightTable__fromTo">
    //       {from} - {to}
    //     </div>
    //   </div>
    //   <div className="flightTable__containerForStatus">
    //     <div className="flightTable__status">
    //       <p id="statusM">{status}</p>
    //     </div>
    //   </div>

    //   <div className="flightTable__btn-container">
    //     <ButtonAddCrew flightId={flightId} />
    //   </div>
    // </li>
    <li className="addCrew__item">
      <div className="addCrew__item__leftCol">
        <p className="addCrew__item__leftCol__name">{name}</p>

        <p className="addCrew__item__leftCol__role">
          {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
        </p>
      </div>
      <div className="addCrew__item__midCol">
        <p className="addCrew__item__midCol__hr">{hours}</p>
        <p className="addCrew__item__midCol__hr__title">Flight Hours</p>
      </div>

      <BtnAssignMember onClick={handleClick} crewId={crewId} />
    </li>
  );
}

export default CrewAssignItem;
