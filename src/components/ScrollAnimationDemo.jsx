import { motion } from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function ScrollAnimationDemo() {
    return (
        <div className="flex flex-col overflow-hidden bg-black -mt-40 md:mt-0">
            <ContainerScroll
                titleComponent={
                    <>
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className="text-4xl font-semibold text-black dark:text-white"
                        >
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Mythic Reverse
                            </span>
                        </motion.h1>
                    </>
                }
            >
                <img
                    src="/images/web_images/below_hero_section.png"
                    alt="hero"
                    className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
