import links from '../utils/links';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      {links.map((link) => {
        const { text, path, icon } = link;

        return (
          <NavLink className="nav-link" to={path} key={text}>
            <span className="icon">{icon}</span>
            <p>{text}</p>
          </NavLink>
        );
      })}
    </nav>
  );
};
export default Navbar;
