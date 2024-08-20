import { Outlet, redirect, useNavigate, useLoaderData } from 'react-router-dom';
import { Navbar, Header, Sidebar } from '../components';
import { createContext, useContext, useState } from 'react';

import '../../SASS/main.scss';

export const dashboardLoader = async () => {
  try {
    const cookieExists = document.cookie.includes('token');
    if (!cookieExists) {
      throw new Error('Cookie does not exist');
    }
    return cookieExists;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <DashboardContext.Provider>
      <main className="dashboard">
        <>
          <Header />
          <Sidebar />
          <Outlet />
          <Navbar />
        </>
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
