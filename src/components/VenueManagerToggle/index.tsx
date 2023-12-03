import React, { useState, useEffect } from 'react';
import updateProfile from '../../services/Profile/venueManager';

interface VenueManagerToggleProps {
  profileId: string;
  accessToken: string;
}

const VenueManagerToggle: React.FC<VenueManagerToggleProps> = ({ profileId, accessToken }) => {
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    const fetchVenueManagerStatus = async () => {
      try {
        if (!accessToken) {
          console.error('Access token is missing.');
          return;
        }

        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login page)
            console.error('Unauthorized access. Redirecting to login page.');
            // Perform redirect logic here
            return;
          }

          // Handle other non-OK responses
          console.error('Error fetching venue manager status. Status:', response.status);
          return;
        }

        const data = await response.json();
        setIsVenueManager(data.venueManager || false);
      } catch (error) {
        console.error('Error fetching venue manager status:', error);
      }
    };

    if (profileId && accessToken) {
      fetchVenueManagerStatus();
    }
  }, [profileId, accessToken]);

  const handleToggleVenueManager = () => {
    updateProfile(profileId, { venueManager: !isVenueManager }, accessToken || '')
      .then(() => {
        setIsVenueManager(!isVenueManager);
      })
      .catch((error) => {
        console.error('Error updating venue manager status', error);
      });
  };

  return (
    <label>
      <input type='checkbox' checked={isVenueManager} onChange={handleToggleVenueManager} />
    </label>
  );
};

export default VenueManagerToggle;
