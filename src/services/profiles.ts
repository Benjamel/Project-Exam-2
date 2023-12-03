import { BASE_URL } from './constants';
import Venue from '../types';
import { authFetch } from './headers';

const action: string = '?_bookings=true&_venues=true';

async function fetchProfileById(profileId: string, accessToken: string): Promise<Venue> {
  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Invalid profile ID');
  }

  try {
    const response = await authFetch(`${BASE_URL}profiles/${profileId}${action}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Profile not found');
      } else {
        throw new Error('API request failed');
      }
    }

    const data: Venue = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error ${error.message}`);
  }
}

export default fetchProfileById;
