import { NavbarDemo } from './components/NavbarDemo'
import { ScrollAnimationDemo } from './components/ScrollAnimationDemo'
import { GlowingEffectDemoSecond } from './components/GlowingEffectDemoSecond'
import CompanyServicesSection from './components/CompanyServicesSection'
import { SparklesCore } from "./components/ui/sparkles";
import { HeroParallaxDemo } from "./components/HeroParallaxDemo";
import { PremiumTestimonialsDemo } from "./components/PremiumTestimonialsDemo";
import { Footer } from "./components/ui/footer-section";
import { CTASection } from "./components/ui/cta-section";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <NavbarDemo />
      <HeroParallaxDemo />
      <ScrollAnimationDemo />
      <div className="bg-black pt-0 pb-20 px-4">
        <GlowingEffectDemoSecond />
      </div>
      <CompanyServicesSection />
      <PremiumTestimonialsDemo />
      <CTASection />
      <div className="h-28 bg-black" />
      <Footer />
    </>
  )
}

export default App
