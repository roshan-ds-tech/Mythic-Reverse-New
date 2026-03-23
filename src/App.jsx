import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarDemo } from './components/NavbarDemo'
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ServicesPage from "./components/ServicesPage";
import Consultation from "./pages/Consultation";
import TermsAndPolicy from "./pages/TermsAndPolicy";
import Courses from "./pages/Courses";
import EthicalHackingCourse from "./pages/EthicalHackingCourse";
import FullStackWebDevCourse from "./pages/FullStackWebDevCourse";
import FlutterAppDevCourse from "./pages/FlutterAppDevCourse";
import ReactNativeAppDevCourse from "./pages/ReactNativeAppDevCourse";
import ProgrammingLanguagesCourse from "./pages/ProgrammingLanguagesCourse";

import SaaSDevelopment from "./pages/SaaSDevelopment";
import DigitalMarketing from "./pages/DigitalMarketing";
import WebDevelopment from "./pages/WebDevelopment";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <NavbarDemo />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/terms-and-policy" element={<TermsAndPolicy />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/ethical-hacking" element={<EthicalHackingCourse />} />
                <Route path="/courses/full-stack-web-dev" element={<FullStackWebDevCourse />} />
                <Route path="/courses/flutter-app-dev" element={<FlutterAppDevCourse />} />
                <Route path="/courses/react-native-app-dev" element={<ReactNativeAppDevCourse />} />
                <Route path="/courses/programming-languages" element={<ProgrammingLanguagesCourse />} />
                
                {/* Service Landing Pages */}
                <Route path="/saas-development" element={<SaaSDevelopment />} />
                <Route path="/digital-marketing-agency" element={<DigitalMarketing />} />
                <Route path="/web-development" element={<WebDevelopment />} />
            </Routes>
        </Router>
    )
}
export default App

