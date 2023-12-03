import { BASE_URL } from './constants';
import Venue from '../types';
import { authFetch } from './headers';

const action: string = '?_owner=true&_bookings=true';

async function fetchVenueById(venueId: string, accessToken?: string | undefined): Promise<Venue> {
  try {
    const headers: Record<string, string> = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await authFetch(`${BASE_URL}venues/${venueId}${action}`, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your credentials.');
      } else {
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
    }

    const data: Venue = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in fetchVenueById:', error);
    throw new Error(`Error in fetchVenueById: ${error.message}`);
  }
}

export default fetchVenueById;
