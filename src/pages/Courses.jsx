import React, { useEffect, useRef, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Zap, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { cn } from '../lib/utils';
import { Footer } from '../components/ui/footer-section';

function Entropy({ className = "", size = 400 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const particleColor = '#a855f7';

    class Particle {
      constructor(x, y, order) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = 2;
        this.order = order;
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        };
        this.influence = 0;
        this.neighbors = [];
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;

          const chaosInfluence = { x: 0, y: 0 };
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
              const strength = Math.max(0, 1 - distance / 100);
              chaosInfluence.x += (neighbor.velocity.x * strength);
              chaosInfluence.y += (neighbor.velocity.y * strength);
              this.influence = Math.max(this.influence, strength);
            }
          });

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence;
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence;

          this.influence *= 0.99;
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5;
          this.velocity.y += (Math.random() - 0.5) * 0.5;
          this.velocity.x *= 0.95;
          this.velocity.y *= 0.95;
          this.x += this.velocity.x;
          this.y += this.velocity.y;

          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1;
          if (this.y < 0 || this.y > size) this.velocity.y *= -1;
          this.x = Math.max(size / 2, Math.min(size, this.x));
          this.y = Math.max(0, Math.min(size, this.y));
        }
      }

      draw(ctx) {
        const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8;
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const gridSize = 25;
    const spacing = size / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2;
        const y = spacing * j + spacing / 2;
        const order = x < size / 2;
        particles.push(new Particle(x, y, order));
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false;
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          return distance < 100;
        });
      });
    }

    let time = 0;
    let animationId;
    
    function animate() {
      ctx.clearRect(0, 0, size, size);

      if (time % 30 === 0) {
        updateNeighbors();
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);

        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          if (distance < 50) {
            const alpha = 0.2 * (1 - distance / 50);
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        });
      });

      time++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [size]);

  return (
    <div className={cn("relative bg-black", className)} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

const RotatingText = forwardRef(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const splitIntoCharacters = (text) => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(
          segmenter.segment(text),
          (segment) => segment.segment
        );
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }

      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index, totalChars) => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName
        )}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className={cn(
              splitBy === "lines"
                ? "flex flex-col w-full"
                : "flex flex-wrap whitespace-pre-wrap relative"
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span
                  key={wordIndex}
                  className={cn("inline-flex", splitLevelClassName)}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce(
                            (sum, word) => sum + word.characters.length,
                            0
                          )
                        ),
                      }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && (
                    <span className="whitespace-pre"> </span>
                  )}
                </span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";

function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

function SparklesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();

    const sparkles = [];
    const numSparkles = 250; // Further increased amount for dense visibility
    for (let i = 0; i < numSparkles; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Larger size
        alpha: Math.random(),
        fadeSpeed: (Math.random() * 0.01) + 0.005,
        speedY: (Math.random() * 0.3) + 0.1,
        isWhite: Math.random() > 0.5 // Randomize color between white and purple
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach(sparkle => {
        sparkle.alpha += sparkle.fadeSpeed;
        if (sparkle.alpha >= 1) {
          sparkle.alpha = 1;
          sparkle.fadeSpeed *= -1;
        } else if (sparkle.alpha <= 0) {
          sparkle.alpha = 0;
          sparkle.fadeSpeed *= -1;
          // Randomize position when faded out to simulate new sparkle appearing
          sparkle.x = Math.random() * canvas.width;
          sparkle.y = Math.random() * canvas.height;
        }

        // White or bright purple particles
        const r = sparkle.isWhite ? 255 : 216;
        const g = sparkle.isWhite ? 255 : 180;
        const b = sparkle.isWhite ? 255 : 254;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${sparkle.alpha})`;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fill();

        sparkle.y -= sparkle.speedY; // Float up
        if (sparkle.y < 0) {
          sparkle.y = canvas.height;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

function CoursesHeroSection() {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollPosition = window.pageYOffset;
        const maxScroll = 400;
        const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
        contentRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pt-20">
      <CosmicBackground />

      <div className="relative z-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-6"
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Transform Your Future
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Master the art of
                <br />
                <RotatingText
                  texts={["Development", "Design", "AI & ML", "Web3", "Innovation"]}
                  mainClassName="text-purple-400 inline-flex"
                  staggerFrom="first"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.03}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 40, stiffness: 800 }}
                  rotationInterval={3000}
                />
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                Embark on a cosmic journey through cutting-edge courses designed to elevate your skills. 
                Learn from industry experts and join a community of stellar learners.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white group">
                  <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                  <Zap className="w-5 h-5 mr-2" />
                  Free Trial
                </Button>
              </div>


            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <Entropy className="rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20" size={500} />
                <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Live Now
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

const stats = [
  { label: "Active Students", value: "10K+" },
  { label: "Expert Instructors", value: "50+" },
  { label: "Course Hours", value: "500+" },
  { label: "Completion Rate", value: "95%" },
];

const categories = ["All", "Development", "Design", "Business", "Marketing", "Data Science"];

const featuredCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    description: "Master modern React development with advanced patterns and best practices",
    level: "Advanced",
    duration: "12 weeks",
    students: 2500,
    category: "Development"
  },
  {
    id: "2",
    title: "Full-Stack Web Engineering",
    description: "Build complete web applications from frontend to backend using modern frameworks",
    level: "Intermediate",
    duration: "16 weeks",
    students: 1800,
    category: "Development"
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of creating beautiful and functional user interfaces",
    level: "Beginner",
    duration: "8 weeks",
    students: 3200,
    category: "Design"
  },
  {
    id: "4",
    title: "Interactive Prototyping Mastery",
    description: "Take your design skills further with advanced motion and interactive components",
    level: "Advanced",
    duration: "6 weeks",
    students: 1540,
    category: "Design"
  },
  {
    id: "5",
    title: "Startup Lifecycle & Management",
    description: "Understand the key stages of building, scaling, and managing a successful modern business",
    level: "Intermediate",
    duration: "10 weeks",
    students: 2100,
    category: "Business"
  },
  {
    id: "6",
    title: "Digital Marketing Strategy",
    description: "Learn how to build effective campaigns across SEO, social media, and paid channels",
    level: "Beginner",
    duration: "6 weeks",
    students: 4500,
    category: "Marketing"
  },
  {
    id: "7",
    title: "Data Analysis with Python",
    description: "Extract insights from raw data using Pandas, NumPy, and visualization libraries",
    level: "Beginner",
    duration: "8 weeks",
    students: 5600,
    category: "Data Science"
  },
  {
    id: "8",
    title: "Machine Learning Foundations",
    description: "Core concepts of predictive modeling, supervised and unsupervised learning",
    level: "Intermediate",
    duration: "14 weeks",
    students: 3100,
    category: "Data Science"
  }
];

function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") {
      return featuredCourses;
    }
    return featuredCourses.filter(course => course.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative z-20 pb-32 pt-8">
      <SparklesBackground />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-30">
        
        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
                <Card className="relative bg-black/50 backdrop-blur-md border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Categories Tabs */}
        {categories && categories.length > 0 && (
          <div className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Explore by Category
            </h2>
            <Tabs defaultValue={categories[0]} className="w-full flex flex-col items-center">
              <TabsList className="w-fit flex-wrap justify-center h-auto gap-2 rounded-xl border border-purple-500/20 bg-black/50 backdrop-blur-md p-2 shadow-2xl shadow-purple-500/5">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-white/5 hover:text-white data-[state=active]:bg-purple-500/20 data-[state=active]:shadow-none data-[state=active]:after:bg-purple-500 data-[state=active]:hover:bg-purple-500/20 transition-all py-2 px-6 rounded-lg text-gray-300"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Featured Courses */}
        {featuredCourses && featuredCourses.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
              Featured Courses
            </h3>
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className="relative group bg-black/40 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-8 space-y-6 h-full flex flex-col">
                        <div className="flex items-start justify-between">
                          <Badge
                            variant="outline"
                            className="border-purple-500/30 bg-purple-500/10 text-purple-300 px-3 py-1"
                          >
                            {course.level}
                          </Badge>
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-300 pt-6 border-t border-purple-500/20 mt-auto">
                          <span className="flex items-center gap-2 font-medium">
                            <BookOpen className="w-4 h-4 text-purple-400" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-2 font-medium">
                            <Zap className="w-4 h-4 text-purple-400" />
                            {course.students.toLocaleString()} students
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="bg-black min-h-screen">
      <CoursesHeroSection />
      <ExploreSection />
      <Footer />
    </div>
  );
}
