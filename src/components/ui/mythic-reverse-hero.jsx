import React, { useEffect, useRef, useMemo, useState } from "react"
import { motion, useMotionValue, useMotionTemplate, animate, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { } from "lucide-react"
import { SparklesCore } from "./sparkles"

const COLORS = ["#8B5CF6", "#A855F7", "#7C3AED"]; // Purple shades only

const ShaderPlane = ({ vertexShader, fragmentShader, uniforms }) => {
    const meshRef = useRef(null)
    const { size } = useThree()

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.3
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0)
        }
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.FrontSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    )
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  vec2 toPolar(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = 4.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);
    vec2 polar = toPolar(p);
    float r = polar.x;
    float a = polar.y;
    
    vec2 i = p;
    float c = 0.0;
    float rot = r + u_time * 0.5 + p.x * 0.08;
    
    for (float n = 0.0; n < 3.0; n++) {
      float rr = r + 0.12 * sin(u_time * 0.5 + float(n) + r * 1.5);
      p *= mat2(
        cos(rot), sin(rot),
        -sin(rot), cos(rot)
      ) * -0.3;
      
      float t = r - u_time / (n + 25.0);
      i -= p + sin(t - i.y) + rr;
      
      c += 1.8 / length(vec2(
        (sin(i.x + t) / 0.12),
        (cos(i.y + t) / 0.12)
      ));
    }
    
    c /= 6.0;
    
    vec3 color1 = vec3(0.4, 0.2, 0.8);
    vec3 color2 = vec3(0.8, 0.3, 0.6);
    vec3 baseColor = mix(color1, color2, sin(u_time * 0.3) * 0.5 + 0.5);
    vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.5);
    
    fragColor = vec4(finalColor * 0.6, 1.0);
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

function AnimatedText({ words, interval = 3000, className }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);
        return () => clearInterval(intervalId);
    }, [words, interval]);

    return (
        <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {words[currentWordIndex]}
        </motion.span>
    );
}

function MythicReverseHero({
    agencyName = "Mythic Reverse",
    headline = "Reverse Engineer Your Digital Future",
    subtext = "",
    animatedWords = [],
    ctaText = "Start Your Journey",
    ctaHref = "#contact",
    className = "",
}) {
    const color = useMotionValue(COLORS[0])
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
        }),
        []
    )

    useEffect(() => {
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
        })
    }, [color])

    const backgroundGradient = useMotionTemplate`radial-gradient(110% 110% at 50% -20%, #0B0B12 40%, ${color})`
    const border = useMotionTemplate`1px solid ${color}`
    const boxShadow = useMotionTemplate`0px 4px 32px ${color}`

    // Scroll-based vertical shift animation (adjusted for better blending)
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    }

    return (
        <motion.section
            ref={sectionRef}
            style={{
                backgroundImage: backgroundGradient,
            }}
            className={cn(
                "relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ShaderPlane
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={shaderUniforms}
                    />
                </Canvas>
            </div>

            <div className="absolute inset-0 z-[1] opacity-30">
                <Canvas>
                    <Stars radius={50} count={3000} factor={4} fade speed={1.5} />
                </Canvas>
            </div>

            {/* Sparkles Overlay to match About Us Page */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <SparklesCore
                    id="services-hero-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B12] via-transparent to-[#0B0B12] pointer-events-none z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0B0B12] to-transparent pointer-events-none z-[2]" />

            <motion.div
                style={{ y, scale }}
                className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8"
            >
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                    >
                        <span className="text-sm text-white/80 tracking-wider font-medium">
                            {agencyName}
                        </span>
                    </motion.div>

                    <motion.h1
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70 drop-shadow-2xl">
                            {headline}
                        </span>
                    </motion.h1>

                    <motion.p
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        {subtext}
                        {animatedWords.length > 0 && (
                            <>
                                {' '}
                                <AnimatedText words={animatedWords} className="text-purple-400 font-semibold" />
                                {' '}that drive growth and success
                            </>
                        )}
                    </motion.p>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            style={{
                                border,
                                boxShadow,
                            }}
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="inline-block rounded-md"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group relative px-6 py-4 sm:px-10 sm:py-6 bg-white/10 hover:bg-white/15 text-white font-semibold text-base sm:text-lg backdrop-blur-md border-0 transition-all duration-300"
                            >
                                <a href={ctaHref} className="flex items-center gap-2">
                                    {ctaText}
                                    <motion.span
                                        className="inline-block"
                                        animate={{
                                            x: [0, 4, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-8 text-sm text-white/50"
                    >
                        {["Immersive Design", "Advanced Tech", "Creative Innovation"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
                                <span className="tracking-wide">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3] hidden sm:block">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>
        </motion.section>
    )
}

export default MythicReverseHero;
