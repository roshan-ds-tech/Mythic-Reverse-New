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
    const frameCount = 210;
    const isMobile = useMobile();

    // Animation State
    const [hasTriggered, setHasTriggered] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const autoFrameRef = useRef(0); // Tracks auto-play progress (0 to 210)
    const requestRef = useRef();
    const startTimeRef = useRef();

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
            if (imagesRef.current[0]) {
                drawFrame(0);
            }
        };

        preloadImages();
    }, []);

    const drawFrame = (frameIndex) => {
        const index = Math.min(frameCount - 1, Math.max(0, Math.floor(frameIndex)));
        const img = imagesRef.current[index];
        const canvas = canvasRef.current;
        if (!img || !canvas) return;

        const context = canvas.getContext('2d');

        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        // On mobile, use a shorter height
        const targetHeight = isMobile ? window.innerHeight * 0.6 : window.innerHeight;
        canvas.height = targetHeight * dpr;

        // Reset transformation matrix before scaling
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const canvasWidth = window.innerWidth;
        const canvasHeight = targetHeight;

        const hRatio = canvasWidth / img.width;
        const vRatio = canvasHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvasWidth - img.width * ratio) / 2;
        const centerShift_y = (canvasHeight - img.height * ratio) / 2;

        context.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

        // Text Animation Logic based on frame index
        const title = document.getElementById("main-title");
        if (title && title.parentElement) {
            if (index > 85 && index < 205) {
                title.parentElement.style.opacity = 1;
            } else {
                title.parentElement.style.opacity = 0;
            }
        }
    };

    // 1. Triggers: Timer (2s) or Scroll
    useEffect(() => {
        if (!imagesLoaded) return;

        const timer = setTimeout(() => {
            if (!hasTriggered) setHasTriggered(true);
        }, 2000);

        const handleScrollTrigger = () => {
            if (!hasTriggered && window.scrollY > 0) {
                setHasTriggered(true);
            }
        };

        window.addEventListener('scroll', handleScrollTrigger);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScrollTrigger);
        };
    }, [imagesLoaded, hasTriggered]);

    // 2. Animation Logic (Hybrid)
    useEffect(() => {
        if (!imagesLoaded) return;

        const animate = (time) => {
            // A. Update Auto-Play Frame
            // Only update auto-play if we haven't synced yet
            if (hasTriggered && !isSynced && autoFrameRef.current < frameCount) {
                if (!startTimeRef.current) startTimeRef.current = time;
                const progress = time - startTimeRef.current;
                const duration = 2000; // 2 seconds duration (Fast)

                const fraction = Math.min(progress / duration, 1);
                autoFrameRef.current = fraction * (frameCount - 1);
            }

            // B. Calculate Scroll Frame
            const container = containerRef.current;
            let scrollFrame = 0;

            if (container) {
                const containerRect = container.getBoundingClientRect();
                const containerHeight = containerRect.height;
                const windowHeight = isMobile ? window.innerHeight * 0.6 : window.innerHeight;
                const scrollableDistance = containerHeight - windowHeight;
                const scrolled = -containerRect.top; // Distance from top

                // If user scrolled past the section, reset autoFrame to allow reverse scrubbing
                if (scrolled > scrollableDistance + 10) {
                    autoFrameRef.current = 0;
                    if (!isSynced) setIsSynced(true);
                }

                let scrollFraction = scrolled / scrollableDistance;
                scrollFraction = Math.max(0, Math.min(1, scrollFraction));
                scrollFrame = scrollFraction * (frameCount - 1);
            }

            // C. Combine: Use Max(Auto, Scroll)
            const finalFrame = Math.max(autoFrameRef.current, scrollFrame);

            drawFrame(finalFrame);

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [imagesLoaded, hasTriggered, isMobile, isSynced]);

    // Handle Resize Redraw
    useEffect(() => {
        const handleResize = () => {
            // Redraw handled by animation loop
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Custom smooth scroll function
    const smoothScrollToBottom = () => {
        // Simple scroll to next section
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    // Handle "Click to explore"
    const handleExploreClick = () => {
        if (!hasTriggered) {
            setHasTriggered(true);
        } else {
            smoothScrollToBottom();
        }
    };

    return (
        <section
            className="hero-scroll-container"
            ref={containerRef}
            style={{ height: isMobile ? '250vh' : '300vh' }} // Increased height for scrubbing
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
                    onClick={handleExploreClick}
                >
                    <p className="text-white text-sm mb-2 font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">Click to explore</p>
                    <ChevronDown size={48} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] mx-auto" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroScroll;
