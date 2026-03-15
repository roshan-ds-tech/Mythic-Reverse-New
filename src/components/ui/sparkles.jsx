"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const SparklesCore = (props) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
    } = props;
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const controls = useAnimation();

    const particlesLoaded = async (container) => {
        if (container) {
            controls.start({
                opacity: 1,
                transition: {
                    duration: 1,
                },
            });
        }
    };

    const generatedId = React.useId();

    return (
        <motion.div animate={controls} className={`opacity-0 ${className || ""}`}>
            {init && (
                <Particles
                    id={id || generatedId}
                    className="h-full w-full"
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: background || "transparent",
                            },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },
                        fpsLimit: 30,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: false,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            bounce: {
                                horizontal: {
                                    value: 1,
                                },
                                vertical: {
                                    value: 1,
                                },
                            },
                            collisions: {
                                absorb: {
                                    speed: 2,
                                },
                                bounce: {
                                    horizontal: {
                                        value: 1,
                                    },
                                    vertical: {
                                        value: 1,
                                    },
                                },
                                enable: false,
                                maxSpeed: 50,
                                mode: "bounce",
                                overlap: {
                                    enable: true,
                                    retries: 0,
                                },
                            },
                            color: {
                                value: particleColor || "#ffffff",
                            },
                            move: {
                                angle: {
                                    offset: 0,
                                    value: 90,
                                },
                                attract: {
                                    distance: 200,
                                    enable: false,
                                    rotate: {
                                        x: 3000,
                                        y: 3000,
                                    },
                                },
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "out",
                                },
                                random: false,
                                speed: {
                                    min: 0.1,
                                    max: 1,
                                },
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 400,
                                    height: 400,
                                },
                                value: particleDensity || 40,
                            },
                            opacity: {
                                value: {
                                    min: 0.1,
                                    max: 1,
                                },
                                animation: {
                                    enable: true,
                                    speed: speed || 4,
                                    sync: false,
                                    mode: "auto",
                                    startValue: "random",
                                },
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: {
                                    min: minSize || 1,
                                    max: maxSize || 3,
                                },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </motion.div>
    );
};
