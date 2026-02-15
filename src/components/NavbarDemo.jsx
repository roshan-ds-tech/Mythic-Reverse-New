import React, { useState } from "react";
import { HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { ExpandableMenu, ExpandableMenuItem } from "@/components/ui/expandable-menu";
import { cn } from "../lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMobile } from "../hooks/use-mobile";
import { Briefcase, ShoppingBag, DollarSign, Home, Bell, GraduationCap, Calendar } from "lucide-react";

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
                <ExpandableMenuItem setActive={setActive} active={active} item="Internship" icon={GraduationCap}>
                    <div className="flex flex-col space-y-4 text-sm w-48">
                        <HoveredLink href="#">Full Stack Intern</HoveredLink>
                        <HoveredLink href="#">Frontend Intern</HoveredLink>
                        <HoveredLink href="#">Backend Intern</HoveredLink>
                    </div>
                </ExpandableMenuItem>
                <ExpandableMenuItem setActive={setActive} active={active} item="Pricing" icon={DollarSign}>
                    <div className="flex flex-col space-y-4 text-sm w-48">
                        <HoveredLink href="#">Hobby</HoveredLink>
                        <HoveredLink href="#">Individual</HoveredLink>
                        <HoveredLink href="#">Team</HoveredLink>
                        <HoveredLink href="#">Enterprise</HoveredLink>
                    </div>
                </ExpandableMenuItem>

                <ExpandableMenuItem setActive={setActive} active={active} item="Notification" icon={Bell}>
                    <div className="flex flex-col space-y-4 text-sm w-48">
                        <HoveredLink href="#">New Updates</HoveredLink>
                        <HoveredLink href="#">Messages</HoveredLink>
                    </div>
                </ExpandableMenuItem>


            </ExpandableMenu>
        </motion.div>
    );
}
