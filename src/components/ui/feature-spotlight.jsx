"use client"

import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function FeaturedSpotlight() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-center md:gap-24 lg:justify-between w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Gradient Shadows */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 mix-blend-screen"
                style={{ opacity: isHovered ? 0.6 : 0.2 }}
            />
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700 mix-blend-screen"
                style={{ opacity: isHovered ? 0.5 : 0.1 }}
            />
            {/* Left: Text Block */}
            <div className="relative z-10 flex w-full max-w-[500px] shrink-0 flex-col items-center text-center md:items-start md:text-left lg:pt-4">
                {/* Label with animated line */}
                <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
                    <div
                        className="h-px bg-white transition-all duration-700"
                        style={{
                            width: isHovered ? 64 : 48,
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    />
                    <span
                        className="text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-700 md:text-sm"
                        style={{
                            letterSpacing: isHovered ? "0.3em" : "0.25em",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Who We Are
                    </span>
                </div>

                {/* Title - responsive text sizes */}
                <h2 className="relative drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                    <span
                        className="block text-5xl font-normal tracking-tight text-white transition-all duration-700 sm:text-6xl md:text-7xl lg:text-8xl"
                        style={{
                            transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Visionary
                    </span>
                    <span
                        className="block text-5xl font-normal tracking-tight text-white transition-all duration-700 sm:text-6xl md:text-7xl lg:text-8xl"
                        style={{
                            transform: isHovered ? "translateX(12px)" : "translateX(0)",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        Creators
                    </span>
                </h2>

                {/* Description - responsive spacing */}
                <p
                    className="mt-6 max-w-[400px] text-base leading-relaxed transition-all duration-700 md:mt-8 md:text-lg lg:mt-12 lg:max-w-[480px]"
                    style={{
                        color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    We are a collective of passionate developers, designers, and strategists working together to build the extraordinary. We believe in pushing boundaries and crafting digital experiences that resonate globally.
                </p>

                {/* Minimal CTA - responsive spacing */}
                <div className="mt-8 flex items-center gap-4 md:mt-10 lg:mt-12 group/cta">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 md:h-14 md:w-14 lg:h-16 lg:w-16 relative overflow-hidden"
                        style={{
                            borderColor: isHovered ? "transparent" : "rgba(255, 255, 255, 0.3)",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                            boxShadow: isHovered ? "0 0 20px rgba(139, 92, 246, 0.5)" : "0 0 0 transparent", // Violet shadow
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {/* Gradient Background Layer */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-opacity duration-500"
                            style={{ opacity: isHovered ? 1 : 0 }}
                        />

                        <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-500 md:h-5 md:w-5 relative z-10"
                            style={{
                                transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                                color: "#ffffff",
                                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        />
                    </div>
                    <span
                        className="text-xs font-medium uppercase tracking-widest transition-all duration-700 md:text-sm"
                        style={{
                            opacity: isHovered ? 1 : 0.5,
                            transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: isHovered ? "100ms" : "0ms",
                            backgroundImage: "linear-gradient(to right, #a78bfa, #e879f9)", // Violet to Fuchsia
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: isHovered ? "transparent" : "white",
                        }}
                    >
                        Learn More
                    </span>
                </div>
            </div>

            {/* Right: Image Block */}
            <div
                className="relative transition-all duration-700 w-full flex justify-center md:justify-end"
                style={{
                    transform: isHovered ? "translateX(4px) translateY(-4px)" : "translateX(0) translateY(0)",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Frame outline */}
                <div
                    className="absolute -inset-3 border transition-all duration-700 md:-inset-4 rounded-3xl"
                    style={{
                        borderColor: isHovered ? "rgba(167, 139, 250, 0.3)" : "transparent",
                        transform: isHovered ? "scale(1.01)" : "scale(1)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                />

                {/* Pop-out Gradient Shadow */}
                <div
                    className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur-xl opacity-0 transition-all duration-500 group-hover:opacity-40 group-hover:duration-500"
                    style={{
                        transform: isHovered ? "scale(1.05)" : "scale(0.9)",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                />

                {/* Image container - responsive sizing */}
                <div className="relative h-[400px] w-full max-w-[400px] overflow-hidden sm:h-[500px] sm:max-w-[450px] md:h-[600px] md:max-w-[500px] lg:h-[700px] lg:max-w-[600px] z-10 rounded-3xl">
                    <div
                        className="absolute -inset-1 transition-all duration-700 bg-black"
                        style={{
                            margin: '1px' // Slight inset to hide any potential seam
                        }}
                    />
                    <img
                        src="images/web_images/group1.jpg"
                        alt="Team collaboration"
                        className="h-full w-full object-cover transition-all duration-1000"
                        style={{
                            transform: isHovered ? "scale(1.03)" : "scale(1)",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    />

                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-opacity duration-700"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    />

                    {/* Corner accents */}
                    <div
                        className="absolute left-2 top-2 h-5 w-px bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:h-6"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "scaleY(1)" : "scaleY(0)",
                            transformOrigin: "top",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: "50ms",
                        }}
                    />
                    <div
                        className="absolute left-2 top-2 h-px w-5 bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:w-6"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: "100ms",
                        }}
                    />
                    <div
                        className="absolute bottom-2 right-2 h-5 w-px bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:h-6"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "scaleY(1)" : "scaleY(0)",
                            transformOrigin: "bottom",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: "150ms",
                        }}
                    />
                    <div
                        className="absolute bottom-2 right-2 h-px w-5 bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:w-6"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "right",
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            transitionDelay: "200ms",
                        }}
                    />
                </div>


            </div>
        </div>
    )
}
