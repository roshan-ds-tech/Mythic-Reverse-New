
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import AnimatedShaderBackground from "./ui/animated-shader-background";
import { SparklesCore } from "./ui/sparkles";

export function HeroSection() {
    return (
        <div className="bg-black text-white selection:bg-purple-500/30 w-full">
            <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">

                {/* Background Gradients */}
                <div className="absolute inset-0 z-0">
                    <AnimatedShaderBackground />
                </div>

                {/* Sparkles Overlay */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <SparklesCore
                        id="hero-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Gradient to blend hero into next section - exactly like About Us */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />

                <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                        <span className="text-xs font-medium tracking-wide uppercase">Mythic Reverse Studio</span>
                        <ChevronRight className="h-4 w-4 text-neutral-500" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-4 max-w-5xl mx-auto leading-[1.1]"
                    >
                        Delivering <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                            Digital Firsts
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a design and technology collective. We build products, platforms,
                        and experiences that define the next generation of the web.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-neutral-200 w-full sm:w-auto">
                            <span className="mr-2">Start Your Project</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 transition-opacity group-hover:opacity-10" />
                        </button>

                        <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 w-full sm:w-auto">
                            View Our Work
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
