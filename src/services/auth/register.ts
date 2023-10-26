import { BASE_URL } from '../constants';

export async function registerUser(data: { name: string; email: string; password: string }) {
  const action = 'auth/register';
  const method = 'post';

  const registerUrl = BASE_URL + action;
  const body = JSON.stringify(data);

  const response = await fetch(registerUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  console.log(result);
}
