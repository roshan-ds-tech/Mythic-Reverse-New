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
    }
]

export function TestimonialCarouselDemo() {
    return (
        <div className="w-full relative py-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-black/40 to-black/80 pointer-events-none z-[1]" />
            {/* Bottom blend to black */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />

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
