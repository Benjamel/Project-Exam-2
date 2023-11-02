import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchVenueById from '../../services/venue';
import Venue from '../../types';

function VenueId() {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    if (venueId) {
      fetchVenueById(venueId)
        .then((data) => {
          setVenue(data);
          document.title = data.name;
        })
        .catch((error) => {
          console.error('Error fetching venue details', error);
        });
    }
  }, [venueId]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={venue.media[0]} alt={venue.name} />
      <h1>{venue.name}</h1>
    </div>
  );
}

export default VenueId;
