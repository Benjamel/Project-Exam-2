import Header from '../Header';
import Footer from '../Footer';
import { Outlet, useParams } from 'react-router-dom';

function useProfileId() {
  return useParams<{ profileId: string }>().profileId;
}

function Layout() {
  const profileId = useProfileId();

  return (
    <div>
      <Header profileId={profileId} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
