import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiMenu2Fill } from "react-icons/ri";
import NavbarUser from '../Elements/NavbarUser';
import isObjectEmpty from '../../utils/isObjectEmpty';

export default function Navbar({ authUser, onLogout }) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RiMenu2Fill className="h-6 w-6" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/leaderboards">Leaderboards</Link></li>
          </ul>
        </div>
        <h1 className='font-bold text-xl'>ForumApp</h1>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal items-center px-1">
          <li><Link to="/leaderboards" className='hidden lg:flex'>Leaderboards</Link></li>
          {!isObjectEmpty(authUser) ? (
            <NavbarUser {...authUser} onLogout={onLogout} />
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>          
          )}
        </ul>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  authUser: null,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(PropTypes.string.isRequired),
  onLogout: PropTypes.func.isRequired,
};
