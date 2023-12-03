import { BASE_URL } from '../constants';
import { authFetch } from '../headers';
import Profile from '../../types';

export async function updateProfile(
  name: string,
  profileData: { venueManager?: boolean },
  accessToken: string
): Promise<Profile> {
  const url = `${BASE_URL}profiles/${name}`;

  try {
    const response = await authFetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update Profile');
    }

    const updatedProfile: Profile = await response.json();

    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile', error);
    throw error;
  }
}

export default updateProfile;
