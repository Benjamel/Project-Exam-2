export function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const load = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export function remove(key: string): void {
  localStorage.removeItem(key);
}
