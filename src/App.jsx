import HeroScroll from './components/HeroScroll'
import { NavbarDemo } from './components/NavbarDemo'
import { ScrollAnimationDemo } from './components/ScrollAnimationDemo'
import { GlowingEffectDemoSecond } from './components/GlowingEffectDemoSecond'
import CompanyServicesSection from './components/CompanyServicesSection'
import { SparklesCore } from "./components/ui/sparkles";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={300}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <NavbarDemo />
      <HeroScroll />
      <ScrollAnimationDemo />
      <div className="bg-black pt-0 pb-20 px-4">
        <GlowingEffectDemoSecond />
      </div>
      <CompanyServicesSection />
      <div style={{ height: '100vh', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Content continues here...</h2>
      </div>
    </>
  )
}

export default App
