import UpcomingFlights from '../components/UpcomingFlights';
import FlightTableWithCrew from '../components/flightTableWithCrew/FlightTableWithCrew';

const AssignCrew = () => {
  return (
    <div className="dashboard-page">
      <UpcomingFlights crew={false} />
      <FlightTableWithCrew expand={true} />
    </div>
  );
};
export default AssignCrew;
