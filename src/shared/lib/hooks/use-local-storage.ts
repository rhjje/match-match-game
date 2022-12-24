import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const getItem = () => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  };

  const [value, setValue] = useState<T>(getItem);

  const setItem = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setItem];
};
