'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { Building2, Rocket, TrendingUp, Award, Users, Globe } from 'lucide-react';

// GlowEffect Component
function GlowEffect({
    className,
    style,
    colors = ['#8b5cf6', '#d946ef', '#6366f1', '#a855f7'],
    mode = 'rotate',
    blur = 'medium',
    scale = 1,
    duration = 5,
}) {
    const BASE_TRANSITION = {
        repeat: Infinity,
        duration: duration,
        ease: 'linear',
    };

    const animations = {
        rotate: {
            background: [
                `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
                `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
            ],
            transition: BASE_TRANSITION,
        },
        pulse: {
            background: colors.map(
                (color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
            ),
            scale: [1 * scale, 1.1 * scale, 1 * scale],
            opacity: [0.5, 0.8, 0.5],
            transition: {
                ...BASE_TRANSITION,
                repeatType: 'mirror',
            },
        },
        breathe: {
            background: colors.map(
                (color) => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
            ),
            scale: [1 * scale, 1.05 * scale, 1 * scale],
            transition: {
                ...BASE_TRANSITION,
                repeatType: 'mirror',
            },
        },
        colorShift: {
            background: colors.map((color, index) => {
                const nextColor = colors[(index + 1) % colors.length];
                return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`;
            }),
            transition: {
                ...BASE_TRANSITION,
                repeatType: 'mirror',
            },
        },
        flowHorizontal: {
            background: colors.map((color) => {
                const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
                return `linear-gradient(to right, ${color}, ${nextColor})`;
            }),
            transition: {
                ...BASE_TRANSITION,
                repeatType: 'mirror',
            },
        },
        static: {
            background: `linear-gradient(to right, ${colors.join(', ')})`,
        },
    };

    const getBlurClass = (blur) => {
        if (typeof blur === 'number') {
            return `blur-[${blur}px]`;
        }

        const presets = {
            softest: 'blur-sm',
            soft: 'blur',
            medium: 'blur-md',
            strong: 'blur-lg',
            stronger: 'blur-xl',
            strongest: 'blur-2xl',
            none: 'blur-none',
        };

        return presets[blur];
    };

    return (
        <motion.div
            style={{
                ...style,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
            }}
            animate={animations[mode]}
            className={cn(
                'pointer-events-none absolute inset-0 h-full w-full',
                getBlurClass(blur),
                className
            )}
        />
    );
}

function CompanyTimeline({
    data,
    className
}) {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 10%', 'end 50%'],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className={cn('w-full font-sans md:px-10 relative overflow-hidden', className)}
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold mb-4 text-white max-w-4xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
                >
                    Our Journey
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-zinc-400 text-sm md:text-base max-w-2xl"
                >
                    From humble beginnings to industry leadership. Discover the milestones that shaped our company and continue to drive our mission forward.
                </motion.p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        className="flex justify-start pt-10 md:pt-20 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-black flex items-center justify-center border-2 border-zinc-800 shadow-lg">
                                <div className="relative h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                                    <GlowEffect
                                        colors={['#8b5cf6', '#d946ef', '#6366f1', '#a855f7']}
                                        mode="rotate"
                                        blur="medium"
                                        duration={3}
                                        className="opacity-60"
                                    />
                                    <div className={cn(
                                        'relative z-10 h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white',
                                        item.color || 'from-violet-500 to-purple-600'
                                    )}>
                                        {item.icon || <div className="h-3 w-3 rounded-full bg-white" />}
                                    </div>
                                </div>
                            </div>
                            <motion.h3
                                whileHover={{ scale: 1.05 }}
                                className="hidden md:block text-2xl md:pl-20 md:text-6xl font-bold text-zinc-500/40 hover:text-zinc-500/60 transition-colors cursor-default"
                            >
                                {item.year}
                            </motion.h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-3xl mb-4 text-left font-bold text-zinc-500/60">
                                {item.year}
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className="relative rounded-2xl p-6 md:p-8 backdrop-blur-xl bg-zinc-900/50 border border-zinc-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <GlowEffect
                                        colors={['#8b5cf6', '#d946ef', '#6366f1']}
                                        mode="pulse"
                                        blur="strongest"
                                        duration={4}
                                        className="opacity-20"
                                    />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-3">
                                        <span className={cn(
                                            'inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br text-white shadow-lg',
                                            item.color || 'from-violet-500 to-purple-600'
                                        )}>
                                            {item.icon || <div className="h-4 w-4 rounded-full bg-white" />}
                                        </span>
                                        {item.title}
                                    </h4>
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}

                <div
                    style={{
                        height: height + 'px',
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-zinc-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-violet-500 via-fuchsia-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />
                </div>
            </div>
        </div>
    );
}

export default CompanyTimeline;
