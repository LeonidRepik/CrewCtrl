import ButtonAddCrew from './ButtonAddCrew';

function FlightItem({ flight }) {
  const { flightNumber, from, to } = flight;
  return (
    <li className="flightTable__item">
      {flightNumber}{' '}
      <div>
        {from} - {to}
      </div>
      <ButtonAddCrew />
    </li>
  );
}

export default FlightItem;

