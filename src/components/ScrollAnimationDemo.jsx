import { motion } from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function ScrollAnimationDemo() {
    return (
        <div className="flex flex-col overflow-hidden bg-mythic-black py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-6 text-left">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className="text-4xl md:text-6xl font-bold text-text-primary leading-tight"
                        >
                            Empowering Your <br />
                            <span className="text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Digital Journey</span>
                        </motion.h1>

                        <p className="text-lg text-text-secondary max-w-lg">
                            We bridge the gap between education and industry. Join our ecosystem of
                            <span className="text-text-primary font-semibold"> IT Solutions</span>,
                            <span className="text-text-primary font-semibold"> EdTech</span>, and
                            <span className="text-text-primary font-semibold"> Hackathons</span>.
                        </p>

                        <ul className="space-y-4 mt-4">
                            {[
                                "Live Mentorship & Workshops",
                                "Capstone Projects with Industry Experts",
                                "National Level Hackathons",
                                "100% Job Assistance & Internships"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-3 text-text-secondary"
                                >
                                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#06B6D4]" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Scroll Animation */}
                    <div className="relative">
                        <ContainerScroll
                            // Force height override to shrink it vertically
                            className="!h-[40rem] w-full"
                            titleComponent={
                                <div className="mb-0">
                                    <h2 className="text-2xl font-bold text-white mb-2">Our Ecosystem</h2>
                                    <p className="text-neutral-500 text-sm">Explore our dashboard</p>
                                </div>
                            }
                        >
                            <img
                                src="/images/web_images/container_scroll.avif"
                                alt="IT Solutions Dashboard"
                                className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
                                draggable={false}
                            />
                        </ContainerScroll>
                    </div>

                </div>
            </div>
        </div>
    );
}
