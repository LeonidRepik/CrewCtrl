import { useState} from 'react';
import { NavLink } from 'react-router-dom';
import CrewMemberLatestFlight from '../components/CrewMemberInfo/CrewMemberLatestFlight';
import { ModalNewFlight } from '../components';
import ModalSelectCrew from '../components/ModalSelectCrew';

const CreateFlight = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 393);

  const toggleModal = (flight, crew, next) => {
    if (crew && next) {
      setShowModal((prevShowModal) => !prevShowModal);
      setShowCrewModal((prevShowCrewModal) => !prevShowCrewModal);
    } else if (flight) {
      setShowModal((prevShowModal) => !prevShowModal);
    } else if (crew) {
      setShowCrewModal((prevShowCrewModal) => !prevShowCrewModal);
    } else {
      setShowModal(false);
      setShowCrewModal(false);
    }
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 393);
  };

  window.addEventListener('resize', handleResize);

  return (
    <div className="dashboard-page">
      {isMobileView ? (
        <NavLink className="nav-link create_flight_button" to="/new-flight">
          <p>Create Flight</p>
        </NavLink>
      ) : (
        <div className='create_flight_button_info'>
          <h2>Create</h2>
          <button
            className="create_flight_button"
            onClick={() => toggleModal(true, false, false)}
          >
            <p>Create Flight</p>
          </button>
        </div>
      )}

      {showModal ? (
        <div
          className={
            showModal ? 'sliding-modal modal-animation' : 'sliding-modal'
          }
        >
          <div className="modal-content">
            <ModalNewFlight onClickClose={toggleModal} />
          </div>
        </div>
      ) : showCrewModal ? (
        <div
          className={
            showModal ? 'sliding-modal modal-animation' : 'sliding-modal'
          }
        >
          <div className="modal-content">
            <ModalSelectCrew onClickClose={toggleModal} />
          </div>
        </div>
      ) : null}
      <CrewMemberLatestFlight />
    </div>
  );
};
export default CreateFlight;
