"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Variants } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUp,
  ChevronDown,
  Code2,
  Download,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MonitorCog,
  Palette,
  Phone,
  Printer,
  Send,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Project = {
  number: string;
  title: string;
  meta: string;
  description: string;
  concept: string;
  tools: string;
  timeSpent: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
};

const navItems = [
  ["about", "About"],
  ["projects", "Projects"],
  ["process", "Process"],
  ["experience", "Experience"],
  ["contact", "Contact"],
] as const;

const projects: Project[] = [
  {
    number: "",
    title: "GlowAura",
    meta: "E-commerce Project | 2024",
    description:
      "Designed and developed a responsive storefront focused on soft product presentation, clear browsing, cart flow, and checkout readiness.",
    concept: "A clean fragrance and beauty shop interface with gentle product emphasis and simple buying paths.",
    tools: "HTML, CSS, PHP, JavaScript",
    timeSpent: "3 weeks",
    tags: ["HTML/CSS", "PHP", "JavaScript"],
    image: "/img/glowaura.png",
    imageAlt: "GlowAura fragrance and beauty website preview",
  },
  {
    number: "",
    title: "Hospital Billing System",
    meta: "Academic System Project | 2024 - 2025",
    description:
      "Collaborated as a Group System Programmer to build a comprehensive academic hospital billing system, managing coding, database design, and system integration.",
    concept: "A structured billing workflow that turns patient charges, records, and payment steps into a readable operator interface.",
    tools: "PHP, MySQL, HTML, CSS",
    timeSpent: "1 semester",
    tags: ["HTML/CSS", "PHP", "MYSQL"],
    image: "/img/HospitalBilling.png",
    imageAlt: "Hospital billing system project preview",
  },
  {
    number: "",
    title: "Point of Sale (POS) System",
    meta: "Retail System Project | 2025",
    description:
      "Developed a fully functional POS system for retail clients, including inventory management, sales tracking, and receipt generation with database integration.",
    concept: "A compact retail dashboard designed for fast scanning, quick item entry, and dependable transaction records.",
    tools: "PHP, JavaScript, MySQL",
    timeSpent: "4 weeks",
    tags: ["PHP", "JavaScript", "MySQL"],
    image: "/img/POS.png",
    imageAlt: "Point of sale system project preview",
  },
  {
    number: "",
    title: "Numen in the Sewers",
    meta: "Game Development Project | 2026",
    description:
      "Built a cross-platform 2D action-adventure game where players control a necromancer, defeat sewer monsters, collect souls, summon allies, and battle a final boss.",
    concept: "A dark fantasy game concept built around summoning, survival pressure, and readable 2D combat feedback.",
    tools: "Unity, C#",
    timeSpent: "8 weeks",
    tags: ["Unity", "C#", "2D Game Development"],
    image: "/img/numeninthesewers.png",
    imageAlt: "Numen in the Sewers game title artwork",
  },
  {
    number: "",
    title: "SHN",
    meta: "Personal Project | 2025 - 2026",
    description:
      "Developed a web-based AI platform that brings multiple AI models into one host application for centralized, intuitive AI-assisted tasks.",
    concept: "A unified assistant workspace that keeps multiple AI tools feeling organized instead of scattered.",
    tools: "HTML, Tailwind, JavaScript, PHP",
    timeSpent: "Ongoing",
    tags: ["HTML5", "Tailwind", "JavaScript", "PHP"],
    image: "/img/SHN.png",
    imageAlt: "SHN AI platform interface preview",
  },
  {
    number: "",
    title: "Resize",
    meta: "Personal Project | 2025 - 2026",
    description:
      "Created a Google-authenticated image resizing app with real-time previews, original-versus-resized comparison, and processed image downloads.",
    concept: "A lightweight utility interface for creators who need quick image resizing with visual confidence before download.",
    tools: "HTML, CSS, JavaScript, Firebase, OAuth",
    timeSpent: "2 weeks",
    tags: ["HTML5", "OAuth", "CSS3", "Firebase", "JavaScript", "Google"],
    image: "/img/RESIZE.png",
    imageAlt: "Resize image compressor application preview",
  },
  {
    number: "",
    title: "GSIS",
    meta: "Capstone Project | 2025 - 2026",
    description:
      "Built a school information system capstone covering learner records, enrollment workflows, attendance, grades, report cards, analytics, and role-based access.",
    concept: "A school operations system shaped around registrar, teacher, and adviser workflows with practical reporting outputs.",
    tools: "PHP, MySQL, JavaScript, Bootstrap",
    timeSpent: "Capstone cycle",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "System Development"],
    image: "/img/gsis.png",
    imageAlt: "GSIS capstone login screen preview",
  },
  {
    number: "",
    title: "Interface Flow Studies",
    meta: "Figma Prototype | Interface Flow",
    description:
      "Mapped user paths, screen states, and priority actions through a Figma prototype before committing major system pages to code.",
    concept: "Exploring how users move through forms, dashboards, and records while keeping the interface path clear.",
    tools: "Figma, wireframes, layout planning",
    timeSpent: "Ongoing",
    tags: ["Figma", "UX Flow", "Prototype"],
    image: "/img/prototype.png",
    imageAlt: "Figma interface flow prototype preview",
  },
];

