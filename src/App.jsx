import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarDemo } from './components/NavbarDemo'
import { SparklesCore } from "./components/ui/sparkles";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ServicesPage from "./components/ServicesPage";

function App() {
  return (
    <Router>
      {/* Global sparkles — ultra low density for subtle effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={4}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.3}
        />
      </div>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  )
}

export default App
