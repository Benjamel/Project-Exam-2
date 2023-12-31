import { load } from '../storage';

export function headers() {
  const token = load('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url: string, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
