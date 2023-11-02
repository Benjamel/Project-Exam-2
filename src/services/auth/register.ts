import { BASE_URL } from '../constants';
import { authFetch } from '../headers';

export async function registerUser(data: { name: string; email: string; password: string }) {
  const action = 'auth/register';
  const method = 'post';

  const registerUrl = BASE_URL + action;
  const body = JSON.stringify(data);

  const response = await authFetch(registerUrl, {
    method,
    body,
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  console.log(result);
}
