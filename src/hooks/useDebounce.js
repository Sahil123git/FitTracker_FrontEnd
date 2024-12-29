import { useState, useEffect } from "react";
const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler); //Cleanup cancels the previous timer and sets a new one.
    };
  }, [value, delay]);
  return debouncedValue;
};
export default useDebouncedValue;