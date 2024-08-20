import { useState } from 'react';
import { useEffect } from 'react';

const SelectCrew = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/users');
        const data = await response.json();
        setUsers(data.data.flights);
        // console.log(data.data.flights);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Select Crew Page</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => {
            const { id, email, name } = user;
            return (
              <li key={id}>
                <div>
                  <h5>{name}</h5>
                  <p>{email}</p>
                  {/* <a href={html_url}>profile</a> */}
                </div>
              </li>
            );
          })
        ) : (
          <li>No Users</li>
        )}
      </ul>
    </>
  );
};
export default SelectCrew;
