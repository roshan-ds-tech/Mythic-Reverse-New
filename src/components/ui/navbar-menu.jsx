import React from "react";
import { motion } from "framer-motion";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl max-w-[calc(100vw-2.5rem)] md:max-w-none"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white animate-rainbow-border flex justify-center space-x-2 md:space-x-4 px-8 py-6 "
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}) => {
    return (
        <a href={href} className="flex space-x-2">
            <img
                src={src}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl w-16 h-10 md:w-[140px] md:h-[70px] object-cover"
            />
            <div>
                <h4 className="text-sm md:text-xl font-bold mb-1 text-black dark:text-white">
                    {title}
                </h4>
                <p className="text-neutral-700 text-xs md:text-sm max-w-[10rem] dark:text-neutral-300">
                    {description}
                </p>
            </div>
        </a>
    );
};

export const HoveredLink = ({ children, ...rest }) => {
    return (
        <a
            {...rest}
            className="text-neutral-700 dark:text-neutral-200 hover:text-black "
        >
            {children}
        </a>
    );
};
