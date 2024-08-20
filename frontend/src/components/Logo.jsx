import logo from '../assets/images/logo.svg';
import logoText from '../assets/images/logo-text.svg';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} className="logo" />
      <img src={logoText} className="logo-text" />
    </div>
  );
};

export default Logo;
