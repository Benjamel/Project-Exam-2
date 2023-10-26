import { BASE_URL } from './constants';
import Venue from '../types';

const action: string = 'venues?_owner=true&_bookings=true';

async function fetchVenues(): Promise<Venue[]> {
  try {
    const response = await fetch(BASE_URL + action);
    if (!response.ok) {
      throw new Error('Response didnt work properly');
    }

    const data: Venue[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error ${error.message}`);
  }
}

export default fetchVenues;
