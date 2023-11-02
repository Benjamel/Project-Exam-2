import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Owner from '../../types';
import fetchProfileById from '../../services/profiles';
import * as storage from '../../storage/index';

function Profile() {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<Owner | null>(null);
  const accessToken = storage.load('accessToken');
  console.log('Profile ID:', profileId);

  useEffect(() => {
    console.log('Profile useEffect triggered');
    if (!profileId) {
      return;
    }

    if (profileId && typeof accessToken === 'string') {
      fetchProfileById(profileId, accessToken)
        .then((data) => {
          console.log('Fetched profile data:', data);
          setProfile(data);
          document.title = data.name;
        })
        .catch((error) => {
          console.error('Error fetching profile details', error);
        });
    }
  }, [profileId, accessToken]);

  if (profile === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>
        Avatar: <img src={profile.avatar} alt={profile.name} />
      </p>
    </div>
  );
}

export default Profile;
