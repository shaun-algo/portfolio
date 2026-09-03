"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MotionValue, Variants } from "framer-motion";
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
  const inView = useInView(ref, { ...softViewport, amount });

  return {
    ref,
    shouldReveal: Boolean(inView),
  };
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({
  label,
  title,
  description,
  animatedTitle = true,
  align = "left",
  revealDirection = "up",
}: {
  label?: string;
  title: string;
  description: string;
  animatedTitle?: boolean;
  align?: "left" | "center";
  revealDirection?: "up" | "down" | "left" | "right" | "none" | "center";
}) {
  const isCentered = align === "center";

  return (
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
  );
}

function KineticTypingTitle({ text }: { text: string }) {
  const { ref, shouldReveal } = useViewportReveal<HTMLHeadingElement>(0.28);
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
  const { ref, shouldReveal } = useViewportReveal<HTMLDivElement>(amount);
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
          <div key={milestone.year}>
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
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Black Hole                                                    */
/* ------------------------------------------------------------------ */

const BLACK_HOLE_NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
  float value=0.0;
  float amp=0.5;
  for(int i=0;i<5;i++){
    value+=amp*snoise(p);
    p*=2.05;
    amp*=0.5;
  }
  return value;
}
`;

const BLACK_HOLE_RING_VERTEX_GLSL = `
varying vec3 vObjectPosition;
void main(){
  vObjectPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BLACK_HOLE_RING_FRAGMENT_GLSL = `
${BLACK_HOLE_NOISE_GLSL}
varying vec3 vObjectPosition;
uniform float uInner;
uniform float uOuter;
uniform float uTime;
uniform float uSeed;
uniform float uOpacityScale;
uniform float uBrightness;
void main(){
  float r = length(vObjectPosition.xy);
  float theta = atan(vObjectPosition.y, vObjectPosition.x);
  float rt = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);

  // Cohesive incandescent white -> gold -> amber -> deep ember palette
  vec3 hot = vec3(1.0, 0.98, 0.94);
  vec3 gold = vec3(1.0, 0.82, 0.48);
  vec3 amber = vec3(1.0, 0.56, 0.22);
  vec3 outerC = vec3(0.38, 0.14, 0.04);

  vec3 base = mix(hot, gold, smoothstep(0.0, 0.26, rt));
  base = mix(base, amber, smoothstep(0.26, 0.62, rt));
  base = mix(base, outerC, smoothstep(0.62, 1.0, rt));

  float swirl = fbm(vec3(cos(theta) * 5.2, sin(theta) * 5.2, r * 2.2 - uTime * 0.32) + uSeed);
  float streaks = smoothstep(-0.14, 0.54, swirl);
  float beam = mix(0.76, 1.26, smoothstep(-1.0, 1.0, cos(theta - 0.38)));

  // Fully smooth non-sharp edge fades for soft volumetric gas
  float innerFade = smoothstep(0.0, 0.20, rt);
  float outerFade = 1.0 - smoothstep(0.50, 1.0, rt);
  float edgeFade = innerFade * outerFade;

  base *= (0.75 + 0.28 * streaks) * beam * uBrightness;
  gl_FragColor = vec4(base, edgeFade * uOpacityScale);
}
`;

function createHeroBlackHoleStarfield(THREE: typeof import("three")) {
  const count = 3600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  const bhCenterX = -3.8;
  const bhCenterY = -0.45;
  const bhExclusionRadiusSq = 4.8 * 4.8;

  let written = 0;
  for (let i = 0; i < count; i += 1) {
    const radius = 45 + Math.random() * 95;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    // Keep stars strictly at deep background depths behind the black hole
    const z = -Math.abs(radius * Math.cos(phi)) - 4.0;

    // Check projected distance from black hole center to avoid overlaying the black hole
    const dx = x - bhCenterX;
    const dy = y - bhCenterY;
    if (dx * dx + dy * dy < bhExclusionRadiusSq && Math.random() > 0.12) {
      continue;
    }

    positions[written * 3] = x;
    positions[written * 3 + 1] = y;
    positions[written * 3 + 2] = z;

    // Rich cosmic star colors matching deep space theme
    const starType = Math.random();
    if (starType > 0.88) {
      color.setHSL(0.11, 0.65, 0.90); // Warm gold/amber star
    } else if (starType > 0.45) {
      color.setHSL(0.60, 0.45, 0.84); // Ice blue star
    } else {
      color.setRGB(0.95, 0.96, 1.0); // Pure brilliant diamond white
    }

    colors[written * 3] = color.r;
    colors[written * 3 + 1] = color.g;
    colors[written * 3 + 2] = color.b;
    written += 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions.subarray(0, written * 3), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors.subarray(0, written * 3), 3));
  const material = new THREE.PointsMaterial({
    size: 0.052,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.68,
    depthTest: true,
    depthWrite: false,
    vertexColors: true,
  });

  const points = new THREE.Points(geometry, material);
  points.renderOrder = -10;

  return { points, geometry, material };
}

