"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Target,
    Lightbulb,
    Rocket,
    TrendingUp,
    Users,
    Building2,
    GraduationCap,
    ShoppingCart,
    Zap,
    Calendar,
    Send,
    ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Spotlight } from '../components/ui/spotlight';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import AnimatedShaderBackground from '../components/ui/animated-shader-background';
import { SparklesCore } from '../components/ui/sparkles';
import { Footer } from '../components/ui/footer-section';

// Count Animation Component
function CountAnimation({
    number,
    className,
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, number, { duration: 2 });
        return animation.stop;
    }, [number, count]);

    return <motion.span className={className}>{rounded}</motion.span>;
}

// Animated Gradient Text Component
function AnimatedGradientText({
    children,
    className,
}) {
    return (
        <div
            className={`group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/5 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8B5CF61f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8B5CF63f] ${className}`}
        >
            <div
                className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#8B5CF6]/50 via-[#D946EF]/50 to-[#8B5CF6]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
            />
            {children}
        </div>
    );
}

// Tilt Card Component
function TiltCard({ title, description, icon: Icon, className, hoverColor = "hover:bg-[#8B5CF6]", ...props }) {
    return (
        <motion.div
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118] p-8 transition-all duration-500 ease-out hover:-rotate-1 hover:scale-105 hover:border-[#8B5CF6]/50 hover:shadow-2xl hover:shadow-[#8B5CF6]/20 ${className}`}
            whileHover={{ y: -8 }}
            {...props}
        >
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-br from-[#8B5CF6]/10 to-[#D946EF]/10 group-hover:opacity-100`} />
            <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-[#8B5CF6]/10 p-3 text-[#8B5CF6] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#8B5CF6]/20">
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{description}</p>
            </div>
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#8B5CF6]/5 blur-3xl transition-all duration-500 group-hover:bg-[#8B5CF6]/10" />
        </motion.div>
    );
}

// Main Consultation Page Component
const Consultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.projectType) newErrors.projectType = 'Please select a project type';
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to section if hash is present
    useEffect(() => {
        if (window.location.hash === '#consultation-form') {
            const element = document.getElementById('consultation-form');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    const whyConsultCards = [
        {
            icon: Target,
            title: "Strategic Roadmapping",
            description: "Transform your vision into actionable milestones with data-driven planning and clear execution paths."
        },
        {
            icon: Lightbulb,
            title: "Technology Architecture Planning",
            description: "Build scalable, future-proof systems with cutting-edge tech stacks tailored to your business needs."
        },
        {
            icon: TrendingUp,
            title: "Growth-Focused Marketing Strategy",
            description: "Accelerate your market presence with innovative digital marketing campaigns that drive real results."
        },
        {
            icon: Rocket,
            title: "Scalable SaaS & Product Development",
            description: "Launch powerful products that scale effortlessly from MVP to enterprise-grade solutions."
        }
    ];

    const processSteps = [
        {
            title: "Discovery & Analysis",
            description: "Deep dive into your business goals, challenges, and market landscape to understand your unique needs."
        },
        {
            title: "Strategy Blueprint",
            description: "Craft a comprehensive roadmap with clear objectives, timelines, and success metrics aligned with your vision."
        },
        {
            title: "Execution Planning",
            description: "Define technical architecture, resource allocation, and implementation phases for seamless delivery."
        },
        {
            title: "Implementation & Optimization",
            description: "Launch with precision and continuously optimize based on real-time data and user feedback."
        }
    ];

    const industries = [
        { icon: Zap, title: "Startups", description: "Launch fast, scale faster" },
        { icon: Building2, title: "Growing Businesses", description: "Accelerate your growth trajectory" },
        { icon: Users, title: "Tech Founders", description: "Turn ideas into reality" },
        { icon: GraduationCap, title: "Educational Institutions", description: "Modernize learning experiences" },
        { icon: ShoppingCart, title: "E-commerce Brands", description: "Dominate digital commerce" }
    ];

    const stats = [
        { label: "Websites Delivered", value: 150, suffix: "+" },
        { label: "Successful Campaigns", value: 200, suffix: "+" },
        { label: "Workshops Conducted", value: 45, suffix: "+" },
        { label: "Client Satisfaction", value: 98, suffix: "%" }
    ];

    return (
        <div className="relative min-h-screen bg-[#0B0B12] text-white overflow-hidden pt-20">
            {/* Global Background Effects */}
            <div className="fixed inset-0 z-0">
                <AnimatedShaderBackground />
            </div>

            {/* Sparkles Overlay */}
            <div className="fixed inset-0 z-[1] pointer-events-none">
                <SparklesCore
                    id="consultation-hero-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="fixed inset-0 z-[2] bg-black/40 pointer-events-none" />
            <div className="fixed inset-0 z-[2] bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent pointer-events-none" />

            {/* Content Wrapper to ensure visibility over background overlay */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-6 py-20">

                    <motion.div
                        className="relative z-10 max-w-5xl mx-auto text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            className="mb-8 inline-block"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <AnimatedGradientText>
                                <span className="inline animate-gradient bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#8B5CF6] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                                    Strategic IT Consulting
                                </span>
                            </AnimatedGradientText>
                        </motion.div>

                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70">
                                Let's Build Your Next{' '}
                            </span>
                            <br className="hidden md:block" />
                            <span className="inline-block bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] pb-2">
                                Digital Breakthrough
                            </span>
                        </motion.h1>

                        <div className="mb-12 max-w-3xl mx-auto">
                            <TextGenerateEffect
                                words="Partner with innovation leaders to accelerate growth, optimize technology, and dominate your market with strategic IT solutions."
                                className="text-xl sm:text-2xl text-[#A1A1AA] font-normal leading-relaxed"
                            />
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <Button
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#8B5CF6]/25 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all cursor-pointer"
                                onClick={() => document.getElementById('consultation-form').scrollIntoView({ behavior: 'smooth' })}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book a Free Consultation
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-[#8B5CF6]/50 text-white hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] px-8 py-6 text-lg rounded-xl transition-all cursor-pointer"
                                onClick={() => document.getElementById('consultation-process').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Explore Our Process
                            </Button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Why Consult With Us */}
                <section className="relative py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Why Consult With{' '}
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                    Mythic Reverse
                                </span>
                            </h2>
                            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
                                We combine strategic thinking with technical excellence to deliver solutions that drive measurable business growth.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ staggerChildren: 0.2 }}
                        >
                            {whyConsultCards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <TiltCard
                                        title={card.title}
                                        description={card.description}
                                        icon={card.icon}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Consultation Process */}
                <section id="consultation-process" className="relative py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Our Consultation{' '}
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                    Process
                                </span>
                            </h2>
                            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
                                A proven methodology that transforms ideas into successful digital products.
                            </p>
                        </motion.div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B5CF6] via-[#D946EF] to-[#8B5CF6] opacity-30" />

                            <div className="space-y-16">
                                {processSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative flex gap-8 items-start"
                                        initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {/* Step Number */}
                                        <motion.div
                                            className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${activeStep === index
                                                ? 'bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] text-white shadow-lg shadow-[#8B5CF6]/50 scale-110'
                                                : 'bg-[#111118] border-2 border-[#8B5CF6]/30 text-[#8B5CF6]'
                                                }`}
                                            animate={activeStep === index ? {
                                                boxShadow: [
                                                    '0 0 20px rgba(139, 92, 246, 0.5)',
                                                    '0 0 40px rgba(139, 92, 246, 0.8)',
                                                    '0 0 20px rgba(139, 92, 246, 0.5)',
                                                ]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {index + 1}
                                            {activeStep === index && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-[#8B5CF6]/30"
                                                    initial={{ scale: 1, opacity: 1 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Step Content */}
                                        <div className="flex-1 bg-[#111118] border border-white/10 rounded-2xl p-8 hover:border-[#8B5CF6]/50 transition-all duration-500 group">
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#8B5CF6] transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-[#A1A1AA] leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="relative py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Industries We{' '}
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                    Serve
                                </span>
                            </h2>
                            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
                                Empowering diverse sectors with tailored technology solutions.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {industries.map((industry, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118]/50 backdrop-blur-sm p-8 hover:border-[#8B5CF6]/50 transition-all duration-500"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-[#D946EF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 text-center">
                                        <div className="mb-4 inline-flex rounded-xl bg-[#8B5CF6]/10 p-4 text-[#8B5CF6] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#8B5CF6]/20">
                                            <industry.icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{industry.title}</h3>
                                        <p className="text-sm text-[#A1A1AA]">{industry.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Trust & Results */}
                <section className="relative py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Proven{' '}
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                    Results
                                </span>
                            </h2>
                            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
                                Numbers that speak to our commitment to excellence.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118] p-8 text-center hover:border-[#8B5CF6]/50 transition-all duration-500 group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-[#D946EF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                            <CountAnimation number={stat.value} />
                                            {stat.suffix}
                                        </div>
                                        <div className="text-[#A1A1AA] font-medium">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Consultation Form */}
                <section id="consultation-form" className="relative py-32 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Start Your{' '}
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                    Journey
                                </span>
                            </h2>
                            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
                                Fill out the form below and our team will reach out within 24 hours.
                            </p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key="form"
                                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111118]/80 backdrop-blur-xl p-8 md:p-12"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-[#D946EF]/5" />

                                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-white">Name *</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className={`bg-[#0B0B12] border-white/10 text-white placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all ${errors.name ? 'border-red-500' : ''
                                                            }`}
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-400 text-sm"
                                                    >
                                                        {errors.name}
                                                    </motion.p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className={`bg-[#0B0B12] border-white/10 text-white placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all ${errors.email ? 'border-red-500' : ''
                                                        }`}
                                                />
                                                {errors.email && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-400 text-sm"
                                                    >
                                                        {errors.email}
                                                    </motion.p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="company" className="text-white">Company</Label>
                                                <Input
                                                    id="company"
                                                    type="text"
                                                    placeholder="Your Company"
                                                    value={formData.company}
                                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                                    className="bg-[#0B0B12] border-white/10 text-white placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="projectType" className="text-white">Project Type *</Label>
                                                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                                                    <SelectTrigger className={`bg-[#0B0B12] border-white/10 text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6] ${errors.projectType ? 'border-red-500' : ''}`}>
                                                        <SelectValue placeholder="Select project type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#111118] border-white/10">
                                                        <SelectItem value="website">Website Development</SelectItem>
                                                        <SelectItem value="saas">SaaS Development</SelectItem>
                                                        <SelectItem value="app">App Development</SelectItem>
                                                        <SelectItem value="marketing">Digital Marketing</SelectItem>
                                                        <SelectItem value="edtech">EdTech Solutions</SelectItem>
                                                        <SelectItem value="consulting">IT Consulting</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.projectType && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-400 text-sm"
                                                    >
                                                        {errors.projectType}
                                                    </motion.p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="budget" className="text-white">Budget Range</Label>
                                            <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                                                <SelectTrigger className="bg-[#0B0B12] border-white/10 text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]">
                                                    <SelectValue placeholder="Select budget range" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#111118] border-white/10">
                                                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                                    <SelectItem value="100k+">$100,000+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-white">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us about your project..."
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                className={`bg-[#0B0B12] border-white/10 text-white placeholder:text-[#A1A1AA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6] transition-all resize-none ${errors.message ? 'border-red-500' : ''
                                                    }`}
                                            />
                                            {errors.message && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-sm"
                                                >
                                                    {errors.message}
                                                </motion.p>
                                            )}
                                        </div>

                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full relative group overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] text-white font-medium py-6 text-lg rounded-xl shadow-lg shadow-[#8B5CF6]/25 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all disabled:opacity-50"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                                    initial={{ x: "-100%" }}
                                                    whileHover={{ x: "100%" }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                                <span className="relative flex items-center justify-center gap-2">
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    ) : (
                                                        <>
                                                            <Send className="h-5 w-5" />
                                                            Send Message
                                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </span>
                                            </Button>
                                        </motion.div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    className="relative overflow-hidden rounded-3xl border border-[#8B5CF6]/30 bg-[#111118]/80 backdrop-blur-xl p-12 text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-[#D946EF]/10" />
                                    <div className="relative z-10">
                                        <motion.div
                                            className="w-24 h-24 rounded-full bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] flex items-center justify-center mx-auto mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle className="w-12 h-12 text-[#8B5CF6]" />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                                        <p className="text-xl text-[#A1A1AA] mb-8">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
                                            }}
                                            variant="outline"
                                            className="border-[#8B5CF6]/50 text-white hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]"
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative py-32 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/20 via-[#111118] to-[#D946EF]/20 p-12 md:p-20 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0">
                                <motion.div
                                    className="absolute top-0 left-1/4 w-64 h-64 bg-[#8B5CF6]/30 rounded-full blur-3xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#D946EF]/30 rounded-full blur-3xl"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>

                            <div className="relative z-10">
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    {/* Sparkles icon removed */}
                                </motion.div>

                                <motion.h2
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    Your Vision Deserves{' '}
                                    <span className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                                        Strategic Execution
                                    </span>
                                </motion.h2>

                                <motion.p
                                    className="text-xl text-[#A1A1AA] mb-10 max-w-2xl mx-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    Let's transform your ideas into market-leading digital solutions. Schedule your strategy call today.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <Button
                                        size="lg"
                                        className="group relative overflow-hidden bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] text-white px-10 py-7 text-xl rounded-xl shadow-2xl shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer"
                                        onClick={() => document.getElementById('consultation-form').scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <Calendar className="h-6 w-6" />
                                            Schedule Your Strategy Call
                                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    );
}

export default Consultation;
