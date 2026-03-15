import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected) => ({
        gap: isSelected ? ".5rem" : 0,
        paddingLeft: isSelected ? "1rem" : ".5rem",
        paddingRight: isSelected ? "1rem" : ".5rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const ExpandableMenuItem = ({
    setActive,
    active,
    item,
    icon: Icon,
    children,
    href,
    activeColor = "text-white",
}) => {
    const isSelected = active === item;
    const Component = href ? motion.a : motion.button;

    return (
        <div onMouseEnter={() => setActive(item)} className="relative">
            <Component
                href={href}
                variants={buttonVariants}
                initial={false}
                animate="animate"
                custom={isSelected}
                transition={{ delay: 0.1, type: "spring", bounce: 0, duration: 0.6 }}
                className={cn(
                    "relative flex items-center rounded-xl py-2 text-sm font-medium transition-colors duration-300 cursor-pointer",
                        isSelected
                        ? cn("bg-white/10", activeColor)
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
            >
                <Icon size={20} />
                <AnimatePresence initial={false}>
                    {isSelected && (
                        <motion.span
                            variants={spanVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ delay: 0.1, type: "spring", bounce: 0, duration: 0.6 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            {item}
                        </motion.span>
                    )}
                </AnimatePresence>
            </Component>

            {active !== null && children && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                    className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50 pointer-events-none"
                    style={{
                        pointerEvents: active === item ? "auto" : "none",
                        width: 'max-content'
                    }}
                >
                    {active === item && (
                        <div className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/20 transition-colors">
                            <div className="p-4">
                                {children}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

const ExpandableMenu = ({
    setActive,
    children,
    className
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className={cn(
                "flex flex-wrap items-center gap-2 rounded-2xl bg-black/40 backdrop-blur-sm p-1 shadow-sm border border-white/10 hover:border-white/20 transition-colors",
                className
            )}
        >
            {children}
        </nav>
    );
};

export { ExpandableMenuItem, ExpandableMenu };
