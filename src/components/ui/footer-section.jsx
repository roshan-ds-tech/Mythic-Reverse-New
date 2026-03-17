'use client';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';

const footerLinks = [
    {
        label: 'Navigation',
        links: [
            { title: 'Home', href: '/' },
            { title: 'About Us', href: '/about-us' },
            { title: 'Services', href: '/services' },
            { title: 'Consultation', href: '/consultation' },
        ],
    },
    {
        label: 'Legal',
        links: [
            { title: 'Terms & Policy', href: '/terms-and-policy' },
        ],
    },
    {
        label: 'Social Links',
        links: [
            { title: 'Instagram', href: 'https://www.instagram.com/mythicreverse?utm_source=qr&igsh=YnZkbnRramU0eW9i', icon: InstagramIcon },
            { title: 'Youtube', href: 'https://youtube.com/@mythicreverse?si=QpIZR8mza033CVeQ', icon: YoutubeIcon },
            { title: 'LinkedIn', href: 'https://www.linkedin.com/company/mythic-reverse/', icon: LinkedinIcon },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full border-t border-purple-500/30 px-4 sm:px-6 py-8 sm:py-12 lg:py-16 shadow-[0_-1px_15px_-5px_theme(colors.purple.500/30%)] overflow-hidden">
            <div className="bg-purple-500/30 absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 rounded-full blur-[2px]" />

            <div className="max-w-7xl mx-auto">
                <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                    <AnimatedContainer className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FrameIcon className="size-8 text-white" />
                            <span className="font-bold text-xl text-white">Mythic Reverse</span>
                        </div>
                        <p className="text-zinc-500 mt-8 text-sm md:mt-0">
                            © {new Date().getFullYear()} Mythic Reverse. All rights reserved.
                        </p>
                    </AnimatedContainer>

                    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                        {footerLinks.map((section, index) => (
                            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                                <div className="mb-6 sm:mb-10 md:mb-0">
                                    <h3 className="text-sm font-semibold text-white">{section.label}</h3>
                                    <ul className="text-zinc-400 mt-4 space-y-2 text-sm">
                                        {section.links.map((link) => (
                                            <li key={link.title}>
                                                <a
                                                    href={link.href}
                                                    className="hover:text-white inline-flex items-center transition-all duration-300"
                                                >
                                                    {link.icon && <link.icon className="me-2 size-4" />}
                                                    {link.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

function AnimatedContainer({ className, delay = 0.1, children }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ translateY: 10, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
