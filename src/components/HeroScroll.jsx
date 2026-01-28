import React, { useEffect, useRef, useState } from 'react';

const HeroScroll = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef([]);
    const frameCount = 210; // Based on the file count in public/hero_section_animation

    // Helper to get image path
    const currentFrame = (index) =>
        `/hero_section_animation/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    useEffect(() => {
        // Preload images
        const preloadImages = async () => {
            const promises = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                promises.push(
                    new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve; // Continue even if error
                    })
                );
                imagesRef.current.push(img);
            }

            await Promise.all(promises);
            setImagesLoaded(true);

            // Initial draw
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (imagesRef.current[0]) {
                context.drawImage(imagesRef.current[0], 0, 0);
            }
        };

        preloadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const container = containerRef.current;

        // Set canvas dimensions to match image aspect ratio usually, 
        // or window size. The user prompt said object-fit: cover logic.
        // We'll handle resizing.

        const render = () => {
            // Logic handled in scroll listener
        };

        const handleScroll = () => {
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.height;
            const windowHeight = window.innerHeight;

            // Calculate scrollable distance (height - viewport)
            const scrollableDistance = containerHeight - windowHeight;

            // Distance scrolled from top of container
            const scrolled = -containerRect.top;

            let scrollFraction = scrolled / scrollableDistance;

            // Clamp between 0 and 1
            scrollFraction = Math.max(0, Math.min(1, scrollFraction));

            // Calculate frame index
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollFraction * frameCount)
            );

            requestAnimationFrame(() => {
                if (imagesRef.current[frameIndex]) {
                    const img = imagesRef.current[frameIndex];
                    const canvas = canvasRef.current;
                    const context = canvas.getContext('2d');

                    // High DPI support
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = window.innerWidth * dpr;
                    canvas.height = window.innerHeight * dpr;

                    // Reset transformation matrix before scaling to avoid cumulative scaling
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    // Scale context to match
                    context.scale(dpr, dpr);
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = 'high';

                    // Calculations based on CSS size (window.inner...)
                    const canvasWidth = window.innerWidth;
                    const canvasHeight = window.innerHeight;

                    const hRatio = canvasWidth / img.width;
                    const vRatio = canvasHeight / img.height;
                    const ratio = Math.max(hRatio, vRatio);

                    const centerShift_x = (canvasWidth - img.width * ratio) / 2;
                    const centerShift_y = (canvasHeight - img.height * ratio) / 2;

                    context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                }
            });

            // Text Animation Logic
            const title = document.getElementById("main-title");
            if (title && title.parentElement) {
                if (scrollFraction > 0.4 && scrollFraction < 0.98) {
                    title.parentElement.style.opacity = 1;
                } else {
                    title.parentElement.style.opacity = 0;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll); // Redraw on resize

        // Initial draw call
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [imagesLoaded]);

    return (
        <section className="hero-scroll-container" ref={containerRef}>
            <div className="sticky-wrapper">
                <canvas id="hero-canvas" ref={canvasRef}></canvas>
                <div className="hero-text">
                    <h1 id="main-title">Mythic Reverse Network</h1>
                </div>
            </div>
        </section>
    );
};

export default HeroScroll;
