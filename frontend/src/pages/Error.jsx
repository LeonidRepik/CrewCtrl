import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const errorMessage =
    useRouteError().status + ' ' + useRouteError().statusText;

  return (
    <>
      <h1>Error Page</h1>
      <p>{errorMessage}</p>
      <Link to="/">Back Home</Link>
    </>
  );
};
export default Error;
