import React from 'react';

import { BiSolidDashboard } from 'react-icons/bi';
import { MdAccessTimeFilled } from 'react-icons/md';
import { FaPlaneUp } from 'react-icons/fa6';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

const links = [
  {
    text: 'dashboard',
    path: 'main',
    icon: <BiSolidDashboard />,
  },
  {
    text: 'availability',
    path: 'availability',
    icon: <MdAccessTimeFilled />,
  },
  {
    text: 'create',
    path: 'create-flight',
    icon: <FaPlaneUp />,
  },
  {
    text: 'assign',
    path: 'assign-crew',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 10"
        fill="none"
      >
        <path
          d="M2 9L1 3L0.0485166 8.7089C0.0231195 8.86128 0.14063 9 0.295115 9H2Z"
          fill="#202020"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.1956 0C2.57241 0 2.10101 0.563821 2.21141 1.17715L3.65141 9.17715C3.73715 9.65345 4.15165 10 4.6356 10H18.8035C19.4266 10 19.898 9.43618 19.7876 8.82285L18.3476 0.822847C18.2619 0.346551 17.8474 0 17.3635 0H3.1956ZM6.49953 4.5C6.22338 4.5 5.99952 4.72386 5.99952 5C5.99952 5.27614 6.22338 5.5 6.49953 5.5H16.4995C16.7757 5.5 16.9995 5.27614 16.9995 5C16.9995 4.72386 16.7757 4.5 16.4995 4.5H6.49953Z"
          fill="#202020"
        />
      </svg>
    ),
    // icon: <FaCalendarCheck />,
  },
  {
    text: 'profile',
    path: 'main',
    icon: <FaCircleUser />,
  },
];

export default links;
