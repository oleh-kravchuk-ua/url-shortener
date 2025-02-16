import { useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DebounceFunction<T extends any[]> = (...args: T) => void;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useDebounce = <T extends any[]>(func: DebounceFunction<T>, delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: T) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
