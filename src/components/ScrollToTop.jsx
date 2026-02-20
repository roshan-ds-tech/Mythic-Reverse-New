import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Find the element by the hash ignoring the #
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Scroll to the element slightly delayed to ensure rendering
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
