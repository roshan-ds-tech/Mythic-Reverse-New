import React from 'react';
import { TestimonialCarousel } from "./ui/testimonial";

const DIRECTORS_DATA = [
    {
        id: 1,
        name: "Roshan",
        avatar: "images/web_images/roshan1.jpg",
        description: "Visionary leader driving Mythic Reverse towards the singularity. Obsessed with breaking the boundaries of what's possible in tech."
    },
    {
        id: 2,
        name: "Prasanna Kumar",
        avatar: "images/web_images/Prasanna Kumar.jpg",
        description: "Mastermind behind our scalable architecture. Ensuring that our innovations are as robust as they are revolutionary."
    },
    {
        id: 3,
        name: "Sharan Shekaran",
        avatar: "images/web_images/sharan.jpeg",
        description: "Orchestrating our global strategy and partnerships. Connecting the dots between complex technologies and real-world value."
    },
    {
        id: 4,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
        description: "Driving innovation in AI research and semantic understanding. Pushing the boundaries of neural architectures."
    },
    {
        id: 5,
        name: "Marcus Thorne",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        description: "Leading our global infrastructure scaling initiatives. Building the backbone of the next generation web."
    },
    {
        id: 6,
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        description: "Spearheading user experience and design systems. Crafting intuitive interfaces for complex reality simulations."
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
                <div className="text-center mb-12">
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
