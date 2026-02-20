import React from 'react';
import { motion } from "motion/react";
import { Quote } from 'lucide-react';
import { SparklesCore } from "./sparkles";

// --- Data ---
const testimonials = [
    {
        text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive.",
        image: "images/web_images/rishika.avif",
        name: "Rishika K",
        role: "Operations Manager",
    },
    {
        text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
        image: "images/web_images/nihar.avif",
        name: "Nihar Chavan",
        role: "IT Manager",
    },
    {
        text: "The support team is exceptional, guiding us through setup and providing ongoing assistance.",
        image: "images/web_images/Keerthana K.avif",
        name: "Keerthana K",
        role: "Customer Support Lead",
    },
    {
        text: "Seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
        image: "images/web_images/hariprasad1.avif",
        name: "Hariprasad",
        role: "CEO",
    },
    {
        text: "Robust features and quick support have transformed our workflow, making us significantly more efficient.",
        image: "images/web_images/Supriya Narayan.avif",
        name: "Supriya Narayan",
        role: "Project Manager",
    },
    {
        text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
        image: "images/web_images/priyanka.avif",
        name: "Priyanka K",
        role: "Business Analyst",
    },
];

const premiumEasing = [0.16, 1, 0.3, 1];

// Split into two rows for two marquee lanes
const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

// --- Enhanced Responsive Testimonial Card ---
const TestimonialCard = ({ text, image, name, role }) => (
    <div className="testimonial-card group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden">
        {/* Opaque black background to block sparkles */}
        <div className="absolute inset-0 bg-black rounded-2xl sm:rounded-3xl" />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/5"
            style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(217, 70, 239, 0.03) 100%)',
                boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
            }}
        />

        {/* Hover gradient */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Content */}
        <div className="relative z-10">
            {/* Quote icon */}
            <div className="mb-3 sm:mb-4 inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
            </div>

            <p className="text-white/80 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6 group-hover:text-white/90 transition-colors duration-300 line-clamp-4 sm:line-clamp-none">
                "{text}"
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                    <img
                        width={48}
                        height={48}
                        src={image}
                        alt={name}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-violet-500/20 group-hover:ring-violet-400/40 transition-all duration-300"
                        loading="lazy"
                    />
                    {/* Glow effect behind avatar */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
                <div>
                    <div className="font-semibold text-white text-sm sm:text-base">{name}</div>
                    <div className="text-[10px] sm:text-xs text-violet-300/70">{role}</div>
                </div>
            </div>
        </div>

        {/* Floating orb effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
);

// --- Horizontal Marquee Row (pure CSS, GPU-accelerated) ---
const MarqueeRow = ({ items, direction = "left", duration = 30 }) => {
    // Duplicate items enough times for seamless loop
    const cards = [...items, ...items, ...items, ...items];
    const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";

    return (
        <div className="overflow-hidden w-full">
            <div
                className="flex gap-4 sm:gap-6 w-max"
                style={{
                    animation: `${animationName} ${duration}s linear infinite`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                }}
            >
                {cards.map((t, i) => (
                    <TestimonialCard key={i} {...t} />
                ))}
            </div>
        </div>
    );
};

// --- Main Section ---
const TestimonialsSection = () => {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden"
        >
            {/* Background gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />

            {/* Pure CSS keyframes — only translate3d for GPU compositing */}
            <style>{`
                @keyframes marqueeLeft {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                @keyframes marqueeRight {
                    0% { transform: translate3d(-50%, 0, 0); }
                    100% { transform: translate3d(0, 0, 0); }
                }
                .testimonial-card {
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .testimonial-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
                }
                @media (max-width: 640px) {
                    .testimonial-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(139, 92, 246, 0.1);
                    }
                }
            `}</style>

            <div className="max-w-7xl px-4 sm:px-6 mx-auto mb-12 sm:mb-16 md:mb-20 relative z-10">
                {/* Header with scroll animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: premiumEasing }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4 sm:mb-6">
                        <span className="text-xs sm:text-sm text-violet-300">Client Success Stories</span>
                    </div>
                    <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                            What our users
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                            are saying
                        </span>
                    </h2>
                    <p className="mt-4 sm:mt-6 text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                        Discover how thousands of teams streamline their operations and drive growth with our cutting-edge platform.
                    </p>
                </motion.div>
            </div>

            {/* Marquee rows — full width, edge-to-edge with fade masks */}
            <div
                className="flex flex-col gap-4 sm:gap-6 md:gap-8"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                }}
            >
                <MarqueeRow items={row1} direction="left" duration={40} />
                <MarqueeRow items={row2} direction="right" duration={45} />
            </div>
        </section>
    );
};

export default TestimonialsSection;
