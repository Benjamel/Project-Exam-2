import React, { useEffect, useState } from 'react';
import Venue from '../../types';
import fetchVenueById from '../../services/venue';
import BookingCalendar from '../BookingCalendar';

interface VenueBookingsProps {
  venueId: string;
  accessToken: string;
}

const VenueBookings: React.FC<VenueBookingsProps> = ({ venueId, accessToken }) => {
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    fetchVenueById(venueId, accessToken)
      .then((venueData) => {
        setVenue(venueData);
      })
      .catch((error) => {
        console.error('Error fetching venue details', error);
      });
  }, [venueId, accessToken]);

  return (
    <div>
      {venue && (
        <>
          <BookingCalendar bookings={venue.bookings || []} />
        </>
      )}
    </div>
  );
};

export default VenueBookings;
