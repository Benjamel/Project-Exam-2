import { BASE_URL } from './constants';
import Venue from '../types';
import { authFetch } from './headers';

const action: string = 'venues?_owner=true&_bookings=true';

async function fetchVenues(accessToken?: string): Promise<Venue[]> {
  try {
    const response = await authFetch(BASE_URL + action, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Response didn't work properly");
    }

    const data: Venue[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error ${error.message}`);
  }
}

export default fetchVenues;
