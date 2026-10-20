import { useEffect, useState } from "react";

/**
 * Hook personalizado para aplicar debounce a un valor.
 * Retrasa la actualización de `debouncedValue` hasta que haya transcurrido
 * el tiempo indicado (`delay` en ms) sin que el valor original cambie.
 *
 * Ideal para inputs de búsqueda y filtros para evitar peticiones
 * por cada tecla pulsada y reducir el consumo de ancho de banda.
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
