import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Venue from '../../types';
import fetchVenues from '../../services/products';

function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  useEffect(() => {
    fetchVenues()
      .then((data) => {
        setVenues(data);
      })
      .catch((error) => {
        console.error('Error fetching venues', error);
      });
  }, []);

  return (
    <div className='text-white'>
      <h1>This is home</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <Link className='text-white hover:text-white' to={`/venue/${venue.id}`}>
              {venue.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
