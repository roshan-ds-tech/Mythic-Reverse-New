import React, { useEffect } from 'react';
import { AboutHero } from "../components/AboutHero";
import { ScrollAnimationDemo } from "../components/ScrollAnimationDemo";
import { GlowingEffectDemoSecond } from "../components/GlowingEffectDemoSecond";
import CompanyServicesSection from "../components/CompanyServicesSection";
import CompaniesSlider from "../components/CompaniesSlider";
import TestimonialsSection from "../components/ui/testimonial-v2";
import { SparklesCore } from "../components/ui/sparkles";

import { CTASection } from "../components/ui/cta-section";
import { Footer } from "../components/ui/footer-section";

const Home = () => {
    useEffect(() => {
        document.title = "SaaS Digital Marketing Web Dev Agency Bangalore | Mythicreverse Courses";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = "SaaS development, digital marketing, web dev services + 45-day AI courses (Rs.64k bundle). Freshers training Bengaluru/Chennai. Launching 2026.";
    }, []);

    return (
        <div className="min-h-screen text-white overflow-hidden relative">

            {/* Global Stars - Fixed Background */}
            <div className="global-stars">
                <div className="layer layer-1"></div>
                <div className="layer layer-2"></div>
                <div className="layer layer-3"></div>
            </div>

            {/* Global Sparkles - Fixed across all sections */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                <SparklesCore
                    id="global-homepage-sparkles"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={25}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="main-content">
                <AboutHero />
                <section className="py-20 bg-black relative z-10 overflow-hidden">
                    {/* Sparkles Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <SparklesCore
                            id="intro-section-sparkles"
                            background="transparent"
                            minSize={0.6}
                            maxSize={1.4}
                            particleDensity={20}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                    </div>
                    <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                        <p className="text-xl md:text-3xl font-light text-neutral-300 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">

                            We build high-performance websites, scalable platforms, and immersive digital experiences that help startups and businesses grow faster, increase engagement, and achieve measurable results.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mt-6 leading-relaxed">
                            From performance marketing, SEO, and social media growth to full-scale product development, we deliver end-to-end digital solutions that define the next generation of the web.
                        </p>
                    </div>
                </section>

                <ScrollAnimationDemo />
                <div className="pt-0 pb-20 px-4">
                    <GlowingEffectDemoSecond />
                </div>
                <CompanyServicesSection />
                <CompaniesSlider />
                <TestimonialsSection />
                <CTASection />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
