"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Monitor, Smartphone, Database, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classes) => twMerge(clsx(classes));

// Inline Button Component
const Button = ({ className, size, children, ...props }) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

// Inline Card Component
const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-xl border bg-card text-card-foreground shadow",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const SERVICES = [
    {
        id: "01",
        title: "Website Design & Redesign",
        subtitle: "Stunning High-Conversion UIs",
        description: "Crafting stunning, high-conversion UIs—like our recent work on digital marketing portfolios and UI redesigns. We blend modern design principles with user-centric approaches to create interfaces that not only look beautiful but drive real business results.",
        details: [
            "Responsive Design",
            "UI/UX Optimization",
            "Brand Integration",
            "Performance Focused"
        ],
        icon: <Monitor className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500", // Changed to Purple/Pink
        textAccent: "text-purple-400",
        borderAccent: "group-hover:border-purple-500/50",
        bgAccent: "group-hover:shadow-purple-500/10"
    },
    {
        id: "02",
        title: "App Development",
        subtitle: "Modern Mobile Solutions",
        description: "Building responsive mobile applications using modern frameworks like React Native. Our apps deliver seamless experiences across iOS and Android platforms with native performance and beautiful interfaces.",
        details: [
            "React Native",
            "Cross-Platform",
            "Native Performance",
            "App Store Ready"
        ],
        icon: <Smartphone className="w-6 h-6" />,
        color: "from-cyan-500 to-blue-500", // Kept Cyan/Blue but distinct
        textAccent: "text-cyan-400",
        borderAccent: "group-hover:border-cyan-500/50",
        bgAccent: "group-hover:shadow-cyan-500/10"
    },
    {
        id: "03",
        title: "SaaS Solutions",
        subtitle: "Scalable Software Platforms",
        description: "Developing scalable 'Software as a Service' platforms with integrated dashboards and complex data visualizations. We build robust systems that grow with your business and delight your users.",
        details: [
            "Dashboard Design",
            "Data Visualization",
            "API Integration",
            "Cloud Infrastructure"
        ],
        icon: <Database className="w-6 h-6" />,
        color: "from-emerald-500 to-teal-500", // Changed to Emerald/Teal
        textAccent: "text-emerald-400",
        borderAccent: "group-hover:border-emerald-500/50",
        bgAccent: "group-hover:shadow-emerald-500/10"
    }
];

function StatCounter({ value, label, suffix, delay }) {
    const countRef = useRef(null);
    const isInView = useInView(countRef, { once: false });
    const [hasAnimated, setHasAnimated] = useState(false);

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 10,
    });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value);
            setHasAnimated(true);
        } else if (!isInView && hasAnimated) {
            springValue.set(0);
            setHasAnimated(false);
        }
    }, [isInView, value, springValue, hasAnimated]);

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

    return (
        <motion.div
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-300 border border-white/10"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay },
                },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <motion.div ref={countRef} className="text-3xl font-bold text-blue-400 flex items-center">
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p className="text-neutral-400 text-sm mt-1">{label}</p>
            <motion.div className="w-10 h-0.5 bg-blue-500 mt-3 group-hover:w-16 transition-all duration-300" />
        </motion.div>
    );
}

function ServiceCard({ service, index, isActive, onClick }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onClick={onClick}
            className={cn(
                "cursor-pointer transition-all duration-300",
                isActive ? "scale-105" : "scale-100 hover:scale-102"
            )}
        >
            <Card className={cn(
                "p-8 h-full border-2 transition-all duration-300 group relative overflow-hidden", // Added relative overflow-hidden to parent
                isActive
                    ? `border-transparent shadow-2xl scale-[1.02]` // Active state
                    : "border-white/5 bg-zinc-900/50 hover:border-white/10 hover:shadow-lg" // Neutral state
            )}>
                {/* Persistent Background Gradient */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br pointer-events-none transition-opacity duration-500",
                        service.color,
                        isActive ? "opacity-20" : "opacity-0 group-hover:opacity-10"
                    )}
                />

                <div className="flex items-start gap-4 mb-4 relative z-10">
                    <motion.div
                        className={cn(
                            "p-3 rounded-lg bg-gradient-to-br",
                            service.color,
                            "text-white shadow-lg"
                        )}
                        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                    >
                        {service.icon}
                    </motion.div>
                    <div className="flex-1">
                        <span className={cn("text-sm font-bold", service.textAccent)}>{service.id}</span>
                        <h3 className="text-2xl font-bold mt-1 text-white">{service.title}</h3>
                        <p className={cn("text-sm font-medium mt-1 opacity-80", service.textAccent)}>{service.subtitle}</p>
                    </div>
                </div>

                <p className="text-neutral-400 mb-6 leading-relaxed relative z-10">{service.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                    {service.details.map((detail, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0", service.textAccent)} />
                            <span className="text-sm text-neutral-300">{detail}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={cn(
                        "flex items-center gap-2 font-medium text-sm relative z-10",
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        service.textAccent
                    )}
                    whileHover={{ x: 5 }}
                >
                    Learn more <ArrowRight className="w-4 h-4" />
                </motion.div>
            </Card>
        </motion.div>
    );
}

export default function CompanyServicesSection() {
    const [activeService, setActiveService] = useState(null);
    const sectionRef = useRef(null);
    const statsRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

    const stats = [
        { value: 50, label: "Projects Delivered", suffix: "+" },
        { value: 98, label: "Client Satisfaction", suffix: "%" },
        { value: 24, label: "Support Available", suffix: "/7" },
        { value: 100, label: "Modern Stack", suffix: "%" }
    ];

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

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen py-24 px-4 bg-black relative overflow-hidden"
        >
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" // Changed to purple, lower opacity
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1], // Reduced opacity
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" // Lower opacity
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1], // Reduced opacity
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-7xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div
                    className="text-center mb-16"
                    variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-neutral-300 font-medium mb-4 border border-white/10" // Neutral styling
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        OUR SERVICES
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        What We Offer
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        Delivering cutting-edge digital solutions with classic social media blue aesthetics and clean, trustworthy design
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {SERVICES.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            isActive={activeService === index}
                            onClick={() => setActiveService(index)}
                        />
                    ))}
                </div>

                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 border border-white/10 backdrop-blur-md text-white p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 blur-[100px] pointer-events-none" />

                    <div className="flex-1 text-center md:text-left relative z-10">
                        <h3 className="text-3xl font-bold mb-2">Ready to Start Your Project?</h3>
                        <p className="text-neutral-300">
                            Let's build something amazing together with modern technology and timeless design
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="bg-white text-violet-950 hover:bg-neutral-100 font-semibold px-8 py-6 text-lg shadow-lg relative z-10"
                    >
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
