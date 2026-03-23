import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Footer } from '../components/ui/footer-section';

export default function SaaSDevelopment() {
    useEffect(() => {
        document.title = "SaaS Development Bangalore | Mythicreverse";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "Build scalable, custom SaaS solutions in Bangalore. We are an AI SaaS agency serving startups in Tamil Nadu and Chennai. Launch your product faster.";
    }, []);

    const features = [
        "Multi-Tenant Architecture",
        "Subscription & Billing Integration",
        "API Development & Documentation",
        "AI Integrations & Workflows",
        "Cloud-Native Scalability",
        "Enterprise-Grade Security"
    ];

    return (
        <div className="min-h-screen bg-[#0B0B12] text-white pt-24 overflow-hidden">
            {/* Background pattern if needed, keeping it simple/dark similar to other pages */}
            
            {/* Hero Section */}
            <section className="relative py-20 px-4 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 mb-6">
                        <Cloud className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-xs uppercase tracking-widest text-[#8B5CF6]">SaaS for Startups</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-tight">
                        Custom SaaS Solutions Bangalore
                    </h1>
                    
                    <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                        We are a leading **AI SaaS agency in Tamil Nadu** helping founders build sustainable, scalable software. Empowering startups and **SaaS for startups Chennai freshers** with full-cycle product development.
                    </p>
                    
                    <div className="flex justify-center gap-4">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-8 font-medium text-white transition-all transform hover:scale-105 cursor-pointer shadow-lg shadow-[#8B5CF6]/20">
                            Start Your SaaS Project
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gradient-to-b from-[#0B0B12] to-[#111118]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">Core Features</h2>
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
                                <CheckCircle2 className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-300 font-medium group-hover:text-white transition-colors">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Local Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Bangalore & Tamil Nadu?</h2>
                    <p className="text-neutral-400 mb-8">
                        Being positioned in the tech capital Bangalore and serving the growing ecosystem in Tamil Nadu, we provide local expertise combined with global quality. Fresh talent and startup support ensure project success.
                    </p>
                    <div className="p-6 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-2xl">
                        <span className="text-xl font-bold text-white">Custom Pricing</span>
                        <p className="text-neutral-400 text-sm mt-1">Based on scope | 4-12 weeks Average Delivery | AI Driven</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
