import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { registerAction } from './pages/Register';
import { loginAction } from './pages/Login';
import { dashboardLoader } from './pages/DashboardLayout';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  Error,
  DashboardLayout,
  DashboardPage,
  AvailabilityPage,
  CreateFlight,
  AssignCrew,
  Profile,
  NewFlightPage,
  AddCrewPage,
  CrewPage,
  EditCrewForFlight,
} from './pages';

import '../SASS/main.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'new-flight',
        element: <NewFlightPage />,
      },
      {
        path: 'add-crew',
        element: <AddCrewPage />,
      },
      {
        path: 'crew/:id',
        element: <CrewPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            path: 'main',
            element: <DashboardPage />,
          },
          {
            path: 'availability',
            element: <AvailabilityPage />,
          },
          {
            path: 'create-flight',
            element: <CreateFlight />,
          },
          {
            path: 'assign-crew',
            element: <AssignCrew />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: 'edit-crew-forFlight/:flightId',
        element: <EditCrewForFlight />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
