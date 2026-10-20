import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Hook personalizado para observar cuando un elemento entra en el viewport usando IntersectionObserver.
 * Ideal para Infinite Scroll, cargando datos antes de que el usuario llegue al final de la página.
 */
export function useIntersectionObserver(
  onIntersect: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  const { enabled = true, rootMargin = "250px", threshold = 0 } = options;
  const targetRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) return;

    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting) {
          callbackRef.current();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold]);

  return targetRef;
}
