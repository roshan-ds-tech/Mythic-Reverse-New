"use client";

import React, { useState, useRef } from "react";
import { Monitor, Smartphone, Database, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServicesOrbitalDisplay from "./ServicesOrbitalDisplay";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
        bgAccent: "group-hover:shadow-purple-500/10",
        link: "/services#web-dev"
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
        bgAccent: "group-hover:shadow-cyan-500/10",
        link: "/services#app-dev"
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
        bgAccent: "group-hover:shadow-emerald-500/10",
        link: "/services#saas"
    }
];

function StatCounter({ value, label, suffix, delay }) {
    // Simple state-state based counting for CSS-only preference might be too complex or lack simple fallback.
    // We will standard static display or simple CSS toggle.
    // For now, let's keep the number static to avoid JS overhead, or simple increment.
    // Let's stick to static for pure performance request, or simple useEffect for one-time count.

    return (
        <div
            className={`relative p-6 rounded-xl flex flex-col items-center text-center group transition-all duration-500 border border-violet-500/20 hover:border-violet-500/40 overflow-hidden animate-on-scroll opacity-0 fill-mode-forwards ${delay}`}
            style={{ background: 'linear-gradient(135deg, rgba(17,17,24,1) 0%, rgba(30,20,50,1) 100%)' }}
        >
            {/* Subtle purple glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/5 transition-all duration-500 pointer-events-none" />
            {/* Corner glow accent */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />

            <div className="text-3xl font-bold flex items-center relative z-10 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                <span>{value}</span>
                <span>{suffix}</span>
            </div>
            <p className="text-neutral-400 text-sm mt-2 relative z-10">{label}</p>
            <div className="w-10 h-0.5 mt-3 group-hover:w-16 transition-all duration-500 relative z-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        </div>
    );
}

function ServiceCard({ service, index, isActive, onClick }) {

    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer transition-all duration-300 animate-on-scroll opacity-0 fill-mode-forwards",
                isActive ? "scale-105" : "scale-100 hover:scale-102"
            )}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <Card className={cn(
                "p-8 h-full border-2 transition-all duration-300 group relative overflow-hidden",
                isActive
                    ? `border-transparent shadow-2xl scale-[1.02] bg-zinc-900`
                    : "border-white/5 bg-zinc-900 hover:border-white/10 hover:shadow-lg"
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
                    <div
                        className={cn(
                            "p-3 rounded-lg bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover:rotate-6",
                            service.color
                        )}
                    >
                        {service.icon}
                    </div>
                    <div className="flex-1">
                        <span className={cn("text-sm font-bold", service.textAccent)}>{service.id}</span>
                        <h3 className="text-2xl font-bold mt-1 text-white">{service.title}</h3>
                        <p className={cn("text-sm font-medium mt-1 opacity-80", service.textAccent)}>{service.subtitle}</p>
                    </div>
                </div>

                <p className="text-neutral-400 mb-6 leading-relaxed relative z-10">{service.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                    {service.details.map((detail, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 animate-fade-in opacity-0 fill-mode-forwards"
                            style={{ animationDelay: `${index * 200 + i * 100}ms` }}
                        >
                            <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0", service.textAccent)} />
                            <span className="text-sm text-neutral-300">{detail}</span>
                        </div>
                    ))}
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (service.link) {
                            window.location.href = service.link;
                        }
                    }}
                    className={cn(
                        "flex items-center gap-2 font-medium text-sm relative z-10 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1",
                        "opacity-0 group-hover:opacity-100",
                        service.textAccent
                    )}
                >
                    Learn more <ArrowRight className="w-4 h-4" />
                </div>
            </Card>
        </div>
    );
}

export default function CompanyServicesSection() {
    const [activeService, setActiveService] = useState(null);
    const containerRef = useRef(null);

    // Register scroll reveal for all animated elements within this section
    useScrollReveal(containerRef, ".animate-on-scroll");

    const stats = [
        { value: 50, label: "Projects Delivered", suffix: "+" },
        { value: 98, label: "Client Satisfaction", suffix: "%" },
        { value: 24, label: "Support Available", suffix: "/7" },
        { value: 100, label: "Modern Stack", suffix: "%" }
    ];

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen py-16 sm:py-24 px-3 sm:px-4 relative overflow-hidden"
        >

            {/* Subtle static glow */}
            <div className="absolute top-20 left-10 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-8 animate-on-scroll delay-100 opacity-0 fill-mode-forwards">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-neutral-300 font-medium mb-4 border border-white/10">
                        OUR SERVICES
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        What We Offer
                    </h2>
                    <p className="text-base sm:text-xl text-neutral-400 max-w-3xl mx-auto">
                        Delivering cutting-edge digital solutions with classic social media blue aesthetics and clean, trustworthy design
                    </p>
                </div>

                {/* Orbital Services Display */}
                <div className="w-full">
                    <ServicesOrbitalDisplay />
                </div>

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

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={`delay-${(index + 1) * 100}`}
                        />
                    ))}
                </div>

                <div className="relative p-4 sm:p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-2xl overflow-hidden border border-violet-500/20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(17,17,24,1) 0%, rgba(30,20,40,1) 50%, rgba(40,25,55,1) 100%)'
                    }}
                >
                    {/* Subtle animated gradient overlay */}
                    <div
                        className="absolute inset-0 opacity-20 animate-pulse-subtle"
                        style={{
                            background: 'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217,70,239,0.15) 0%, transparent 50%)'
                        }}
                    />

                    {/* Subtle decorative glow */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />

                    {/* Bottom-right decorative glow */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)' }} />

                    <div className="flex-1 text-center md:text-left relative z-10">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">
                            Ready to Start Your
                            <span className="block bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                                Dream Project?
                            </span>
                        </h3>
                        <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
                            Let's transform your vision into reality with cutting-edge technology, stunning design, and unmatched expertise.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <Button
                            size="default"
                            className="group relative h-12 flex items-center justify-center bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 text-white font-medium px-8 text-base rounded-full shadow-lg shadow-purple-500/20 transition-all duration-500 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 border-none overflow-hidden"
                            onClick={() => window.location.href = '/consultation#consultation-form'}
                        >
                            {/* Button shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-float" style={{ animationDuration: '3s' }} />
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                        <p className="text-violet-400/40 text-[10px] uppercase tracking-widest font-medium">
                            Free Consultation • No Commitment
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
