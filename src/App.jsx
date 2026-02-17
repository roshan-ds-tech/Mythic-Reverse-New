import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarDemo } from './components/NavbarDemo'

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ServicesPage from "./components/ServicesPage";
import Consultation from "./pages/Consultation";
import TermsAndPolicy from "./pages/TermsAndPolicy";

function App() {
  return (
    <Router>

      <NavbarDemo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/terms-and-policy" element={<TermsAndPolicy />} />
      </Routes>
    </Router>
  )
}

export default App
