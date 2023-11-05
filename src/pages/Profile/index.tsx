import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Owner from '../../types';
import fetchProfileById from '../../services/profiles';
import * as storage from '../../storage/index';

function Profile() {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<Owner | null>(null);
  const accessToken = storage.load('accessToken');

  useEffect(() => {
    console.log('Profile useEffect triggered. profileId:', profileId);
    if (!profileId) {
      return;
    }

    if (profileId && typeof accessToken === 'string') {
      console.log('Making API call...');
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
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>
        Avatar: <img src={profile.avatar} alt={profile?.name} />
      </p>
    </div>
  );
}

export default Profile;
