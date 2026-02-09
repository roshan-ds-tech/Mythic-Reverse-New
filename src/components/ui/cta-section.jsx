"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useAnimation } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SparklesCore } from "./sparkles";

// ============================================================================
// RAINBOW BUTTON COMPONENT
// ============================================================================

const RainbowButton = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// ============================================================================
// GLASS BUTTON COMPONENT
// ============================================================================

const GlassButton = ({ children, className = "", ...props }) => {
    return (
        <div className={`glass-button-wrap cursor-pointer rounded-full ${className}`}>
            <button
                className="glass-button relative isolate all-unset cursor-pointer rounded-full transition-all text-base font-medium"
                {...props}
            >
                <span className="glass-button-text relative block select-none tracking-tighter px-6 py-3.5">
                    {children}
                </span>
            </button>
            <div className="glass-button-shadow rounded-full"></div>
        </div>
    );
};

// ============================================================================
// MAIN CTA COMPONENT
// ============================================================================

export function CTASection() {
    return (
        <>
            <style>{`
        :root {
          --color-1: 270 100% 63%;
          --color-2: 280 100% 70%;
          --color-3: 290 100% 65%;
          --color-4: 300 100% 68%;
          --color-5: 310 100% 72%;
        }

        @keyframes rainbow {
          0% { background-position: 0%; }
          100% { background-position: 200%; }
        }

        .animate-rainbow {
          animation: rainbow 2s infinite linear;
        }

        .glass-button-wrap {
          position: relative;
          display: inline-block;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          position: relative;
          z-index: 2;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .glass-button-shadow {
          position: absolute;
          inset: 0;
          background: rgba(139, 92, 246, 0.3);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 1;
        }

        .glass-button-wrap:hover .glass-button-shadow {
          opacity: 1;
        }
      `}</style>

            <div className="relative min-h-screen w-full overflow-hidden bg-black">
                {/* Sparkles Background */}
                <div className="absolute inset-0 z-0">
                    <SparklesCore
                        id="ctaSparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={25}
                        className="w-full h-full"
                        particleColor="#a855f7"
                        speed={1.5}
                    />
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

                {/* Content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-white/90 font-medium">Introducing the Future</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                        >
                            Transform Your
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                Digital Experience
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Elevate your brand with cutting-edge design and seamless functionality.
                            Join thousands of innovators who trust our platform.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <RainbowButton className="group">
                                <span className="flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </RainbowButton>

                            <GlassButton>
                                <span className="flex items-center gap-2">
                                    Watch Demo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </GlassButton>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
                        >
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
                                <div className="text-sm text-white/60">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                                <div className="text-sm text-white/60">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
                                <div className="text-sm text-white/60">Rating</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-5"></div>
            </div>
        </>
    );
};
