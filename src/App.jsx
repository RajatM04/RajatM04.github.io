import React, {
  useRef,
  useState,
  useEffect
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion
} from "framer-motion";
import Lenis from 'lenis';
import { IconArrowDown } from "./components/icons";
import Preloader from "./components/Preloader";

const person = {
  name: "RAJAT MAHADULE",
  role: "Full-Stack SDE",
  location: "Nagpur, Maharashtra",
  experience: "SDE Intern @ Synergim LLC (USA)",
  education: "B.Tech @ GHRCEM, Nagpur (CGPA: 8.26)",
  summary: "National Top 6 Finalist at <em>Smart India Hackathon 2024</em>. Shipped production features on cart-bit.com for real users. Proficient in <em>React</em>, <em>React Native</em>, <em>Firebase</em>, and <em>Java</em>.",
  linkedinHref: "https://www.linkedin.com/in/rajat-mahadule-5b4650257/",
  githubHref: "https://github.com/RajatM04",
  instagramHref: "https://www.instagram.com/rajat.liftss/",
  emailHref: "mailto:rajatmahadule2004@gmail.com",
};

const projects = [
  {
    title: "Cart-Bit",
    italic: "Primary Company Project @ Synergim LLC",
    description: "Developed for Synergim LLC during my SDE Internship. I was specifically responsible for owning and shipping the entire Buyer-Side module—architecting the product discovery, cart state management, and the complete checkout flow for this live US-based multi-vendor marketplace.",
    tags: ["React.js", "Firebase", "Cloud Functions", "Firestore"],
    links: { live: "https://cart-bit.com" },
    media: { type: "image", src: "/images/clay-banks-u27Rrbs9Dwc-unsplash.jpg" },
  },
  {
    title: "RepoSense",
    italic: "AI Repository Analyzer",
    description: "Full-stack AI engine that analyzes GitHub repositories to automatically generate deep-dive READMEs, folder mappings, and contextual SDE interview questions.",
    tags: ["React", "Node.js", "AI/LLM", "Firebase"],
    links: { live: "https://reposense-ai.web.app/" },
    media: { type: "video", src: "/videos/reposense.mp4" },
  },
  {
    title: "Sentiment Engine",
    italic: "Mobile NLP App",
    description: "Built full-stack React Native app with Flask API backend for real-time NLP sentiment classification (Positive / Negative / Neutral) with Lottie animations.",
    tags: ["React Native", "Flask", "Python", "TextBlob"],
    links: { github: "https://github.com/RajatM04/SentimentApp" },
    media: { type: "video", src: "/videos/sentiment.mp4" },
  },
  {
    title: "InterviewReady",
    italic: "Practice App",
    description: "Developed mobile quiz app with Firebase Auth, persistent score tracking, and interactive question sets designed to simulate real SDE interview conditions.",
    tags: ["React Native", "Firebase", "Agile"],
    links: { github: "https://github.com/RajatM04/InterviewReady" },
    media: { type: "image", src: "/images/interviewready.png" },
  }
];

const hackathons = [
  {
    title: "Therapy Pro",
    italic: "Team Collaboration • National Top 6 @ SIH 2024",
    description: "Led the front-end architecture for this award-winning group project. Delivered high-fidelity session management systems and production-ready UI components judged by a national industry panel.",
    tags: ["React.js", "Figma", "Firebase"],
    links: { live: "https://therapypro-frontend.onrender.com" },
    media: { type: "image", src: "/images/TherapyPro.png" },
  },
  {
    title: "L&F",
    italic: "Smart Item Tracker",
    description: "Decentralized item tracking and verification platform built for high-density environments. Features instant identity validation and real-time claim status tracking.",
    tags: ["React Native", "Node.js", "Firebase", "QR Logic"],
    links: { live: "https://lost8found.web.app/" },
    media: { type: "video", src: "/videos/lostnfound.mp4" },
  },
  {
    title: "EventPulse",
    italic: "Event Managing System",
    description: "End-to-end event orchestration platform. Handles registration, real-time analytics, and automated attendee communication for internal campus-wide summits.",
    tags: ["React", "Express", "Node.js", "MongoDB"],
    links: {},
    media: { type: "image", src: "/images/cinematic.jpg" },
  }
];

