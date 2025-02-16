import { useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type ThrottleFunction<T extends any[]> = (...args: T) => void;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useThrottle = <T extends any[]>(func: ThrottleFunction<T>, limit: number) => {
  const lastFunc = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRan = useRef<number>(0);

  return (...args: T) => {
    const now = Date.now();

    if (!lastRan.current || now - lastRan.current >= limit) {
      func(...args);
      lastRan.current = now;
    } else {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clearTimeout(lastFunc.current!);
      lastFunc.current = setTimeout(
        () => {
          func(...args);
          lastRan.current = Date.now();
        },
        limit - (now - lastRan.current),
      );
    }
  };
};
