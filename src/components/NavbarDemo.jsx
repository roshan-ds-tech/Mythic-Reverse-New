import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }) {
    const [active, setActive] = useState(null);
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);

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
                opacity: 1,
                y: 0,
            }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0,
            }}
            transition={{
                duration: 0.2,
            }}
            className={cn("fixed top-10 inset-x-5 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="#">Web Development</HoveredLink>
                        <HoveredLink href="#">Interface Design</HoveredLink>
                        <HoveredLink href="#">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="#">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="text-sm grid grid-cols-2 gap-2 md:gap-10 p-4">
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
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="#">Hobby</HoveredLink>
                        <HoveredLink href="#">Individual</HoveredLink>
                        <HoveredLink href="#">Team</HoveredLink>
                        <HoveredLink href="#">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </motion.div>
    );
}
