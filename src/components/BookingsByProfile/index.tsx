import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import getBookingsByProfile from '../../services/Profile/bookingsByProfile';

interface UpcomingBookingsProps {
  profileName: string;
  accessToken: string;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ profileName, accessToken }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const upcomingBookings = await getBookingsByProfile(profileName, accessToken);
        setBookings(upcomingBookings);
      } catch (error: any) {
        console.error('Error fetching bookings:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [profileName, accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-5'>
      <h2>Upcoming Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className='booking-item'>
          <p>
            <strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
          </p>
          <p>
            <strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p>
            <strong>Guests:</strong> {booking.guests}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UpcomingBookings;
