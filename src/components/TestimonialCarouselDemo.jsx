import React from 'react';
import { TestimonialCarousel } from "./ui/testimonial";

const DIRECTORS_DATA = [
    {
        id: 1,
        name: "Prasannakumar K",
        role: "Chief Executive Officer (CEO)",
        avatar: "images/web_images/Prasanna Kumar.jpg",
        description: (
            <div className="space-y-8">
                <p>Prasannakumar provides strategic leadership and sets the long-term vision of the company. He drives innovation, builds strong partnerships, and ensures sustainable growth while maintaining a strong organizational culture.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Strategic Planning • Business Development • Leadership & Team Building • Corporate Strategy • Decision Making • Growth Management</p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        name: "Roshan DS",
        role: "Chief Technology Officer (CTO)",
        avatar: "images/web_images/roshan1.jpg",
        description: (
            <div className="space-y-8">
                <p>Roshan leads the company’s technology roadmap, overseeing product development, digital transformation, and technical innovation. He ensures scalable, secure, and future-ready solutions that support business expansion.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Technology Strategy • Software & Product Development • System Architecture • IT Infrastructure • Innovation Management • Technical Leadership</p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        name: "Sharan S",
        role: "Chief Financial Officer (CFO)",
        avatar: "images/web_images/sharan.jpeg",
        description: (
            <div className="space-y-8">
                <p>Sharan manages financial strategy, planning, and resource allocation. He ensures financial stability, risk management, and transparency while supporting long-term investment and growth initiatives.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Financial Planning & Analysis • Budgeting & Forecasting • Risk Management • Investment Strategy • Financial Reporting • Cost Control</p>
                </div>
            </div>
        )
    },
    {
        id: 4,
        name: "Premdharshan C V",
        role: "Chief Operating Officer (COO)",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        description: (
            <div className="space-y-8">
                <p>Premdharshan oversees daily operations and ensures efficient execution of business strategies. He focuses on operational excellence, performance optimization, and building strong internal systems for sustainable success.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Operations Management • Process Optimization • Project Management • Performance Monitoring • Organizational Development • Team Leadership</p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        name: "Vivek K A",
        role: "Chief Marketing Officer (CMO)",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        description: (
            <div className="space-y-8">
                <p>Vivek leads the company’s marketing and brand strategy, driving customer engagement, market expansion, and revenue growth. He ensures strong brand positioning and impactful marketing campaigns across platforms.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Brand Strategy • Digital Marketing • Market Research • Campaign Management • Customer Acquisition • Growth Strategy</p>
                </div>
            </div>
        )
    },
    {
        id: 6,
        name: "Nirmalkumar K",
        role: "Chief Development Officer (CDO)",
        avatar: "images/web_images/nirmal.jpeg",
        description: (
            <div className="space-y-8">
                <p>Nirmalkumar leads product development and execution across digital and IT projects. He ensures high-quality code standards, efficient development cycles, and scalable system implementation aligned with business objectives.</p>
                <div>
                    <strong className="text-violet-400 block mb-1 text-xs uppercase tracking-wider">Core Skills</strong>
                    <p className="text-xs text-zinc-500">Full-Stack Development • Product Engineering • Development Lifecycle Management • Quality Assurance • Technical Team Leadership</p>
                </div>
            </div>
        )
    }
]

export function TestimonialCarouselDemo() {
    return (
        <div className="w-full relative py-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements */}
            {/* Background Elements */}
            <div className="absolute inset-0 bg-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent pointer-events-none z-[1]" />
            {/* Bottom blend to black */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-[2] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
                        MEET THE LEADERSHIP
                    </h2>
                    <p className="text-neutral-400 max-w-lg mx-auto">
                        The minds steering Mythic Reverse into the future.
                    </p>
                </div>

                <TestimonialCarousel
                    testimonials={DIRECTORS_DATA}
                    className="max-w-4xl mx-auto"
                    autoplay={true}
                    autoplayInterval={4000}
                />
            </div>
        </div>
    )
}
