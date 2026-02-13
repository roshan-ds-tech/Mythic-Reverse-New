import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code, Smartphone, TrendingUp, Palette, Cloud, Users, Zap, Award, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import MythicReverseHero from './ui/mythic-reverse-hero';
import { SparklesCore } from './ui/sparkles';
import Lenis from 'lenis';

// ============================================================================
// BG PATTERN COMPONENT
// ============================================================================
const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
    'fade-top': '[mask-image:linear-gradient(to_bottom,transparent,var(--background))]',
    'fade-bottom': '[mask-image:linear-gradient(to_bottom,var(--background),transparent)]',
    'fade-left': '[mask-image:linear-gradient(to_right,transparent,var(--background))]',
    'fade-right': '[mask-image:linear-gradient(to_right,var(--background),transparent)]',
    'fade-x': '[mask-image:linear-gradient(to_right,transparent,var(--background),transparent)]',
    'fade-y': '[mask-image:linear-gradient(to_bottom,transparent,var(--background),transparent)]',
    none: '',
};

function getBgImage(variant, fill, size) {
    switch (variant) {
        case 'dots':
            return `radial-gradient(${fill} 1px, transparent 1px)`;
        case 'grid':
            return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
        case 'diagonal-stripes':
            return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
        case 'horizontal-lines':
            return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
        case 'vertical-lines':
            return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
        case 'checkerboard':
            return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
        default:
            return undefined;
    }
}

const BGPattern = ({
    variant = 'grid',
    mask = 'none',
    size = 24,
    fill = '#252525',
    className,
    style,
    ...props
}) => {
    const bgSize = `${size}px ${size}px`;
    const backgroundImage = getBgImage(variant, fill, size);

    return (
        <div
            className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
            style={{
                backgroundImage,
                backgroundSize: bgSize,
                ...style,
            }}
            {...props}
        />
    );
};

