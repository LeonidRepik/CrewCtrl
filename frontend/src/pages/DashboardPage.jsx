import BarChart from '../components/BarChart/BarChart';
import { CrewAvailability } from '../components/CrewPieChart/CrewAvailability';
import UpcomingFlights from '../components/UpcomingFlights';
import FlightTableWithCrew from '../components/flightTableWithCrew/FlightTableWithCrew';

const DashboardPage = () => {
  return (
    <main className="dashboard-page">
      <div className="dashboard-charts">
        <BarChart />
        <CrewAvailability />
      </div>
      <UpcomingFlights crew={true} />
      <FlightTableWithCrew expand={true} />
    </main>
  );
};
export default DashboardPage;
