import { useEffect } from 'react';

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  selector?: string;
  animationClass?: string;
}

/**
 * Adds IntersectionObserver to elements with the provided selector (default .fade-up-on-scroll)
 * and appends animationClass (default 'fade-up') when they enter viewport.
 */
export function useRevealOnScroll({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
  once = true,
  selector = '.fade-up-on-scroll',
  animationClass = 'fade-up'
}: Options = {}) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const elements: HTMLElement[] = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          if (once) observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin, threshold });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [rootMargin, threshold, once, selector, animationClass]);
}

export default useRevealOnScroll;
