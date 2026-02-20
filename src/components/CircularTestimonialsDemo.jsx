import React from "react";
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const testimonials = [
    {
        quote:
            "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
        name: "Tamar Mendelson",
        designation: "Restaurant Critic",
        src:
            "images/web_images/Prasanna Kumar.avif",
    },
    {
        quote:
            "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
        name: "Joe Charlescraft",
        designation: "Frequent Visitor",
        src:
            "images/web_images/roshan1.avif",
    },
    {
        quote:
            "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Martina Edelweist",
        designation: "Satisfied Customer",
        src:
            "images/web_images/sharan.avif",
    },

];

export const CircularTestimonialsDemo = () => (
    <section className="py-20 bg-black">
        <div className="container mx-auto px-4 flex justify-center">
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-[100px] pointer-events-none rounded-full" />

            <div
                className="items-center justify-center relative flex w-full z-10"
                style={{ maxWidth: "1200px" }}
            >
                <CircularTestimonials
                    testimonials={testimonials}
                    autoplay={true}
                    colors={{
                        name: "#f7f7ff",
                        designation: "#e1e1e1",
                        testimony: "#f1f1f7",
                        arrowBackground: "#18181b",
                        arrowForeground: "#a78bfa",
                        arrowHoverBackground: "linear-gradient(to right, #8b5cf6, #d946ef)",
                    }}
                    fontSizes={{
                        name: "28px",
                        designation: "20px",
                        quote: "20px",
                    }}
                />
            </div>
        </div>
    </section>
);
