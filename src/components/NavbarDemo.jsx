import React, { useState } from "react";
import { HoveredLink, ProductItem } from "./ui/navbar-menu";
import { ExpandableMenu, ExpandableMenuItem } from "./ui/expandable-menu";
import { cn } from "../lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMobile } from "../hooks/use-mobile";
import { Briefcase, ShoppingBag, DollarSign, Home, Bell, GraduationCap } from "lucide-react";

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
                <ExpandableMenuItem setActive={setActive} active={active} item="Home" icon={Home}>
                    <div className="flex flex-col space-y-4 text-sm w-48">
                        <HoveredLink href="#">Dashboard</HoveredLink>
                        <HoveredLink href="#">Analytics</HoveredLink>
                    </div>
                </ExpandableMenuItem>

                <ExpandableMenuItem setActive={setActive} active={active} item="Services" icon={Briefcase}>
                    <div className="flex flex-col space-y-4 text-sm w-48">
                        <HoveredLink href="#">Web Development</HoveredLink>
                        <HoveredLink href="#">Interface Design</HoveredLink>
                        <HoveredLink href="#">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="#">Branding</HoveredLink>
                    </div>
                </ExpandableMenuItem>
                <ExpandableMenuItem setActive={setActive} active={active} item="Products" icon={ShoppingBag}>
                    <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 p-4" style={{ width: '500px' }}>
                        <ProductItem
                            title="Algochurn"
                            href="#"
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=140&h=70&auto=format&fit=crop"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="#"
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=140&h=70&auto=format&fit=crop"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="#"
                            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=140&h=70&auto=format&fit=crop"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="#"
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=140&h=70&auto=format&fit=crop"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </ExpandableMenuItem>
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

                <div className="h-6 w-px bg-border-steel mx-1" />

                <button className="text-sm font-medium text-text-primary hover:text-fuchsia-400 px-3 py-2 transition-colors">
                    Login
                </button>
                <button className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-full hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Sign Up
                </button>
            </ExpandableMenu>
        </motion.div>
    );
}
