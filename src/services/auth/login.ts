import { BASE_URL } from '../constants';
import * as storage from '../../storage/index';
import { authFetch } from '../headers';

export async function loginUser(data: { email: string; password: string }) {
  console.log('loginUser function started');
  const action = 'auth/login';
  const method = 'post';

  const loginUrl = BASE_URL + action;
  const body = JSON.stringify(data);

  console.log('Before authFetch');

  const response = await authFetch(loginUrl, {
    method,
    body,
  });

  console.log('After authFetch');

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const result = await response.json();

  const { accessToken, ...user } = result;

  storage.save('accessToken', accessToken);
  storage.save('user', user);

  console.log(result);
}
