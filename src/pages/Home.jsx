import { AboutHero } from "../components/AboutHero";
import { ScrollAnimationDemo } from "../components/ScrollAnimationDemo";
import { GlowingEffectDemoSecond } from "../components/GlowingEffectDemoSecond";
import CompanyServicesSection from "../components/CompanyServicesSection";
import TestimonialsSection from "../components/ui/testimonial-v2";


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

            <div className="main-content">
                <AboutHero />
                <ScrollAnimationDemo />
                <div className="pt-0 pb-20 px-4">
                    <GlowingEffectDemoSecond />
                </div>
                <CompanyServicesSection />
                <TestimonialsSection />
                <CTASection />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
