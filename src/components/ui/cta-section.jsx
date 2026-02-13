"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

// Premium easing curve (awwwards-style)
const premiumEasing = [0.16, 1, 0.3, 1];

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

const PrimaryButton = ({ children, className = "", ...props }) => (
    <button
        className={`group relative inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 py-2 font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-colors duration-300 ${className}`}
        {...props}
    >
        {children}
    </button>
);

const SecondaryButton = ({ children, className = "", ...props }) => (
    <button
        className={`relative inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 py-2 font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300 ${className}`}
        {...props}
    >
        {children}
    </button>
);

// ============================================================================
// MAIN CTA COMPONENT — Lightweight with smooth scroll animations
// ============================================================================

export function CTASection() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black"></div>

            {/* Subtle radial glow — zero filter cost */}
            <div
                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge — scroll animated */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: premiumEasing }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white/90 font-medium">Introducing the Future</span>
                    </motion.div>

                    {/* Main Heading — scroll animated */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: premiumEasing }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                    >
                        Transform Your
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Digital Experience
                        </span>
                    </motion.h1>

                    {/* Description — scroll animated */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: premiumEasing }}
                        className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Elevate your brand with cutting-edge design and seamless functionality.
                        Join thousands of innovators who trust our platform.
                    </motion.p>

                    {/* CTA Buttons — scroll animated */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: premiumEasing }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <PrimaryButton>
                            <span className="flex items-center gap-2">
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </PrimaryButton>

                        <SecondaryButton>
                            <span className="flex items-center gap-2">
                                Watch Demo
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </SecondaryButton>
                    </motion.div>

                    {/* Stats — scroll animated */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: premiumEasing }}
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
    );
}
