export const setLocalStorageService = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage for key "${key}":`, error);
  }
};

export const getLocalStorageService = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting localStorage for key "${key}":`, error);
    return null;
  }
};

export enum ELocalStorageKeys {
  AUTHENTICATED_USER = 'authenticatedUser',
}
