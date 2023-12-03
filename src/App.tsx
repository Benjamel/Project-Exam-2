import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Venue from './pages/Venue';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import * as storage from './storage/index';

function App() {
  const location = useLocation();

  if (location.pathname !== '/product') {
    document.title = 'Holidaze';
  }

  const accessToken = storage.load('accessToken') as string;

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/venue/:venueId' element={<Venue accessToken={accessToken} />} />
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
