import { BASE_URL } from '../constants';
import { authFetch } from '../headers';
import { Booking } from '../../types';

export async function createBooking(bookingData: {
  dateFrom: string | Date;
  dateTo: string | Date;
  guests: number;
  venueId: string;
  accessToken: string;
}): Promise<Booking> {
  try {
    const url = `${BASE_URL}bookings`;

    const formattedBookingData = {
      ...bookingData,
      dateFrom:
        bookingData.dateFrom instanceof Date
          ? bookingData.dateFrom.toISOString()
          : bookingData.dateFrom,
      dateTo:
        bookingData.dateTo instanceof Date ? bookingData.dateTo.toISOString() : bookingData.dateTo,
    };

    const response = await authFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${formattedBookingData.accessToken}`,
      },
      body: JSON.stringify({
        dateFrom: formattedBookingData.dateFrom,
        dateTo: formattedBookingData.dateTo,
        guests: formattedBookingData.guests,
        venueId: formattedBookingData.venueId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Failed to create booking. Status: ${response.status}`);
    }

    const responseData = await response.json();

    const booking: Booking = {
      ...responseData,
      dateFrom: new Date(responseData.dateFrom),
      dateTo: new Date(responseData.dateTo),
    };

    console.log('Created Booking:', booking);

    return booking;
  } catch (error) {
    console.error('Error creating booking', error);
    throw error;
  }
}

export default createBooking;