const processSteps = [
  {
    title: "Collect",
    description:
      "Initialize by gathering references, requirements, sketches, screenshots, and constraints, deeply figure every problem based on client's needs, or independently identify transactional gapses for start ups, so the work has a clear direction before design choices get polished.",
    icon: Layers3,
  },
  {
    title: "Shape",
    description:
      "Move all ideas into wireframes, interface states, or rough layouts, Visualizing the essential elements to include in features based on the collected information, then compare what feels useful, readable, and visually balanced.",
    icon: Palette,
  },
  {
    title: "Refine",
    description:
      "Producing the final version, test the details even the tiniest ones, adjust for efficient interactions, and prepare the piece with a nice documentation and clean presentation.",
    icon: Sparkles,
  },
];

const milestones = [
  {
    year: "2026 — 2027",
    title: "Specialization in Digital Arts",
    description:
      "PHINMA Cagayan de Oro College — Fourth-year student specializing in Digital Arts, strengthening visual design, creative direction, and multimedia skills alongside a system development foundation.",
  },
  {
    year: "2025 — 2026",
    title: "Specialization in System Development",
    description:
      "PHINMA Cagayan de Oro College — Specialized in system development with hands-on exposure to cloud services, Unity game development, and modern web technologies including vanilla JavaScript and Next.js framework.",
  },
  {
    year: "2024 — 2025",
    title: "System Development & Web Development",
    description:
      "PHINMA Cagayan de Oro College — Built a full system while learning advanced database design, programming, and application development. Worked as Group System Programmer on Hospital Billing System and built e-commerce websites and POS systems.",
  },
  {
    year: "2023 — 2024",
    title: "Foundation in Web Development",
    description:
      "PHINMA Cagayan de Oro College — Studied front-end and back-end development using HTML, CSS, PHP, Bootstrap, and basic database concepts.",
  },
];

const resumePath = "/resume.pdf";
const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({
  label,
  title,
  description,
  speed = 0.03,
  animatedTitle = true,
  align = "left",
  revealDirection = "up",
}: {
  label?: string;
  title: string;
  description: string;
  speed?: number;
  animatedTitle?: boolean;
  align?: "left" | "center";
  revealDirection?: "up" | "down" | "left" | "right" | "none" | "center";
}) {
  const isCentered = align === "center";

  return (
    <Parallax speed={speed}>
      <MotionReveal
        className={`mb-16 max-w-3xl ${isCentered ? "mx-auto text-center" : ""}`}
        direction={revealDirection}
        amount={0.36}
      >
        {label && <span className="eyebrow mb-5">{label}</span>}
        {animatedTitle ? (
          <KineticTypingTitle text={title} />
        ) : (
          <h2 className="premium-title text-balance text-4xl font-extralight tracking-[-0.06em] sm:text-5xl md:text-7xl">
            {title}
          </h2>
        )}
        <p className={`narrative-text mt-6 max-w-xl text-[15px] font-light leading-8 text-white/40 ${isCentered ? "mx-auto" : ""}`}>
          {description}
        </p>
      </MotionReveal>
    </Parallax>
  );
}

