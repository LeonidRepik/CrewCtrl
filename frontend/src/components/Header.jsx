import { Logo } from '../components';
import NotificationBellIcon from '../assets/icons/Notification.svg';
import { BiSolidSearch } from 'react-icons/bi';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaPlane } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchResult({ isLoading, flights, crew, searchTerm }) {
  const filteredFlights = flights.filter((flight) =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCrew = crew.filter((crewMember) =>
    crewMember.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const flightMatches = filteredFlights.length > 0;
  const crewMatches = filteredCrew.length > 0;

  return (
    <>
      {searchTerm && (
        <div className="search-result">
          <h2>Flight number</h2>
          {flightMatches && (
            <>
              {filteredFlights.map((flight) => (
                <NavLink
                  className="search-link"
                  to={`/flight:${flight._id}`}
                  key={flight._id}
                >
                  <FaPlane />
                  {flight.flightNumber}
                </NavLink>
              ))}
            </>
          )}
          {!flightMatches && (
            <div className="no-matches">No information to show</div>
          )}
          <h2>Crew Member</h2>
          {filteredCrew.map((crew) => (
            <NavLink
              className="search-link"
              to={`/crew:${crew._id}`}
              key={crew._id}
            >
              {crew.name}
            </NavLink>
          ))}
          {!crewMatches && (
            <div className="no-matches">No information to show</div>
          )}
        </div>
      )}
    </>
  );
}

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate('/');
    await axios.get('/api/v1/users/logout');
    // await customFetch.get('/auth/logout');
    toast.success('Logout Successful');
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [flights, setFlights] = useState([]);
  const [crew, setCrew] = useState([]);

  const {
    data: flightsData,
    isLoading: flightsLoading,
    isError: flightsError,
  } = useQuery({
    queryKey: ['flights'],
    queryFn: () => axios.get('/api/v1/flights/'),
    onSuccess: (data) => setFlights(data.data.data.flights),
  });

  const {
    data: crewData,
    isLoading: crewLoading,
    isError: crewError,
  } = useQuery({
    queryKey: ['crew'],
    queryFn: () => axios.get('/api/v1/crew/'),
    onSuccess: (data) => setCrew(data.data.data.CrewMembers),
  });

  // console.log(crew);
  // console.log(flights);

  return (
    <header className="header">
      <Logo />
      <div className="header-info">
        <div className="user-info">
          <p>Good morning John</p>
          <h3>Ready to create a flight?</h3>
        </div>

        {/* <FaBell className="info-bell" /> */}
        <img
          src={NotificationBellIcon}
          className="info-bell"
          alt="notification bell icon"
          onClick={logoutUser}
        />
      </div>
      <div className="search-text">Search</div>
      <div className="header-search">
        <BiSolidSearch className="search-icon" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Look for crew member, flight status or information"
        />
      </div>

      <img
        src={NotificationBellIcon}
        className="header-bell"
        alt="notification bell icon"
        onClick={logoutUser}
      />

      <SearchResult
        isLoading={flightsLoading || crewLoading}
        flights={flights}
        crew={crew}
        searchTerm={searchTerm}
      />
    </header>
  );
};
export default Header;
