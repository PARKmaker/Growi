/**
 * Created by tkdgu:박상현 on 2024-11-21
 */

import { useState } from 'react';

export default function useLocalStorage<StoredValue>(key: string, initialValue: StoredValue) {
  const [storedValue, setStoredValue] = useState<StoredValue>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return JSON.parse(item || JSON.stringify(initialValue));
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  function setValue(value: StoredValue) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  return { storedValue, setValue };
}
