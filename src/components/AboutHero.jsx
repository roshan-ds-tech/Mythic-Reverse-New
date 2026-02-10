import React, { useState } from 'react';
import AnimatedShaderBackground from "./ui/animated-shader-background";
import { motion } from "framer-motion";
import { HyperText } from "./ui/hyper-text";
import { SparklesCore } from "./ui/sparkles";
import { ProjectInquiryDialog } from "./ui/project-inquiry-dialog";

export function AboutHero() {
    const [dialogOpen, setDialogOpen] = useState(false);

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
                        id="about-us-hero-sparkles"
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

                <div className="relative z-10 text-center flex flex-col items-center gap-4">
                    <HyperText
                        className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 whitespace-nowrap"
                        text="MYTHIC REVERSE"
                        duration={50}
                    />
                    <HyperText
                        className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 whitespace-nowrap"
                        text="DEVELOPMENT STUDIO "
                        duration={50}
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a design and technology collective. We build products, platforms,
                        and experiences that define the next generation of the web.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => setDialogOpen(true)}
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-neutral-200 w-full sm:w-auto"
                        >
                            <span className="mr-2">Start Your Project</span>
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 transition-opacity group-hover:opacity-10" />
                        </button>

                        <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 w-full sm:w-auto">
                            View Our Work
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Project Inquiry Dialog */}
            <ProjectInquiryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
    );
}
