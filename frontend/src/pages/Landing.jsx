import { Logo } from '../components';
import { Link } from 'react-router-dom';
import aircraft from '../assets/images/aircraft.svg';

const Landing = () => {
  return (
    <>
      <main className="landing-page">
        <Logo />
        <div className="btn-container">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </main>
    </>
  );
};
export default Landing;
