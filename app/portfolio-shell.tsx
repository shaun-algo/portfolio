"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useInView,
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
  ChevronLeft,
  ChevronRight,
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
  X,
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
      "Designed and built a responsive online shop with product browsing, cart flow, and checkout-ready pages.",
    concept: "A simple beauty shop layout that makes products easy to view and buy.",
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
      "Worked as the group system programmer and helped build the billing flow, database structure, and main system features.",
    concept: "A hospital billing system that organizes patient charges, records, and payment steps in one place.",
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
      "Built a POS system for retail use with inventory tracking, sales records, receipt generation, and database storage.",
    concept: "A retail tool made for faster item entry, clear totals, and organized transaction records.",
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
      "Created a 2D action-adventure game where the player defeats monsters, collects souls, summons allies, and fights a final boss.",
    concept: "A dark fantasy game focused on survival, summoning, and clear 2D combat.",
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
      "Built a web-based AI platform that brings different AI tools into one simple workspace.",
    concept: "A personal assistant dashboard made to keep AI tasks easier to access and manage.",
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
      "Created an image resizing app with Google login, live preview, size comparison, and download support.",
    concept: "A quick tool for resizing images while checking the result before saving.",
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
      "Built a school information system for my capstone, covering learner records, enrollment, attendance, grades, report cards, analytics, and user roles.",
    concept: "A school system made to support registrar, teacher, and adviser tasks with clear reports.",
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
      "Planned user paths, screen states, and main actions in Figma before building important system pages.",
    concept: "A study of how users move through forms, dashboards, and records with less confusion.",
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
      "I start by collecting references, requirements, sketches, screenshots, and limits so I understand what the project needs before designing.",
    icon: Layers3,
  },
  {
    title: "Shape",
    description:
      "I turn the idea into wireframes, screen states, or rough layouts, then check what feels useful, readable, and balanced.",
    icon: Palette,
  },
  {
    title: "Refine",
    description:
      "I build the final version, test the details, adjust the spacing and interactions, then prepare the work with clear notes.",
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
const bookCloseAudioPath = "/book-closing.mp3";
const leafOpenAudioPath = "/leaf_open.mp3";
const smoothEase = [0.22, 1, 0.36, 1] as const;
const softViewport = { once: true, amount: 0.18, margin: "0px 0px -10% 0px" } as const;

function useViewportReveal<T extends HTMLElement>(amount = 0.18) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { ...softViewport, amount });
  const [fallbackInView, setFallbackInView] = useState(false);

  useEffect(() => {
    if (fallbackInView) return undefined;

    const syncVisibility = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.08;

      if (isVisible) {
        setFallbackInView(true);
      }
    };

    syncVisibility();
    const frameId = window.requestAnimationFrame(syncVisibility);
    const timeoutId = window.setTimeout(syncVisibility, 360);
    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("resize", syncVisibility);
    window.addEventListener("orientationchange", syncVisibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", syncVisibility);
      window.removeEventListener("resize", syncVisibility);
      window.removeEventListener("orientationchange", syncVisibility);
    };
  }, [fallbackInView]);

  return {
    ref,
    reduceMotion,
    shouldReveal: Boolean(inView || fallbackInView),
  };
}

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
        <p className={`narrative-text mt-6 max-w-xl text-[15px] font-light leading-8 text-white/40 ${isCentered ? "mx-auto text-center [text-align-last:center]" : ""}`}>
          {description}
        </p>
      </MotionReveal>
    </Parallax>
  );
}

function KineticTypingTitle({ text }: { text: string }) {
  const { ref, reduceMotion, shouldReveal } = useViewportReveal<HTMLHeadingElement>(0.28);
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
      ref={ref}
      className="kinetic-type-title text-balance text-4xl font-extralight text-white sm:text-5xl md:text-7xl"
      initial={{ opacity: 0.72 }}
      animate={{ opacity: shouldReveal ? 1 : 0.72 }}
      transition={{ duration: 0.7, ease: smoothEase }}
      aria-label={text}
    >
      <motion.span
        className="kinetic-type-display"
        initial="hidden"
        animate={shouldReveal ? "show" : "hidden"}
        variants={containerVariants}
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
  const { ref, reduceMotion, shouldReveal } = useViewportReveal<HTMLDivElement>(amount);
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
      ref={ref}
      className={`motion-reveal-target ${className}`}
      initial={{ opacity: 0, ...offsets }}
      animate={shouldReveal ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, ...offsets }}
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