function HeroBlackHole() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (cancelled || !container) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }

      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 260);
      const starfield = createHeroBlackHoleStarfield(THREE);
      const horizonGeo = new THREE.SphereGeometry(1.19, 64, 64);
      const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000, depthWrite: true });
      const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
      horizonMesh.renderOrder = 2;

      // Expanded outer glow & atmospheric rim around black circle
      const horizonGlowGeo = new THREE.SphereGeometry(1.215, 64, 64);
      const horizonGlowUniforms = { uTime: { value: 0 } };
      const horizonGlowMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vViewNormal;
          varying vec3 vViewPosition;
          void main(){
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vViewNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vViewNormal;
          varying vec3 vViewPosition;
          uniform float uTime;
          void main(){
            float rim = 1.0 - abs(dot(normalize(vViewNormal), normalize(vViewPosition)));
            float pulse = 0.88 + 0.12 * sin(uTime * 1.5);
            // Crisp, sleek continuous power curve hugging the spherical horizon
            float alpha = pow(rim, 5.2) * 0.78 * pulse;
            vec3 color = mix(vec3(1.0, 0.58, 0.18), vec3(1.0, 0.98, 0.92), smoothstep(0.70, 0.96, rim));
            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: horizonGlowUniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);

      // Dedicated Sleek Soft Fire Photon Ring Outline (thinner, delicate plasma beam)
      const photonRingGeo = new THREE.RingGeometry(0.95, 2.2, 240, 8);
      const photonRingUniforms = { uTime: { value: 0 } };
      const photonRingMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vObjectPosition;
          void main(){
            vObjectPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          ${BLACK_HOLE_NOISE_GLSL}
          varying vec3 vObjectPosition;
          uniform float uTime;
          void main(){
            float r = length(vObjectPosition.xy);
            float theta = atan(vObjectPosition.y, vObjectPosition.x);

            // Swirling organic plasma fire turbulence
            vec3 fireCoord1 = vec3(cos(theta) * 4.6, sin(theta) * 4.6, r * 3.2 - uTime * 0.42);
            vec3 fireCoord2 = vec3(cos(theta * 2.0 + 0.9) * 3.4, sin(theta * 2.0 + 0.9) * 3.4, r * 4.8 - uTime * 0.62);
            float flame1 = fbm(fireCoord1);
            float flame2 = fbm(fireCoord2);
            float fireTurbulence = flame1 * 0.65 + flame2 * 0.35;

            // Subtle organic flame displacement without excess thickness
            float distortedR = r - (fireTurbulence - 0.5) * 0.042;

            // Crisp inner ramp from black hole center for a pristine event horizon void
            float innerRamp = smoothstep(1.12, 1.185, distortedR);

            // Sleek, thinner Gaussian fire beam outline
            float coreFire = exp(-pow((distortedR - 1.19) / 0.024, 2.0));

            // Delicate mid-level flame glow
            float midFlame = exp(-pow((distortedR - 1.208) / 0.056, 2.0)) * (0.65 + 0.35 * flame1) * 0.42;

            // Gentle ambient ember dissipation
            float outerEmber = exp(-pow((distortedR - 1.25) / 0.14, 2.0)) * (0.50 + 0.50 * flame2) * (1.0 - smoothstep(1.4, 2.1, r)) * 0.22;

            // Relativistic Doppler beaming across the fire ring
            float doppler = mix(0.85, 1.22, smoothstep(-1.0, 1.0, cos(theta - 0.38)));

            float intensity = (coreFire * 1.55 + midFlame * 0.75 + outerEmber * 0.35) * innerRamp * doppler;

            // Soft fire palette: incandescent white-hot core -> golden flame -> orange-amber -> crimson ember
            vec3 cWhiteHot = vec3(1.0, 0.98, 0.94);
            vec3 cGoldFlame = vec3(1.0, 0.78, 0.34);
            vec3 cOrangeAmber = vec3(1.0, 0.48, 0.12);
            vec3 cDeepCrimson = vec3(0.55, 0.16, 0.04);

            vec3 col = mix(cWhiteHot, cGoldFlame, smoothstep(1.17, 1.21, distortedR));
            col = mix(col, cOrangeAmber, smoothstep(1.21, 1.32, distortedR));
            col = mix(col, cDeepCrimson, smoothstep(1.32, 1.70, distortedR));

            // Subtle color temperature modulation from flame turbulence
            col += vec3(0.06, 0.04, 0.01) * flame2;

            gl_FragColor = vec4(col, clamp(intensity, 0.0, 1.0));
          }
        `,
        uniforms: photonRingUniforms,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const photonRingMesh = new THREE.Mesh(photonRingGeo, photonRingMat);

      const group = new THREE.Group();
      let frameId = 0;
      let isVisible = true;
      let lastDraw = 0;

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setSize(width, height);
      renderer.domElement.className = "hero-black-hole-canvas";
      container.appendChild(renderer.domElement);

      camera.position.set(0, 0, 4.2);
      const isMobile = width < 700;
      const isTablet = width < 1200;
      const posX = isMobile ? -2.35 : isTablet ? -3.2 : -4.1;
      const posY = isMobile ? -0.28 : -0.45;
      const scale = isMobile ? 3.3 : isTablet ? 4.4 : 5.3;
      group.position.set(posX, posY, 0);
      group.scale.setScalar(scale);
      group.rotation.set(0.04, -0.15, -0.06);
      group.add(horizonGlowMesh, horizonMesh);
      scene.add(starfield.points, group);

      const clock = new THREE.Clock();
      const render = (now: number) => {
        frameId = 0;
        if (!isVisible) return;

        if (now - lastDraw < 50) {
          if (!reduceMotion) {
            frameId = requestAnimationFrame(render);
          }
          return;
        }

        const elapsed = reduceMotion ? 0 : clock.getElapsedTime();
        horizonGlowUniforms.uTime.value = elapsed;
        group.rotation.y += reduceMotion ? 0 : 0.0007;
        starfield.points.rotation.y += reduceMotion ? 0 : 0.00004;
        renderer.render(scene, camera);
        lastDraw = now;

        if (!reduceMotion) {
          frameId = requestAnimationFrame(render);
        }
      };

      const handleResize = () => {
        const nextWidth = Math.max(1, container.clientWidth);
        const nextHeight = Math.max(1, container.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        renderer.setSize(nextWidth, nextHeight);
        const isMob = nextWidth < 700;
        const isTab = nextWidth < 1200;
        group.position.set(isMob ? -2.35 : isTab ? -3.2 : -4.1, isMob ? -0.28 : -0.45, 0);
        group.scale.setScalar(isMob ? 3.3 : isTab ? 4.4 : 5.3);
        renderer.render(scene, camera);
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !frameId) {
            frameId = requestAnimationFrame(render);
          }
          if (!isVisible) {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        },
        { rootMargin: "160px" },
      );
      const resizeObserver = new ResizeObserver(handleResize);

      handleResize();
      observer.observe(container);
      resizeObserver.observe(container);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        observer.disconnect();
        resizeObserver.disconnect();
        horizonGeo.dispose();
        horizonMat.dispose();
        horizonGlowGeo.dispose();
        horizonGlowMat.dispose();
        photonRingGeo.dispose();
        photonRingMat.dispose();
        starfield.geometry.dispose();
        starfield.material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="hero-black-hole" aria-hidden="true" />;
}

const MOON_RIM_VERTEX_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
void main(){
  vNormal=normalize(mat3(modelMatrix)*normal);
  vec4 worldPos=modelMatrix*vec4(position,1.0);
  vWorldPosition=worldPos.xyz;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}
`;

const MOON_RIM_FRAGMENT_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform vec3 uSunDirection;
void main(){
  vec3 n=normalize(vNormal);
  vec3 viewDir=normalize(cameraPosition-vWorldPosition);
  float horizon=1.0-max(dot(n,viewDir),0.0);
  float vapor=pow(horizon,1.45)*(1.0-smoothstep(0.9,1.0,horizon));
  float mist=pow(horizon,2.05);
  float sunSide=smoothstep(-0.18,0.72,dot(n,uSunDirection));
  float clippedTerminator=smoothstep(-0.02,0.5,dot(n,uSunDirection));
  float alpha=(vapor*0.16+mist*0.08)*(0.34+sunSide*0.42)*clippedTerminator;
  gl_FragColor=vec4(0.54,0.56,0.6,alpha);
}
`;

const MOON_SURFACE_VERTEX_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;
uniform sampler2D uReliefMap;
uniform float uReliefScale;
void main(){
  vUv=uv;
  float relief=texture2D(uReliefMap,uv).r;
  vec3 displaced=position+normal*((relief-0.48)*uReliefScale);
  vNormal=normalize(mat3(modelMatrix)*normal);
  vec4 worldPos=modelMatrix*vec4(displaced,1.0);
  vWorldPosition=worldPos.xyz;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(displaced,1.0);
}
`;

const MOON_SURFACE_FRAGMENT_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;
uniform sampler2D uColorMap;
uniform sampler2D uReliefMap;
uniform vec3 uSunDirection;
void main(){
  vec3 n=normalize(vNormal);
  vec3 viewDir=normalize(cameraPosition-vWorldPosition);
  vec3 mapColor=texture2D(uColorMap,vUv).rgb;
  float relief=texture2D(uReliefMap,vUv).r;
  float diffuse=max(dot(n,uSunDirection),0.0);
  float twilight=smoothstep(-0.34,0.22,dot(n,uSunDirection));
  float rim=pow(1.0-max(dot(n,viewDir),0.0),2.6);
  float luma=dot(mapColor,vec3(0.299,0.587,0.114));
  mapColor=mix(vec3(luma),mapColor,0.18);
  vec3 coolShadow=vec3(0.052,0.053,0.058);
  vec3 warmRock=mapColor*vec3(1.1,1.06,0.98)+vec3(0.035,0.032,0.028);
  warmRock+=vec3(0.07,0.066,0.058)*(relief-0.5);
  vec3 lit=warmRock*(0.28+diffuse*0.86);
  vec3 shadow=mix(coolShadow,warmRock*0.24,0.34);
  vec3 color=mix(shadow,lit,twilight);
  color+=vec3(0.5,0.52,0.56)*rim*smoothstep(0.0,0.58,dot(n,uSunDirection))*0.08;
  gl_FragColor=vec4(color,1.0);
}
`;

function WelcomeMoon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (cancelled || !container) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const camera = new THREE.PerspectiveCamera(31, width / height, 0.1, 100);
      const group = new THREE.Group();
      const textureLoader = new THREE.TextureLoader();
      const sunDirection = new THREE.Vector3(0.88, 0.18, 0.43).normalize();
      const colorMap = textureLoader.load("/moon/lroc_color_4k.jpg");
      const reliefMap = textureLoader.load("/moon/ldem_4k.jpg");

      colorMap.colorSpace = THREE.SRGBColorSpace;
      colorMap.anisotropy = 8;
      colorMap.wrapS = THREE.RepeatWrapping;
      reliefMap.wrapS = THREE.RepeatWrapping;

      const moonGeometry = new THREE.SphereGeometry(1, 160, 160);
      const rimGeometry = new THREE.SphereGeometry(1.04, 96, 96);
      const moonMaterial = new THREE.ShaderMaterial({
        vertexShader: MOON_SURFACE_VERTEX_GLSL,
        fragmentShader: MOON_SURFACE_FRAGMENT_GLSL,
        uniforms: {
          uColorMap: { value: colorMap },
          uReliefMap: { value: reliefMap },
          uReliefScale: { value: 0.034 },
          uSunDirection: { value: sunDirection.clone() },
        },
      });
      const rimMaterial = new THREE.ShaderMaterial({
        vertexShader: MOON_RIM_VERTEX_GLSL,
        fragmentShader: MOON_RIM_FRAGMENT_GLSL,
        uniforms: { uSunDirection: { value: sunDirection.clone() } },
        transparent: true,
        side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      const sun = new THREE.DirectionalLight(0xf7f2e9, 1.8);
      const fill = new THREE.HemisphereLight(0xd8deed, 0x111113, 0.22);
      let frameId = 0;
      let lastDraw = 0;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
      renderer.setSize(width, height);
      renderer.domElement.className = "welcome-moon-canvas";
      container.appendChild(renderer.domElement);

      camera.position.set(0, 0, 3.9);
      sun.position.copy(sunDirection).multiplyScalar(4.5);
      group.rotation.set(0.08, -0.42, -0.05);
      moon.renderOrder = 1;
      rim.renderOrder = 2;
      group.add(moon, rim);
      scene.add(fill, sun, group);

      const render = (now: number) => {
        if (now - lastDraw > 50) {
          if (!reduceMotion) {
            group.rotation.y += 0.0011;
          }
          renderer.render(scene, camera);
          lastDraw = now;
        }
        frameId = requestAnimationFrame(render);
      };

      const handleResize = () => {
        const nextWidth = Math.max(1, container.clientWidth);
        const nextHeight = Math.max(1, container.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
        renderer.setSize(nextWidth, nextHeight);
        renderer.render(scene, camera);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      handleResize();
      frameId = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        moonGeometry.dispose();
        rimGeometry.dispose();
        moonMaterial.dispose();
        rimMaterial.dispose();
        colorMap.dispose();
        reliefMap.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="welcome-moon-layer" aria-hidden="true" />;
}

function ProcessGalaxy({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const stage = index === 0 ? "fragments" : index === 1 ? "forming" : "refined";
    const stageColors = {
      fragments: {
        primary: "235, 239, 246",
        accent: "166, 190, 226",
      },
      forming: {
        primary: "226, 230, 236",
        accent: "189, 215, 255",
      },
      refined: {
        primary: "226, 190, 255",
        accent: "255, 232, 190",
      },
    }[stage];

    const fragmentStars = Array.from({ length: 142 }, () => ({
      x: Math.random() * 0.92 - 0.46,
      y: Math.random() * 0.74 - 0.37,
      size: Math.random() * 0.86 + 0.18,
      alpha: Math.random() * 0.56 + 0.22,
      drift: Math.random() * 0.22 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    const galaxyStars = Array.from({ length: stage === "forming" ? 128 : 168 }, (_, starIndex) => {
      const armCount = stage === "forming" ? 3 : 4;
      const arm = starIndex % armCount;
      const radius = Math.sqrt(Math.random()) * (stage === "forming" ? 0.48 : 0.56);
      const armArc = stage === "forming" ? 5.4 : 8.6;
      const angle =
        radius * armArc +
        arm * ((Math.PI * 2) / armCount) +
        (Math.random() - 0.5) * (stage === "forming" ? 1.08 : 1.32);

      return {
        radius,
        angle,
        size: Math.random() * (stage === "forming" ? 0.92 : 1.16) + 0.18,
        alpha: Math.random() * (stage === "forming" ? 0.48 : 0.58) + 0.2,
        drift: Math.random() * 0.1 + 0.018,
        scatter: (Math.random() - 0.5) * (stage === "forming" ? 0.82 : 0.58),
        arm,
        bright: Math.random() > (stage === "forming" ? 0.78 : 0.72),
      };
    });

    const detailStars = Array.from({ length: stage === "fragments" ? 72 : stage === "forming" ? 76 : 92 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.72 + 0.12,
      size: Math.random() * 0.45 + 0.12,
      alpha: Math.random() * 0.46 + 0.16,
      drift: Math.random() * 0.08 + 0.014,
      scatter: (Math.random() - 0.5) * 0.42,
    }));

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect?.width ?? 360));
      const nextHeight = Math.max(1, Math.floor(rect?.height ?? 360));
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const elapsed = 0;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.6;
      const galaxyRadius = Math.min(width, height) * 0.58;

      if (stage !== "fragments") {
        const glowRadius = stage === "forming" ? galaxyRadius * 0.58 : galaxyRadius * 0.88;
        const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
        coreGlow.addColorStop(0, `rgba(${stageColors.primary},${stage === "forming" ? 0.16 : 0.34})`);
        coreGlow.addColorStop(0.34, `rgba(${stageColors.primary},${stage === "forming" ? 0.078 : 0.16})`);
        coreGlow.addColorStop(0.68, `rgba(${stageColors.accent},${stage === "forming" ? 0.044 : 0.076})`);
        coreGlow.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = coreGlow;
        context.fillRect(0, 0, width, height);
      } else {
        const fragmentGlow = context.createRadialGradient(
          centerX + galaxyRadius * 0.16,
          centerY - galaxyRadius * 0.02,
          0,
          centerX,
          centerY,
          galaxyRadius * 0.86,
        );
        fragmentGlow.addColorStop(0, `rgba(${stageColors.accent},0.1)`);
        fragmentGlow.addColorStop(0.42, `rgba(${stageColors.primary},0.052)`);
        fragmentGlow.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = fragmentGlow;
        context.fillRect(0, 0, width, height);
      }

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.18 + index * 0.08 + elapsed * 0.012);
      context.scale(1.08, 0.98);

      if (stage === "fragments") {
        for (const star of fragmentStars) {
          const looseOrbit = Math.sin(elapsed * star.drift + star.phase) * 0.018;
          const x = (star.x + looseOrbit) * galaxyRadius * 1.22;
          const y = (star.y + Math.cos(elapsed * star.drift + star.phase) * 0.014) * galaxyRadius;
          const twinkle = 0.78 + Math.sin(elapsed * 1.9 + star.phase) * 0.22;

          if (star.size > 0.72) {
            const glow = context.createRadialGradient(x, y, 0, x, y, star.size * 5.4);
            glow.addColorStop(0, `rgba(${stageColors.accent},${star.alpha * twinkle * 0.26})`);
            glow.addColorStop(1, `rgba(${stageColors.accent},0)`);
            context.fillStyle = glow;
            context.beginPath();
            context.arc(x, y, star.size * 5.4, 0, Math.PI * 2);
            context.fill();
          }

          context.beginPath();
          context.fillStyle = `rgba(${stageColors.primary},${star.alpha * twinkle})`;
          context.arc(x, y, star.size, 0, Math.PI * 2);
          context.fill();
        }

        for (let i = 0; i < 7; i += 1) {
          const angle = i * 1.37 - 0.64;
          const x = Math.cos(angle) * galaxyRadius * (0.18 + i * 0.042);
          const y = Math.sin(angle * 1.7) * galaxyRadius * 0.32;

          context.beginPath();
          context.strokeStyle = `rgba(${stageColors.accent},${0.12 - i * 0.006})`;
          context.lineWidth = 1;
          context.moveTo(x - 12, y + 5);
          context.lineTo(x + 12, y - 7);
          context.stroke();
        }
      } else {
        for (const star of galaxyStars) {
          if (stage === "forming" && star.arm === 2 && star.radius > 0.36) {
            continue;
          }

          const angle = star.angle + elapsed * star.drift;
          const x = Math.cos(angle) * star.radius * galaxyRadius;
          const y = Math.sin(angle) * star.radius * galaxyRadius + star.scatter * galaxyRadius * star.radius;
          const twinkle = 0.75 + Math.sin(elapsed * 1.7 + star.angle * 3.2) * 0.25;
          const color = stage === "forming" && star.radius > 0.34 ? stageColors.accent : stageColors.primary;

          if (star.bright) {
            const glowRadius = star.size * (stage === "refined" ? 6.2 : 5);
            const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius);
            glow.addColorStop(0, `rgba(${stageColors.accent},${star.alpha * twinkle * 0.32})`);
            glow.addColorStop(0.5, `rgba(${color},${star.alpha * twinkle * 0.12})`);
            glow.addColorStop(1, `rgba(${color},0)`);
            context.fillStyle = glow;
            context.beginPath();
            context.arc(x, y, glowRadius, 0, Math.PI * 2);
            context.fill();
          }

          context.beginPath();
          context.fillStyle = `rgba(${color},${star.alpha * twinkle})`;
          context.arc(x, y, star.size, 0, Math.PI * 2);
          context.fill();
        }

        if (stage === "forming") {
          context.beginPath();
          context.strokeStyle = `rgba(${stageColors.accent},0.11)`;
          context.lineWidth = 1;

          for (let i = 0; i < 78; i += 1) {
            const progress = i / 77;
            const angle = progress * 4.4 - 0.6;
            const radius = progress * galaxyRadius * 0.48;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.72;

            if (i === 0) {
              context.moveTo(x, y);
            } else {
              context.lineTo(x, y);
            }
          }

          context.stroke();
        }
      }

      for (const star of detailStars) {
        const angle = star.angle + elapsed * star.drift;
        const x = Math.cos(angle) * star.radius * galaxyRadius;
        const y = Math.sin(angle) * star.radius * galaxyRadius * 0.72 + star.scatter * galaxyRadius * star.radius;
        const twinkle = 0.7 + Math.sin(elapsed * 2.4 + star.angle) * 0.3;

        context.beginPath();
        context.fillStyle = `rgba(${stageColors.accent},${star.alpha * twinkle})`;
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
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
  }, [index]);

  return <canvas ref={canvasRef} className="process-galaxy-canvas" aria-hidden="true" />;
}

function ProcessScrollGalaxyLayer({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const ranges: number[][] = [
    [0, 0.08, 0.28, 0.42],
    [0.24, 0.4, 0.62, 0.78],
    [0.58, 0.74, 0.94, 1],
  ];
  const opacityValues: number[][] = [
    [1, 1, 0.82, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
  ];
  const range = ranges[index];
  const opacity = useTransform(progress, range, opacityValues[index]);
  const scale = useTransform(progress, [range[0], range[1], range[3]], [0.88, 1.03, 1.22]);
  const y = useTransform(progress, [range[0], range[3]], [32, -34]);

  return (
    <motion.div
      className={`process-scroll-galaxy process-scroll-galaxy--${index + 1}`}
      style={{ opacity, scale, y }}
    >
      <ProcessGalaxy index={index} />
    </motion.div>
  );
}

function ProcessScrollInfo({
  index,
  progress,
  step,
}: {
  index: number;
  progress: MotionValue<number>;
  step: (typeof processSteps)[number];
}) {
  const Icon = step.icon;
  const ranges: number[][] = [
    [0, 0.08, 0.28, 0.42],
    [0.24, 0.4, 0.62, 0.78],
    [0.58, 0.74, 0.94, 1],
  ];
  const opacityValues: number[][] = [
    [1, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
  ];
  const yValues: number[][] = [
    [0, 0, 0, -26],
    [26, 0, 0, -26],
    [26, 0, 0, 0],
  ];
  const range = ranges[index];
  const opacity = useTransform(progress, range, opacityValues[index]);
  const y = useTransform(progress, [range[0], range[1], range[2], range[3]], yValues[index]);
  const scale = useTransform(progress, [range[0], range[1], range[3]], [0.96, 1, 0.98]);

  return (
    <motion.article
      className={`process-scroll-info process-scroll-info--${index + 1}`}
      style={{ opacity, scale, y }}
    >
      <div className="process-icon mb-8 flex h-10 w-10 items-center justify-center text-white/60">
        <Icon size={18} strokeWidth={1.25} />
      </div>
      <h3 className="premium-title mt-3 text-4xl font-light tracking-[-0.04em] md:text-6xl">
        {step.title}
      </h3>
      <p className="narrative-text mt-5 max-w-[34rem] text-sm font-light leading-7 text-white/48 md:text-base md:leading-8">
        {step.description}
      </p>
    </motion.article>
  );
}

function ProcessScrollExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 96,
    damping: 30,
    mass: 0.25,
  });
  const backgroundOpacity = useTransform(progress, [0, 0.12, 0.88, 1], [0.65, 1, 1, 0.72]);
  const atmosphereY = useTransform(progress, [0, 1], [36, -36]);

  return (
    <div ref={sectionRef} className="process-scroll-stage">
      <div className="process-scroll-sticky">
        <motion.div
          className="process-scroll-atmosphere"
          style={{ opacity: backgroundOpacity, y: atmosphereY }}
        />
        <div className="process-scroll-grid" aria-hidden="true" />
        <div className="process-scroll-galaxies" aria-hidden="true">
          {processSteps.map((step, index) => (
            <ProcessScrollGalaxyLayer index={index} key={step.title} progress={progress} />
          ))}
        </div>
        <div className="process-scroll-copy">
          {processSteps.map((step, index) => (
            <ProcessScrollInfo index={index} key={step.title} progress={progress} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}

const EARTH_NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
  float value=0.0;
  float amp=0.5;
  for(int i=0;i<6;i++){
    value+=amp*snoise(p);
    p*=2.02;
    amp*=0.5;
  }
  return value;
}
`;

const EARTH_VERTEX_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vObjectPosition;
varying vec2 vUv;
void main(){
  vNormal=normalize(mat3(modelMatrix)*normal);
  vObjectPosition=position;
  vUv=uv;
  vec4 worldPos=modelMatrix*vec4(position,1.0);
  vWorldPosition=worldPos.xyz;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}
`;

const EARTH_FRAGMENT_GLSL = `
${EARTH_NOISE_GLSL}
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vObjectPosition;
varying vec2 vUv;
uniform vec3 uSunDirection;
uniform sampler2D uEarthMap;
uniform float uTime;
void main(){
  vec3 n=normalize(vNormal);
  vec3 objectNormal=normalize(vObjectPosition);
  vec3 mapColor=texture2D(uEarthMap,vUv).rgb;
  mapColor=mix(vec3(0.38),mapColor,1.45);
  float lighting=max(dot(n,uSunDirection),0.0);
  float twilight=smoothstep(-0.3,0.18,dot(n,uSunDirection));
  float blueLead=mapColor.b-max(mapColor.r,mapColor.g)*0.48;
  float oceanMask=smoothstep(0.025,0.19,blueLead);
  float landMask=1.0-oceanMask;
  float relief=fbm(objectNormal*7.2+vec3(0.0,uTime*0.006,0.0))*0.5+0.5;
  float fineRelief=fbm(objectNormal*18.0+vec3(4.7,1.2,0.0))*0.5+0.5;
  float latitude=abs(objectNormal.y);
  float polarIce=smoothstep(0.73,0.92,latitude);
  float coast=smoothstep(0.38,0.56,oceanMask)*(1.0-smoothstep(0.62,0.82,oceanMask));

  vec3 landColor=mapColor*vec3(1.46,1.36,1.12)+vec3(0.1,0.085,0.035);
  landColor=mix(landColor,landColor*vec3(0.72,0.82,0.72),smoothstep(0.68,0.92,relief));
  landColor+=vec3(0.12,0.1,0.055)*(fineRelief-0.5);

  vec3 oceanDeep=vec3(0.012,0.09,0.22);
  vec3 oceanShallow=vec3(0.035,0.32,0.62);
  vec3 oceanColor=mix(oceanDeep,oceanShallow,clamp(mapColor.b*1.45+relief*0.16,0.0,1.0));
  oceanColor=mix(oceanColor,mapColor*vec3(0.76,1.08,1.72),0.38);
  oceanColor+=vec3(0.0,0.035,0.09)*(fineRelief-0.35);

  mapColor=mix(landColor,oceanColor,oceanMask);
  mapColor=mix(mapColor,vec3(0.88,0.95,1.0),polarIce*(0.78+oceanMask*0.16));
  mapColor+=coast*vec3(0.02,0.1,0.16);
  vec3 viewDir=normalize(cameraPosition-vWorldPosition);
  vec3 halfDir=normalize(uSunDirection+viewDir);
  float spec=pow(max(dot(n,halfDir),0.0),92.0)*oceanMask;
  vec3 color=mapColor+vec3(0.62,0.88,1.0)*spec*0.42;
  float fresnel=pow(1.0-max(dot(n,viewDir),0.0),2.65);
  float sunrise=smoothstep(-0.18,0.34,dot(n,uSunDirection))*fresnel;
  vec3 sunriseColor=vec3(1.0,0.5,0.2)*sunrise*0.22;
  vec3 night=mapColor*0.34+vec3(0.006,0.022,0.052);
  vec3 finalColor=mix(night,color*(lighting*1.18+0.62),twilight);
  finalColor+=landMask*vec3(0.055,0.048,0.022);
  finalColor+=oceanMask*vec3(0.0,0.045,0.105);
  finalColor+=sunriseColor;
  gl_FragColor=vec4(finalColor,1.0);
}
`;

const EARTH_CLOUD_FRAGMENT_GLSL = `
${EARTH_NOISE_GLSL}
varying vec3 vNormal;
varying vec3 vObjectPosition;
uniform vec3 uSunDirection;
uniform float uTime;
void main(){
  vec3 p=normalize(vObjectPosition)*2.5+vec3(uTime*0.012,0.0,uTime*0.007);
  float cloud=fbm(p);
  float alpha=smoothstep(0.28,0.68,cloud)*0.12;
  float lighting=max(dot(normalize(vNormal),uSunDirection),0.0)*0.72+0.28;
  gl_FragColor=vec4(vec3(0.96,0.98,1.0)*lighting,alpha);
}
`;

const EARTH_ATMO_VERTEX_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
void main(){
  vNormal=normalize(mat3(modelMatrix)*normal);
  vec4 worldPos=modelMatrix*vec4(position,1.0);
  vWorldPosition=worldPos.xyz;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}
`;

const EARTH_ATMO_FRAGMENT_GLSL = `
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform vec3 uSunDirection;
void main(){
  vec3 n=normalize(vNormal);
  vec3 viewDir=normalize(cameraPosition-vWorldPosition);
  float rim=1.0-abs(dot(n,viewDir));
  float sunlit=smoothstep(-0.24,0.7,dot(n,uSunDirection));
  float softBand=smoothstep(0.12,0.66,rim)*(1.0-smoothstep(0.76,1.0,rim));
  float haze=pow(softBand,1.35)*(0.42+sunlit*0.58);
  gl_FragColor=vec4(0.38,0.78,1.0,haze*0.13);
}
`;

function createEarthMapTexture(THREE: typeof import("three")) {
  const texture = new THREE.TextureLoader().load("/img/earth-atmos-2048.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function ContactPlanet() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (cancelled || !container) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }

      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      const sunDirection = new THREE.Vector3(0.45, 0.3, 0.88).normalize();
      const earthMapTexture = createEarthMapTexture(THREE);
      if (!earthMapTexture) {
        renderer.dispose();
        return;
      }
      const earthUniforms = {
        uSunDirection: { value: sunDirection },
        uEarthMap: { value: earthMapTexture },
        uTime: { value: 0 },
      };
      const cloudsUniforms = {
        uSunDirection: { value: sunDirection.clone() },
        uTime: { value: 0 },
      };
      const planetGeometry = new THREE.SphereGeometry(1, 96, 96);
      const cloudGeometry = new THREE.SphereGeometry(1.017, 64, 64);
      const atmosphereGeometry = new THREE.SphereGeometry(1.075, 48, 48);
      const planetMaterial = new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX_GLSL,
        fragmentShader: EARTH_FRAGMENT_GLSL,
        uniforms: earthUniforms,
      });
      const cloudMaterial = new THREE.ShaderMaterial({
        vertexShader: EARTH_VERTEX_GLSL,
        fragmentShader: EARTH_CLOUD_FRAGMENT_GLSL,
        uniforms: cloudsUniforms,
        transparent: true,
        depthWrite: false,
      });
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: EARTH_ATMO_VERTEX_GLSL,
        fragmentShader: EARTH_ATMO_FRAGMENT_GLSL,
        uniforms: { uSunDirection: { value: sunDirection.clone() } },
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      const group = new THREE.Group();
      let frameId = 0;
      let lastDraw = 0;
      let isVisible = false;

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      renderer.setSize(width, height);
      renderer.domElement.className = "contact-earth-canvas";
      container.appendChild(renderer.domElement);

      camera.position.set(0, 0, 3.35);
      group.position.set(width < 520 ? 0.42 : width < 760 ? 0.62 : 0.94, width < 760 ? 0.18 : 0.05, 0);
      group.rotation.set(0.05, -1.82, -0.08);
      group.add(planet, clouds, atmosphere);

      const starCount = 260;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i += 1) {
        const radius = 28 + Math.random() * 26;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.055,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        depthTest: false,
        depthWrite: false,
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      stars.renderOrder = -10;
      scene.add(stars);
      scene.add(group);

      const clock = new THREE.Clock();
      const render = (now: number) => {
        if (!isVisible) {
          frameId = 0;
          return;
        }

        if (now - lastDraw > 66) {
          const elapsed = clock.getElapsedTime();
          earthUniforms.uTime.value = elapsed;
          cloudsUniforms.uTime.value = elapsed;
          group.rotation.y += 0.0016;
          clouds.rotation.y += 0.0008;
          stars.rotation.y += 0.00015;
          renderer.render(scene, camera);
          lastDraw = now;
        }

        frameId = requestAnimationFrame(render);
      };

      const handleResize = () => {
        const nextWidth = Math.max(1, container.clientWidth);
        const nextHeight = Math.max(1, container.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        renderer.setSize(nextWidth, nextHeight);
        group.position.set(nextWidth < 520 ? 0.42 : nextWidth < 760 ? 0.62 : 0.94, nextWidth < 760 ? 0.18 : 0.05, 0);
        renderer.render(scene, camera);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !frameId) {
            frameId = requestAnimationFrame(render);
          }
          if (!isVisible) {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        },
        { rootMargin: "140px" },
      );
      const resizeObserver = new ResizeObserver(handleResize);

      handleResize();
      observer.observe(container);
      resizeObserver.observe(container);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        observer.disconnect();
        resizeObserver.disconnect();
        planetGeometry.dispose();
        cloudGeometry.dispose();
        atmosphereGeometry.dispose();
        planetMaterial.dispose();
        cloudMaterial.dispose();
        atmosphereMaterial.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        earthMapTexture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="contact-planet-layer" aria-hidden="true" />
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeroScrollCue, setShowHeroScrollCue] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const reduceMotion = useReducedMotion();
  const resumeFrameRef = useRef<HTMLIFrameElement>(null);
  const scrollFlagsRef = useRef({
    isScrolled: false,
    showHeroScrollCue: true,
    showBackToTop: false,
  });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let frameId = 0;

    const syncScrollState = () => {
      frameId = 0;
      const nextFlags = {
        isScrolled: window.scrollY > 36,
        showHeroScrollCue: window.scrollY <= 4,
        showBackToTop: window.scrollY > 500,
      };
      const currentFlags = scrollFlagsRef.current;

      if (currentFlags.isScrolled !== nextFlags.isScrolled) {
        setIsScrolled(nextFlags.isScrolled);
      }
      if (currentFlags.showHeroScrollCue !== nextFlags.showHeroScrollCue) {
        setShowHeroScrollCue(nextFlags.showHeroScrollCue);
      }
      if (currentFlags.showBackToTop !== nextFlags.showBackToTop) {
        setShowBackToTop(nextFlags.showBackToTop);
      }

      scrollFlagsRef.current = nextFlags;
    };
    const queueScrollState = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(syncScrollState);
      }
    };

    syncScrollState();
    window.addEventListener("scroll", queueScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", queueScrollState);
    };
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
        {/*  Hero — layered welcome                                      */}
        {/* ---------------------------------------------------------- */}

        <section id="hero" className="relative flex min-h-screen items-center pt-20">
          <HeroBlackHole />
          <WelcomeMoon />
          <div className="site-container hero-scroll-layer relative z-10 w-full pb-20 pt-16 md:pb-28 md:pt-20">
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
          </div>

          {/* Hero image — parallax at different speed */}
          <div
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
          </div>

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

          {/* Bottom subtle ambient fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--ink)]/30 to-transparent" />
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  About                                                      */}
        {/* ---------------------------------------------------------- */}

        <div className="section-divider section-divider-soft relative z-10 opacity-30" />

        <section id="about" className="section-space site-container relative z-10">
          <SectionHeading
            label="Artist Statement"
            title="Practical systems, shaped with visual care."
            animatedTitle
            description="Solutions that are both functional and visually engaging, with a focus on user experience, accessibility, and performance."
          />

          <MotionReveal amount={0.28}>
            <PortfolioBook />
          </MotionReveal>
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

        <section id="process" className="process-scroll-section section-space">
          <div className="site-container">
            <SectionHeading
              label="Process Work Approach"
              title="From rough direction to finished screen."
              description=""
            />
          </div>

          <ProcessScrollExperience />
        </section>

        <div className="journey-earth-stage">
          <ContactPlanet />

          {/* ---------------------------------------------------------- */}
          {/*  Experience — Framer timeline                                */}
          {/* ---------------------------------------------------------- */}

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
            <div className="site-container">
              <SectionHeading
                title="Let&apos;s work together."
                description=""
              />
              <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
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

                <MotionReveal direction="left">
                    <form
                      action="https://formspree.io/f/mzddyyoz"
                      method="POST"
                      className="contact-form"
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
                        Send message
                        <Send size={14} strokeWidth={1.5} />
                      </button>
                    </form>
                </MotionReveal>
              </div>
            </div>
          </section>

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
        </div>
      </main>

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
