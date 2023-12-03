import { BASE_URL } from '../constants';
import { Booking } from '../../types';
import { authFetch } from '../headers';

async function fetchBookings(venueId: string, accessToken: string): Promise<Booking[]> {
  try {
    const url = `${BASE_URL}bookings/${venueId}?_customer=true&_venue=true`;

    const response = await authFetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
    }

    const responseData = await response.json();

    const booking: Booking = {
      ...responseData,
      dateFrom: new Date(responseData.dateFrom),
      dateTo: new Date(responseData.dateTo),
    };

    return [booking];
  } catch (error) {
    console.error('Error fetching bookings', error);
    throw error;
  }
}

export default fetchBookings;
