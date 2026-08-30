"use client";

import Image from "next/image";
import Script from "next/script";
import { FormEvent, HTMLAttributes, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUp,
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

type RellaxConstructor = new (
  selector: string,
  options?: {
    center?: boolean;
    round?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
  },
) => { destroy: () => void; refresh?: () => void };

const navItems = [
  ["about", "About"],
  ["projects", "Projects"],
  ["process", "Process"],
  ["experience", "Experience"],
  ["contact", "Contact"],
] as const;

const projects: Project[] = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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
    number: "08",
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
      "I start by gathering references, requirements, sketches, screenshots, and constraints so the work has a clear direction before design choices get polished.",
    icon: Layers3,
  },
  {
    title: "Shape",
    description:
      "I turn ideas into wireframes, interface states, gameplay tests, or rough layouts, then compare what feels useful, readable, and visually balanced.",
    icon: Palette,
  },
  {
    title: "Refine",
    description:
      "I build the final version, test the details, adjust spacing and interaction, and prepare the piece with a short caption and clean presentation.",
    icon: Sparkles,
  },
];

const milestones = [
  {
    year: "2026 — 2027",
    title: "Specialization in Digital Arts",
    description:
      "PHINMA Cagayan de Oro College — Now a fourth-year student specializing in Digital Arts, strengthening visual design, creative direction, and multimedia skills alongside a system development foundation.",
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({
  label,
  title,
  description,
  speed = 0.03,
}: {
  label?: string;
  title: string;
  description: string;
  speed?: number;
}) {
  return (
    <Parallax speed={speed}>
      <div className="mb-16 max-w-3xl reveal" data-aos="fade-up" data-aos-duration="700">
        {label && <span className="eyebrow mb-5">{label}</span>}
        <h2 className="text-balance text-4xl font-extralight tracking-[-0.06em] text-white sm:text-5xl md:text-7xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-[15px] font-light leading-8 text-white/40">
          {description}
        </p>
      </div>
    </Parallax>
  );
}

function Parallax({
  children,
  speed = 0.04,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const rellaxSpeed = Math.max(-2.4, Math.min(2.4, speed * 100));

  return (
    <div
      className={`rellax parallax-soft ${className}`}
      data-rellax-percentage="0.5"
      data-rellax-speed={rellaxSpeed.toFixed(1)}
      {...props}
    >
      {children}
    </div>
  );
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
  return (
    <div className="timeline relative mx-auto max-w-5xl">
      <div className="timeline-line absolute bottom-5 left-3 top-5 w-px md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-12 md:space-y-0">
        {milestones.map((milestone, index) => (
          <Parallax speed={index % 2 === 0 ? 0.02 : 0.032} key={milestone.year}>
            <article
              className={`relative flex pl-10 md:min-h-[190px] md:pl-0 ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-duration="750"
              data-aos-offset="60"
            >
              <div className="timeline-dot absolute left-[3px] top-2 h-2 w-2 rounded-full bg-white md:left-1/2 md:top-2 md:-translate-x-1/2" />
              <div className="w-full py-1 md:w-[44%]">
                <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {milestone.year}
                </span>
                <h3 className="mt-2 text-xl font-light tracking-[-0.03em] text-white">
                  {milestone.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/45">
                  {milestone.description}
                </p>
              </div>
            </article>
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
      const elapsed = reduceMotion ? 0 : (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.28;
      const centerY = height * 0.43;
      const galaxyRadius = Math.min(width, height) * 0.52;

      const coreGlow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius * 0.78);
      coreGlow.addColorStop(0, "rgba(255,255,255,0.20)");
      coreGlow.addColorStop(0.18, "rgba(160,170,190,0.11)");
      coreGlow.addColorStop(0.5, "rgba(90,105,135,0.045)");
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = coreGlow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.18 + elapsed * 0.01);
      context.scale(1.55, 0.54);

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

      if (!reduceMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw(start);

    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      frameId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      start = 0;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-galaxy" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Main Shell                                                         */
/* ------------------------------------------------------------------ */

export default function PortfolioShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const resumeFrameRef = useRef<HTMLIFrameElement>(null);

  // Scroll tracking
  useEffect(() => {
    let frameId: number | null = null;

    const updateChrome = () => {
      frameId = null;
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

      progressRef.current?.style.setProperty("--scroll-progress", `${progress}`);
      navRef.current?.classList.toggle("is-scrolled", scrollTop > 36);
      backToTopRef.current?.classList.toggle("is-visible", scrollTop > 500);
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(updateChrome);
    };

    updateChrome();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
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
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          (window as Window & { AOS?: { init: (options: Record<string, unknown>) => void } }).AOS?.init({
            duration: 650,
            easing: "ease-out-cubic",
            once: true,
            mirror: false,
            offset: 80,
            throttleDelay: 120,
            debounceDelay: 80,
            disableMutationObserver: true,
            disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
        }}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/rellax/1.12.1/rellax.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          const typedWindow = window as Window & {
            Rellax?: RellaxConstructor;
            __portfolioRellax?: { destroy: () => void; refresh?: () => void };
          };

          if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            window.matchMedia("(max-width: 767px)").matches
          ) {
            return;
          }

          typedWindow.__portfolioRellax?.destroy();
          typedWindow.__portfolioRellax = typedWindow.Rellax
            ? new typedWindow.Rellax(".rellax", {
                center: true,
                round: true,
                vertical: true,
                horizontal: false,
              })
            : undefined;

          window.setTimeout(() => typedWindow.__portfolioRellax?.refresh?.(), 400);
        }}
      />

      {/* Background layers */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="page-orbs" aria-hidden="true">
        <span className="page-orb page-orb--1" />
        <span className="page-orb page-orb--2" />
        <span className="page-orb page-orb--3" />
        <span className="page-orb page-orb--4" />
      </div>

      {/* Scroll progress */}
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      {/* ============================================================ */}
      {/*  Navigation                                                   */}
      {/* ============================================================ */}

      <header ref={navRef} className="site-nav">
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
              className="resume-link ml-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]"
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
                className="mt-2 flex w-fit items-center gap-2 border border-white bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black"
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
          <div
            className="site-container hero-scroll-layer rellax parallax-soft relative z-10 w-full pb-20 pt-16 md:pb-28 md:pt-20"
            data-rellax-percentage="0.5"
            data-rellax-speed="-1.2"
          >
            <div className="max-w-5xl">
              <p
                className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30 hero-line hero-line--1"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <span className="h-px w-8 bg-white/20" />
                 Kibawe Bukidnon
              </p>
              <h1 className="hero-title">
                <span className="hero-line hero-line--2" data-aos="fade-up" data-aos-delay="120">
                  Zup! I&apos;m <span className="outline-name">Shaun</span>
                </span>
                <br />
                <span className="hero-line hero-line--3 text-white" data-aos="fade-up" data-aos-delay="190">
                  a Creative
                </span>
                <br />
                <span className="hero-line hero-line--4 text-white/25" data-aos="fade-up" data-aos-delay="260">
                  Developer
                </span>
              </h1>
              <div
                className="mt-14 reveal reveal-stagger-5"
                data-aos="fade-up"
                data-aos-delay="340"
              >
                <p className="max-w-md text-sm font-light leading-7 text-white/35">
                  Curating interfaces, systems, and game experiments that combine practical function with visual direction.
                </p>
              </div>
            </div>
          </div>

          {/* Hero image — parallax at different speed */}
          <div
            className="hero-image-layer rellax parallax-soft pointer-events-none absolute right-[-4rem] top-[4%] hidden h-[50rem] w-[40rem] lg:block 2xl:right-0 2xl:h-[58rem] 2xl:w-[48rem]"
            data-rellax-percentage="0.45"
            data-rellax-speed="-2"
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
            title="Practical systems, shaped with visual care."
            description="I create digital work that sits between system development and visual design: interfaces, web applications, game experiments, and creative tools that are useful first, then refined through mood, spacing, motion, and clear presentation."
          />

          <div className="grid gap-10 md:grid-cols-3">
            <Parallax speed={0.018}>
              <article
                className="py-2 reveal"
                data-aos="fade-up"
                data-aos-delay="0"
                data-aos-duration="650"
              >
                <div className="mb-8 text-white/45">
                  <Code2 size={28} strokeWidth={1} />
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Build</p>
                <h3 className="text-xl font-light tracking-[-0.03em] text-white">Full Stack Development</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/45">
                  I build complete web systems while paying attention to layout, readability, interaction flow, and the small details that make a screen easier to trust.
                </p>
              </article>
            </Parallax>

            <Parallax speed={0.028}>
              <article
                className="py-2 reveal"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="650"
              >
                <div className="mb-8 text-white/45">
                  <Zap size={28} strokeWidth={1} />
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Learn</p>
                <h3 className="text-xl font-light tracking-[-0.03em] text-white">Technical Skills</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/45">
                  My work moves across web development, database design, game development, image tools, and digital arts, giving the portfolio a range of technical and visual studies.
                </p>
              </article>
            </Parallax>

            <Parallax speed={0.022}>
              <article
                className="py-2 reveal"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="650"
              >
                <div className="mb-8 text-white/45">
                  <Users size={28} strokeWidth={1} />
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Collaborate</p>
                <h3 className="text-xl font-light tracking-[-0.03em] text-white">Team Collaboration</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/45">
                  I document ideas through screenshots, prototypes, and concise project notes so the final work shows both the result and the thinking behind it.
                </p>
              </article>
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
            title="A curated set of eight works."
            description="Eight selected pieces showing range across web systems, interface design, image tools, game development, capstone work, and process studies."
          />

          <div className="project-showcase">
            {projects.map((project, idx) => (
              <article
                className={`project-display reveal-stagger-${idx + 1} ${
                  idx % 2 === 0 ? "lg:grid-cols-[1.12fr_0.88fr]" : "lg:grid-cols-[0.88fr_1.12fr]"
                }`}
                key={project.number}
              >
                <div
                  className={`project-media ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
                  data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={idx * 40}
                  data-aos-duration="850"
                  data-aos-easing="ease-out-cubic"
                  data-aos-offset="120"
                >
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
                <div
                  className={`project-info ${idx % 2 === 0 ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}
                  data-aos={idx % 2 === 0 ? "fade-left" : "fade-right"}
                  data-aos-delay={idx * 40 + 80}
                  data-aos-duration="850"
                  data-aos-easing="ease-out-cubic"
                  data-aos-offset="120"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
                      {project.number}
                    </span>
                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">{project.meta}</p>
                    <h3 className="mt-3 text-2xl font-light leading-tight tracking-[-0.04em] text-white md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm font-light leading-7 text-white/45 md:text-[15px] md:leading-8">{project.description}</p>
                    <dl className="creative-caption mt-6 grid gap-3 text-sm text-white/40 sm:grid-cols-3">
                      <div>
                        <dt>Concept</dt>
                        <dd>{project.concept}</dd>
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
                  </div>
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
            label="Process Work"
            title="From rough direction to finished screen."
            description="Each selected work is presented as more than a screenshot: the idea, tools, and time spent are included so the portfolio shows creative decisions as well as final output."
          />

          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Parallax speed={0.016 + index * 0.006} key={step.title}>
                  <article
                    className="process-panel reveal h-full p-6 md:p-7"
                    data-aos="fade-up"
                    data-aos-delay={index * 90}
                    data-aos-duration="700"
                  >
                    <div className="mb-8 flex h-10 w-10 items-center justify-center border border-white/[0.08] text-white/45">
                      <Icon size={18} strokeWidth={1.25} />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl font-light tracking-[-0.04em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-7 text-white/40">
                      {step.description}
                    </p>
                  </article>
                </Parallax>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Experience — Draw-on-scroll timeline                       */}
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

        <section id="contact" className="section-space site-container">
          <SectionHeading
            title="Let&apos;s work together."
            description=""
          />
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <Parallax speed={0.024} className="reveal">
              <p className="max-w-sm text-sm font-light leading-7 text-white/35">
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
            </Parallax>

            <Parallax speed={0.016}>
              <form
                action="https://formspree.io/f/mzddyyoz"
                method="POST"
                className="surface-panel p-6 md:p-9 reveal"
                data-aos="fade-left"
                data-aos-duration="700"
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
                  className="mt-7 flex w-full items-center justify-center gap-3 border border-white bg-white px-5 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-transparent hover:text-white"
                  type="submit"
                >
                  {formSent ? "Opening secure form…" : "Send message"}
                  <Send size={14} strokeWidth={1.5} />
                </button>
              </form>
            </Parallax>
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
              <p className="text-2xl font-extralight tracking-[-0.06em] text-white">
                Shn<span className="text-white/25">.</span>
              </p>
              <p className="mt-3 max-w-xs text-sm font-light leading-7 text-white/30">
                Full Stack Developer specializing in System Development and Modern Web Solutions
              </p>
              <div className="mt-5 flex gap-2">
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="mailto:belonoacshaun1@gmail.com" aria-label="Email"><Mail size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://github.com" aria-label="GitHub"><Github size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={14} /></a>
                <a className="flex h-8 w-8 items-center justify-center border border-white/[0.06] text-white/40 transition-colors hover:border-white/30 hover:text-white" href="https://instagram.com" aria-label="Instagram"><Instagram size={14} /></a>
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

      <button
        ref={backToTopRef}
        type="button"
        className="back-to-top fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center border border-white/10 bg-black/70 text-white/70 transition-colors hover:border-white/40 hover:bg-white hover:text-black"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={16} strokeWidth={1.5} />
      </button>

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
          <div className="resume-preview surface-panel flex w-full flex-col overflow-hidden">
            <div className="resume-preview-header flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 sm:px-5 sm:py-4 md:px-6">
              <div className="min-w-0">
                <span className="eyebrow mb-1">Preview</span>
                <h2 id="resume-title" className="text-xl font-extralight tracking-[-0.04em] text-white">
                  Resume
                </h2>
              </div>
              <div className="resume-preview-actions flex shrink-0 items-center gap-2">
                <button
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-white/55 transition-colors hover:border-white/30 hover:text-white"
                  type="button"
                  onClick={handleResumePrint}
                  aria-label="Print resume"
                  title="Print resume"
                >
                  <Printer size={16} strokeWidth={1.5} />
                </button>
                <a
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-white/55 transition-colors hover:border-white/30 hover:text-white"
                  href={resumePath}
                  download="Shaun_Belono-ac_Resume.pdf"
                  aria-label="Download resume"
                  title="Download resume"
                >
                  <Download size={16} strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-white/55 transition-colors hover:border-white/30 hover:text-white"
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
