"use client";

import { Code, GraduationCap, Zap, Trophy, Layers } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

import { motion } from "framer-motion";

export function GlowingEffectDemoSecond() {
    return (
        <section className="py-20 bg-mythic-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Mythic Reverse?</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Elevating digital experiences through precision, innovation, and community.
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2">
                    {/* Top Left: Precision Engineering (Cyan) */}
                    <GridItem
                        area="md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/5]"
                        icon={<Code className="h-4 w-4 text-cyan-400" />}
                        title="Precision Engineering"
                        description="Crafting high-performance websites and mobile apps with the latest tech stacks to scale your business."
                        color="cyan"
                    />

                    {/* Bottom Left: The Future of EdTech (Purple) */}
                    <GridItem
                        area="md:[grid-area:2/1/3/5] xl:[grid-area:2/1/3/5]"
                        icon={<GraduationCap className="h-4 w-4 text-purple-400" />}
                        title="The Future of EdTech"
                        description="From comprehensive courses to hands-on internships, we bridge the gap between learning and industry."
                        color="purple"
                    />

                    {/* Middle: Join the Mythic Network (Gradient/Mixed) */}
                    <GridItem
                        area="md:[grid-area:1/5/3/9] xl:[grid-area:1/5/3/9]"
                        icon={<Zap className="h-4 w-4 text-cyan-400" />}
                        title="Join the Mythic Network"
                        description="Where innovation meets community. Powering the next generation through global hackathons and elite tech events."
                        color="cyan"
                    >
                        <div className="mt-8 flex flex-col justify-between gap-6 h-full">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-2xl font-bold text-white">1.2K+</h4>
                                    <p className="text-xs text-neutral-400">Total Members</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-2xl font-bold text-cyan-400">45</h4>
                                    <p className="text-xs text-neutral-400">Active Projects</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-2xl font-bold text-white">12+</h4>
                                    <p className="text-xs text-neutral-400">Events Hosted</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-2xl font-bold text-purple-400">24/7</h4>
                                    <p className="text-xs text-neutral-400">Mentorship</p>
                                </div>
                            </div>

                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                    Global Hackathons
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                    Elite Tech Events
                                </li>
                            </ul>

                            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-white font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                Explore Network
                                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform text-cyan-400" />
                            </button>
                        </div>
                    </GridItem>

                    {/* Top Right: 5+ Success Stories (Amber) */}
                    <GridItem
                        area="md:[grid-area:1/9/2/13] xl:[grid-area:1/9/2/13]"
                        icon={<Trophy className="h-4 w-4 text-amber-400" />}
                        title="5+ Success Stories"
                        description="Delivering premium digital solutions. We've successfully launched 5 major web projects with stunning UI/UX."
                        color="amber"
                    />

                    {/* Bottom Right: Custom Software Solutions (Rose) */}
                    <GridItem
                        area="md:[grid-area:2/9/3/13] xl:[grid-area:2/9/3/13]"
                        icon={<Layers className="h-4 w-4 text-rose-400" />}
                        title="Custom Software Solutions"
                        description="Tailored software architecture designed to solve complex business challenges and ignite your brand's passion."
                        color="rose"
                    />
                </ul>
            </div>
        </section>
    );
}

const GridItem = ({ area, icon, title, description, children, color = "cyan" }) => {

    const colorStyles = {
        cyan: {
            border: "border-cyan-500/30",
            bg: "bg-cyan-500/10",
        },
        purple: {
            border: "border-purple-500/30",
            bg: "bg-purple-500/10",
        },
        amber: {
            border: "border-amber-500/30",
            bg: "bg-amber-500/10",
        },
        rose: {
            border: "border-rose-500/30",
            bg: "bg-rose-500/10",
        }
    };

    const currentTheme = colorStyles[color] || colorStyles.cyan;

    return (
        <motion.li
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
            className={`min-h-[14rem] list-none ${area}`}
        >
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-zinc-900/50 border-neutral-800">
                <GlowingEffect
                    blur={0}
                    borderWidth={5}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-start gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-gradient-to-br from-black to-zinc-900 border border-white/10">
                    <div className={`w-fit rounded-lg border ${currentTheme.border} ${currentTheme.bg} p-2`}>
                        {icon}
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-sans text-xl font-semibold text-white md:text-2xl">
                            {title}
                        </h3>
                        <p className="font-sans text-sm text-text-secondary md:text-base">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </motion.li>
    );
};
