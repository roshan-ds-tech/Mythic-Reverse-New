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
