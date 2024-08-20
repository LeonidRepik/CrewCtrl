// Header for the pages which does not use the standar header. it should be called with
// a prop called destination page with the route where the back button should bring
// and inside the component the children should be the title of the page where you want to go back.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ReturnHeader({ destinationPage, children, onClick }) {
  const navigateTo = useNavigate();

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 393);

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

  function handleClick() {
    navigateTo(destinationPage);
  }

  return !isMobileView ? (
    <div className="returnHeader mobileView">
      <h2>{children}</h2>
      <button onClick={() => onClick(false, false, false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.80209 7.17108C8.70714 7.06237 8.56984 7 8.42551 7H7.59094C7.38242 7 7.26554 7.24026 7.39426 7.40432L11 12L7.32494 16.5938C7.19399 16.7575 7.31053 17 7.52016 17H8.36235C8.50676 17 8.64412 16.9376 8.73908 16.8288L12 13.092L15.2609 16.8288C15.3559 16.9376 15.4932 17 15.6376 17H16.4798C16.6895 17 16.806 16.7575 16.6751 16.5938L13 12L16.6057 7.40432C16.7345 7.24026 16.6176 7 16.4091 7H15.5745C15.4302 7 15.2929 7.06237 15.1979 7.17108L12 10.8324L8.80209 7.17108Z"
            fill="#F4F4F4"
          />
        </svg>
      </button>
    </div>
  ) : (
    <div className="returnHeader">
      <div className="returnHeaderTitle">
        <button onClick={handleClick}>&lt;</button>
        <h2>{children}</h2>
      </div>
    </div>
  );
}

ReturnHeader.propTypes = {
  destinationPage: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
