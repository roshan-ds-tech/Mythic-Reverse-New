import React from 'react';
import { HeroParallaxDemo } from "../components/HeroParallaxDemo";
import { ScrollAnimationDemo } from "../components/ScrollAnimationDemo";
import { GlowingEffectDemoSecond } from "../components/GlowingEffectDemoSecond";
import CompanyServicesSection from "../components/CompanyServicesSection";
import { PremiumTestimonialsDemo } from "../components/PremiumTestimonialsDemo";
import { CTASection } from "../components/ui/cta-section";
import { Footer } from "../components/ui/footer-section";

const Home = () => {
    return (
        <div className="relative z-10">
            <HeroParallaxDemo />
            <ScrollAnimationDemo />
            <div className="bg-black pt-0 pb-20 px-4">
                <GlowingEffectDemoSecond />
            </div>
            <CompanyServicesSection />
            <PremiumTestimonialsDemo />
            <CTASection />
            <div className="h-26 bg-black" />
            <Footer />
        </div>
    );
};

export default Home;
