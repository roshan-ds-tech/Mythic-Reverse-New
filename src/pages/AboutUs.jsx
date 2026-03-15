import React from 'react';
import { HeroSection } from "../components/HeroSection";
import Timeline from "../components/ui/timeline";
import { Footer } from "../components/ui/footer-section";
import { FeaturedSpotlight } from "../components/ui/feature-spotlight";
import { TestimonialCarouselDemo } from "../components/TestimonialCarouselDemo";
import { MythicAdvantage } from "../components/ui/mythic-advantage";
import { SparklesCore } from "../components/ui/sparkles";
import { Zap, Rocket, Globe, Brain, Award } from 'lucide-react';

const timelineData = [
    { year: "2020", title: "The Singularity", description: "Mythic Reverse emerges from the void. Founded to shatter the status quo of legacy tech.", icon: <Zap className="w-5 h-5" />, color: "from-violet-500 to-purple-500" },
    { year: "2021", title: "Hyper-Scale Adoption", description: "100,000+ users onboarded. Series A secured to fuel our velocity.", icon: <Rocket className="w-5 h-5" />, color: "from-purple-500 to-fuchsia-500" },
    { year: "2022", title: "Global Nexus", description: "London. Tokyo. New York. Establishing our digital footprint across key innovation hubs.", icon: <Globe className="w-5 h-5" />, color: "from-fuchsia-500 to-pink-500" },
    { year: "2023", title: "Quantum Leap", description: "Voted 'Disruptor of the Year'. We didn't just join the market; we rewrote the rules.", icon: <Award className="w-5 h-5" />, color: "from-pink-500 to-rose-500" },
    { year: "2024", title: "Beyond Horizon", description: "Pioneering the next era of Spatial Computing and AGI integration.", icon: <Brain className="w-5 h-5" />, color: "from-rose-500 to-purple-500" }
];

const AboutUs = () => {
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Global Stars - Fixed Background (same as Homepage) */}
            <div className="global-stars">
                <div className="layer layer-1"></div>
                <div className="layer layer-2"></div>
                <div className="layer layer-3"></div>
            </div>

            {/* Global Sparkles - Fixed across all sections */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                <SparklesCore
                    id="aboutus-global-sparkles"
                    background="transparent"
                    minSize={0.8}
                    maxSize={1.8}
                    particleDensity={25}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <HeroSection />

                {/* Feature Spotlight Section */}
                <section className="py-20 bg-transparent flex justify-center overflow-hidden">
                    <div className="relative z-10 w-full flex justify-center">
                        <FeaturedSpotlight />
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20 bg-transparent relative z-10">
                    <div className="container mx-auto px-4">
                        <Timeline data={timelineData} />
                    </div>
                </section>

                {/* Mythic Advantage Section */}
                <MythicAdvantage />

                {/* Testimonials Section */}
                <TestimonialCarouselDemo />



                <div className="h-24 bg-transparent" />

                <Footer />
            </div>
        </div>
    );
};

export default AboutUs;
