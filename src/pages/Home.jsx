import { AboutHero } from "../components/AboutHero";
import { ScrollAnimationDemo } from "../components/ScrollAnimationDemo";
import { GlowingEffectDemoSecond } from "../components/GlowingEffectDemoSecond";
import CompanyServicesSection from "../components/CompanyServicesSection";
import { PremiumTestimonialsDemo } from "../components/PremiumTestimonialsDemo";
import { CTASection } from "../components/ui/cta-section";
import { Footer } from "../components/ui/footer-section";

const Home = () => {
    return (
        <div className="bg-black min-h-screen text-white overflow-hidden">
            <AboutHero />
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
