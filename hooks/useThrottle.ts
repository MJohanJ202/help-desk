import { useEffect, useRef, useState } from "react";

/**
 * Hook personalizado para aplicar throttle a un valor.
 * Asegura que el valor solo se actualice como máximo una vez cada `interval` milisegundos.
 *
 * A diferencia de debounce (que espera a que el usuario deje de escribir),
 * throttle ejecuta las actualizaciones de forma periódica mientras el usuario interactúa.
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecuted.current;

    if (elapsed >= interval) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval - elapsed);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
