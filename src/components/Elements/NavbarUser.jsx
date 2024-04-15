import PropTypes from 'prop-types';

export default function NavbarUser({ name, email, avatar, onLogout }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt={name} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <span className='flex flex-col items-start'>
            <strong>{name}</strong>
            {email}
          </span>
        </li>
        <li><button type="button" onClick={onLogout}>Logout</button></li>
      </ul>
    </div>
  );
}

NavbarUser.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};
