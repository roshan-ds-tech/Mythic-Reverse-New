import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const TestimonialCarousel = forwardRef(
    (
        { className, testimonials, showArrows = true, showDots = true, autoplay = false, autoplayInterval = 5000, ...props },
        ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [exitX, setExitX] = useState(0);

        // Autoplay functionality
        React.useEffect(() => {
            if (!autoplay) return;

            const interval = setInterval(() => {
                setExitX(-100);
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                    setExitX(0);
                }, 200);
            }, autoplayInterval);

            return () => clearInterval(interval);
        }, [autoplay, autoplayInterval, testimonials]);

        const handleDragEnd = (event, info) => {
            if (Math.abs(info.offset.x) > 100) {
                setExitX(info.offset.x);
                setTimeout(() => {
                    if (info.offset.x < 0) {
                        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                    } else {
                        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                    }
                    setExitX(0);
                }, 200);
            }
        };

        return (

            <div
                ref={ref}
                className={cn(
                    "h-[600px] w-full flex items-center justify-center py-0",
                    className
                )}
                {...props}
            >
                <div className="relative w-[320px] h-[600px] md:w-[900px] md:h-[500px]">
                    {testimonials.map((testimonial, index) => {
                        const isCurrentCard = index === currentIndex;
                        const isPrevCard =
                            index === (currentIndex + 1) % testimonials.length;
                        const isNextCard =
                            index === (currentIndex + 2) % testimonials.length;

                        if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

                        return (
                            <motion.div
                                key={testimonial.id}
                                className={cn(
                                    "absolute w-full h-full rounded-3xl cursor-grab active:cursor-grabbing",
                                    "bg-[#0B0B12]/90 backdrop-blur-xl border border-white/10",
                                    "shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)]"
                                )}
                                style={{
                                    zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                                }}
                                drag={isCurrentCard ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                                initial={{
                                    scale: 0.9,
                                    opacity: 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                                    rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                                }}
                                animate={{
                                    scale: isCurrentCard ? 1 : 0.9,
                                    opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                                    x: isCurrentCard ? exitX : 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                                    rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                {showArrows && isCurrentCard && (
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 pointer-events-none">
                                        <button
                                            className="pointer-events-auto text-4xl select-none cursor-pointer text-white/20 hover:text-white/80 transition-colors p-4 hover:scale-110 active:scale-95"
                                            onClick={() => {
                                                setExitX(100);
                                                setTimeout(() => {
                                                    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                                                    setExitX(0);
                                                }, 200);
                                            }}
                                        >
                                            &larr;
                                        </button>
                                        <button
                                            className="pointer-events-auto text-4xl select-none cursor-pointer text-white/20 hover:text-white/80 transition-colors p-4 hover:scale-110 active:scale-95"
                                            onClick={() => {
                                                setExitX(-100);
                                                setTimeout(() => {
                                                    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                                                    setExitX(0);
                                                }, 200);
                                            }}
                                        >
                                            &rarr;
                                        </button>
                                    </div>
                                )}

                                <div className="p-6 md:p-14 flex flex-col md:flex-row items-center gap-4 md:gap-12 h-full justify-center text-center md:text-left">
                                    <div className="relative group shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                        <div className="relative w-28 h-28 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-br from-white/10 to-white/0 overflow-hidden backdrop-blur-sm">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full rounded-full object-cover border-2 border-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-8 max-w-2xl text-left">
                                        <div>
                                            <h3 className="text-3xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-1">
                                                {testimonial.name}
                                            </h3>
                                            {testimonial.role && (
                                                <p className="text-sm font-bold text-violet-400 mb-3 tracking-widest uppercase">
                                                    {testimonial.role}
                                                </p>
                                            )}
                                            <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mx-auto md:mx-0" />
                                        </div>

                                        <div className="relative">
                                            {!testimonial.role && (
                                                <span className="absolute -top-4 -left-2 text-6xl text-violet-500/20 font-serif leading-none">"</span>
                                            )}
                                            <div className="text-sm md:text-base font-medium leading-relaxed text-zinc-400 relative z-10 text-left">
                                                {testimonial.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    {showDots && (
                        <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={cn(
                                        "w-3 h-3 rounded-full transition-all duration-300",
                                        index === currentIndex
                                            ? "bg-violet-500 w-8"
                                            : "bg-white/10 hover:bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
