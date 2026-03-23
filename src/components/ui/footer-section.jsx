'use client';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon, Phone, Mail } from 'lucide-react';

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
    {
        label: 'Contact',
        links: [
            { title: '9731655789', href: 'tel:9731655789', icon: Phone },
            { title: 'prasanna@mythicreverse.com', href: 'mailto:prasanna@mythicreverse.com', icon: Mail }
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full border-t border-purple-500/30 px-4 sm:px-6 py-8 sm:py-12 lg:py-16 shadow-[0_-1px_15px_-5px_theme(colors.purple.500/30%)] overflow-hidden bg-black">

            <div className="bg-purple-500/30 absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 rounded-full blur-[2px]" />

            <div className="max-w-7xl mx-auto">
                <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                    <AnimatedContainer className="space-y-4 flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center">
                            <img src="/images/pictures/logo-favicon.png" alt="Mythic Reverse Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain pointer-events-none" />
                            <span className="font-bold text-2xl text-white relative z-10 mt-2 text-center">Mythic Reverse</span>

                        </div>
                        <p className="text-zinc-500 mt-4 text-sm text-center">
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
                                                    className="hover:text-white inline-flex items-start transition-all duration-300"
                                                >
                                                    {link.icon && <link.icon className="me-2 size-4 mt-0.5 flex-shrink-0" />}
                                                    <span className="whitespace-nowrap">{link.title}</span>
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
