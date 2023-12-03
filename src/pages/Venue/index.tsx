import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchVenueById from '../../services/venue';
import BookingForm from '../../components/BookingModal';
import Venue, { Booking } from '../../types';
import * as S from '../../App.styles';
import BookingCalendar from '../../components/BookingCalendar';

const mapVenueToBooking = (venue: Venue): Booking[] => {
  return venue.bookings.map((booking) => ({
    ...booking,
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo),
  }));
};

interface VenueIdProps {
  accessToken: string;
}

function VenueId({ accessToken }: VenueIdProps) {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (venueId) {
      fetchVenueById(venueId)
        .then((data: Venue) => {
          const singleVenue = data;
          setVenue(singleVenue);
          document.title = singleVenue.name;

          const bookingData = mapVenueToBooking(singleVenue);
          setBookings(bookingData);
          setForceRerender((prev) => !prev);
        })
        .catch((error) => {
          console.error('Error fetching venue details', error);
        });
    }
  }, [venueId, accessToken]);

  const handleBookNowClick = () => {
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (newBooking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <S.singleVenue>
        <div className='venue'>
          <img src={venue.media[0]} alt={venue.name} />
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          <p>{venue.price}</p>
        </div>
        <div className='owner'>
          <h2>Owner</h2>
          <p>
            <Link to={`/profile/${venue.owner.name}`}>Name: {venue.owner.name}</Link>
          </p>
          <p>Email: {venue.owner.email}</p>
          <img src={venue.owner.avatar} alt={venue.owner.name} />
        </div>
        <div className='info'>
          <h2>Info</h2>
          <p>Max Guests: {venue.maxGuests}</p>
          <p>Wifi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
          <p>Parking: {venue.meta.parking ? 'Yes' : 'No'}</p>
          <p>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
          <p>Pets: {venue.meta.pets ? 'Yes' : 'No'}</p>
        </div>
        <BookingCalendar key={`${bookings.length}-${forceRerender}`} bookings={bookings} />

        <button onClick={handleBookNowClick}>Book Now</button>
        <BookingForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          venueId={venueId}
          accessToken={accessToken}
          onBookingSubmit={handleBookingSubmit}
        />
      </S.singleVenue>
    </div>
  );
}

export default VenueId;
