import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Venue from './pages/Venue';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

function App() {
  const location = useLocation();

  if (location.pathname !== '/product') {
    document.title = 'Holidaze';
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/venue/:venueId' element={<Venue />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:profileId' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
