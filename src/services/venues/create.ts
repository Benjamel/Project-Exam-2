import { BASE_URL } from '../constants';
import { authFetch } from '../headers';
import Venue from '../../types';

export async function createVenue(venueData: Venue, accessToken: string): Promise<Venue> {
  const url = `${BASE_URL}venues`;

  try {
    const response = await authFetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Failed to create venue. Server response: ${errorMessage}`);
      throw new Error('Failed to create venue');
    }

    const createdVenue: Venue = await response.json();

    return createdVenue;
  } catch (error) {
    console.error('Error creating venue', error);
    throw error;
  }
}

export default createVenue;
