import React, { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function ScrollAnimationDemo() {
    const containerRef = useRef(null);
    useScrollReveal(containerRef, ".animate-on-scroll");

    return (
        <div
            ref={containerRef}
            className="flex flex-col overflow-hidden relative pt-0 pb-10 md:pb-16"
            id="ecosystem"
        >

            {/* Top Header */}
            <div className="relative z-10 text-center mb-8 md:mb-12 animate-on-scroll opacity-0 fill-mode-forwards">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Our Ecosystem</h2>
                <p className="text-neutral-400">Explore our dashboard</p>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left Content: Text */}
                <div className="md:w-1/2 text-left space-y-8 animate-on-scroll opacity-0 translate-y-8 fill-mode-forwards">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        <span className="text-white">Empowering Your</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500">
                            Digital Journey
                        </span>
                    </h1>

                    <p className="text-lg text-neutral-300 max-w-lg leading-relaxed">
                        We also offer one of the best AI-powered coding courses in India, designed to make complete beginners job-ready in just 45 days. Our programs include programming languages, ethical hacking and cybersecurity, full stack web development, Flutter app development, and React Native app development. With a hands-on, project-based learning approach, students build real-world projects, create strong GitHub portfolios, and gain practical industry-ready skills using advanced AI tools like ChatGPT, GitHub Copilot, and modern developer workflows.
                    </p>

                    <ul className="space-y-4 mt-8">
                        {[
                            "Live Mentorship & Workshops",
                            "Capstone Projects with Industry Experts",
                            "National Level Hackathons",
                            "100% Job Assistance & Internships"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-neutral-300">
                                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <p className="text-sm text-neutral-400 max-w-lg mt-6 leading-relaxed border-t border-white/10 pt-4">
                        Our coding and development courses are available across India, including Chennai, Bengaluru, Vellore, Hyderabad, Andhra Pradesh, and Telangana. We focus on affordable, high-quality tech education, making us a top choice for students searching for the best coding courses, full stack development programs, and cybersecurity training in India.
                    </p>

                </div>

                {/* Right Content: 3D Scroll Animation Component */}
                <div className="md:w-1/2 flex justify-center md:justify-end z-20">
                    <div className="w-full max-w-[800px] scale-90 md:scale-100 origin-center md:origin-right">
                        <ContainerScroll
                            titleComponent={<></>}
                        >
                            <img
                                src="/images/web_images/container_scroll.avif"
                                alt="Dashboard Preview"
                                className="mx-auto rounded-2xl object-cover h-full object-left-top draggable-false"
                                draggable={false}
                            />
                        </ContainerScroll>
                    </div>
                </div>

            </div>
        </div>
    );
}
