import React, { useState } from "react";
import { HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { ExpandableMenu, ExpandableMenuItem } from "@/components/ui/expandable-menu";
import { cn } from "../lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMobile } from "../hooks/use-mobile";
import { Briefcase, ShoppingBag, Home, Calendar, MessageSquare } from "lucide-react";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-10" />
        </div>
    );
}

function Navbar({ className }) {
    const [active, setActive] = useState(null);
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);
    const isMobile = useMobile();

    useMotionValueEvent(scrollY, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current - scrollY.getPrevious();

            if (scrollY.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -100,
            }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0,
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
            className={cn("fixed top-10 inset-x-5 max-w-fit mx-auto z-50", className)}
        >
            <ExpandableMenu setActive={setActive}>
                <ExpandableMenuItem setActive={setActive} active={active} item="Home" icon={Home} href="/" />
                <ExpandableMenuItem setActive={setActive} active={active} item="Services" icon={Briefcase} href="/services" />
                <ExpandableMenuItem setActive={setActive} active={active} item="About Us" icon={ShoppingBag} href="/about-us" />
                <ExpandableMenuItem setActive={setActive} active={active} item="Consultation" icon={Calendar} href="/consultation" />

                {/* Vertical Separator */}
                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 whitespace-nowrap"
                >
                    <MessageSquare size={16} />
                    <span>CONTACT</span>
                </motion.a>
            </ExpandableMenu>
        </motion.div>
    );
}
