import React, { useState, useEffect } from 'react';
import AnimatedShaderBackground from "./ui/animated-shader-background";


import { SparklesCore } from "./ui/sparkles";
import { HyperText } from "./ui/hyper-text";
import { ProjectInquiryDialog } from "./ui/project-inquiry-dialog";

export function AboutHero() {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Auto-open dialog after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setDialogOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="text-white selection:bg-purple-500/30 w-full relative">
            <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">

                {/* Background Gradients */}
                <div className="absolute inset-0 z-0">
                    <AnimatedShaderBackground />
                </div>

                {/* Bright Sparkles Overlay for Hero - Layered on top of global sparkles */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <SparklesCore
                        id="hero-sparkles-bright"
                        background="transparent"
                        minSize={1.0}
                        maxSize={2.2}
                        particleDensity={50}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Gradient to blend hero into next section */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent z-[2] pointer-events-none" />

                <div className="relative z-10 text-center flex flex-col items-center gap-4">
                    <div className="animate-fade-in-up delay-100 opacity-0 fill-mode-forwards">
                        <HyperText
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 whitespace-nowrap"
                            text="MYTHIC REVERSE"
                            duration={50}
                        />
                    </div>

                    <div className="animate-fade-in-up delay-300 opacity-0 fill-mode-forwards">
                        <HyperText
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 whitespace-nowrap"
                            text="DEVELOPMENT STUDIO"
                            duration={50}
                        />
                    </div>

                    <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-500 opacity-0 fill-mode-forwards">
                        We are a design and technology collective. We build products, platforms,
                        and experiences that define the next generation of the web.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-700 opacity-0 fill-mode-forwards">
                        <button
                            onClick={() => setDialogOpen(true)}
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-neutral-200 w-full sm:w-auto transform hover:scale-105 cursor-pointer"
                        >
                            <span className="mr-2">Start Your Project</span>
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 transition-opacity group-hover:opacity-10" />
                        </button>

                        <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 w-full sm:w-auto transform hover:scale-105 cursor-pointer">
                            View Our Work
                        </button>
                    </div>
                </div>
            </div>

            {/* Project Inquiry Dialog */}
            <ProjectInquiryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
    );
}
