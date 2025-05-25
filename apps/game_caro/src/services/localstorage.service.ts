export const setLocalStorageService = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage for key "${key}":`, error);
  }
};

export enum ELocalStorageKeys {
  AUTHENTICATED_USER = 'authenticatedUser',
}
