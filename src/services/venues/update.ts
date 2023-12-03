import Venue from '../../types';
import { BASE_URL } from '../constants';
import { authFetch } from '../headers';

async function updateVenue(
  venueId: string,
  venueData: Partial<Venue>,
  accessToken: string
): Promise<Venue> {
  const url = `${BASE_URL}venues/${venueId}`;

  try {
    const response = await authFetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error('Failed to update venue');
    }

    const updatedVenue: Venue = await response.json();

    return updatedVenue;
  } catch (error) {
    console.error('Error updating venue', error);
    throw error;
  }
}

export default updateVenue;
