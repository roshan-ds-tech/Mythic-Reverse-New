import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Footer } from '../components/ui/footer-section';

export default function DigitalMarketing() {
    useEffect(() => {
        document.title = "Digital Marketing Agency Bengaluru | SEO/SMM";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Drive growth with our Digital Marketing Agency in Bengaluru. Expert SEO services for Tamil Nadu students and social media marketing in Bangalore. Contact today.";
    }, []);

    const features = [
        "Search Engine Optimization (SEO)",
        "Social Media Management (SMM)",
        "Pay-Per-Click Advertising (PPC)",
        "Content Marketing & Strategy",
        "Email Marketing Automation",
        "Analytics & Performance Tracking"
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
                    <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 px-4 py-1.5 rounded-full border border-[#06B6D4]/20 mb-6">
                        <TrendingUp className="w-4 h-4 text-[#06B6D4]" />
                        <span className="text-xs uppercase tracking-widest text-[#06B6D4]">Grow Online</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-tight">
                        Digital Marketing Agency Bengaluru
                    </h1>
                    
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                        We provide targeted **SEO services for Tamil Nadu students** and high-growth **social media marketing in Bangalore courses** to build sustainable online visibility and leads.
                    </p>
                    
                    <div className="flex justify-center gap-4">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-8 font-medium text-white transition-all transform hover:scale-105 cursor-pointer shadow-lg shadow-[#06B6D4]/20">
                            Scale Your Presence
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gradient-to-b from-[#0B0B12] to-[#111118]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Core Marketing Features</h2>
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
                                <CheckCircle2 className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-300 font-medium group-hover:text-white transition-colors">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Local Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Bengaluru?</h2>
                    <p className="text-neutral-400 mb-8">
                        Operating from Bengaluru, we understand the local business landscape. We provide tailored solutions while sourcing top creative and strategic minds to deliver superior marketing ROI. Maximize your digital footprint carefully.
                    </p>
                    <div className="p-6 bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-2xl">
                        <span className="text-xl font-bold text-white">Custom Pricing</span>
                        <p className="text-neutral-400 text-sm mt-1">SMM Packages inside monthly budgets | Results Driven</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
