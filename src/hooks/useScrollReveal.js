import { useEffect } from 'react';

/**
 * Custom hook to trigger animations when an element enters the viewport.
 * Uses IntersectionObserver with "animate once" logic and cleanup.
 * 
 * @param {React.RefObject} ref - Reference to the element(s) or container.
 * @param {string} selector - Optional selector if observing visible children of a container.
 * @param {string} activeClass - Class to add when visible. Default 'animate-fade-in-up'.
 */
export function useScrollReveal(ref, selector = null, activeClass = 'animate-fade-in-up') {
    useEffect(() => {
        // Fallback for older browsers
        if (!('IntersectionObserver' in window)) {
            const elements = selector
                ? ref.current?.querySelectorAll(selector)
                : [ref.current];

            elements?.forEach(el => {
                if (el) el.classList.add(activeClass);
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(activeClass);
                        // Animate Once: Stop observing after triggering
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px", // Trigger slightly before bottom
            }
        );

        const elements = selector
            ? ref.current?.querySelectorAll(selector)
            : [ref.current];

        elements?.forEach((el) => {
            if (el) observer.observe(el);
        });

        // Cleanup: Always disconnect observer
        return () => observer.disconnect();
    }, [ref, selector, activeClass]);
}
