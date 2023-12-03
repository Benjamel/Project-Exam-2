import { BASE_URL } from '../constants';
import { authFetch } from '../headers';
import { Booking } from '../../types';

async function getBookingsByProfile(profileId: string, accessToken: string): Promise<Booking[]> {
  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Invalid profile name');
  }

  try {
    const response = await authFetch(`${BASE_URL}profiles/${profileId}/bookings`, {
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

    const data: Booking[] = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching bookings: ${error.message}`);
    throw error;
  }
}

export default getBookingsByProfile;
