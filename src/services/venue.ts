import { BASE_URL } from './constants';
import Venue from '../types';

const action: string = '?_owner=true&_bookings=true';

async function fetchVenueById(venueId: string): Promise<Venue> {
  try {
    const response = await fetch(`${BASE_URL}venues/${venueId}${action}`);
    if (!response.ok) {
      throw new Error('Response didnt work properly');
    }

    const data: Venue = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error ${error.message}`);
  }
}

export default fetchVenueById;
