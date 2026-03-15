import React, { useEffect, useRef, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const fpsInterval = 1000 / 30;
    let lastFrameTime = 0;
    
    function animate(currentTime) {
      animationId = requestAnimationFrame(animate);
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = currentTime - (elapsed % fpsInterval);
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

    animate(0);

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
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
      });
    }

    let animStars;
    const fpsIntervalStars = 1000 / 30;
    let lastStarsTime = 0;
    function animate(currentTime) {
      animStars = requestAnimationFrame(animate);
      if (currentTime - lastStarsTime < fpsIntervalStars) return;
      lastStarsTime = currentTime;
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

      animStars = requestAnimationFrame(animate);
    }

    animate(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animStars);
    };
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

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    updateSize();

    const sparkles = [];
    const numSparkles = 120; // Optimized from 250
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

    let animationFrameId;
    const fpsIntervalSp = 1000 / 30;
    let lastSpTime = 0;
    function animate(currentTime) {
      animationFrameId = requestAnimationFrame(animate);
      if (currentTime - lastSpTime < fpsIntervalSp) return;
      lastSpTime = currentTime;
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

    animate(0);

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
                1 Hour a Day.
                <br />
                <span className="text-purple-400">45 Days.</span>
              </h1>

              <p className="text-xl md:text-2xl font-medium text-gray-200">
                Where Beginners Become Builders.
              </p>

              <div className="space-y-4 text-lg text-gray-400 max-w-2xl leading-relaxed">
                <p>
                  MythicReverse is India's most focused developer training academy. Five AI-powered courses designed for complete beginners. One dedicated hour per day, every day for 45 days — using the same AI tools that professional developers use at top tech companies.
                </p>
                <p>
                  You don't need a degree. You don't need experience. You need one hour and the discipline to show up every day.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 mb-8 max-w-3xl">
                <Card className="bg-purple-500/10 border-purple-500/20 backdrop-blur-md p-4 text-center hover:border-purple-500/40 transition-colors">
                  <div className="text-3xl font-bold text-white mb-1">1 hr</div>
                  <div className="text-sm font-medium text-purple-300 tracking-wide">Per Day</div>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500/20 backdrop-blur-md p-4 text-center hover:border-purple-500/40 transition-colors">
                  <div className="text-3xl font-bold text-white mb-1">45</div>
                  <div className="text-sm font-medium text-purple-300 tracking-wide">Days per Course</div>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500/20 backdrop-blur-md p-4 text-center hover:border-purple-500/40 transition-colors">
                  <div className="text-3xl font-bold text-white mb-1">5</div>
                  <div className="text-sm font-medium text-purple-300 tracking-wide">Courses</div>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500/20 backdrop-blur-md p-4 text-center hover:border-purple-500/40 transition-colors">
                  <div className="text-3xl font-bold text-white mb-1">9</div>
                  <div className="text-sm font-medium text-purple-300 tracking-wide">AI Tools</div>
                </Card>
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

const categories = ["All", "Development", "Security"];

const featuredCourses = [
  {
    id: "1",
    title: "Programming Languages",
    description: "Learn 13 languages, Cursor, and Copilot",
    level: "Beginner",
    duration: "45 Days",
    students: "10K+",
    category: "Development",
    link: "/courses/programming-languages"
  },
  {
    id: "2",
    title: "Ethical Hacking & Cybersecurity",
    description: "Kali Linux, Metasploit, Burp Suite",
    level: "Beginner",
    duration: "45 Days",
    students: "5K+",
    category: "Security",
    link: "/courses/ethical-hacking"
  },
  {
    id: "3",
    title: "Full Stack Web Development",
    description: "React, Node.js, PostgreSQL, Vercel",
    level: "Beginner",
    duration: "45 Days",
    students: "8K+",
    category: "Development",
    link: "/courses/full-stack-web-dev"
  },
  {
    id: "4",
    title: "App Development with Flutter",
    description: "Dart, Flutter, Firebase, Android/iOS",
    level: "Beginner",
    duration: "45 Days",
    students: "6K+",
    category: "Development",
    link: "/courses/flutter-app-dev"
  },
  {
    id: "5",
    title: "App Development with React Native",
    description: "Expo, Supabase, EAS Build",
    level: "Beginner",
    duration: "45 Days",
    students: "4K+",
    category: "Development",
    link: "/courses/react-native-app-dev"
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
                        
                      {course.link ? (
                        <Link to={course.link} className="absolute inset-0 z-10">
                          <span className="sr-only">View course details</span>
                        </Link>
                      ) : null}

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
                        <div className="flex flex-col gap-5 pt-6 border-t border-purple-500/20 mt-auto">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <span className="flex items-center gap-2 font-medium">
                              <BookOpen className="w-4 h-4 text-purple-400" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-2 font-medium">
                              <Zap className="w-4 h-4 text-purple-400" />
                              {course.students} students
                            </span>
                          </div>
                          <Button className="w-full bg-purple-600/80 text-white font-semibold transition-all duration-300 group-hover:bg-purple-600 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            Enroll Now
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
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

const coursesData = [
  { code: "C-01", price: "Rs. 8,999 / lang", course: "Programming Languages", stack: "13 languages · Cursor · Copilot", link: "/courses/programming-languages" },
  { code: "C-02", price: "Rs. 14,999", course: "Ethical Hacking & Cybersecurity", stack: "Kali Linux · Metasploit · Burp Suite", link: "/courses/ethical-hacking" },
  { code: "C-03", price: "Rs. 19,499", course: "Full Stack Web Development", stack: "React · Node.js · PostgreSQL · Vercel" },
  { code: "C-04", price: "Rs. 19,499", course: "App Development with Flutter", stack: "Dart · Flutter · Firebase · Android/iOS" },
  { code: "C-05", price: "Rs. 19,499", course: "App Development with React Native", stack: "Expo · Supabase · EAS Build" }
];

function FiveCoursesSection() {
  return (
    <section className="relative z-20 py-24 bg-black border-t border-purple-500/20">
      <SparklesBackground />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-purple-500/20 text-gray-400 text-sm tracking-wider">
                  <th className="py-4 px-6 font-medium">CODE</th>
                  <th className="py-4 px-6 font-medium">PRICE</th>
                  <th className="py-4 px-6 font-medium">COURSE</th>
                  <th className="py-4 px-6 font-medium">STACK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coursesData.map((course, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-white/5 transition-colors group ${course.link ? 'cursor-pointer' : ''}`}
                    onClick={() => course.link && (window.location.href = course.link)}
                  >
                    <td className="py-6 px-6 text-purple-400 font-mono text-sm">{course.code}</td>
                    <td className="py-6 px-6 text-white font-medium whitespace-nowrap">{course.price}</td>
                    <td className="py-6 px-6 text-white font-bold text-lg group-hover:text-purple-300 transition-colors">{course.course}</td>
                    <td className="py-6 px-6 text-gray-400">{course.stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/30 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 backdrop-blur-sm">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Bundle all 5 courses</h4>
              <p className="text-gray-300 text-lg">Rs. 64,499 <span className="text-green-400 font-medium">(save Rs. 17,996)</span> <span className="hidden md:inline">·</span><br className="md:hidden" /> Priority support · Internship review guaranteed</p>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap px-8">
              Enroll in Bundle
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

const scheduleData = [
  { time: "0:00 – 0:10", phase: "CONCEPT", task: "Watch or read the day's topic. Ask Claude AI or ChatGPT 2–3 questions until you can explain it back in your own words.", tools: "Claude AI / ChatGPT" },
  { time: "0:10 – 0:45", phase: "BUILD", task: "Code the day's task hands-on using Cursor and GitHub Copilot. This is the most important part. No skipping.", tools: "Cursor + Copilot" },
  { time: "0:45 – 0:55", phase: "AI REVIEW", task: "Paste your code into Claude AI. Ask: What did I do wrong? What can be improved? Fix the top 1–2 issues only.", tools: "Claude AI" },
  { time: "0:55 – 1:00", phase: "GIT COMMIT", task: "Push your work to GitHub with a commit message describing what you built today.", tools: "GitHub" }
];

function SixtyMinutesSection() {
  return (
    <section className="relative z-20 py-24 bg-black border-t border-purple-500/20">
      <SparklesBackground />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              How Your 60 Minutes Work Every Day
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Every single day of every course follows the same 4-block structure. It is tight by design. When the hour is up, you stop. Consistency over intensity.
            </p>
          </div>

          <div className="grid gap-4 mt-12">
            {scheduleData.map((item, idx) => (
              <Card key={idx} className="bg-white/5 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-colors p-6 md:p-8 grid md:grid-cols-4 gap-6 items-start md:items-center">
                <div className="md:col-span-1">
                  <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-sm mb-3 md:mb-0 block w-fit">
                    {item.time}
                  </Badge>
                  <div className="font-bold text-white mt-3 tracking-wide text-xl">{item.phase}</div>
                </div>
                <div className="md:col-span-2 text-gray-300 text-lg leading-relaxed">
                  {item.task}
                </div>
                <div className="md:col-span-1 flex items-center gap-2 text-sm font-medium text-violet-400 md:justify-end mt-2 md:mt-0">
                  <Zap className="w-5 h-5 flex-shrink-0" />
                  <span>{item.tools}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-purple-900/10 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-violet-500/5 to-transparent blur-3xl -z-10" />
            <h3 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-6">The Rule</h3>
            <p className="text-2xl md:text-4xl font-semibold text-white leading-tight">
              AI writes the scaffold.<br className="mb-2" />
              <span className="text-gray-400 text-xl md:text-2xl block mt-4 font-normal">You read every line. You explain every line. You own every line.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const aiToolsData = [
  { tool: "Cursor", desc: "Your main code editor. AI built into the core — inline code generation, multi-file edits, codebase chat.", cost: "Free tier" },
  { tool: "GitHub Copilot", desc: "Completes code as you type. Ghost-text for entire functions. Free for students via GitHub Education.", cost: "Free for students" },
  { tool: "v0 by Vercel", desc: "Describe any UI in plain English and get production-quality React and Tailwind code instantly.", cost: "Free tier" },
  { tool: "Claude AI", desc: "Architecture decisions, deep debugging, concept explanations, and thorough code reviews.", cost: "Free tier" },
  { tool: "ChatGPT", desc: "Quick questions, quizzes, explaining errors in plain English, and generating practice exercises.", cost: "Free tier" },
  { tool: "Windsurf", desc: "An agentic IDE that plans, writes, runs, and fixes multi-step tasks across multiple files.", cost: "Free tier" },
  { tool: "Bolt.new", desc: "Full-stack project scaffolding in your browser. Zero local install needed on Day 1.", cost: "Free tier" },
  { tool: "Google Stitch", desc: "Design app screens from text descriptions. Powered by Gemini 2.5 Pro. Export to Figma or HTML/CSS.", cost: "Free (Google Labs)" },
  { tool: "Google Antigravity", desc: "Multiple autonomous AI agents working in your editor, terminal, and browser simultaneously.", cost: "Free preview" }
];

function AIToolsSection() {
  return (
    <section className="relative z-20 py-24 bg-black border-t border-purple-500/20 pb-32">
      <SparklesBackground />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              9 AI Tools Built Into <span className="text-purple-400">Every Course</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Every tool listed below has a free tier. The total cost of all 9 AI tools on your first day is <strong className="text-white">Rs. 0</strong>. You do not need to pay for any of them to complete any course.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiToolsData.map((item, idx) => (
              <Card key={idx} className="bg-black/40 backdrop-blur-md border border-purple-500/20 p-8 hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors pr-4">{item.tool}</h3>
                    <Sparkles className="w-6 h-6 text-purple-500/30 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed mb-8">
                    {item.desc}
                  </p>
                </div>
                <div className="relative mt-auto pt-6 border-t border-white/5">
                  <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400 rounded-md px-3 py-1 font-medium text-sm w-fit">
                    {item.cost}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CoursesPage() {
  return (
    <div className="bg-black min-h-screen">
      <CoursesHeroSection />
      <ExploreSection />
      <FiveCoursesSection />
      <SixtyMinutesSection />
      <AIToolsSection />
      <Footer />
    </div>
  );
}
