import { useState, useEffect } from 'react';
import CustomModal from '../ChangeAvatarModal';
import createVenue from '../../services/venues/create';
import updateVenue from '../../services/venues/update';
import deleteVenue from '../../services/venues/delete';
import Venue, { ExtendedVenue } from '../../types';
import * as storage from '../../storage/index';

interface CreateVenueModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  venue?: Venue | null;
  onDelete: (venueId: string) => void;
  onUpdateVenues: (updateVenue: Venue) => void;
  onVenueCreated: () => void;
}

const CreateVenueModal: React.FC<CreateVenueModalProps> = ({
  isOpen,
  onRequestClose,
  venue,
  onDelete,
  onUpdateVenues,
  onVenueCreated,
}) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const initialFormData: ExtendedVenue = {
    id: '',
    created: '',
    updated: '',
    owner: {
      name: '',
      email: '',
      avatar: '',
    },
    bookings: [],
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      lat: 0,
      lng: 0,
    },
  };

  const [formData, setFormData] = useState<ExtendedVenue>(initialFormData);

  useEffect(() => {
    if (venue) {
      setFormData((prevData) => ({
        ...prevData,
        ...(venue as ExtendedVenue),
      }));
    }
  }, [venue]);

  useEffect(() => {
    const storedAccessToken = storage.load('accessToken');
    if (typeof storedAccessToken === 'string' || storedAccessToken === null) {
      setAccessToken(storedAccessToken || '');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'media'
          ? value.split(', ')
          : name === 'price' || name === 'maxGuests'
          ? Number(value)
          : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      meta: { ...prevData.meta, [name]: checked },
    }));
  };

  const handleSubmit = () => {
    if (venue) {
      updateVenue(venue.id, formData, accessToken || '')
        .then((updatedVenue) => {
          onUpdateVenues(updatedVenue);
          onRequestClose();
        })
        .catch((error) => {
          console.error('Error updating venue', error);
        });
    } else {
      createVenue(formData, accessToken || '')
        .then((newVenue) => {
          onUpdateVenues(newVenue);
          onVenueCreated();
          onRequestClose();
        })
        .catch((error) => {
          console.error('Error creating venue', error);
        });
    }
  };

  const handleDelete = () => {
    if (onDelete && venue) {
      deleteVenue(venue.id, accessToken || '')
        .then(() => {
          onDelete(venue.id);
          onRequestClose();
        })
        .catch((error) => {
          console.error('Error deleting venue', error);
        });
    }
  };

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{venue ? 'Update Venue' : 'Create Venue'}</h2>
      <form>
        <div className='mb-2'>
          <label>
            Name:
            <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
          </label>
        </div>
        <div className='mb-2'>
          <label>
            Description:
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='mb-2'>
          <label>
            Price:
            <input type='number' name='price' value={formData.price} onChange={handleInputChange} />
          </label>
        </div>
        <div className='mb-2'>
          <label>
            Max Guests:
            <input
              type='number'
              name='maxGuests'
              value={formData.maxGuests}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='mb-2'>
          <label>
            Media:
            <input type='text' name='media' value={formData.media} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <button className='mr-2' type='button' onClick={handleSubmit}>
            {venue ? 'Update' : 'Create'}
          </button>
          {venue && (
            <button type='button' onClick={() => onDelete(venue.id)}>
              Delete
            </button>
          )}
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateVenueModal;
