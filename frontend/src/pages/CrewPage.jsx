import { useParams } from 'react-router-dom';
import CrewMemberInfo from '../components/CrewMemberInfo/CrewMemberInfo';
import CrewMemberLatestFlight from '../components/CrewMemberInfo/CrewMemberLatestFlight';
import { ReturnHeader } from '../components';
const CrewPage = () => {
  const { id } = useParams();
  return (
    <div className='crewPage'>
      <ReturnHeader destinationPage={'/dashboard/availability'}>
        Crew Member Information
      </ReturnHeader>
      <CrewMemberInfo crewId={id} />
      <CrewMemberLatestFlight expand={false} ticket={true}/>
    </div>
  );
};
export default CrewPage;
