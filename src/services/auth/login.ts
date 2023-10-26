import { BASE_URL } from '../constants';
import * as storage from '../../storage/index';

export async function loginUser(data: { email: string; password: string }) {
  const action = 'auth/login';
  const method = 'post';

  const loginUrl = BASE_URL + action;
  const body = JSON.stringify(data);

  const response = await fetch(loginUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const { accessToken, ...user } = await response.json();

  storage.save('accessToken', accessToken);
  storage.save('user', user);
}
