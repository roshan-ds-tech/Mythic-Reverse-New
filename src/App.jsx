import HeroScroll from './components/HeroScroll'
import { NavbarDemo } from './components/NavbarDemo'
import { ScrollAnimationDemo } from './components/ScrollAnimationDemo'
import { GlowingEffectDemoSecond } from './components/GlowingEffectDemoSecond'

function App() {
  return (
    <>
      <NavbarDemo />
      <HeroScroll />
      <ScrollAnimationDemo />
      <div className="bg-black pt-0 pb-20 px-4">
        <GlowingEffectDemoSecond />
      </div>
      <div style={{ height: '100vh', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Content continues here...</h2>
      </div>
    </>
  )
}

export default App
