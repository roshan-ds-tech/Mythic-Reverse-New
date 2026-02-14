import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, Code, Award, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from './card';

export function MythicAdvantage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });


    // Scroll-based animations with enhanced visibility
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

    const differentiators = [
        {
            icon: Zap,
            title: "Lightning-Fast Delivery",
            description: "Agile methodologies and cutting-edge tools ensure rapid deployment without compromising quality.",
            color: "from-violet-500 to-purple-500",
        },
        {
            icon: Code,
            title: "Tech Excellence",
            description: "Mastery of modern frameworks, cloud architecture, and emerging technologies keeps us ahead.",
            color: "from-fuchsia-500 to-pink-500",
        },
        {
            icon: Award,
            title: "Proven Track Record",
            description: "Hundreds of successful projects, satisfied clients, and industry recognition speak for themselves.",
            color: "from-violet-500 to-fuchsia-500",
        },
        {
            icon: TrendingUp,
            title: "Growth-Focused",
            description: "Every solution is designed to scale with your business and drive measurable results.",
            color: "from-purple-500 to-violet-500",
        },
    ];

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)] blur-3xl" />
            </div>

            <motion.div
                style={{ y, scale, opacity }}
                className="relative z-10 container mx-auto px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-300">What Sets Us Apart</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        The Mythic{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Advantage
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {differentiators.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * i }}
                        >
                            <Card className="relative overflow-hidden bg-[#111118] border-violet-500/20 hover:border-violet-500/40 transition-all group h-full">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                                <CardContent className="p-8 relative z-10">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-[#A1A1AA] leading-relaxed">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
