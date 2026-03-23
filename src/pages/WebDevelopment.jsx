import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Footer } from '../components/ui/footer-section';

export default function WebDevelopment() {
    useEffect(() => {
        document.title = "Full Stack Web Dev Agency Tamil Nadu";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Expert Web Development Agency in Chennai. We offer React Node.js development in Bangalore and web dev bootcamps for freshers. Launch your site today.";
    }, []);

    const features = [
        "Custom Web Design & UI/UX",
        "Responsive & Mobile-First Development",
        "E-commerce Solutions (Shopify, WooCommerce)",
        "Progressive Web Apps (PWA)",
        "Performance Optimization",
        "React & Node.js Architecture"
    ];

    return (
        <div className="min-h-screen bg-[#0B0B12] text-white pt-24 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 px-4 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#D946EF]/10 px-4 py-1.5 rounded-full border border-[#D946EF]/20 mb-6">
                        <Palette className="w-4 h-4 text-[#D946EF]" />
                        <span className="text-xs uppercase tracking-widest text-[#D946EF]">Create Impact</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-tight">
                        Web Development Agency Chennai
                    </h1>
                    
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                        We deliver high-performance **React Node.js development in Bangalore** for startups, along with immersive **web dev bootcamps for freshers** looking to enter the industry.
                    </p>
                    
                    <div className="flex justify-center gap-4">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#D946EF] to-[#F97316] px-8 font-medium text-white transition-all transform hover:scale-105 cursor-pointer shadow-lg shadow-[#D946EF]/20">
                            Build Your Website
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gradient-to-b from-[#0B0B12] to-[#111118]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Development Capabilities</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 backdrop-blur-sm group hover:bg-white/10 transition-colors"
                            >
                                <CheckCircle2 className="w-6 h-6 text-[#D946EF] flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-300 font-medium group-hover:text-white transition-colors">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Local Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Tamil Nadu?</h2>
                    <p className="text-neutral-400 mb-8">
                        Covering Chennai and beyond, we combine absolute engineering depth with local support. Ideal for companies transitioning into scalable architecture or training freshers in top-tier standards. Get connected today.
                    </p>
                    <div className="p-6 bg-[#D946EF]/5 border border-[#D946EF]/20 rounded-2xl">
                        <span className="text-xl font-bold text-white">Custom Pricing</span>
                        <p className="text-neutral-400 text-sm mt-1">E-commerce or SPA | Fixed Pricing support available | AI Integrated</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
