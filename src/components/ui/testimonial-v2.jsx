import React from 'react';
import { motion } from "motion/react";

// --- Data ---
const testimonials = [
    {
        text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Briana Patton",
        role: "Operations Manager",
    },
    {
        text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Bilal Ahmed",
        role: "IT Manager",
    },
    {
        text: "The support team is exceptional, guiding us through setup and providing ongoing assistance.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Saman Malik",
        role: "Customer Support Lead",
    },
    {
        text: "Seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Omar Raza",
        role: "CEO",
    },
    {
        text: "Robust features and quick support have transformed our workflow, making us significantly more efficient.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Zainab Hussain",
        role: "Project Manager",
    },
    {
        text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Aliza Khan",
        role: "Business Analyst",
    },
];

const premiumEasing = [0.16, 1, 0.3, 1];

// Split into two rows for two marquee lanes
const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

// --- Single Testimonial Card ---
const TestimonialCard = ({ text, image, name, role }) => (
    <div className="testimonial-card flex-shrink-0 w-[350px] p-6 rounded-2xl border border-neutral-800 bg-neutral-900/80">
        <p className="text-neutral-400 leading-relaxed text-sm mb-5">
            "{text}"
        </p>
        <div className="flex items-center gap-3">
            <img
                width={36}
                height={36}
                src={image}
                alt={name}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-neutral-800"
                loading="lazy"
            />
            <div>
                <div className="font-semibold text-white text-sm">{name}</div>
                <div className="text-xs text-neutral-500">{role}</div>
            </div>
        </div>
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
                className="flex gap-6 w-max"
                style={{
                    animation: `${animationName} ${duration}s linear infinite`,
                    willChange: 'transform',
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
            className="bg-black py-24 relative overflow-hidden"
        >
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
                    transition: border-color 0.3s ease;
                }
                .testimonial-card:hover {
                    border-color: rgba(139, 92, 246, 0.4);
                }
            `}</style>

            <div className="max-w-6xl px-6 mx-auto mb-16">
                {/* Header with scroll animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: premiumEasing }}
                    className="text-center"
                >
                    <div className="inline-block border border-purple-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-purple-400 bg-purple-800/50 mb-6">
                        Testimonials
                    </div>
                    <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                        What our users say
                    </h2>
                    <p className="mt-5 text-neutral-400 text-lg leading-relaxed max-w-md mx-auto">
                        Discover how thousands of teams streamline their operations with our platform.
                    </p>
                </motion.div>
            </div>

            {/* Marquee rows — full width, edge-to-edge with fade masks */}
            <div
                className="flex flex-col gap-6"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                }}
            >
                <MarqueeRow items={row1} direction="left" duration={35} />
                <MarqueeRow items={row2} direction="right" duration={40} />
            </div>
        </section>
    );
};

export default TestimonialsSection;
