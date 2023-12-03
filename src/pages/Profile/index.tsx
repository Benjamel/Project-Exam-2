import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Venue from '../../types';
import CustomModal from '../../components/ChangeAvatarModal';
import VenueManagerToggle from '../../components/VenueManagerToggle';
import fetchProfileById from '../../services/profiles';
import fetchVenueByProfile from '../../services/Profile/venueByProfile';
import VenueBookings from '../../components/VenueManagerBookings';
import profileMedia from '../../services/profileMedia';
import CreateVenueModal from '../../components/CreateVenueModal';
import deleteVenue from '../../services/venues/delete';
import UpcomingBookings from '../../components/BookingsByProfile';
import * as storage from '../../storage/index';
import * as S from '../../App.styles';

function Profile() {
  const { profileId = '' } = useParams<{ profileId?: string }>();
  const [profile, setProfile] = useState<Venue | null>(null);
  const accessToken: string = storage.load('accessToken') ?? '';
  const user = storage.load('user') as { name: string } | undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isCreateOrUpdateModalOpen, setIsCreateOrUpdateModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isVenueCreated, setIsVenueCreated] = useState(false);

  const handleVenueCreated = () => {
    setIsVenueCreated(true);
  };

  useEffect(() => {
    if (isVenueCreated) {
      fetchVenueByProfile(profileId, accessToken)
        .then((venueData) => {
          setVenues(venueData);
          setIsVenueCreated(false);
        })
        .catch((error) => {
          console.error('Error fetching venues', error);
        });
    }
  }, [profileId, accessToken, isVenueCreated]);

  const openCreateOrUpdateModal = (venue?: Venue) => {
    setSelectedVenue(venue || null);
    setIsCreateOrUpdateModalOpen(true);
  };

  const closeCreateOrUpdateModal = () => {
    setSelectedVenue(null);
    setIsCreateOrUpdateModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateVenues = (updatedVenue: Venue) => {
    setVenues((prevVenues) => {
      const existingIndex = prevVenues.findIndex((venue) => venue.id === updatedVenue.id);

      if (existingIndex !== -1) {
        return [
          ...prevVenues.slice(0, existingIndex),
          updatedVenue,
          ...prevVenues.slice(existingIndex + 1),
        ];
      } else {
        return [...prevVenues, updatedVenue];
      }
    });
  };

  const handleDelete = async (venueId: string) => {
    try {
      await deleteVenue(venueId, accessToken);

      setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
    } catch (error) {
      console.error('Error deleting venue', error);
    }
  };

  const handleAvatarChange = () => {
    if (profileId && typeof accessToken === 'string' && newAvatarUrl) {
      profileMedia(profileId, newAvatarUrl, accessToken)
        .then(() => {
          fetchProfileById(profileId, accessToken).then((data) => {
            setProfile(data);
          });
          closeModal();
        })
        .catch((error: any) => {
          console.error('Error updating avatar', error);
        });
    }
  };

  useEffect(() => {
    if (!profileId) {
      return;
    }

    if (profileId && typeof accessToken === 'string') {
      fetchProfileById(profileId, accessToken)
        .then((data) => {
          setProfile(data);
          document.title = data.name;
        })
        .catch((error) => {
          console.error('Error fetching profile details', error);
        });

      fetchVenueByProfile(profileId, accessToken)
        .then((venueData) => {
          setVenues(venueData);
        })
        .catch((error) => {
          console.error('Error fetching venues', error);
        });
    }
  }, [profileId, accessToken]);

  if (profile === null) {
    return <div>Loading...</div>;
  }

  const handleVenueClick = (venue: Venue) => {
    openCreateOrUpdateModal(venue);
  };

  const isProfileOwner = user && profileId === user.name;

  return (
    <div>
      <S.profilePage>
        <div className='profile'>
          <img src={profile.avatar} alt={profile?.name} />
          <div className='profile-info'>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            {isProfileOwner && (
              <div className='font-bold'>
                <button onClick={openModal}>Change Avatar</button>
                <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <h2 className='mb-1'>Change Avatar</h2>
                  <input
                    type='text'
                    placeholder='New avatar URL'
                    value={newAvatarUrl}
                    onChange={(e) => setNewAvatarUrl(e.target.value)}
                    className='pl-1'
                  />
                  <div className='mt-2'>
                    <button onClick={handleAvatarChange}>Update</button>
                  </div>
                </CustomModal>
              </div>
            )}
            <div className='font-bold'>
              {isProfileOwner && (
                <>
                  <button onClick={() => openCreateOrUpdateModal()}>Create Venue</button>
                  <p>
                    Venue Manager:{' '}
                    <VenueManagerToggle profileId={profileId} accessToken={accessToken} />
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <S.venueCard>
          <div>
            <h2 className='mt-5 mb-5'>My Venues</h2>
            {venues.map((venue) => (
              <div
                key={venue.id}
                onClick={() => handleVenueClick(venue)}
                className='flex flex-col sm:flex-row'>
                <div className='mb-5'>
                  <p>Title: {venue.name}</p>
                  <img className='mb-2 sm:mb-0' src={venue.media[0]} alt={venue.name} />
                </div>
                <div className='ml-0 sm:ml-4'>
                  <VenueBookings venueId={venue.id} accessToken={accessToken} />
                </div>
              </div>
            ))}
          </div>

          {isProfileOwner && (
            <CreateVenueModal
              isOpen={isCreateOrUpdateModalOpen}
              onRequestClose={closeCreateOrUpdateModal}
              venue={selectedVenue}
              onDelete={handleDelete}
              onUpdateVenues={updateVenues}
              onVenueCreated={handleVenueCreated}
            />
          )}
        </S.venueCard>
        <div>
          <UpcomingBookings profileName={profile?.name ?? ''} accessToken={accessToken} />
        </div>
      </S.profilePage>
    </div>
  );
}

export default Profile;
