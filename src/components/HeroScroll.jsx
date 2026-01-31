import React, { useEffect, useRef, useState } from 'react';
import { useMobile } from "../hooks/use-mobile";
import { SparklesCore } from "./ui/sparkles";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HeroScroll = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef([]);
    const frameCount = 210; // Based on the file count in public/hero_section_animation
    const isMobile = useMobile();

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
            const windowHeight = isMobile ? window.innerHeight * 0.6 : window.innerHeight;

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
                    // On mobile, use a shorter height (60% of viewport) to avoid taking up too much space
                    const targetHeight = isMobile ? window.innerHeight * 0.6 : window.innerHeight;
                    canvas.height = targetHeight * dpr;

                    // Reset transformation matrix before scaling to avoid cumulative scaling
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    // Scale context to match
                    context.scale(dpr, dpr);
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = 'high';

                    // Calculations based on CSS size (window.inner...)
                    const canvasWidth = window.innerWidth;
                    const canvasHeight = targetHeight;

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
    }, [imagesLoaded, isMobile]);

    // Custom smooth scroll function
    const smoothScrollToBottom = () => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const absoluteBottom = window.scrollY + containerRect.bottom;

            const startPosition = window.scrollY;
            const distance = absoluteBottom - startPosition;
            const duration = 3000; // 3 seconds for a slow, smooth scroll
            let start = null;

            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Ease-in-out easing function
                const ease = percentage < 0.5
                    ? 2 * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 2) / 2;

                window.scrollTo(0, startPosition + distance * ease);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            smoothScrollToBottom();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="hero-scroll-container"
            ref={containerRef}
            style={{ height: isMobile ? '250vh' : '400vh' }}
        >
            <div className="sticky-wrapper relative">
                <canvas
                    id="hero-canvas"
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: isMobile ? '60vh' : '100%',
                        objectFit: 'cover'
                    }}
                ></canvas>

                {/* Sparkles with mask to avoid covering the center (laptop) */}
                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <div className="w-full h-full bg-transparent absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                        <SparklesCore
                            id="tsparticleshero"
                            background="transparent"
                            minSize={1}
                            maxSize={3}
                            particleDensity={500}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                    </div>
                </div>

                <div className="hero-text">
                    <h1 id="main-title" className="font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 text-[1 em] drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">Mythic Reverse</span> <br className="md:hidden" /> Network
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white cursor-pointer flex flex-col items-center"
                    onClick={smoothScrollToBottom}
                >
                    <p className="text-white text-sm mb-2 font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">Click to explore</p>
                    <ChevronDown size={48} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] mx-auto" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroScroll;
