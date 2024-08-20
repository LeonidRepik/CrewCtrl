import { Outlet } from 'react-router-dom';
import AssignMember from '../components/AssignMember/AssignMember';
import Notification from '../components/AssignMember/Notification';

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
      {/* <AssignMember /> */}
      {/* <Notification /> */}
    </div>
  );
};

export default HomeLayout;
