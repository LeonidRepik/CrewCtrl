// import ButtonAddCrew from '../flightTable/ButtonAddCrew';
import ButtonCrewMemberInfo from '../../components/CrewMemberInfo/ButtonCrewMemberInfo';

function CrewMemberLatestFlightItem({ flight, isMobilePhone, ticket}) {
  const {
    flightNumber,
    from,
    to,
    departure,
    aircraftType,
    specialRequirements,
  } = flight;

  let onlyDate = '';
  let onlyHour = '';
  let special = '';

  if (departure) {
    onlyDate = departure.slice(0, 10);
    onlyHour = departure.slice(12, 16);
  }

  if (
    specialRequirements[0].PBN === true &&
    specialRequirements[0].LVP === true
  ) {
    special = 'PBN/LVP';
  } else if (specialRequirements[0].PBN === true) {
    special = 'PBN';
  } else if (specialRequirements[0].LVP === true) {
    special = 'LVP';
  } else {
    special = '';
  }
  console.log(isMobilePhone);

  return (
    <>
      <li className="flightTableForCrew__item">
        <div className="flightTableForCrew__item_column1">
          {flightNumber}{' '}
          <div className="flightTableForCrew__item_column1_from">
            {from} - {to}
          </div>
        </div>
        {!ticket && (
          <>
            <div className="liItemDesktop">{onlyDate}</div>
            <div className="liItemDesktop">{onlyHour}</div>
            <div className="liItemDesktop">{aircraftType}</div>
            <div className="liItemDesktop">{special}</div>
          </>
        )}

        <ButtonCrewMemberInfo isMobilePhone={isMobilePhone} ticket={ticket} />
      </li>
    </>
  );
}

export default CrewMemberLatestFlightItem;