function LocalTime({ city = "NAGPUR" }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return (
    <div className="text-[10px] uppercase tracking-[0.2em] font-mono flex items-center gap-4 text-white">
      <span className="font-bold">{city}</span>
      <span className="tabular-nums font-bold tracking-widest text-[11px]">
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  );
}

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const bgm = new Audio("/audio/bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.5;
    audioRef.current = bgm;

    const attemptPlay = () => {
      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    attemptPlay();

    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        attemptPlay();
      }
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      bgm.pause();
      bgm.src = "";
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="text-white opacity-60 hover:opacity-100 transition-all p-3 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
      title={isPlaying ? "Mute Music" : "Play Music"}
    >
      <div className="flex items-center gap-[2px] h-4 w-4 justify-center">
        {isPlaying ? (
          <>
            <motion.div animate={{ height: ["4px", "16px", "4px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: ["16px", "6px", "16px"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2, ease: "easeInOut" }} className="w-[2px] bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: ["6px", "14px", "6px"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4, ease: "easeInOut" }} className="w-[2px] bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: ["12px", "4px", "12px"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.6, ease: "easeInOut" }} className="w-[2px] bg-white rounded-full"></motion.div>
          </>
        ) : (
          <>
            <motion.div animate={{ height: "4px" }} className="w-[2px] bg-white rounded-full opacity-40"></motion.div>
            <motion.div animate={{ height: "4px" }} className="w-[2px] bg-white rounded-full opacity-40"></motion.div>
            <motion.div animate={{ height: "4px" }} className="w-[2px] bg-white rounded-full opacity-40"></motion.div>
            <motion.div animate={{ height: "4px" }} className="w-[2px] bg-white rounded-full opacity-40"></motion.div>
          </>
        )}
      </div>
    </button>
  );
}

function CustomCursor({ enabled }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const sx = useSpring(cursorX, {
    stiffness: 900,
    damping: 35,
    mass: 0.2,
  });

  const sy = useSpring(cursorY, {
    stiffness: 900,
    damping: 35,
    mass: 0.2,
  });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{ x: sx, y: sy }}
    />
  );
} function ProjectItem({ project, index, active, setActive, totalCount, prefix = "Project //", sectionId }) {
  const ref = useRef(null);
  const previewRef = useRef(null);
  const rowClass = sectionId === 'work' ? 'proj-row' : 'hack-row';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(index);
        }
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setActive]);

  // Desktop Mouse Follow Logic
  useEffect(() => {
    const row = ref.current;
    const preview = previewRef.current;
    if (!row || !preview) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      preview.style.setProperty('--mouse-x', `${e.clientX + 60}px`);
      preview.style.setProperty('--mouse-y', `${e.clientY - 180}px`);
    };

    row.addEventListener('mousemove', handleMouseMove);
    return () => row.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mediaSrc = project.media?.src || "";
  const mediaType = project.media?.type || "image";
  const linkHref = project.links?.live || project.links?.github || "";
  const tagsStr = project.tags.join(", ");
  const indexLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(totalCount).padStart(2, "0");

  return (
    <div
      ref={ref}
      className={`${rowClass} group transition-all duration-300`}
      data-takeover-item
      data-title={project.title}
      data-tags={tagsStr}
      data-media-src={mediaSrc}
      data-media-type={mediaType}
      data-link={linkHref}
      data-index={indexLabel}
      data-total={totalLabel}
    >
      {/* DESKTOP ROW LAYOUT */}
      <a
        href={linkHref}
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex items-center w-full py-8 border-b border-white/5 no-underline hover:bg-white/[0.02] relative"
      >
        <div className="row-index font-mono text-[18px] text-white/20 w-40 tracking-widest">{indexLabel}</div>
        <div className="row-title-wrap flex-1 flex flex-col justify-center">
          <h3 className="row-title text-[56px] font-medium text-white tracking-tight transition-all duration-300">
            {project.title}
          </h3>
          <div className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase mt-1 opacity-100 transition-opacity" dangerouslySetInnerHTML={{ __html: project.italic }} />
        </div>
        <div className="row-right flex items-center gap-16">
          <div className="row-tags font-mono text-[14px] text-white/20 uppercase tracking-[0.3em]">
            {project.tags.join(" • ")}
          </div>
          <span className="text-white/40 text-2xl">↗</span>
        </div>

        {/* Floating Preview */}
        <div ref={previewRef} className="floating-preview pointer-events-none">
          {mediaType === 'video' ? (
            <video 
              src={mediaSrc} 
              autoPlay 
              loop 
              muted 
              playsInline 
              onLoadedMetadata={(e) => e.target.playbackRate = 2.0}
              className="w-full h-full object-contain rounded-[10px] bg-black" 
            />
          ) : (
            <img src={mediaSrc} alt={project.title} className="w-full h-full object-contain rounded-[10px] bg-black" />
          )}
        </div>
      </a>

      {/* MOBILE LIST LAYOUT (Preserved) */}
      <div
        className={`md:hidden py-16 border-b border-white/5 cursor-pointer transition-all duration-300 ${active === index ? "opacity-100" : "opacity-40"}`}
        onMouseEnter={() => setActive(index)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">{prefix} 0{index + 1}</span>
            <motion.div animate={{ opacity: active === index ? 1 : 0, x: active === index ? 0 : -10 }} className="text-[10px] text-white">
              —
            </motion.div>
          </div>
          <span className="takeover-row-hint flex items-center gap-2 text-white/40 font-mono text-[11px] pointer-events-none select-none">
            <span className="text-[10px] opacity-60">{indexLabel}</span>
            <span className="text-xl leading-none">→</span>
          </span>
        </div>

        <h3 className={`text-4xl tracking-widest font-bold transition-all duration-300 uppercase ${active === index ? "translate-x-4 text-white" : "translate-x-0 text-white/30"}`}>
          {project.title}
        </h3>

        <div className={`mt-6 transition-all duration-300 ${active === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>
          <p className="max-w-[35ch] text-sm text-white/50 leading-relaxed font-light mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 text-[9px] uppercase tracking-widest text-white/30 font-mono">
            {project.tags.slice(0, 3).join(" • ")}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({ id, label, title, items, prefix, isScript = false }) {
  const [active, setActive] = useState(0);

  return (
    <section id={id} className="relative w-full bg-black overflow-visible border-y border-white/5 px-6 sm:px-12 lg:px-24 py-32">
      <div className="mb-20">
        <div className="text-[9px] font-mono tracking-[0.4em] text-white/100 mb-3 uppercase font-bold">{label}</div>
        <h2 className={
          isScript
            ? "font-geraldine text-7xl md:text-8xl capitalize tracking-normal font-normal text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            : "text-4xl md:text-5xl tracking-[0.3em] uppercase font-semibold text-white/50"
        }>{title}</h2>
      </div>

      <div className="flex flex-col relative">
        <div className="w-full border-t border-white/5 md:border-t-0">
          {items.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              index={index}
              active={active}
              setActive={setActive}
              totalCount={items.length}
              prefix={prefix}
              sectionId={id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = ["REACT", "FIREBASE", "NATIVE", "PYTHON", "CLOUD FUNCTIONS", "FIGMA"];
  const list = [...items, ...items];
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-black border-y border-white/5 relative flex group">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="flex w-fit transition-opacity duration-700">
        {[1, 2, 3].map((set) => (
          <motion.div
            key={set}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-20 px-10 whitespace-nowrap"
          >
            {list.map((item, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl font-black tracking-widest uppercase transition-colors duration-500 text-transparent group-hover:text-white"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section id="info" className="relative px-6 sm:px-12 lg:px-24 py-40 bg-black">
      <div className="grid lg:grid-cols-2 gap-32">
        <div>
          <div className="text-[10px] font-mono tracking-[0.5em] text-white/80 mb-8 uppercase">(The Artist)</div>
          <h2 className="yakTitle text-5xl leading-tight font-semibold mb-12">DESIGNING FOR<br />THE FUTURE.</h2>
          <p className="text-xl text-white/60 leading-relaxed font-light max-w-xl">
            National Top 6 Finalist at <em>Smart India Hackathon 2024</em>. Shipped production features for real users. Proficient in <em>React</em>, <em>React Native</em>, and <em>Cloud Infrastructure</em>.
          </p>
          <div className="mt-16 grid grid-cols-2 gap-12">
            <div>
              <div className="text-[10px] text-white/40 mb-2 uppercase font-mono tracking-widest">Education</div>
              <div className="text-white/80">{person.education}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 mb-2 uppercase font-mono tracking-widest">Experience</div>
              <div className="text-white/80">SDE Intern @ Synergim LLC</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 mb-2 uppercase font-mono tracking-widest">Beyond Code</div>
              <div className="text-white/80">Content Creator @ <a href={person.instagramHref} target="_blank" rel="noreferrer" className="underline hover:text-[#D4AF37] transition-colors">rajat.liftss</a></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 justify-center">
          <div className="flex flex-wrap gap-4">
            {["Java", "React.js", "Firebase", "Node.js", "Express", "Figma", "Redux"].map(skill => (
              <span key={skill} className="px-6 py-3 border border-white/5 bg-white/[0.02] rounded-full text-xs tracking-widest text-white/60 uppercase">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const lenisRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = person.emailHref.replace("mailto:", "");
    navigator.clipboard.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollTo = (id) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id, {
        offset: 0,
        lerp: 0.1,
        duration: 1.5
      });
    }
  };

  useEffect(() => {
    if (reduceMotion || isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion, isLoading]);

  // ── Mobile full-screen takeover (scoped to #work and #hackathons only) ──
  useEffect(() => {
    const SECTIONS = ['work', 'hackathons'];
    const TAKEOVER_CLASS = { work: 'proj-takeover', hackathons: 'hack-takeover' };

    let activeTakeover = null;

    function buildTakeover(sectionId, data) {
      const cls = TAKEOVER_CLASS[sectionId] || 'proj-takeover';
      const overlay = document.createElement('div');
      overlay.className = cls;
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      const isVideo = data.mediaType === 'video';

      overlay.innerHTML = `
        <div class="takeover-backdrop" aria-hidden="true"></div>
        <div class="takeover-panel">
          <div class="takeover-topbar">
            <span class="takeover-index">${data.index} / ${data.total}</span>
            <button class="takeover-close" aria-label="Close">&times;</button>
          </div>
          <div class="takeover-body">
            <h2 class="takeover-title">${data.title}</h2>
            <div class="takeover-tags">${data.tags}</div>
            <div class="takeover-media-wrap">
              ${isVideo
          ? `<video src="${data.mediaSrc}" class="takeover-media" autoplay loop muted playsinline></video>`
          : `<img src="${data.mediaSrc}" class="takeover-media" alt="${data.title} preview" />`
        }
            </div>
            ${data.link
          ? `<a href="${data.link}" target="_blank" rel="noreferrer" class="takeover-link">VIEW PROJECT →</a>`
          : ''
        }
          </div>
        </div>
      `;

      return overlay;
    }

    function openTakeover(sectionId, data) {
      if (activeTakeover) closeTakeover(activeTakeover, true);

      const overlay = buildTakeover(sectionId, data);
      document.body.appendChild(overlay);
      activeTakeover = overlay;

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        overlay.classList.add('takeover-visible');
        const vid = overlay.querySelector('video');
        if (vid) vid.playbackRate = 2.0;
      });

      // Close handlers
      const closeBtn = overlay.querySelector('.takeover-close');
      const backdrop = overlay.querySelector('.takeover-backdrop');

      closeBtn.addEventListener('click', () => closeTakeover(overlay));
      backdrop.addEventListener('click', () => closeTakeover(overlay));
    }

    function closeTakeover(overlay, immediate = false) {
      if (!overlay || !overlay.parentNode) return;
      overlay.classList.remove('takeover-visible');
      overlay.classList.add('takeover-exiting');

      const done = () => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (activeTakeover === overlay) activeTakeover = null;
        document.body.style.overflow = '';
      };

      if (immediate) {
        done();
      } else {
        overlay.addEventListener('transitionend', done, { once: true });
        // Fallback
        setTimeout(done, 400);
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape' && activeTakeover) closeTakeover(activeTakeover);
    }

    document.addEventListener('keydown', handleEscape);

    // Delegate click on [data-takeover-item] within the target sections
    function handleItemClick(e) {
      // Only active on mobile
      if (window.innerWidth >= 768) return;

      const item = e.target.closest('[data-takeover-item]');
      if (!item) return;

      // Make sure it's inside one of our sections
      const section = SECTIONS.find(id => {
        const sec = document.getElementById(id);
        return sec && sec.contains(item);
      });
      if (!section) return;

      e.preventDefault();

      openTakeover(section, {
        title: item.dataset.title || '',
        tags: item.dataset.tags || '',
        mediaSrc: item.dataset.mediaSrc || '',
        mediaType: item.dataset.mediaType || 'image',
        link: item.dataset.link || '',
        index: item.dataset.index || '01',
        total: item.dataset.total || '01',
      });
    }

    document.addEventListener('click', handleItemClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleItemClick);
      if (activeTakeover) closeTakeover(activeTakeover, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      <CustomCursor enabled={!reduceMotion} />
      <div className="noise" />

      {/* Background Typography Watermark */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] opacity-[0.03] select-none">
        <div className="absolute top-[10%] -left-[5%] text-[40vw] font-instrument italic leading-none whitespace-nowrap">
          Creative
        </div>
        <div className="absolute bottom-[10%] -right-[5%] text-[30vw] font-instrument italic leading-none whitespace-nowrap">
          Developer
        </div>
      </div>

      <header className="fixed inset-x-0 top-0 z-[100] nav-blur backdrop-blur-xl transition-all duration-300">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="flex items-center justify-between h-[var(--nav-height,64px)]">
            <a href="#top" className="text-[11px] font-bold tracking-[0.3em] hover:opacity-50 transition-opacity">RAJAT.</a>

            <nav className="hidden md:flex items-center gap-10">
              <button onClick={() => scrollTo("#work")} className="nav-link">WORK</button>
              <button onClick={() => scrollTo("#hackathons")} className="nav-link border-none bg-transparent">HACKATHONS</button>
              <button onClick={() => scrollTo("#contact")} className="nav-link border-none bg-transparent">CONTACT</button>
            </nav>

            <div className="flex items-center gap-6 sm:gap-8">
              <div className="hidden sm:block">
                <LocalTime city="NAGPUR" />
              </div>
              <AudioPlayer />

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 z-[1001]"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                  className="w-6 h-[1px] bg-white"
                />
                <motion.div
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-6 h-[1px] bg-white"
                />
                <motion.div
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                  className="w-6 h-[1px] bg-white"
                />
              </button>
            </div>
          </div>
        </div>

      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[2000] bg-[#000000] flex flex-col justify-start pt-32 px-12 gap-6"
          >
            {/* Dedicated Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-white hover:opacity-50 transition-opacity"
            >
              <span className="text-2xl font-mono">✕</span>
            </button>

            <button onClick={() => { scrollTo("#work"); setIsMenuOpen(false); }} className="text-2xl font-bold tracking-tighter uppercase text-left">WORK</button>
            <button onClick={() => { scrollTo("#hackathons"); setIsMenuOpen(false); }} className="text-2xl font-bold tracking-tighter uppercase text-left">HACKATHONS</button>
            <button onClick={() => { scrollTo("#info"); setIsMenuOpen(false); }} className="text-2xl font-bold tracking-tighter uppercase text-left text-white/40 italic font-instrument">INFO</button>
            <button onClick={() => { scrollTo("#contact"); setIsMenuOpen(false); }} className="text-2xl font-bold tracking-tighter uppercase text-left">CONTACT</button>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
              <LocalTime city="NAGPUR" />
              <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">rajatmahadule2004@gmail.com</div>
              <div className="mt-4 text-[8px] font-mono tracking-[0.4em] text-white/20 uppercase">
                ©{new Date().getFullYear()} {person.name} // ALL RIGHTS RESERVED.
              </div>
            </div>
          </motion.div>

        )}
      </AnimatePresence>


      <main className="relative overflow-visible">

        {/* HERO */}
        <section id="top" ref={heroRef} className="relative min-h-[110vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-40 overflow-visible">
          <div className="absolute inset-0 z-0 overflow-hidden blend-mask-bottom">
            <div
              className="absolute inset-0 w-full h-[120%] bg-cover bg-no-repeat bg-[#0b0b0d] transform-gpu will-change-transform"
              style={{
                backgroundImage: 'url("/images/hero.jpg")',
                backgroundPosition: 'center 30%'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            <div className="noise-local" />
          </div>

          <AnimatePresence>
            {!isLoading && (
              <motion.div 
                key="hero-content"
                style={{ opacity: heroFade }} 
                className="relative z-10 w-full pt-16 sm:pt-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="text-[8px] sm:text-[10px] font-mono tracking-[0.4em] sm:tracking-[0.6em] text-white/60 mb-8 sm:mb-10 uppercase animate-pulse">
                   // CREATIVE ENGINEERING / SDE 01
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 md:gap-y-3 mb-24 max-w-4xl">
                  {[
                    "A", "DEVELOPER", "WHO", "BUILDS,", "<em>Creates,</em>", "AND", "<em>Designs</em>", "PRODUCTS", "THAT", "MOVE", "FORWARD."
                  ].map((word, i) => {
                    const isItalic = word.startsWith("<em>");
                    const cleanWord = word.replace(/<\/?em>/g, "");
                    const isGold = ["Creates,", "Designs"].includes(cleanWord);
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.8,
                          ease: [0.215, 0.61, 0.355, 1],
                          delay: 1.0 + i * 0.08
                        }}
                        className={`yakTitle tracking-[0.02em] font-bold drop-shadow-lg ${isItalic ? 'italic' : ''}`}
                        style={isGold ? { color: '#d43737' } : {}}
                        dangerouslySetInnerHTML={{ __html: word }}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-end pr-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="flex gap-12 text-[10px] font-bold tracking-[0.4em] text-white/100"
                  >
                    <a href="#work" className="hover:text-white transition-colors flex items-center gap-1">
                      THE PROJECT SHOWCASE <IconArrowDown className="w-3 h-3" />
                    </a>
                    <a href={person.linkedinHref} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <TechMarquee />
        <ProjectSection id="work" label="(Professional Work)" title="Works ." items={projects} prefix="Project //" />
        <ProjectSection
          id="hackathons"
          label="(Team Collaboration)"
          title={<><span className="tracking-tighter text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase">HACKATHONS,</span><br /><span className="font-instrument italic text-[#D4AF37] normal-case text-5xl md:text-8xl lg:text-[7rem] font-normal tracking-normal block md:ml-0 -mt-2 md:-mt-6">done.</span></>}
          items={hackathons}
          prefix="Hackathon //"
        />
        <InfoSection />

        {/* CONTACT SECTION - UNIFIED WITH HERO AESTHETIC */}
        <section id="contact" className="relative px-6 sm:px-12 lg:px-24 pt-56 pb-20 bg-black border-t border-white/5 overflow-hidden flex flex-col items-center text-center">

          <div
            className="absolute inset-x-0 top-0 w-full h-[120%] bg-cover bg-center bg-no-repeat opacity-[0.35] transform-gpu will-change-transform blend-mask-top"
            style={{ backgroundImage: 'url("/images/hero.jpg")', backgroundPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent " />
          <div className="noise-local" />

          <div className="relative z-10 w-full max-w-5xl">
            <div className="text-[10px] font-mono tracking-[0.8em] text-white/40 mb-12 uppercase italic">(Inquiry)</div>

            <h2 className="text-white mb-8">
              <span className="font-bold text-7xl md:text-[8rem] xl:text-[10rem] block leading-[0.75] tracking-tighter uppercase hero-big">TALK TO<br />ME .</span>
            </h2>

            <button onClick={handleCopyEmail} className="text-xl md:text-3xl font-instrument italic text-white/80 hover:text-white transition-colors block mb-24 underline underline-offset-8 decoration-white/10 decoration-1">
              {person.emailHref.replace("mailto:", "")}
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between w-full pt-16 border-t border-white/5 gap-12 text-[10px] font-mono tracking-[0.4em] text-white">
              <div className="flex gap-12">
                <a href={person.githubHref} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GITHUB</a>
                <a href={person.linkedinHref} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
              </div>
              <div className="uppercase">BASED IN {person.location}</div>
            </div>

            <div className="mt-12 text-[9px] font-mono tracking-[0.5em] text-white/40 uppercase">
              ©{new Date().getFullYear()} {person.name} // ALL RIGHTS RESERVED.
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000] px-8 py-3 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase shadow-2xl"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