type PortfolioLeaf = {
  id: number;
  title?: string;
  isCover?: boolean;
  front: {
    isCover?: boolean;
    isInsideCover?: boolean;
    content: React.ReactNode;
  };
  back: {
    isCover?: boolean;
    isInsideCover?: boolean;
    content: React.ReactNode;
  };
};

function PortfolioBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [visualPage, setVisualPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward" | null>(null);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const bookClosingAudioRef = useRef<HTMLAudioElement | null>(null);
  const leafOpenAudioRef = useRef<HTMLAudioElement | null>(null);
  const turnTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    setHasMounted(true);

    return () => {
      turnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      turnTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (bookClosingAudioRef.current) {
      bookClosingAudioRef.current.volume = 0.34;
      bookClosingAudioRef.current.load();
    }

    if (leafOpenAudioRef.current) {
      leafOpenAudioRef.current.volume = 0.26;
      leafOpenAudioRef.current.load();
    }
  }, []);

  const leaves: PortfolioLeaf[] = [
    {
      id: 0,
      isCover: true,
      front: {
        isCover: true,
        content: (
          <div className="portfolio-book-cover">
            <span className="portfolio-book-kicker">Mini Book</span>
            <h3>Student Developer</h3>
            <p>Perception</p>
          </div>
        ),
      },
      back: {
        isInsideCover: true,
        content: (
          <div className="portfolio-book-inside">
            <span>Me</span>
            <h4>📎</h4>
            <p>
              A compact look at what approach I take, what I build, what I keep learning, and how I work with a team.
            </p>
          </div>
        ),
      },
    },
    {
      id: 1,
      title: "Intro",
      front: {
        content: (
          <div className="portfolio-book-profile">
            <div className="portfolio-book-photo">
              <Image src="/img/me/me.png" alt="Shaun Michael Belono-ac portrait" fill sizes="(max-width: 768px) 190px, 260px" />
            </div>
            <span>Shaun Michael Belono-ac</span>
            <p>
              Pursuing (Fourth Year), Information Technology , aim to build web systems, system planning, analysis, and clear user flow.
            </p>
          </div>
        ),
      },
      back: {
        content: (
          <div className="portfolio-book-note">
            <span>Build</span>
            <h4>Full Stack Development</h4>
            <p>
              I work on both the database and application side of a system while keeping the interface clean, readable, and easy to follow.
            </p>
          </div>
        ),
      },
    },
    {
      id: 2,
      title: "Practice",
      front: {
        content: (
          <div className="portfolio-book-note">
            <span>Learn</span>
            <h4>Technical Skills</h4>
            <p>
              I continue to practice web development, database design, game development, image tools, and digital arts through school and personal projects.
            </p>
          </div>
        ),
      },
      back: {
        content: (
          <div className="portfolio-book-note">
            <span>Collaborate</span>
            <h4>Collaboration</h4>
            <p>
              I organize ideas with references, screenshots, prototypes, and short notes so the team can understand the goal and build a working output.
            </p>
          </div>
        ),
      },
    },
    {
      id: 3,
      title: "Growth",
      front: {
        content: (
          <div className="portfolio-book-note">
            <span>Character</span>
            <h4>Aspiring Professional</h4>
            <p>
              I try to stay understanding, calm, and friendly when working with others, especially when ideas need patience, clear communication, and respect.
            </p>
          </div>
        ),
      },
      back: {
        content: (
          <div className="portfolio-book-note">
            <span>Improve</span>
            <h4>Continuous Improvement</h4>
            <p>
              I know what I need to improve, I recognize my mistakes, and I keep learning from them so my work and mindset can become better over time.
            </p>
          </div>
        ),
      },
    },
    {
      id: 4,
      isCover: true,
      front: {
        isInsideCover: true,
        content: (
          <div className="portfolio-book-inside">
            <span>Motivation</span>
            <h4>Henry Ford said</h4>
            <p>
              "Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young."
            </p>
          </div>
        ),
      },
      back: {
        isCover: true,
        content: (
          <div className="portfolio-book-cover portfolio-book-cover--back">
            <span className="portfolio-book-kicker"></span>
            <h3></h3>
            <p></p>
          </div>
        ),
      },
    },
  ];

  const totalLeaves = leaves.length;
  const shouldReduceMotion = hasMounted && reduceMotion;
  const animationMs = shouldReduceMotion ? 520 : 900;

  const playSound = (sourceRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    const source = sourceRef.current;
    if (!source) return;

    try {
      source.currentTime = 0;
      source.play().catch(() => undefined);
    } catch {
      // Browsers can block audio before the first user gesture; the page turn should still work.
    }
  };

  const handlePageChange = (pageIndex: number) => {
    if (isAnimating || pageIndex < 0 || pageIndex > totalLeaves) return;

    const nextDirection = pageIndex > currentPage ? "forward" : "backward";
    const isCoverTransition =
      (currentPage === 0 && pageIndex === 1) ||
      (currentPage === 1 && pageIndex === 0) ||
      (currentPage === totalLeaves - 1 && pageIndex === totalLeaves) ||
      (currentPage === totalLeaves && pageIndex === totalLeaves - 1);

    playSound(isCoverTransition ? bookClosingAudioRef : leafOpenAudioRef);

    setIsAnimating(true);
    setDirection(nextDirection);
    setCurrentPage(pageIndex);

    turnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    const visualTimeoutId = window.setTimeout(() => setVisualPage(pageIndex), animationMs / 2);
    const doneTimeoutId = window.setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, animationMs);
    turnTimeoutsRef.current = [visualTimeoutId, doneTimeoutId];
  };

  let flatLeftPages = currentPage;
  let flatRightPages = totalLeaves - currentPage;

  if (isAnimating) {
    if (direction === "forward") {
      flatLeftPages = currentPage - 1;
    } else if (direction === "backward") {
      flatRightPages = totalLeaves - (currentPage + 1);
    }
  }

  const getLeftStackShadow = (leftCount: number) => {
    if (leftCount <= 0) return "none";
    const layers = Math.min(leftCount, 4);
    const sheets = Array.from({ length: layers }, (_, index) => `-${index + 1}px ${index + 1}px 0 rgba(230,230,224,0.82)`);

    return [...sheets, `-${layers + 2}px ${layers + 2}px 18px rgba(0,0,0,0.24)`].join(", ");
  };

  const getRightStackShadow = (rightCount: number) => {
    if (rightCount <= 0) return "none";
    const layers = Math.min(rightCount, 4);
    const sheets = Array.from({ length: layers }, (_, index) => `${index + 1}px ${index + 1}px 0 rgba(230,230,224,0.82)`);

    return [...sheets, `${layers + 2}px ${layers + 2}px 18px rgba(0,0,0,0.24)`].join(", ");
  };

  const closedShift = currentPage === 0 ? "-25%" : currentPage === totalLeaves ? "25%" : "0%";

  return (
    <div className="portfolio-book-stage">
      <audio ref={bookClosingAudioRef} preload="auto" src={bookCloseAudioPath} />
      <audio ref={leafOpenAudioRef} preload="auto" src={leafOpenAudioPath} />
      <div
        className="portfolio-book-shell"
        style={{
          transform: `translateX(${closedShift})`,
          transitionDuration: `${animationMs}ms`,
        }}
        onMouseMove={(event) => {
          if (isAnimating || shouldReduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          setHoverSide(event.clientX - rect.left < rect.width / 2 ? "left" : "right");
        }}
        onMouseLeave={() => setHoverSide(null)}
      >
        <div
          className="portfolio-book-stack portfolio-book-stack--left"
          style={{ boxShadow: getLeftStackShadow(flatLeftPages), opacity: flatLeftPages > 0 ? 1 : 0 }}
        />
        <div
          className="portfolio-book-stack portfolio-book-stack--right"
          style={{ boxShadow: getRightStackShadow(flatRightPages), opacity: flatRightPages > 0 ? 1 : 0 }}
        />
        <div className="portfolio-book-spine" style={{ opacity: currentPage > 0 && currentPage < totalLeaves ? 1 : 0 }} />

        <div className="portfolio-book">
          {leaves.map((leaf, index) => {
            const isFlipped = currentPage > index;
            const isVisuallyFlipped = visualPage > index;
            const isCoverLeaf = Boolean(leaf.isCover);
            const isClickable = (index === currentPage || index === currentPage - 1) && !isAnimating;
            const isFlipping = isAnimating && (index === currentPage || index === currentPage - 1);
            let angle = isFlipped ? -180 : 0;
            let zTranslate = isFlipped ? -(2 + index * 2) : 2 + (totalLeaves - index) * 2;

            if (isFlipped && index === currentPage - 1) {
              angle = hoverSide === "left" && !isAnimating ? -168 : -180;
              zTranslate = -20;
            } else if (!isFlipped && index === currentPage) {
              angle = hoverSide === "right" && !isAnimating ? -12 : 0;
              zTranslate = 20;
            }

            return (
              <div
                className={`portfolio-book-leaf ${isCoverLeaf ? "is-cover" : ""} ${isFlipping ? "is-flipping" : ""}`}
                key={leaf.id}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${zTranslate}px)`,
                  transitionDuration: isFlipping ? `${animationMs}ms` : "300ms",
                  zIndex: isFlipping ? 20 : 10,
                  pointerEvents: isClickable ? "auto" : "none",
                }}
                onClick={() => {
                  if (!isClickable) return;
                  handlePageChange(index === currentPage ? currentPage + 1 : currentPage - 1);
                }}
              >
                <div
                  className={`portfolio-book-page portfolio-book-page--front ${leaf.front.isCover ? "is-cover" : ""} ${leaf.front.isInsideCover ? "is-inside-cover" : ""}`}
                  style={{ visibility: isVisuallyFlipped ? "hidden" : "visible" }}
                >
                  {leaf.front.content}
                </div>
                <div
                  className={`portfolio-book-page portfolio-book-page--back ${leaf.back.isCover ? "is-cover" : ""} ${leaf.back.isInsideCover ? "is-inside-cover" : ""}`}
                  style={{ visibility: isVisuallyFlipped ? "visible" : "hidden" }}
                >
                  {leaf.back.content}
                </div>
              </div>
            );
          })}
        </div>

        <div className="portfolio-book-crease" style={{ opacity: visualPage > 0 && visualPage < totalLeaves ? 1 : 0 }} />
      </div>

      <div className="portfolio-book-controls">
        <button
          aria-label="Previous page"
          className="portfolio-book-control"
          disabled={currentPage === 0 || isAnimating}
          onClick={() => handlePageChange(currentPage - 1)}
          type="button"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <span className="portfolio-book-count">{String(Math.min(currentPage + 1, totalLeaves)).padStart(2, "0")}</span>
        <button
          aria-label="Next page"
          className="portfolio-book-control"
          disabled={currentPage === totalLeaves || isAnimating}
          onClick={() => handlePageChange(currentPage + 1)}
          type="button"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline with draw-on-scroll line (minimal cardless text)          */
/* ------------------------------------------------------------------ */

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
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
        style={{ scaleY }}
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
    const colors = ["204, 74, 92", "226, 230, 236", "226, 190, 255"];
    const galaxyColor = colors[index % colors.length];
    const stars = Array.from({ length: 96 }, (_, starIndex) => {
      const arm = starIndex % 4;
      const radius = Math.sqrt(Math.random()) * 0.5;
      const angle = radius * 8.2 + arm * (Math.PI / 2) + (Math.random() - 0.5) * 1.36;

      return {
        radius,
        angle,
        size: Math.random() * 0.94 + 0.24,
        alpha: Math.random() * 0.46 + 0.2,
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
      const galaxyRadius = Math.min(width, height) * 0.58;

      const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius * 0.88);
      coreGlow.addColorStop(0, `rgba(${galaxyColor},0.27)`);
      coreGlow.addColorStop(0.28, `rgba(${galaxyColor},0.13)`);
      coreGlow.addColorStop(0.62, `rgba(${galaxyColor},0.052)`);
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
  const { ref, shouldReveal } = useViewportReveal<HTMLDivElement>(0.18);

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
      ref={ref}
      className="contact-planet-layer"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={shouldReveal ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 1.1, ease: smoothEase }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="contact-planet-canvas" />
    </motion.div>
  );
}

function ExperienceStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, shouldReveal } = useViewportReveal<HTMLDivElement>(0.18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const stars = Array.from({ length: 62 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.95 + 0.22,
      alpha: Math.random() * 0.3 + 0.12,
    }));
    const fineStars = Array.from({ length: 92 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.45 + 0.18,
      alpha: Math.random() * 0.14 + 0.05,
    }));

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

    const drawStar = (star: { x: number; y: number; size: number; alpha: number }, tint = "244, 246, 255") => {
      const x = star.x * width;
      const y = star.y * height;
      const glow = context.createRadialGradient(x, y, 0, x, y, star.size * 7);

      glow.addColorStop(0, `rgba(${tint},${star.alpha})`);
      glow.addColorStop(0.32, `rgba(${tint},${star.alpha * 0.32})`);
      glow.addColorStop(1, `rgba(${tint},0)`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, star.size * 7, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(${tint},${Math.min(star.alpha + 0.18, 0.72)})`;
      context.beginPath();
      context.arc(x, y, star.size, 0, Math.PI * 2);
      context.fill();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const veil = context.createRadialGradient(width * 0.68, height * 0.3, 0, width * 0.68, height * 0.3, Math.min(width, height) * 0.82);
      veil.addColorStop(0, "rgba(104, 92, 152, 0.075)");
      veil.addColorStop(0.46, "rgba(42, 36, 70, 0.034)");
      veil.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);

      fineStars.forEach((star) => drawStar(star, "198, 204, 218"));
      stars.forEach((star, index) => drawStar(star, index % 5 === 0 ? "218, 204, 255" : "245, 246, 250"));
    };

    const handleResize = () => {
      resize();
      draw();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="experience-stars-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldReveal ? 0.7 : 0 }}
      transition={{ duration: 1.05, ease: smoothEase }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="experience-stars-canvas" />
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.76, delay: 0.08, ease: smoothEase }}
              >
                <span className="h-px w-8 bg-white/20" />
                 Kibawe Bukidnon
              </motion.p>
              <h1 className="hero-title">
                <motion.span
                  className="hero-line hero-line--2"
                  initial={{ opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.86, delay: 0.18, ease: smoothEase }}
                >
                  Zup! I&apos;m <span className="outline-name">Shaun</span>
                </motion.span>
              </h1>
              <motion.p
                className="hero-role-copy mt-8 max-w-md font-light text-white/42"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.3, ease: smoothEase }}
              >
                an Aspiring Full Stack Developer
              </motion.p>
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
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
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

        <div className="section-divider section-divider-soft" />

        <section id="about" className="section-space site-container">
          <SectionHeading
            label="Artist Statement"
            title="Practical systems, shaped with visual care."
            animatedTitle
            description="Solutions that are both functional and visually engaging, with a focus on user experience, accessibility, and performance."
          />

          <Parallax speed={0.018}>
            <MotionReveal amount={0.28}>
              <PortfolioBook />
            </MotionReveal>
          </Parallax>
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
            description="A set of school and personal projects across web systems, interface design, image tools, game development, and capstone work."
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

        <section id="experience" className="experience-stars-section section-space">
          <ExperienceStars />
          <div className="site-container">
            <SectionHeading
              title="The academic journey so far."
              description=""
            />
            <Timeline />
          </div>
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
                    Have a project idea or a system that needs a clean interface? Send a message and let&apos;s talk about it.
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
                Student developer focused on system development, web interfaces, and digital arts.
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
