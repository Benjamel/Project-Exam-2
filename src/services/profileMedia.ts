import { BASE_URL } from './constants';
import { authFetch } from './headers';

async function profileMedia(
  profileName: string,
  newAvatarUrl: string,
  accessToken: string
): Promise<void> {
  try {
    const updateData = {
      avatar: newAvatarUrl,
    };

    const response = await authFetch(`${BASE_URL}profiles/${profileName}/media`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to updata avatar');
    }
  } catch (error: any) {
    throw new Error(`Error updating avatar: ${error.message}`);
  }
}

export default profileMedia;
