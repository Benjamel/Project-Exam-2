import { BASE_URL } from './constants';
import Owner from '../types';
import { authFetch } from './headers';

const action: string = '?_bookings=true&_venues=true';

async function fetchProfileById(profileId: string): Promise<Owner> {
  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Invalid profile ID');
  }

  try {
    const response = await authFetch(`${BASE_URL}profiles/${profileId}${action}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Profile not found');
      } else {
        throw new Error('API request failed');
      }
    }

    const data: Owner = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error ${error.message}`);
  }
}

export default fetchProfileById;
