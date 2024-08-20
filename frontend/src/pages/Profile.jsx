import { useState } from 'react';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState();

  let { userId } = useParams();

  // console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/users');
        const data = await response.json();
        setUser(data.data.flights);
        // console.log(data.data.flights);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Profile Page</h1>
    </>
  );
};
export default Profile;