// ============================================================================
// MAIN SERVICES PAGE COMPONENT
// ============================================================================
export default function ServicesPage() {
    return (
        <div className="min-h-screen w-full bg-[#0B0B12] text-white overflow-x-hidden pt-20">
            {/* Page-wide subtle sparkles */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <SparklesCore
                    id="services-page-global-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={5}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.5}
                />
            </div>

            <style jsx global>{`
        :root {
          --background: #0B0B12;
          --foreground: #FFFFFF;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

            {/* Hero Section */}
            <MythicReverseHero
                agencyName="Transforming Digital Experiences"
                headline="Our Services"
                subtext="Empowering businesses with cutting-edge"
                animatedWords={['IT solutions', 'digital marketing', 'innovation', 'technology']}
                ctaText="Get Started"
                ctaHref="#it-solutions"
            />

            {/* IT Solutions Section */}
            <ServiceSection
                title="IT Solutions"
                description="Comprehensive technology infrastructure and consulting services designed to optimize your business operations and drive digital transformation."
                icon={<Code className="w-12 h-12" />}
                features={[
                    "Cloud Infrastructure & Migration",
                    "Cybersecurity & Data Protection",
                    "IT Consulting & Strategy",
                    "Network Architecture & Management",
                    "DevOps & Automation",
                    "System Integration"
                ]}
                gradient="from-[#8B5CF6] to-[#6366F1]"
            />

            {/* Website Design & Development */}
            <ServiceSection
                title="Website Design & Development"
                description="Stunning, high-performance websites that captivate audiences and convert visitors into customers with cutting-edge design and technology."
                icon={<Palette className="w-12 h-12" />}
                features={[
                    "Custom Web Design & UI/UX",
                    "Responsive & Mobile-First Development",
                    "E-commerce Solutions",
                    "CMS Integration (WordPress, Shopify)",
                    "Progressive Web Apps (PWA)",
                    "Performance Optimization & SEO"
                ]}
                gradient="from-[#D946EF] to-[#F97316]"
                reverse
            />

            {/* Digital Marketing */}
            <ServiceSection
                title="Digital Marketing"
                description="Data-driven marketing strategies that amplify your brand presence, engage your target audience, and maximize ROI across all digital channels."
                icon={<TrendingUp className="w-12 h-12" />}
                features={[
                    "Search Engine Optimization (SEO)",
                    "Pay-Per-Click Advertising (PPC)",
                    "Social Media Marketing",
                    "Content Marketing & Strategy",
                    "Email Marketing Automation",
                    "Analytics & Performance Tracking"
                ]}
                gradient="from-[#06B6D4] to-[#8B5CF6]"
            />

            {/* App Development */}
            <ServiceSection
                title="App Development"
                description="Native and cross-platform mobile applications that deliver seamless user experiences and powerful functionality on iOS and Android."
                icon={<Smartphone className="w-12 h-12" />}
                features={[
                    "iOS & Android Native Apps",
                    "Cross-Platform Development (React Native, Flutter)",
                    "UI/UX Design for Mobile",
                    "App Store Optimization",
                    "Backend & API Integration",
                    "Maintenance & Support"
                ]}
                gradient="from-[#F97316] to-[#EF4444]"
                reverse
            />

            {/* SaaS Platforms */}
            <ServiceSection
                title="SaaS Platforms"
                description="Scalable, cloud-based software solutions that streamline operations, enhance productivity, and provide measurable business value."
                icon={<Cloud className="w-12 h-12" />}
                features={[
                    "Custom SaaS Development",
                    "Multi-Tenant Architecture",
                    "Subscription & Billing Integration",
                    "API Development & Documentation",
                    "Scalability & Performance",
                    "Security & Compliance"
                ]}
                gradient="from-[#8B5CF6] to-[#D946EF]"
            />

            {/* Workshops & EdTech */}
            <ServiceSection
                title="Workshops & EdTech"
                description="Interactive learning experiences and educational technology solutions that bridge the gap between knowledge and practical industry skills."
                icon={<Users className="w-12 h-12" />}
                features={[
                    "Technical Workshops & Training",
                    "Live Mentorship Programs",
                    "E-Learning Platform Development",
                    "Course Content Creation",
                    "Certification Programs",
                    "Industry-Academia Collaboration"
                ]}
                gradient="from-[#06B6D4] to-[#6366F1]"
                reverse
            />

            {/* Events & Hackathons */}
            <ServiceSection
                title="Events & Hackathons"
                description="Engaging tech events and competitive hackathons that foster innovation, collaboration, and community building in the developer ecosystem."
                icon={<Award className="w-12 h-12" />}
                features={[
                    "National & International Hackathons",
                    "Tech Conferences & Summits",
                    "Networking Events",
                    "Startup Pitch Competitions",
                    "Community Building Initiatives",
                    "Sponsorship & Partnership Management"
                ]}
                gradient="from-[#D946EF] to-[#8B5CF6]"
            />

            {/* CTA Section */}
            <section className="relative py-32 overflow-hidden">
                <BGPattern
                    variant="dots"
                    mask="fade-edges"
                    size={30}
                    fill="rgba(139, 92, 246, 0.15)"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-[#0B0B12]" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-[#111118] to-[#0B0B12] border border-white/10 rounded-3xl p-12 md:p-16 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Zap className="w-16 h-16 text-[#8B5CF6] mx-auto mb-6 animate-glow" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#A1A1AA] bg-clip-text text-transparent"
                        >
                            Ready to Transform Your Business?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-[#A1A1AA] mb-8 max-w-2xl mx-auto"
                        >
                            Let's collaborate to bring your vision to life with innovative solutions tailored to your unique needs.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <button className="group px-10 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#8B5CF6]/50 transition-all duration-300 flex items-center gap-2">
                                Start Your Project
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
                                Schedule Consultation
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

// ============================================================================
// SERVICE SECTION COMPONENT
// ============================================================================
function ServiceSection({ title, description, icon, features, gradient, reverse = false }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            <BGPattern
                variant="grid"
                mask="fade-edges"
                size={50}
                fill="rgba(139, 92, 246, 0.05)"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className={cn(
                    "grid md:grid-cols-2 gap-12 items-center",
                    reverse && "md:grid-flow-dense"
                )}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className={reverse ? "md:col-start-2" : ""}
                    >
                        <div className={cn(
                            "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br mb-6",
                            gradient
                        )}>
                            {icon}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#A1A1AA] bg-clip-text text-transparent">
                            {title}
                        </h2>

                        <p className="text-lg text-[#A1A1AA] mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full mt-2 bg-gradient-to-r flex-shrink-0",
                                        gradient
                                    )} />
                                    <span className="text-[#A1A1AA] group-hover:text-white transition-colors">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className={reverse ? "md:col-start-1 md:row-start-1" : ""}
                    >
                        <div className="relative">
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br rounded-3xl blur-3xl opacity-30",
                                gradient
                            )} />
                            <div className="relative bg-gradient-to-br from-[#111118] to-[#0B0B12] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                            className={cn(
                                                "aspect-square rounded-2xl bg-gradient-to-br p-6 flex items-center justify-center",
                                                gradient
                                            )}
                                        >
                                            <div className="w-full h-full bg-[#0B0B12]/50 rounded-xl backdrop-blur-sm" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
