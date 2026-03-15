"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectInquiryDialog } from "./project-inquiry-dialog";

export function CTASection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <section className="relative w-full overflow-hidden py-16 sm:py-32 md:py-40">

            {/* Ambient Purple Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-black/40 to-black/80 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none hidden sm:block" />



            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8 backdrop-blur-sm"
                >
                    <span className="text-sm font-medium text-violet-200">Ready to Scale?</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 relative"
                >
                    Build Something <br className="hidden md:block" />
                    <span className="relative whitespace-nowrap">
                        <span className="absolute -inset-1 bg-violet-500/20 blur-xl rounded-full"></span>
                        <span className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Truly Extraordinary
                        </span>
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
                >
                    Join a community of innovators and start building the future today.
                    Your journey to excellence begins with a single step.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    >
                        <span className="mr-2">Get Started Now</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </button>
                </motion.div>
            </div>

            <ProjectInquiryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

            {/* Beam/Separator Line at Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </section>
    );
}
