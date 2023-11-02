import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/keys-svgrepo-com.svg';
import * as storage from '../../storage/index';

interface HeaderProps {
  profileId?: string;
}

function Header({ profileId }: HeaderProps) {
  const accessToken = storage.load('accessToken');
  const user = storage.load('user');

  const handleLogout = () => {
    storage.remove('accessToken');
    storage.remove('user');
  };

  return (
    <nav className='w-full fixed top-0 p-3 z-10 bg-242424'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-semibold'>
          <Link to='/' className='text-white flex items-center hover:text-white'>
            Holidaze
            <img src={Logo} alt={Logo} className='ml-1' />
          </Link>
        </div>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/' className='text-white hover:text-white'>
              Home
            </Link>
          </li>
          <li>
            <Link to={`/profile/${profileId || ''}`} className='text-white hover:text-white'>
              Profile
            </Link>
          </li>
          {accessToken && user ? (
            <li>
              <Link to='/home' onClick={handleLogout} className='text-white hover:text-white'>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login' className='text-white hover:text-white'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
