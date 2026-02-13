"use client";
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { SparklesCore } from "./sparkles";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "CEO, TechFlow Solutions",
        company: "TechFlow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Lord AI transformed our entire operation. We've seen a 300% increase in efficiency and saved over $2M in operational costs. The autonomous agents work flawlessly.",
        results: ["300% efficiency increase", "$2M cost savings", "24/7 automation"]
    },
    {
        name: "Marcus Johnson",
        role: "CTO, DataDrive Inc",
        company: "DataDrive",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The AI voice agents are revolutionary. Our customer satisfaction increased by 40% while reducing response time from hours to seconds. Incredible ROI.",
        results: ["40% satisfaction boost", "Instant responses", "Seamless integration"]
    },
    {
        name: "Elena Rodriguez",
        role: "VP Operations, ScaleUp Co",
        company: "ScaleUp",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "From workflow automation to social media management, Lord AI handles everything. Our team can finally focus on strategy instead of repetitive tasks.",
        results: ["Full automation", "Strategic focus", "Team productivity"]
    },
    {
        name: "David Kim",
        role: "Founder, GrowthLab",
        company: "GrowthLab",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The custom AI systems delivered results beyond our expectations. Revenue increased 150% while operational overhead decreased significantly.",
        results: ["150% revenue growth", "Reduced overhead", "Scalable systems"]
    },
    {
        name: "Lisa Thompson",
        role: "Director, InnovateCorp",
        company: "InnovateCorp",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Exceptional AI solutions that actually work. The implementation was smooth, and the results were immediate. Best investment we've made.",
        results: ["Immediate results", "Smooth integration", "High ROI"]
    }
];

export function PremiumTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Premium easing
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                ease: [0.16, 1, 0.3, 1] // Premium easing
            }
        }
    };

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="relative py-32 bg-black text-white overflow-hidden">
            {/* Top Gradient Mask for Seamless Transition */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0" style={{ willChange: 'transform' }}>
                <SparklesCore
                    id="testimonialsSparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={5}
                    className="w-full h-full absolute inset-0 z-0"
                    particleColor="#a855f7"
                    speed={1}
                />
                {/* Animated gradient mesh - Purple Theme */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/[0.1] to-violet-900/[0.1]"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                />

                {/* Moving light orbs - Optimized */}
                <motion.div
                    className="absolute top-1/3 left-1/5 w-72 h-72 bg-purple-600/20 rounded-full blur-2xl"
                    animate={{
                        x: [0, 150, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ willChange: 'transform' }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-2xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ willChange: 'transform' }}
                />

                {/* Floating particles - Reduced for performance */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-200/40 rounded-full"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${30 + (i * 10)}%`,
                            willChange: 'transform, opacity'
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 2, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            <motion.div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    variants={fadeInUp}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-500/[0.05] border border-purple-500/[0.2] backdrop-blur-sm mb-6"
                        whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="h-4 w-4 text-purple-400" />
                        </motion.div>
                        <span className="text-sm font-medium text-purple-100/90">
                            ✨ Client Success Stories
                        </span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    </motion.div>

                    <motion.h2
                        className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
                        variants={fadeInUp}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                            Trusted by
                        </span>
                        <br />
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                backgroundSize: '200% 200%'
                            }}
                        >
                            Industry Leaders
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        className="text-xl sm:text-2xl text-purple-100/60 max-w-4xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        Join thousands of businesses already transforming their operations with our premium AI solutions.
                    </motion.p>
                </motion.div>

                {/* Main Testimonial Display */}
                <div className="relative max-w-6xl mx-auto mb-16">
                    <div className="relative h-[500px] md:h-[400px] perspective-1000">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 },
                                    rotateY: { duration: 0.6 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative h-full bg-gradient-to-br from-purple-900/[0.1] to-black backdrop-blur-xl rounded-3xl border border-purple-500/[0.2] p-8 md:p-12 overflow-hidden group">
                                    {/* Animated background gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.05] via-transparent to-fuchsia-600/[0.05] rounded-3xl"
                                        animate={{
                                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                        }}
                                        transition={{
                                            duration: 15,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{
                                            backgroundSize: '300% 300%'
                                        }}
                                    />

                                    {/* Quote icon */}
                                    <motion.div
                                        className="absolute top-8 right-8 opacity-20"
                                        animate={{ rotate: [0, 10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <Quote className="w-16 h-16 text-purple-300" />
                                    </motion.div>

                                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                                        {/* User Info */}
                                        <div className="flex-shrink-0 text-center md:text-left">
                                            <motion.div
                                                className="relative mb-6"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-purple-500/30 relative">
                                                    <img
                                                        src={testimonials[currentIndex].avatar}
                                                        alt={testimonials[currentIndex].name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20"
                                                        animate={{ opacity: [0, 0.3, 0] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                    />
                                                </div>

                                                {/* Floating ring animation */}
                                                <motion.div
                                                    className="absolute inset-0 border-2 border-purple-400/40 rounded-full"
                                                    animate={{
                                                        scale: [1, 1.4, 1],
                                                        opacity: [0.5, 0, 0.5]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </motion.div>

                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            <p className="text-purple-400 mb-1 font-medium">
                                                {testimonials[currentIndex].role}
                                            </p>
                                            <p className="text-purple-200/60 mb-4">
                                                {testimonials[currentIndex].company}
                                            </p>

                                            {/* Star Rating */}
                                            <div className="flex justify-center md:justify-start gap-1 mb-6">
                                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1, duration: 0.3 }}
                                                    >
                                                        <Star className="w-5 h-5 fill-purple-400 text-purple-400" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <motion.blockquote
                                                className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.8 }}
                                            >
                                                "{testimonials[currentIndex].text}"
                                            </motion.blockquote>

                                            {/* Results */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {testimonials[currentIndex].results.map((result, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-purple-500/[0.1] rounded-lg p-3 border border-purple-500/[0.2] backdrop-blur-sm"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                                        whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                                                    >
                                                        <span className="text-sm text-purple-100/80 font-medium">
                                                            {result}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-6 mt-8">
                        <motion.button
                            onClick={prevTestimonial}
                            className="p-3 rounded-full bg-purple-500/[0.1] border border-purple-500/[0.2] backdrop-blur-sm text-white hover:bg-purple-500/[0.2] transition-all"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>

                        {/* Dots Indicator */}
                        <div className="flex gap-3">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-purple-500 scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextTestimonial}
                            className="p-3 rounded-full bg-purple-500/[0.1] border border-purple-500/[0.2] backdrop-blur-sm text-white hover:bg-purple-500/[0.2] transition-all"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={staggerContainer}
                >
                    {[
                        { number: "500+", label: "Happy Clients" },
                        { number: "98%", label: "Satisfaction Rate" },
                        { number: "$10M+", label: "Cost Savings" },
                        { number: "99.9%", label: "Uptime SLA" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            >
                                {stat.number}
                            </motion.div>
                            <div className="text-purple-100/60 text-sm font-medium group-hover:text-purple-100/90 transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>

    );
}
