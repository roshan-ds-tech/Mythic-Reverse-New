"use client";

import React, { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone, Server, Zap, Check, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Inline UI Components
const Badge = ({ className, variant = "default", ...props }) => {
    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)} {...props} />
    );
};

const Button = ({ className, variant = "default", size = "default", ...props }) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
                    "h-10 px-4 py-2": size === "default",
                    "h-9 rounded-md px-3": size === "sm",
                },
                className
            )}
            {...props}
        />
    );
};

const Card = ({ className, ...props }) => (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
);

const CardHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props} />
);


function ServicesOrbitalDisplay({ servicesData }) {
    const [expandedItems, setExpandedItems] = useState({});
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [centerOffset] = useState({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState(null);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    const handleContainerClick = (e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            // Close others
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let animationFrameId;
        let lastTime = performance.now();

        const animate = (time) => {
            if (!autoRotate) return;

            const deltaTime = time - lastTime;

            // Normalize speed regardless of frame rate (target ~12 deg/sec)
            // 0.6 deg per 50ms = 0.012 deg per ms
            const speedFactor = 0.012;

            if (deltaTime >= 16) { // Cap at ~60fps
                setRotationAngle((prev) => {
                    const newAngle = (prev + (deltaTime * speedFactor)) % 360;
                    return Number(newAngle.toFixed(3));
                });
                lastTime = time;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        if (autoRotate) {
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId) => {
        if (!nodeRefs.current[nodeId]) return;

        const nodeIndex = servicesData.findIndex((item) => item.id === nodeId);
        const totalNodes = servicesData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 200; // Restored Radius
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.7, // Increased minimum opacity for better visibility
            Math.min(1, 0.7 + 0.3 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId) => {
        const currentItem = servicesData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    // Styles adapted for Violet/Fuchsia Dark Theme
    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return "text-white bg-violet-600 border-white";
            case "in-progress":
                return "text-white bg-fuchsia-600 border-white";
            case "pending":
                return "text-white bg-violet-600/60 border-white/50";
            default:
                return "text-white bg-violet-600/40 border-white/50";
        }
    };

    return (
        <div
            //   className="w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden relative"
            className="w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center bg-transparent overflow-hidden relative" // Adjusted height for larger orbit
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Main Center Orb - Violet/Fuchsia */}
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 animate-pulse flex items-center justify-center z-10 shadow-lg shadow-violet-600/30">
                        <div className="absolute w-20 h-20 rounded-full border border-violet-600/30 animate-ping opacity-70"></div>
                        <div
                            className="absolute w-24 h-24 rounded-full border border-fuchsia-600/20 animate-ping opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md"></div>
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute w-96 h-96 rounded-full border border-violet-500/50"></div>

                    {servicesData.map((item, index) => {
                        const position = calculateNodePosition(index, servicesData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 500 : position.zIndex, // Higher z-index for expanded
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    if (el) nodeRefs.current[item.id] = el;
                                }}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                {/* Energy Pulse Ring */}
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)`, // Violet pulse
                                        width: `${item.energy * 0.5 + 40}px`,
                                        height: `${item.energy * 0.5 + 40}px`,
                                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                {/* Node Orb */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform",
                                        {
                                            "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/40 scale-150": isExpanded,
                                            "bg-violet-600/70 text-white border-violet-400 animate-pulse": isRelated,
                                            "bg-zinc-800 text-white border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.2)]": !isExpanded && !isRelated
                                        }
                                    )}
                                >
                                    <Icon size={16} />
                                </div>

                                {/* Node Label */}
                                <div
                                    className={cn(
                                        "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                                        {
                                            "text-white scale-125 font-bold": isExpanded,
                                            "text-violet-200 font-medium": !isExpanded
                                        }
                                    )}
                                >
                                    {item.title}
                                </div>

                                {/* Expanded Card Details */}
                                {isExpanded && (
                                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 bg-zinc-900/95 backdrop-blur-lg border-violet-500/30 shadow-xl shadow-violet-900/20 overflow-visible z-[600]"> {/* High z-index */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-violet-500/50"></div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    className={cn("px-2 text-xs", getStatusStyles(item.status))}
                                                >
                                                    {item.status === "completed"
                                                        ? "ACTIVE"
                                                        : item.status === "in-progress"
                                                            ? "FEATURED"
                                                            : "COMING SOON"}
                                                </Badge>
                                                <span className="text-xs font-mono text-violet-400/70">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-sm mt-2 text-violet-400">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xs text-neutral-300">
                                            <p className="leading-relaxed">{item.content}</p>

                                            <div className="mt-4 pt-3 border-t border-violet-500/20">
                                                <div className="flex justify-between items-center text-xs mb-1">
                                                    <span className="flex items-center text-violet-400">
                                                        <Zap size={10} className="mr-1" />
                                                        Service Level
                                                    </span>
                                                    <span className="font-mono text-violet-400">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-violet-500/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-violet-500/20">
                                                    <div className="flex items-center mb-2">
                                                        <h4 className="text-xs uppercase tracking-wider font-medium text-violet-400/80">
                                                            Related Services
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = servicesData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <button
                                                                    key={relatedId}
                                                                    className="flex items-center h-6 px-2 py-0 text-xs rounded-md border border-violet-500/30 bg-transparent hover:bg-violet-500/10 text-violet-400 transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Data and Export
export default function ServicesOrbitalDisplayDemo() {
    const servicesData = [
        {
            id: 1,
            title: "Website Design",
            date: "2024",
            content:
                "Crafting stunning, high-conversion UIs—like our recent work on digital marketing portfolios and UI redesigns. We focus on creating visually appealing interfaces that drive user engagement and conversions.",
            category: "Design",
            icon: Monitor,
            relatedIds: [2],
            status: "completed",
            energy: 95,
        },
        {
            id: 2,
            title: "Website Redesign",
            date: "2024",
            content:
                "Transform your existing website with modern design principles and improved user experience. We analyze your current site and implement strategic improvements that enhance both aesthetics and functionality.",
            category: "Design",
            icon: Monitor,
            relatedIds: [1, 3],
            status: "completed",
            energy: 90,
        },
        {
            id: 3,
            title: "App Development",
            date: "2024",
            content:
                "Building responsive mobile applications using modern frameworks like React Native. Our apps are designed to work seamlessly across iOS and Android platforms, providing native-like performance and user experience.",
            category: "Development",
            icon: Smartphone,
            relatedIds: [2, 4],
            status: "in-progress",
            energy: 85,
        },
        {
            id: 4,
            title: "SaaS Solutions",
            date: "2024",
            content:
                "Developing scalable 'Software as a Service' platforms with integrated dashboards and complex data visualizations. We build robust, cloud-based solutions that grow with your business needs.",
            category: "Platform",
            icon: Server,
            relatedIds: [3],
            status: "completed",
            energy: 92,
        },
    ];

    return <ServicesOrbitalDisplay servicesData={servicesData} />;
}
