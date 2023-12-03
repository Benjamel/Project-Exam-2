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
          <img className='venue-image' src={venue.media[0]} alt={venue.name} />
          <div className='venue-details'>
            <h1>{venue.name}</h1>
            <p>{venue.description}</p>
            <button onClick={handleBookNowClick}>Book Now</button>
          </div>
        </div>
        <div className='info-wrap'>
          <div className='info'>
            <h2>Info</h2>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Price: {venue.price}</p>
            <p>Rating: {venue.rating}</p>
            <p>Wifi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
            <p>Parking: {venue.meta.parking ? 'Yes' : 'No'}</p>
            <p>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
            <p>Pets: {venue.meta.pets ? 'Yes' : 'No'}</p>
          </div>
          <div className='location'>
            <h2>Location</h2>
            <p>Address: {venue.location.address}</p>
            <p>City: {venue.location.city}</p>
            <p>Zip: {venue.location.zip}</p>
            <p>Country: {venue.location.country}</p>
            <p>Continent: {venue.location.continent}</p>
            <p>longitude: {venue.location.lat}</p>
            <p>Latitude: {venue.location.lng}</p>
          </div>
        </div>
        <BookingCalendar key={`${bookings.length}-${forceRerender}`} bookings={bookings} />
        <BookingForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          venueId={venueId}
          accessToken={accessToken}
          onBookingSubmit={handleBookingSubmit}
        />
        <div className='owner mt-5'>
          <img className='owner-avatar' src={venue.owner.avatar} alt={venue.owner.name} />
          <div className='owner-details'>
            <h2>Owner</h2>
            <p className='font-bold'>
              <Link to={`/profile/${venue.owner.name}`}>Name: {venue.owner.name}</Link>
            </p>
            <p>Email: {venue.owner.email}</p>
          </div>
        </div>
      </S.singleVenue>
    </div>
  );
}

export default VenueId;
