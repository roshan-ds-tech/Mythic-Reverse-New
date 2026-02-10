import React from 'react';
import AnimatedShaderBackground from "../components/ui/animated-shader-background";
import Timeline from "../components/ui/timeline";
import { Footer } from "../components/ui/footer-section";
import { motion } from "framer-motion";
import { HyperText } from "../components/ui/hyper-text";
import { SparklesCore } from "../components/ui/sparkles";
import { FeaturedSpotlight } from "../components/ui/feature-spotlight";
import { CircularTestimonialsDemo } from "../components/CircularTestimonialsDemo";
import { Zap, Rocket, Globe, Brain, Award, Mail, Phone, MapPin } from 'lucide-react';
import { ContactCard } from "@/components/ui/contact-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const timelineData = [
    { year: "2020", title: "The Singularity", description: "Mythic Reverse emerges from the void. Founded to shatter the status quo of legacy tech.", icon: <Zap className="w-5 h-5" />, color: "from-violet-500 to-purple-500" },
    { year: "2021", title: "Hyper-Scale Adoption", description: "100,000+ users onboarded. Series A secured to fuel our velocity.", icon: <Rocket className="w-5 h-5" />, color: "from-purple-500 to-fuchsia-500" },
    { year: "2022", title: "Global Nexus", description: "London. Tokyo. New York. Establishing our digital footprint across key innovation hubs.", icon: <Globe className="w-5 h-5" />, color: "from-fuchsia-500 to-pink-500" },
    { year: "2023", title: "Quantum Leap", description: "Voted 'Disruptor of the Year'. We didn't just join the market; we rewrote the rules.", icon: <Award className="w-5 h-5" />, color: "from-pink-500 to-rose-500" },
    { year: "2024", title: "Beyond Horizon", description: "Pioneering the next era of Spatial Computing and AGI integration.", icon: <Brain className="w-5 h-5" />, color: "from-rose-500 to-purple-500" }
];

const AboutUs = () => {
    return (
        <div className="bg-black min-h-screen text-white overflow-hidden">
            {/* Hero Section with Shader */}
            <div className="relative h-screen w-full flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <AnimatedShaderBackground />
                </div>
                <div className="absolute inset-0 z-1 pointer-events-none">
                    <SparklesCore
                        id="about-us-hero-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                {/* Gradient to blend hero into next section */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />
                <div className="relative z-10 text-center flex flex-col items-center gap-4">
                    <HyperText
                        className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                        text="ARCHITECTS OF"
                    />
                    <HyperText
                        className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                        text="THE IMPOSSIBLE"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 text-2xl text-zinc-400 max-w-3xl mx-auto px-4 font-light"
                    >
                        We don't just build software. We engineer reality.
                    </motion.p>
                </div>
            </div>

            {/* Feature Spotlight Section */}
            <section className="py-20 relative z-10 bg-black flex justify-center overflow-hidden">
                {/* Top Blend Gradient */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-[1] pointer-events-none" />
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <SparklesCore
                        id="spotlight-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={50}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="relative z-10 w-full flex justify-center">
                    <FeaturedSpotlight />
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 relative z-10 bg-black/50 backdrop-blur-3xl">
                <div className="container mx-auto px-4">
                    <Timeline data={timelineData} />
                </div>
            </section>

            {/* Testimonials Section */}
            <CircularTestimonialsDemo />

            {/* Contact Section */}
            <section className="py-24 relative z-10 bg-black overflow-hidden">
                <div className="container mx-auto px-6">
                    <ContactCard
                        title="LET'S CO-CREATE"
                        description="Ready to push the boundaries of what's possible? Reach out to our team of architects and engineers today. We're eager to hear about your vision."
                        contactInfo={[
                            {
                                icon: Mail,
                                label: 'Email',
                                value: 'hello@mythicreverse.io',
                            },
                            {
                                icon: Phone,
                                label: 'Phone',
                                value: '+1 (555) 000-0000',
                            },
                            {
                                icon: MapPin,
                                label: 'Location',
                                value: 'San Francisco, CA',
                                className: 'col-span-2',
                            }
                        ]}
                    >
                        <form className="w-full space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-zinc-500 uppercase tracking-widest text-xs font-bold px-1">Full Name</Label>
                                <Input id="name" placeholder="John Doe" className="bg-white/[0.03] border-white/10 text-white h-14 px-6 rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-zinc-700" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-zinc-500 uppercase tracking-widest text-xs font-bold px-1">Email Address</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-white/[0.03] border-white/10 text-white h-14 px-6 rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-zinc-700" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="message" className="text-zinc-500 uppercase tracking-widest text-xs font-bold px-1">Your Vision</Label>
                                <Textarea id="message" placeholder="Tell us about your project..." className="bg-white/[0.03] border-white/10 text-white p-6 rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-zinc-700 min-h-[160px] resize-none" />
                            </div>
                            <div className="pt-4">
                                <Button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black tracking-tighter text-xl h-16 rounded-2xl transition-all duration-500 shadow-2xl shadow-purple-500/40 border-none hover:scale-[1.02] active:scale-[0.98]">
                                    LAUNCH TRANSMISSION
                                </Button>
                                <p className="text-center text-zinc-600 text-[10px] mt-4 uppercase tracking-[0.2em] font-medium px-4">
                                    Secure encryption active • Guaranteed response within 24h
                                </p>
                            </div>
                        </form>
                    </ContactCard>
                </div>
            </section>

            <div className="h-24 bg-black" />

            <Footer />
        </div>
    );
};

export default AboutUs;
