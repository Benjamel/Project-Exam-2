import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/keys-svgrepo-com.svg';

function Header() {
  return (
    <nav className='bg-grey-800  w-full fixed top-0 p-3'>
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
            <Link to='/profile' className='text-white hover:text-white'>
              Profile
            </Link>
          </li>
          <li>
            <Link to='/contact' className='text-white hover:text-white'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