function KineticTypingTitle({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  let characterIndex = 0;
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.028,
        delayChildren: 0.08,
      },
    },
  };
  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "0.55em",
      rotateX: -62,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.72,
      },
    },
  };

  return (
    <motion.h2
      className="kinetic-type-title text-balance text-4xl font-extralight text-white sm:text-5xl md:text-7xl"
      initial={reduceMotion ? false : { opacity: 0.72 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: smoothEase }}
      viewport={{ once: true, amount: 0.72 }}
      aria-label={text}
    >
      <motion.span
        className="kinetic-type-display"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.72 }}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span className="kinetic-word" key={`${word}-${wordIndex}`}>
            {Array.from(word).map((character) => {
              const index = characterIndex;
              characterIndex += 1;

              return (
                <motion.span
                  className="kinetic-char"
                  key={`${character}-${index}`}
                  variants={characterVariants}
                >
                  {character}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </motion.h2>
  );
}

function Parallax({
  children,
  className = "",
  "aria-hidden": ariaHidden,
}: {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <div className={`parallax-soft ${className}`} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}

function MotionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  amount = 0.24,
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "center";
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const isWideViewport = useIsWideViewport();
  const sideDistance = isWideViewport ? 96 : 18;
  const offsets = {
    up: { x: 0, y: 34 },
    down: { x: 0, y: -34 },
    left: { x: sideDistance, y: 18 },
    right: { x: -sideDistance, y: 18 },
    none: { x: 0, y: 0 },
    center: { x: 0, y: 28, scale: 0.96 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offsets }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.78, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

function useIsWideViewport() {
  const [isWideViewport, setIsWideViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsWideViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  return isWideViewport;
}

function ArrowLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a className="arrow-link" href={href}>
      {children}
      <ArrowDownRight size={16} strokeWidth={1.5} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline with draw-on-scroll line (minimal cardless text)          */
/* ------------------------------------------------------------------ */

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 32%"],
  });
  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(rawScaleY, { stiffness: 120, damping: 30, mass: 0.35 });

  return (
    <div ref={ref} className="timeline relative mx-auto max-w-5xl">
      <motion.div
        className="timeline-line absolute bottom-5 left-3 top-5 w-px md:left-1/2 md:-translate-x-1/2"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
      />
      <div className="space-y-12 md:space-y-0">
        {milestones.map((milestone, index) => (
          <Parallax speed={index % 2 === 0 ? 0.02 : 0.032} key={milestone.year}>
            <MotionReveal
              direction={index % 2 === 0 ? "right" : "left"}
              amount={0.32}
            >
              <article
                className={`relative flex pl-10 md:min-h-[190px] md:pl-0 ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className="timeline-dot absolute left-[3px] top-2 h-2 w-2 rounded-full bg-white md:left-1/2 md:top-2 md:-translate-x-1/2" />
                <div className="w-full py-1 md:w-[44%]">
                  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {milestone.year}
                  </span>
                  <h3 className="premium-title mt-2 text-xl font-light tracking-[-0.03em]">
                    {milestone.title}
                  </h3>
                  <p className="narrative-text mt-3 text-sm font-light leading-relaxed text-white/45">
                    {milestone.description}
                  </p>
                </div>
              </article>
            </MotionReveal>
          </Parallax>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Galaxy                                                        */
/* ------------------------------------------------------------------ */

function HeroGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = Array.from({ length: 150 }, (_, index) => {
      const arm = index % 4;
      const radius = Math.sqrt(Math.random()) * 0.48;
      const angle = radius * 8.4 + arm * (Math.PI / 2) + (Math.random() - 0.5) * 0.72;

      return {
        radius,
        angle,
        size: Math.random() * 1.35 + 0.35,
        alpha: Math.random() * 0.52 + 0.18,
        drift: Math.random() * 0.18 + 0.04,
        scatter: (Math.random() - 0.5) * 0.32,
      };
    });

    let width = 0;
    let height = 0;
    let frameId = 0;
    let isVisible = true;
    let start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const nextHeight = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      frameId = 0;
      const elapsed = reduceMotion ? 0 : (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.42;
      const centerY = height * 0.54;
      const galaxyRadius = Math.min(width, height) * 0.66;

      const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius * 0.78);
      coreGlow.addColorStop(0, "rgba(255,255,255,0.20)");
      coreGlow.addColorStop(0.18, "rgba(160,170,190,0.11)");
      coreGlow.addColorStop(0.5, "rgba(90,105,135,0.045)");
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = coreGlow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.12 + elapsed * 0.01);
      context.scale(1.42, 0.66);

      for (const star of stars) {
        const armMotion = elapsed * star.drift;
        const angle = star.angle + armMotion;
        const x = Math.cos(angle) * star.radius * galaxyRadius;
        const y = Math.sin(angle) * star.radius * galaxyRadius + star.scatter * galaxyRadius * star.radius;
        const twinkle = 0.72 + Math.sin(elapsed * 1.6 + star.angle * 3) * 0.28;

        context.beginPath();
        context.fillStyle = `rgba(245,247,250,${star.alpha * twinkle})`;
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();

      const dust = context.createLinearGradient(0, height * 0.18, width, height * 0.78);
      dust.addColorStop(0, "rgba(255,255,255,0)");
      dust.addColorStop(0.45, "rgba(255,255,255,0.055)");
      dust.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = dust;
      context.fillRect(0, 0, width, height);

      if (!reduceMotion && isVisible) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      resize();
      draw(performance.now());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !frameId && !reduceMotion) {
          frameId = requestAnimationFrame(draw);
        }
        if (!isVisible) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { rootMargin: "180px" },
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(frameId);
      start = 0;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-galaxy" aria-hidden="true" />;
}

function ProcessGalaxy({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["176, 63, 79", "206, 210, 216", "210, 174, 238"];
    const galaxyColor = colors[index % colors.length];
    const stars = Array.from({ length: 96 }, (_, starIndex) => {
      const arm = starIndex % 4;
      const radius = Math.sqrt(Math.random()) * 0.5;
      const angle = radius * 8.2 + arm * (Math.PI / 2) + (Math.random() - 0.5) * 1.36;

      return {
        radius,
        angle,
        size: Math.random() * 0.82 + 0.2,
        alpha: Math.random() * 0.34 + 0.12,
        drift: Math.random() * 0.12 + 0.025,
        scatter: (Math.random() - 0.5) * 0.62,
      };
    });

    let width = 0;
    let height = 0;
    let frameId = 0;
    let start = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect?.width ?? 360));
      const nextHeight = Math.max(1, Math.floor(rect?.height ?? 360));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      frameId = 0;
      const elapsed = reduceMotion ? 0 : (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.6;
      const galaxyRadius = Math.min(width, height) * 0.54;

      const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius * 0.88);
      coreGlow.addColorStop(0, `rgba(${galaxyColor},0.2)`);
      coreGlow.addColorStop(0.28, `rgba(${galaxyColor},0.095)`);
      coreGlow.addColorStop(0.62, `rgba(${galaxyColor},0.032)`);
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = coreGlow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.18 + index * 0.08 + elapsed * 0.012);
      context.scale(1.08, 0.98);

      for (const star of stars) {
        const angle = star.angle + elapsed * star.drift;
        const x = Math.cos(angle) * star.radius * galaxyRadius;
        const y = Math.sin(angle) * star.radius * galaxyRadius + star.scatter * galaxyRadius * star.radius;
        const twinkle = 0.75 + Math.sin(elapsed * 1.7 + star.angle * 3.2) * 0.25;

        context.beginPath();
        context.fillStyle = `rgba(${galaxyColor},${star.alpha * twinkle})`;
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    };

    const handleResize = () => {
      resize();
      draw(performance.now());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      start = 0;
    };
  }, [index]);

  return <canvas ref={canvasRef} className="process-galaxy-canvas" aria-hidden="true" />;
}

function ContactPlanet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const nextHeight = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const isMobile = width < 700;
      const centerX = width * (isMobile ? 0.68 : 0.78);
      const centerY = height * (isMobile ? 0.5 : 0.48);
      const radius = Math.min(isMobile ? width * 0.86 : height * 0.78, width * 0.6);

      const atmosphere = context.createRadialGradient(centerX, centerY, radius * 0.76, centerX, centerY, radius * 1.32);
      atmosphere.addColorStop(0, "rgba(98, 70, 150, 0)");
      atmosphere.addColorStop(0.48, "rgba(112, 84, 178, 0.075)");
      atmosphere.addColorStop(1, "rgba(92, 59, 160, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      const body = context.createRadialGradient(
        centerX - radius * 0.5,
        centerY - radius * 0.36,
        radius * 0.08,
        centerX + radius * 0.22,
        centerY + radius * 0.18,
        radius * 1.15,
      );
      body.addColorStop(0, "rgba(98, 82, 136, 0.32)");
      body.addColorStop(0.32, "rgba(32, 24, 50, 0.76)");
      body.addColorStop(0.68, "rgba(10, 8, 18, 0.96)");
      body.addColorStop(1, "rgba(2, 2, 6, 1)");
      context.fillStyle = body;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      context.restore();

      const shadow = context.createRadialGradient(centerX + radius * 0.18, centerY + radius * 0.12, radius * 0.35, centerX, centerY, radius);
      shadow.addColorStop(0, "rgba(0,0,0,0)");
      shadow.addColorStop(0.62, "rgba(0,0,0,0.18)");
      shadow.addColorStop(1, "rgba(0,0,0,0.68)");
      context.fillStyle = shadow;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();

      const rim = context.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      rim.addColorStop(0, "rgba(215, 202, 255, 0.16)");
      rim.addColorStop(0.36, "rgba(215, 202, 255, 0.045)");
      rim.addColorStop(1, "rgba(215, 202, 255, 0)");
      context.strokeStyle = rim;
      context.lineWidth = Math.max(1, radius * 0.016);
      context.beginPath();
      context.arc(centerX, centerY, radius, 0.76 * Math.PI, 1.3 * Math.PI);
      context.stroke();
    };

    const handleResize = () => {
      resize();
      draw();
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className="contact-planet-layer"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 1.1, ease: smoothEase }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="contact-planet-canvas" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Shell                                                         */
/* ------------------------------------------------------------------ */

export default function PortfolioShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeroScrollCue, setShowHeroScrollCue] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const reduceMotion = useReducedMotion();
  const resumeFrameRef = useRef<HTMLIFrameElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 36);
    setShowHeroScrollCue(latest <= 4);
    setShowBackToTop(latest > 500);
  });

  useEffect(() => {
    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 36);
      setShowHeroScrollCue(window.scrollY <= 4);
      setShowBackToTop(window.scrollY > 500);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  // Lock body scroll when overlays open
  useEffect(() => {
    document.body.style.overflow = resumeOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, resumeOpen]);

  // Escape to close
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setResumeOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.submit();
  };

  const handleResumePrint = () => {
    resumeFrameRef.current?.contentWindow?.focus();
    resumeFrameRef.current?.contentWindow?.print();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-shell">
      {/* Background layers */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Scroll progress */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/*  Navigation                                                   */}
      {/* ============================================================ */}

      <header className={`site-nav ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container flex h-[72px] items-center justify-between">
          <a
            href="#hero"
            onClick={closeMenu}
            className="font-mono text-sm uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-60"
          >
            shn<span className="text-white/30">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <a className="nav-link" href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
            <button
              className="liquid-action resume-link ml-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
              type="button"
              onClick={() => setResumeOpen(true)}
            >
              Resume
            </button>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav-panel border-t border-white/[0.06] px-6 py-8 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-6">
              {navItems.map(([id, label]) => (
                <a
                  className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white"
                  href={`#${id}`}
                  key={id}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
              <button
                className="liquid-action mt-2 flex w-fit items-center gap-2 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                type="button"
                onClick={() => {
                  closeMenu();
                  setResumeOpen(true);
                }}
              >
                Resume <Download size={13} />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ============================================================ */}
      {/*  Main Content                                                 */}
      {/* ============================================================ */}

      <main>
        {/* ---------------------------------------------------------- */}
        {/*  Hero — Multi-layer Parallax                                */}
        {/* ---------------------------------------------------------- */}

        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
          <HeroGalaxy />
          <Parallax
            speed={-0.034}
            className="site-container hero-scroll-layer relative z-10 w-full pb-20 pt-16 md:pb-28 md:pt-20"
          >
            <div className="max-w-5xl">
              <motion.p
                className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 hero-line hero-line--1"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.76, delay: 0.08, ease: smoothEase }}
              >
                <span className="h-px w-8 bg-white/20" />
                 Kibawe Bukidnon
              </motion.p>
              <h1 className="hero-title">
                <motion.span
                  className="hero-line hero-line--2"
                  initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.86, delay: 0.18, ease: smoothEase }}
                >
                  Zup! I&apos;m <span className="outline-name">Shaun</span>
                </motion.span>
                <br />
                <motion.span
                  className="hero-line hero-line--3 text-white"
                  initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.86, delay: 0.28, ease: smoothEase }}
                >
                  a Full Stack
                </motion.span>
                <br />
                <motion.span
                  className="hero-line hero-line--4 text-white/25"
                  initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.86, delay: 0.38, ease: smoothEase }}
                >
                  Developer
                </motion.span>
              </h1>
              <MotionReveal className="mt-14" delay={0.48}>
                <p className="max-w-md text-sm font-light leading-7 text-white/35">

                </p>
              </MotionReveal>
            </div>
          </Parallax>

          {/* Hero image — parallax at different speed */}
          <Parallax
            speed={-0.052}
            className="hero-image-layer pointer-events-none absolute right-[-4rem] top-[4%] hidden h-[50rem] w-[40rem] lg:block 2xl:right-0 2xl:h-[58rem] 2xl:w-[48rem]"
            aria-hidden="true"
          >
            {/* Floating dots instead of heavy orbit rings */}
            <div className="hero-dot hero-dot--1" />
            <div className="hero-dot hero-dot--2" />
            <div className="hero-dot hero-dot--3" />
            <div className="hero-dot hero-dot--4" />
            <div className="collab-image relative z-10 w-[38rem] 2xl:w-[46rem]">
              <Image
                className="relative z-0 h-auto w-full"
                src="/img/IMG_0911.PNG"
                alt="Shaun collaborating with a team"
                width={2528}
                height={3499}
                priority
              />
            </div>
          </Parallax>

          <motion.a
            className="liquid-scroll-cue absolute bottom-7 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center"
            href="#about"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{
              opacity: showHeroScrollCue ? 1 : 0,
              y: showHeroScrollCue ? 0 : 14,
              pointerEvents: showHeroScrollCue ? "auto" : "none",
            }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{
              duration: showHeroScrollCue ? 0.34 : 0.24,
              ease: smoothEase,
            }}
            aria-label="Scroll to about section"
          >
            <ChevronDown size={18} strokeWidth={1.6} />
          </motion.a>

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--ink)] to-transparent" />
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  About                                                      */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider" />

        <section id="about" className="section-space site-container">
          <SectionHeading
            label="Artist Statement"
            title="Practical Development approach perceiption"
            animatedTitle
            description="I create digital work that sits between system development and visual design such as interfaces, web applications, 2d game components to production, and use tools that are useful, then refined through UI/UX principles."
          />

          <div className="grid gap-10 md:grid-cols-3">
            <Parallax speed={0.018}>
              <MotionReveal>
                <article className="py-2">
                  <div className="mb-8 text-white/45">
                    <Code2 size={28} strokeWidth={1} />
                  </div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Build</p>
                  <h3 className="premium-title text-xl font-light tracking-[-0.03em]">Full Stack Development</h3>
                  <p className="narrative-text mt-3 text-sm font-light leading-relaxed text-white/45">
                    Flexibility in facing both Database layer and Application layer in an app systems while paying attention to visualization principles, such as,layout, readability, interaction flow, and the small details that make a screen easier to trust.
                  </p>
                </article>
              </MotionReveal>
            </Parallax>

            <Parallax speed={0.028}>
              <MotionReveal delay={0.08}>
                <article className="py-2">
                  <div className="mb-8 text-white/45">
                    <Zap size={28} strokeWidth={1} />
                  </div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Learn</p>
                  <h3 className="premium-title text-xl font-light tracking-[-0.03em]">Technical Skills</h3>
                  <p className="narrative-text mt-3 text-sm font-light leading-relaxed text-white/45">
                    My work moves across web development, database design, game development, image tools, and digital arts, giving the good step of fundamental advantages in IT fields.
                  </p>
                </article>
              </MotionReveal>
            </Parallax>

            <Parallax speed={0.022}>
              <MotionReveal delay={0.16}>
                <article className="py-2">
                  <div className="mb-8 text-white/45">
                    <Users size={28} strokeWidth={1} />
                  </div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Collaborate</p>
                  <h3 className="premium-title text-xl font-light tracking-[-0.03em]">Collaboration</h3>
                  <p className="narrative-text mt-3 text-sm font-light leading-relaxed text-white/45">
                    I document ideas based on different roles perceiption in development cycle, through a good sense of Data Gathering such as, related samples/templates, screenshots, prototypes, and concise project notes so the final work shows both the result and the thinking behind it, leading use to build an output that will run and solve certain problems.
                  </p>
                </article>
              </MotionReveal>
            </Parallax>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Projects                                                   */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider" />

        <section id="projects" className="section-space site-container">
          <SectionHeading
            label="Selected Works"
            title="Projects"
            align="center"
            revealDirection="center"
            description="Selected pieces showing range across web systems, interface design, image tools, game development, capstone work, and process studies."
          />

          <div className="project-showcase">
            {projects.map((project, idx) => (
              <article
                className={`project-display ${
                  idx % 2 === 0 ? "lg:grid-cols-[1.12fr_0.88fr]" : "lg:grid-cols-[0.88fr_1.12fr]"
                }`}
                key={`${project.title}-${idx}`}
              >
                <MotionReveal
                  className={idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}
                  direction={idx % 2 === 0 ? "right" : "left"}
                  delay={0.04}
                  amount={0.2}
                >
                  <div className="project-media">
                    {project.image ? (
                      <div className="absolute inset-0">
                        <Image
                          className="h-full w-full object-cover grayscale-[0.28]"
                          src={project.image}
                          alt={project.imageAlt ?? "Project preview"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 54vw"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full min-h-[15rem] flex-col items-center justify-center gap-3 text-white/20">
                        <MonitorCog size={44} strokeWidth={0.7} />
                        <span className="max-w-[11rem] text-center font-mono text-[9px] uppercase tracking-[0.2em]">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>
                </MotionReveal>
                <MotionReveal
                  className={`project-info ${idx % 2 === 0 ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}
                  direction={idx % 2 === 0 ? "left" : "right"}
                  delay={0.12}
                  amount={0.24}
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
                      {project.number}
                    </span>
                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">{project.meta}</p>
                    <h3 className="premium-title mt-3 text-2xl font-light leading-tight tracking-[-0.04em] md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="narrative-text mt-5 max-w-xl text-sm font-light leading-7 text-white/45 md:text-[15px] md:leading-8">{project.description}</p>
                    <dl className="creative-caption mt-6 grid gap-3 text-sm text-white/40 sm:grid-cols-3">
                      <div>
                        <dt>Concept</dt>
                        <dd className="narrative-text">{project.concept}</dd>
                      </div>
                      <div>
                        <dt>Tools</dt>
                        <dd>{project.tools}</dd>
                      </div>
                      <div>
                        <dt>Time</dt>
                        <dd>{project.timeSpent}</dd>
                      </div>
                    </dl>
                    <div className="mt-7 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          className="border border-white/[0.06] px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-white/40"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                </MotionReveal>
                </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Process                                                    */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider" />

        <section id="process" className="section-space site-container">
          <SectionHeading
            label="Process Work Approach"
            title="From rough direction to finished screen."
            description=""
          />

          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Parallax speed={0.016 + index * 0.006} key={step.title}>
                  <MotionReveal delay={index * 0.08}>
                    <motion.article
                      className={`process-galaxy process-galaxy--${index + 1} h-full px-1 py-10 md:px-2 md:py-12`}
                      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.5 }}
                    >
                      <ProcessGalaxy index={index} />
                      <div className="process-icon mb-8 flex h-10 w-10 items-center justify-center text-white/55">
                        <Icon size={18} strokeWidth={1.25} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                        0{index + 1}
                      </p>
                      <h3 className="premium-title mt-3 text-2xl font-light tracking-[-0.04em]">
                        {step.title}
                      </h3>
                      <p className="narrative-text mt-4 text-sm font-light leading-7 text-white/40">
                        {step.description}
                      </p>
                    </motion.article>
                  </MotionReveal>
                </Parallax>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Experience — Framer timeline                                */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider" />

        <section id="experience" className="section-space site-container">
          <SectionHeading
            title="The academic journey so far."
            description=""
          />
          <Timeline />
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Contact                                                    */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider" />

        <section id="contact" className="contact-abyss section-space">
          <ContactPlanet />
          <div className="site-container">
            <SectionHeading
              title="Let&apos;s work together."
              description=""
            />
            <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <Parallax speed={0.024}>
                <MotionReveal>
                  <p className="narrative-text max-w-sm text-sm font-light leading-7 text-white/35">
                    Have an idea that needs a useful, considered digital home? Send a note and let&apos;s start a conversation.
                  </p>
                  <div className="mt-10 space-y-4 border-t border-white/[0.06] pt-6 text-sm text-white/45">
                    <a className="flex items-center gap-3 transition-colors hover:text-white" href="mailto:belonoacshaun@gmail.com">
                      <Mail size={15} strokeWidth={1.3} /> belonoacshaun@gmail.com
                    </a>
                    <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+639636147082">
                      <Phone size={15} strokeWidth={1.3} /> +639-36-147-0082
                    </a>
                    <p className="flex items-center gap-3">
                      <MapPin size={15} strokeWidth={1.3} /> Cagayan de Oro, Philippines
                    </p>
                  </div>
                </MotionReveal>
              </Parallax>

              <Parallax speed={0.016}>
                <MotionReveal direction="left">
                  <form
                    action="https://formspree.io/f/mzddyyoz"
                    method="POST"
                    className="contact-form"
                    onSubmit={handleContactSubmit}
                  >
                    <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">Full name</span>
                        <input className="form-field w-full px-4 py-3 text-sm" type="text" name="name" placeholder="Enter your name" required />
                      </label>
                      <label className="block">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">Email address</span>
                        <input className="form-field w-full px-4 py-3 text-sm" type="email" name="_replyto" placeholder="your@email.com" required />
                      </label>
                    </div>
                    <label className="mt-5 block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">Subject</span>
                      <input className="form-field w-full px-4 py-3 text-sm" type="text" name="subject" placeholder="Project inquiry" required />
                    </label>
                    <label className="mt-5 block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">Message</span>
                      <textarea className="form-field min-h-36 w-full resize-y px-4 py-3 text-sm" name="message" placeholder="Tell me about your project..." required />
                    </label>
                    <button
                      className="contact-submit mt-7 flex w-full items-center justify-center gap-3 px-5 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                      type="submit"
                    >
                      {formSent ? "Submit Inquiry" : "Send message"}
                      <Send size={14} strokeWidth={1.5} />
                    </button>
                  </form>
                </MotionReveal>
              </Parallax>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/*  Footer — Simplified 2-column                                 */}
      {/* ============================================================ */}

      <footer className="border-t border-white/[0.06] overflow-hidden">
        <div className="site-container py-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="premium-title text-2xl font-extralight tracking-[-0.06em]">
                Shn<span className="text-white/25">.</span>
              </p>
              <p className="narrative-text mt-3 max-w-xs text-sm font-light leading-7 text-white/30">
                Aspiring Full Stack Developer, currently specializing in System Development and Digital Arts
              </p>
              <div className="mt-5 flex gap-2">
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="mailto:belonoacshaun1@gmail.com" aria-label="Email"><Mail size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://github.com/shaun-algo" aria-label="GitHub"><Github size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://www.linkedin.com/in/shaun-michael-belonoac" aria-label="LinkedIn"><Linkedin size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://www.instagram.com/shaunknowsthedrill_" aria-label="Instagram"><Instagram size={14} /></a>
              </div>
            </div>
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Quick links</h3>
              <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/30">
                <a className="transition-colors hover:text-white" href="#about">About</a>
                <a className="transition-colors hover:text-white" href="#projects">Projects</a>
                <a className="transition-colors hover:text-white" href="#experience">Education</a>
                <a className="transition-colors hover:text-white" href="#contact">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Get in touch</h3>
              <div className="mt-4 space-y-2.5 text-sm leading-6 text-white/30">
                <p>belonoacshaun@gmail.com</p>
                <p>+639-36-147-0082</p>
                <p>Cagayan de Oro, Philippines</p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/[0.04] pt-5 text-xs text-white/20">
            <p>© 2026 Shaun Michael Belono-ac</p>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/*  Back to top                                                  */}
      {/* ============================================================ */}

      <motion.button
        type="button"
        className="liquid-scroll-cue back-to-top fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center"
        initial={false}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 10,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.28, ease: smoothEase }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={16} strokeWidth={1.5} />
      </motion.button>

      {/* ============================================================ */}
      {/*  Resume Modal                                                 */}
      {/* ============================================================ */}

      {resumeOpen && (
        <div
          className="resume-modal fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-3 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <div className="resume-preview flex w-full flex-col overflow-hidden">
            <div className="resume-preview-header flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4 md:px-6">
              <div className="min-w-0">
                <span className="eyebrow mb-1">Preview</span>
                <h2 id="resume-title" className="premium-title text-xl font-extralight tracking-[-0.04em]">
                  Resume
                </h2>
              </div>
              <div className="resume-preview-actions flex shrink-0 items-center gap-2">
                <button
                  className="resume-action flex h-10 w-10 shrink-0 items-center justify-center"
                  type="button"
                  onClick={handleResumePrint}
                  aria-label="Print resume"
                  title="Print resume"
                >
                  <Printer size={16} strokeWidth={1.5} />
                </button>
                <a
                  className="resume-action flex h-10 w-10 shrink-0 items-center justify-center"
                  href={resumePath}
                  download="Shaun_Belono-ac_Resume.pdf"
                  aria-label="Download resume"
                  title="Download resume"
                >
                  <Download size={16} strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  className="resume-action flex h-10 w-10 shrink-0 items-center justify-center"
                  onClick={() => setResumeOpen(false)}
                  aria-label="Close resume preview"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              ref={resumeFrameRef}
              className="resume-frame min-h-0 flex-1"
              src={`${resumePath}#toolbar=0&navpanes=0&view=FitH`}
              title="Resume PDF preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
