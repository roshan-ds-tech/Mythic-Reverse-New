"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProjectInquiryDialog } from "./ui/project-inquiry-dialog";


// --- Futuristic Particle Canvas Background ---
const FuturisticBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        let animationFrameId;

        const animate = () => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';

            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                ctx.fill();

                particles.forEach((otherParticle, j) => {
                    if (i === j) return;
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.6 }}
        />
    );
};



// --- Floating Orb ---
const FloatingOrb = ({ delay = 0, duration = 20 }) => {
    return (
        <motion.div
            className="absolute rounded-full blur-3xl"
            style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                width: '400px',
                height: '400px',
            }}
            animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    );
};

// --- Main Hero Section ---
export function HeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen w-full bg-transparent text-white flex items-center justify-center"
        >


            <div className="absolute top-1/4 left-1/4">
                <FloatingOrb delay={0} duration={25} />
            </div>
            <div className="absolute bottom-1/4 right-1/4">
                <FloatingOrb delay={5} duration={30} />
            </div>

            <FuturisticBackground />



            <motion.div
                className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-purple-300">
                            Mythic Reverse Studio
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                    >
                        <span className="block bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            Delivering
                        </span>
                        <span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Digital Firsts
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 max-w-3xl leading-relaxed"
                    >
                        We are a design and technology collective. We build products, platforms,
                        and experiences that define the next generation of the web.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                        <button
                            onClick={() => setDialogOpen(true)}
                            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 w-full sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Your Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <button
                            onClick={() => navigate('/services')}
                            className="inline-flex h-14 items-center justify-center rounded-full border-2 border-purple-500/50 text-white hover:bg-purple-500/10 px-8 font-semibold text-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
                        >
                            View Our Work
                        </button>
                    </motion.div>

                    {/* Status indicators */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-8 pt-8 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>Available for Projects</span>
                        </div>
                        <div className="h-4 w-px bg-gray-700" />
                        <span>Trusted by 100+ Brands</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom gradient fade */}


            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-0 right-0 mx-auto w-fit"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>

            {/* Project Inquiry Dialog */}
            <ProjectInquiryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </section>
    );
}
