import { authFetch } from '../headers';
import { BASE_URL } from '../constants';

async function deleteVenue(venueId: string, accessToken: string): Promise<void> {
  try {
    const url = `${BASE_URL}venues/${venueId}`;

    const response = await authFetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete venue');
    }
  } catch (error) {
    console.error('Error deleting venue', error);
    throw error;
  }
}

export default deleteVenue;
