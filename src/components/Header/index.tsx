import { NavLink } from 'react-router-dom';
import Logo from '../../assets/icons/keys-svgrepo-com.svg';
import * as storage from '../../storage/index';

interface User {
  name: string;
}

function Header() {
  const accessToken = storage.load('accessToken') as string | null;
  const user = storage.load('user') as User | null;

  const handleLogout = () => {
    storage.remove('accessToken');
    storage.remove('user');
  };

  return (
    <nav className='w-full fixed top-0 p-3 z-10 bg-242424'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-semibold'>
          <NavLink to='/' className='text-white flex items-center hover:text-white'>
            Holidaze
            <img src={Logo} alt={Logo} className='ml-1' />
          </NavLink>
        </div>
        <ul className='flex space-x-4'>
          <li>
            <NavLink to='/' className='text-white hover:text-white'>
              Home
            </NavLink>
          </li>
          <li>
            {accessToken && user && (
              <NavLink to={`/profile/${user?.name}`} className='text-white hover:text-white'>
                Profile
              </NavLink>
            )}
          </li>
          {accessToken && user ? (
            <li>
              <NavLink to='/home' onClick={handleLogout} className='text-white hover:text-white'>
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to='/login' className='text-white hover:text-white'>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
