import { useEffect, useState } from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import ModalCrewInfo from './ModalCrewInfo';

const Sidebar = () => {
  // Modal code functionality
  const [showModalCrewInfo, setShowModalCrewInfo] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 393);
  const [selectedCrewId, setSelectedCrewId] = useState(
    '65ea5b70bf97054bac7b82cc'
  );

  const toggleModalCrew = () => {
    setShowModalCrewInfo((prevShowModalCrewInfo) => !prevShowModalCrewInfo);
  };
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 393);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  function handleProfileClick() {
    console.log('clicked!!!!');
  }
  // <NavLink
  //               className="nav-link"
  //               to={path}
  //               key={text}
  //               onClick={toggleModalCrew}
  //             >
  //               <span className="icon">{icon}</span>
  //               <p>{text}</p>
  //             </NavLink>
  // End of modal functionality
  return (
    // <div className="sidebar-container">
    //   <div className="content">
    //     <header></header>
    //     <NavLinks isBigSidebar />
    //   </div>
    // </div>
    <>
      <nav className="sidebar">
        {links.map((link, index) => {
          const { text, path, icon } = link;

          if (index === 4) {
            // Render a button with an onClick handler
            return isMobileView ? (
              <NavLink
                className="nav-link"
                to={`/crew/${selectedCrewId}}`}
                key={text}
                onClick={() => {
                  toggleModalCrew();
                }}
              >
                <span className="icon">{icon}</span>
                <p>{text}</p>
              </NavLink>
            ) : (
              <NavLink
                className="nav-link"
                to={path}
                key={text}
                onClick={toggleModalCrew}
              >
                <span className="icon">{icon}</span>
                <p>{text}</p>
              </NavLink>
            );
          }

          return (
            <NavLink className="nav-link" to={path} key={text}>
              <span className="icon">{icon}</span>
              <p>{text}</p>
            </NavLink>
          );
        })}
      </nav>
      {showModalCrewInfo && (
        <div
          className={
            showModalCrewInfo
              ? 'sliding-modal modal-animation'
              : 'sliding-modal'
          }
        >
          <div className="modal-content">
            <ModalCrewInfo onClickClose={toggleModalCrew} id={selectedCrewId} />
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
