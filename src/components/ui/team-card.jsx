import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const TeamCard = ({ name, role, image, social }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 p-6 flex flex-col items-center justify-end shadow-xl group"
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute inset-4 -top-12 rounded-xl overflow-hidden shadow-2xl border border-white/5"
            >
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="relative z-10 text-center mt-auto w-full">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{name}</h3>
                <p className="text-sm font-medium text-purple-400 mb-4">{role}</p>

                <div className="flex justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {social?.linkedin && (
                        <a href={social.linkedin} className="text-zinc-400 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {social?.twitter && (
                        <a href={social.twitter} className="text-zinc-400 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                    )}
                    {social?.website && (
                        <a href={social.website} className="text-zinc-400 hover:text-white transition-colors">
                            <Globe size={20} />
                        </a>
                    )}
                </div>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ transform: "translateZ(-50px)" }}
            />
        </motion.div>
    );
};

export default TeamCard;
