import { BASE_URL } from '../constants';
import * as storage from '../../storage/index';
import { authFetch } from '../headers';

export async function loginUser(data: { email: string; password: string }) {
  const action = 'auth/login';
  const method = 'post';

  const loginUrl = BASE_URL + action;
  const body = JSON.stringify(data);

  const response = await authFetch(loginUrl, {
    method,
    body,
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const { accessToken, ...user } = await response.json();

  storage.save('accessToken', accessToken);
  storage.save('user', user);
}
