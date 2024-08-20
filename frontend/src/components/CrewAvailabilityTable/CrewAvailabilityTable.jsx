import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TbEyeFilled } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BsFilterSquare } from 'react-icons/bs';
import ModalCrewInfo from '../ModalCrewInfo';
import filterIcon from '../../assets/icons/Filter.svg';

const CrewAvailabilityTable = () => {
  // Modal code functionality
  let id = '';
  const [showModalCrewInfo, setShowModalCrewInfo] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 393);
  const [selectedCrewId, setSelectedCrewId] = useState(null);

  const toggleModalCrew = () => {
    setShowModalCrewInfo((prevShowModalCrewInfo) => !prevShowModalCrewInfo);
  };

  function handleResize () {
    setIsMobileView(window.innerWidth <= 393);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // End of modal functionality

  const [crew, setCrew] = useState([]);
  const [filteredCrew, setFilteredCrew] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all_crew');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    // console.log(`Opening the Modal`);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    // console.log(`Closing the Modal`);
    setIsModalOpen(false);
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  //   console.log(selectedFilters);

  const applyFilters = () => {
    let filteredData = crew;

    if (selectedTab !== 'all_crew') {
      filteredData = crew.filter(
        (crewMember) => crewMember.role === selectedTab
      );
    }

    if (selectedFilters.length > 0) {
      filteredData = filteredData.filter((crewMember) =>
        selectedFilters.includes(crewMember.flightHours.available.toLowerCase())
      );
    }

    setFilteredCrew(filteredData);
    closeModal();
  };

  const {
    data: crewData,
    isLoading: crewLoading,
    isError: crewError,
  } = useQuery({
    queryKey: ['crew'],
    queryFn: () => axios.get('/api/v1/crew/'),
    onSuccess: (data) => {
      setCrew(data.data.data.CrewMembers);
      setFilteredCrew(data.data.data.CrewMembers);
    },
  });

  const handleTabChange = (tab) => {
    setFilteredCrew(crew);
    setSelectedTab(tab);

    let filteredData = crew;

    if (tab !== 'all_crew') {
      filteredData = crew.filter((crewMember) => crewMember.role === tab);
    }

    if (selectedFilters.length > 0) {
      filteredData = filteredData.filter((crewMember) =>
        selectedFilters.includes(crewMember.flightHours.available.toLowerCase())
      );
    }

    setFilteredCrew(filteredData);
  };

  return (
    <>
      <div
        className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}
      >
        <div className="modal-container">
          <div className="modal-header">
            <h3>Filter By</h3>
            <button className="close-modal-btn" onClick={closeModal}>
              {/* <FaTimes /> */}X
            </button>
          </div>
          {/* modal-header - end */}

          <div className="modal-body">
            <h4>Status</h4>
            <div>
              <input
                type="checkbox"
                value="available"
                onChange={() => handleFilterChange('available')}
                checked={selectedFilters.includes('available')}
              />
              <label htmlFor="available">Available</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="unavailable"
                onChange={() => handleFilterChange('unavailable')}
                checked={selectedFilters.includes('unavailable')}
              />
              <label htmlFor="unavailable">Unavailable</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="pto"
                onChange={() => handleFilterChange('pto')}
                checked={selectedFilters.includes('pto')}
              />
              <label htmlFor="pto">PTO</label>
            </div>
          </div>
          {/* modal-body - end */}
          <button className="apply-filters-btn" onClick={applyFilters}>
            Show Results
          </button>
        </div>
        {/* modal-container - end */}
      </div>

      <div className="table-header">
        <h2>Select Crew</h2>
        <button className="crew-filter-icon" type="button" onClick={openModal}>
          <img src={filterIcon} alt="filter icon" />
          <span>Filter</span>
        </button>
      </div>
      {/* Table Head - End */}
      <div className="desktopViewTabs">
        <div className="tabs">
          <button
            className={`tab-btn ${selectedTab === 'all_crew' ? 'active' : ''}`}
            onClick={() => handleTabChange('all_crew')}
          >
            All Crew
          </button>
          <button
            className={`tab-btn ${selectedTab === 'pilot' ? 'active' : ''}`}
            onClick={() => handleTabChange('pilot')}
          >
            Pilots
          </button>
          <button
            className={`tab-btn ${
              selectedTab === 'second_pilot' ? 'active' : ''
            }`}
            onClick={() => handleTabChange('second_pilot')}
          >
            Co-Pilots
          </button>
          <button
            className={`tab-btn ${
              selectedTab === 'cabin_crew' ? 'active' : ''
            }`}
            onClick={() => handleTabChange('cabin_crew')}
          >
            Cabin Crew
          </button>
        </div>
      </div>
      {/* Tabs - End */}
      <table className="crew-availability-table">
        <thead>
          <tr>
            <th>Crew</th>
            <th>Status</th>
            <th>Flight Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrew.map(
            (member) => (
              (id = member._id),
              (
                <tr key={member._id}>
                  <td>
                    <p style={{ fontWeight: 'bold' }}>{member.name}</p>
                    <p className="gray-text">
                      {/* {member.role} */}
                      {member.role === 'second_pilot'
                        ? 'Co-Pilot'
                        : member.role}
                    </p>
                  </td>
                  <td>
                    <span
                      className={`status-cell ${member.flightHours.available.toLowerCase()}`}
                    >
                      {member.flightHours.available.toLowerCase() ===
                      'unavailable'
                        ? 'Crew Sick'
                        : null}
                      {member.flightHours.available.toLowerCase() ===
                      'available'
                        ? 'Active'
                        : null}
                      {member.flightHours.available.toLowerCase() === 'pto'
                        ? 'Vacation'
                        : null}
                    </span>
                  </td>
                  <td>
                    {member.flightHours.thisMonth}
                    <span className="gray-text">/90hrs</span>
                  </td>
                  <td>
                    <NavLink
                      className="crew-link"
                      //  to={`/crew/${member._id}`}
                    >
                      <TbEyeFilled
                        className="view-crew-icon"
                        onClick={() => {
                          setSelectedCrewId(member._id);
                          toggleModalCrew();
                        }}
                      />
                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedCrewId(member._id);
                          toggleModalCrew();
                        }}
                      >
                        View
                      </button>
                    </NavLink>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      {showModalCrewInfo && (
        <div
          className={
            showModalCrewInfo
              ? 'sliding-modal modal-animation'
              : 'sliding-modal'
          }
        >
          <div className="modal-content">
            <ModalCrewInfo
              onClickClose={toggleModalCrew}
              id={selectedCrewId}
              ticket={true}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CrewAvailabilityTable;
