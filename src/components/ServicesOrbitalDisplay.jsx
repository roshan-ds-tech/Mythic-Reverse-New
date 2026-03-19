"use client";

import React, { useState, useRef } from "react";
import { Monitor, Smartphone, Server, Zap } from "lucide-react";
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
    const [autoRotate, setAutoRotate] = useState(true);
    const [activeNodeId, setActiveNodeId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Use refs instead of state for values that don't need to trigger re-renders
    const rotationAngleRef = useRef(0);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    const handleContainerClick = (e) => {
        // Any click that bubbles to the container is a background click
        setExpandedItems({});
        setActiveNodeId(null);
        setAutoRotate(true);
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
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
            }

            return newState;
        });
    };

    const centerViewOnNode = (nodeId) => {
        if (!nodeRefs.current[nodeId] || !orbitRef.current) return;

        const nodeIndex = servicesData.findIndex((item) => item.id === nodeId);
        const totalNodes = servicesData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        // Update ref instead of state
        rotationAngleRef.current = 270 - targetAngle;

        // Apply rotation directly to the orbit element
        orbitRef.current.style.transform = `rotate(${rotationAngleRef.current}deg)`;
    };

    const calculateNodePosition = (index, total) => {
        const angle = (index / total) * 360;
        const radius = isMobile ? 125 : 200;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.7,
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
        <>
            {/* CSS Animation for GPU-accelerated rotation */}
            <style>
                {`
                    @keyframes orbitRotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    @keyframes counterRotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(-360deg); }
                    }
                    
                    .orbit-container {
                        will-change: transform;
                        animation: orbitRotate 30s linear infinite;
                    }
                    
                    .orbit-container.paused {
                        animation: none;
                    }

                    /* Optimize rendering for nodes */
                    .orbit-node {
                        will-change: transform;
                        transform: translateZ(0);
                        backface-visibility: hidden;
                    }

                    /* Text counter-rotation - updated to apply to full node content */
                    .orbit-node-rotator {
                        will-change: transform;
                        animation: counterRotate 30s linear infinite;
                    }

                    .orbit-node-rotator.paused {
                        animation: none;
                    }

                    /* Card Entry Animation */
                    @keyframes cardEntry {
                        from { opacity: 0; transform: translate(-50%, -40%) scale(0.95); }
                        to { opacity: 1; transform: translate(-50%, 0) scale(1); }
                    }

                    .card-entry {
                        animation: cardEntry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}
            </style>

            <div
                className="w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center bg-transparent overflow-hidden relative"
                ref={containerRef}
                onClick={handleContainerClick}
            >
                <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                            perspective: "1000px",
                        }}
                    >
                        {/* Main Center Orb - Violet/Fuchsia */}
                        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 flex items-center justify-center z-10 shadow-md shadow-violet-600/20 pointer-events-none">
                            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md"></div>
                        </div>

                        {/* Orbit Ring */}
                        <div className={cn("absolute rounded-full border border-violet-500/50 pointer-events-none", isMobile ? "w-[250px] h-[250px]" : "w-96 h-96")}></div>

                        {/* Rotating container with CSS animation */}
                        <div
                            ref={orbitRef}
                            className={cn("orbit-container absolute w-full h-full flex items-center justify-center pointer-events-none", {
                                "paused z-50": !autoRotate // Z-50 fixes overlay issue when expanded
                            })}
                            style={autoRotate ? {
                                // Resume animation from the current angle using negative delay
                                // 30s duration. angle / 360 * 30s.
                                animationDelay: `-${(rotationAngleRef.current % 360) / 360 * 30}s`
                            } : {
                                transform: `rotate(${rotationAngleRef.current}deg)`
                            }}
                        >
                            {servicesData.map((item, index) => {
                                const position = calculateNodePosition(index, servicesData.length);
                                const isExpanded = expandedItems[item.id];
                                const isRelated = isRelatedToActive(item.id);
                                const Icon = item.icon;

                                const nodeStyle = {
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: isExpanded ? 500 : position.zIndex,
                                    opacity: isExpanded ? 1 : position.opacity,
                                };

                                return (
                                    <div
                                        key={item.id}
                                        ref={(el) => {
                                            if (el) nodeRefs.current[item.id] = el;
                                        }}
                                        // Center the pivot point of the node
                                        className="orbit-node absolute left-1/2 top-1/2 -ml-5 -mt-5 w-10 h-10 transition-all duration-700 pointer-events-auto cursor-pointer flex items-center justify-center"
                                        style={nodeStyle}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleItem(item.id);
                                        }}
                                    >
                                        {/* Rotator wrapper to keep content upright */}
                                        <div
                                            className={cn("orbit-node-rotator relative w-full h-full flex items-center justify-center", {
                                                "paused": !autoRotate
                                            })}
                                            style={!autoRotate ? {
                                                transform: `rotate(-${rotationAngleRef.current}deg)`
                                            } : {
                                                // Counter-rotate to match the negative delay of parent
                                                animationDelay: `-${(rotationAngleRef.current % 360) / 360 * 30}s`
                                            }}
                                        >
                                            {/* Energy Pulse Ring */}
                                            <div
                                                className={`absolute rounded-full -inset-1 ${isExpanded || isRelated ? "animate-pulse duration-1000" : ""}`}
                                                style={{
                                                    background: `radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)`, // Violet pulse
                                                    width: `${item.energy * 0.5 + 40}px`,
                                                    height: `${item.energy * 0.5 + 40}px`,
                                                    left: `50%`,
                                                    top: `50%`,
                                                    transform: `translate(-50%, -50%)`,
                                                }}
                                            ></div>

                                            {/* Node Orb - Removed heavy shadows and pulses */}
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform relative z-10",
                                                    {
                                                        "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/30 scale-150": isExpanded,
                                                        "bg-violet-600/70 text-white border-violet-400": isRelated,
                                                        "bg-zinc-800 text-white border-violet-500 shadow-sm shadow-violet-600/10": !isExpanded && !isRelated
                                                    }
                                                )}
                                            >
                                                <Icon size={16} />
                                            </div>

                                            {/* Node Label - Counter-rotate to keep text upright */}
                                            <div
                                                className={cn(
                                                    "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 z-20",
                                                    {
                                                        "text-white scale-125 font-bold": isExpanded,
                                                        "text-violet-200 font-medium": !isExpanded
                                                    }
                                                )}
                                            >
                                                {item.title}
                                            </div>

                                            {/* Expanded Card Details (Desktop only) */}
                                            {!isMobile && isExpanded && (
                                                <Card className="card-entry absolute top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-80 bg-zinc-900/95 backdrop-blur-lg border-violet-500/30 shadow-lg shadow-violet-900/10 overflow-visible z-[600]">
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
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile Expanded Card Modal */}
                {isMobile && activeNodeId && (
                    <div 
                        className="absolute inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(activeNodeId);
                        }}
                    >
                        {servicesData.filter(item => item.id === activeNodeId).map(item => (
                            <Card 
                                key={item.id} 
                                className="card-entry w-full max-w-[320px] bg-zinc-900/95 border-violet-500/30 shadow-2xl shadow-violet-900/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <Badge className={cn("px-2 text-xs", getStatusStyles(item.status))}>
                                            {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "FEATURED" : "COMING SOON"}
                                        </Badge>
                                        <span className="text-xs font-mono text-violet-400/70">{item.date}</span>
                                    </div>
                                    <CardTitle className="text-sm mt-2 text-violet-400">{item.title}</CardTitle>
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
                                            <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600" style={{ width: `${item.energy}%` }}></div>
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
                                                    const relatedItem = servicesData.find((i) => i.id === relatedId);
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
                        ))}
                    </div>
                )}
            </div>
        </>
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
