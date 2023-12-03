import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Venue, { Booking } from '../../types';
import fetchVenues from '../../services/venues';
import Search from '../../components/Search';
import * as S from '../../App.styles';

function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVenues()
      .then((data) => {
        setVenues(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching venues', error);
        setIsLoading(false);
      });
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className='text-center'>Venues Loading..</div>;
  }

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-center mt-4'>Venues</h1>
        <Search searchQuery={searchQuery} onSearch={setSearchQuery} />
      </div>
      <S.venueCard>
        {filteredVenues.map((venue) => (
          <Link to={`/venue/${venue.id}`} key={venue.id}>
            <img src={venue.media[0]} alt={venue.name} />
            <h2>{venue.name}</h2>
          </Link>
        ))}
      </S.venueCard>
    </div>
  );
}

export default Home;
