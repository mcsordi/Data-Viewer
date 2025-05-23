import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500): string => {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDebounceValue(value);
      },
      value == '' ? 0 : delay,
    );
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
};
