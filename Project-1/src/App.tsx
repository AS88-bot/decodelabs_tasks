import { useEffect, useRef, useState } from 'react';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Code2,
  Brain,
  Cloud,
  Database,
  Award,
  Briefcase,
  User,
  Home,
  FolderGit2,
  Filter,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectCategory = 'All' | 'Machine Learning' | 'AI' | 'Cloud' | 'Software Dev' | 'Data Science';

interface Project {
  name: string;
  description: string;
  tech: string[];
  category: ProjectCategory[];
  github: string;
  featured?: boolean;
}

interface Experience {
  title: string;
  org: string;
  description: string;
  icon: React.ReactNode;
}

interface Cert {
  title: string;
  issuer: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const technicalSkills = [
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'Machine Learning', icon: '🤖' },
  { name: 'Artificial Intelligence', icon: '🧠' },
  { name: 'Cloud Computing', icon: '☁️' },
  { name: 'AWS', icon: '⚡' },
  { name: 'Azure', icon: '🔷' },
  { name: 'HTML/CSS', icon: '🎨' },
  { name: 'JavaScript', icon: '✨' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Git & GitHub', icon: '🔀' },
  { name: 'Data Analysis', icon: '📊' },
];

const softSkills = ['Problem Solving', 'Leadership', 'Innovation', 'Team Collaboration', 'Communication'];

const experiences: Experience[] = [
  {
    title: 'Software Development Intern',
    org: 'Cognifyz Technologies',
    description:
      'Built and contributed to real-world software projects, honing full-stack development skills. Collaborated with cross-functional teams on production-ready applications and participated in agile development workflows.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    title: 'AI Intern',
    org: 'Microsoft via Edunet Foundation',
    description:
      'Gained hands-on experience with Microsoft AI tools and services. Worked on AI-powered solutions, explored Azure Cognitive Services, and deepened understanding of responsible AI development practices.',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: 'Cloud Computing AWS Intern',
    org: 'BITS Hyderabad',
    description:
      'Explored core AWS services including EC2, S3, Lambda, and IAM. Gained practical exposure to cloud architecture design, deployment strategies, and scalable infrastructure management on Amazon Web Services.',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    title: 'Machine Learning Intern',
    org: 'SkillCraft Technologies',
    description:
      'Implemented supervised and unsupervised ML models including linear regression, KMeans clustering, and CNNs. Applied Python and Scikit-learn to solve real-world prediction and classification challenges.',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: 'Innovation & Entrepreneurship Intern',
    org: 'St. Louis University via Excelerate',
    description:
      'Engaged in a structured innovation and entrepreneurship program, developing skills in design thinking, startup ideation, and business strategy. Collaborated with global peers on cross-cultural innovation challenges.',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: 'McKinsey Forward Program Graduate',
    org: 'McKinsey & Company',
    description:
      'Completed the McKinsey Forward Program — a prestigious leadership development initiative. Built skills in structured problem-solving, communication, and strategic thinking as applied by top management consultants.',
    icon: <Award className="w-5 h-5" />,
  },
];

const projects: Project[] = [
  {
    name: 'Cardiovascular Disease Prediction',
    description:
      'Comparative analysis of machine learning models for cardiovascular disease prediction using supervised learning techniques. Evaluated multiple algorithms with Scikit-learn to identify the highest-accuracy model for early healthcare diagnosis.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    category: ['Machine Learning', 'Data Science'],
    github: 'https://github.com/AS88-bot/cardiovascular-disease-prediction',
    featured: true,
  },
  {
    name: 'Aether AI Orchestrator',
    description:
      'A solo-built multi-agent AI system that orchestrates tasks, events, and notes using Google AI Studio and Firebase. Delivers intelligent daily planning and automated workflow execution.',
    tech: ['Python', 'Google AI Studio', 'Firebase', 'Multi-Agent Systems'],
    category: ['AI'],
    github: 'https://github.com/AS88-bot/Aether-AI-Orchestrator',
  },
  {
    name: 'TimeSeries Stock Market Analysis',
    description:
      'Comprehensive stock price analysis and forecasting using ARIMA, SARIMA, Prophet, and LSTM models. Includes data visualization, model comparison, and modular code architecture.',
    tech: ['Python', 'ARIMA', 'LSTM', 'Prophet', 'Matplotlib'],
    category: ['Machine Learning', 'Data Science'],
    github: 'https://github.com/AS88-bot/TimeSeries-StockMarket',
  },
  {
    name: 'MNIST Digit Recognizer',
    description:
      'A CNN-based handwritten digit recognizer trained on the MNIST dataset. Demonstrates deep learning fundamentals with convolutional neural network architecture.',
    tech: ['Python', 'TensorFlow', 'CNN', 'Keras'],
    category: ['Machine Learning', 'AI'],
    github: 'https://github.com/AS88-bot/MNIST-Digit-Recognizer-Aisha',
  },
  {
    name: 'EchoPath',
    description:
      'Emotionally intelligent AI career coach built with Amazon Q Developer. Provides personalized career guidance with context-aware empathetic responses.',
    tech: ['Amazon Q Developer', 'AI', 'Cloud'],
    category: ['AI', 'Cloud'],
    github: 'https://github.com/AS88-bot/EchoPath',
  },
  {
    name: 'NeuroStadium',
    description:
      'AI-powered cognitive infrastructure eliminating waiting in stadiums using real-time crowd intelligence and predictive orchestration for smart venue management.',
    tech: ['AI', 'Real-time Analytics', 'Predictive Systems'],
    category: ['AI'],
    github: 'https://github.com/AS88-bot/NeuroStadium',
  },
  {
    name: 'ibelieveyou',
    description:
      "AI-powered women's health platform addressing medical misdiagnosis. Features smart symptom tracking and a verified doctor network to accelerate accurate care.",
    tech: ['AI', 'Healthcare Tech', 'Web Development'],
    category: ['AI', 'Software Dev'],
    github: 'https://github.com/AS88-bot/ibelieveyou',
  },
  {
    name: 'AuraNest',
    description:
      'Compassionate web application supporting individuals facing dementia alongside their caregivers. Integrates a daily planner, voice assistant, and AI for enriched care experiences.',
    tech: ['AI', 'Voice Assistant', 'JavaScript'],
    category: ['AI', 'Software Dev'],
    github: 'https://github.com/AS88-bot/AuraNest',
  },
  {
    name: 'SkillCraft ML Projects',
    description:
      'Series of ML projects from SkillCraft Technologies internship: house price prediction using Linear Regression, customer segmentation via KMeans clustering, and more.',
    tech: ['Python', 'Scikit-learn', 'KMeans', 'Linear Regression'],
    category: ['Machine Learning', 'Data Science'],
    github: 'https://github.com/AS88-bot/SCT_ML_1',
  },
  {
    name: 'Learnova',
    description:
      'AI-powered learning assistant built with Next.js and Firebase. Offers topic explanations, note summarization, and flashcard generation for smarter studying.',
    tech: ['Next.js', 'Firebase', 'AI', 'JavaScript'],
    category: ['AI', 'Software Dev'],
    github: 'https://github.com/AS88-bot/Learnova',
  },
  {
    name: 'ExpenseTracker',
    description:
      'Financial management application built in Java that helps users log, categorize, and analyze personal expenses with a clean interface.',
    tech: ['Java', 'OOP'],
    category: ['Software Dev'],
    github: 'https://github.com/AS88-bot/ExpenseTracker',
  },
  {
    name: 'EmPathRx',
    description:
      'Emotionally intelligent disease tracking agent with condition-specific logic, vitals logging, and escalation support built for inclusive, SDG-aligned healthcare.',
    tech: ['AI', 'Healthcare Tech', 'Python'],
    category: ['AI', 'Software Dev'],
    github: 'https://github.com/AS88-bot/EmPathRx',
  },
];

const certifications: Cert[] = [
  {
    title: 'AI Internship Certificate',
    issuer: 'Microsoft via Edunet Foundation',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: 'AWS Cloud Computing Internship',
    issuer: 'BITS Hyderabad',
    icon: <Cloud className="w-6 h-6" />,
  },
  {
    title: 'Machine Learning Internship',
    issuer: 'SkillCraft Technologies',
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: 'Software Development Internship',
    issuer: 'Cognifyz Technologies',
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    title: 'Innovation & Entrepreneurship Internship',
    issuer: 'St. Louis University via Excelerate',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    icon: <Award className="w-6 h-6" />,
  },
];

const navLinks = [
  { label: 'Home', href: '#hero', icon: <Home className="w-4 h-4" /> },
  { label: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
  { label: 'Skills', href: '#skills', icon: <Code2 className="w-4 h-4" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { label: 'Certifications', href: '#certifications', icon: <Award className="w-4 h-4" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
];

const projectCategories: ProjectCategory[] = ['All', 'Machine Learning', 'AI', 'Cloud', 'Software Dev', 'Data Science'];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(scrolled * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Components ──────────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pts: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();
      });
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((n) => n.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#080c14]/90 backdrop-blur-xl border-b border-sky-500/10 shadow-lg shadow-sky-500/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo('#hero')}
          className="text-sky-400 font-bold text-lg tracking-wider hover:text-sky-300 transition-colors"
        >
          AS
        </button>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === link.href.replace('#', '')
                  ? 'text-sky-400 bg-sky-400/10'
                  : 'text-gray-400 hover:text-sky-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#080c14]/95 backdrop-blur-xl border-b border-sky-500/10 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:text-sky-400 hover:bg-sky-400/5 transition-all text-left"
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full" />
      </div>
    </div>
  );
}

function HeroSection() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050810]">
      <Particles />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-400 text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Available for Opportunities
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-white">Aisha</span>{' '}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Sultana</span>
        </h1>

        <p className="text-sky-400/80 text-lg md:text-xl font-medium tracking-widest uppercase mb-6">
          Cloud Computing • AI/ML • Software Development
        </p>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Computer Science student passionate about building intelligent systems, cloud solutions, and
          impactful software applications through real-world projects and hands-on technical experience.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5"
          >
            View Projects
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-sky-200 font-semibold rounded-xl transition-all duration-200 hover:bg-sky-500/10 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Contact Me
          </button>
          <a
            href="https://github.com/AS88-bot"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 flex items-center gap-2 border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>

      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-sky-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}

function AboutSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#070b12] relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-sky-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="About Me" subtitle="A glimpse into who I am and what drives me." />
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div>
            <div className="w-full aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-400/5 border border-sky-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent" />
              <div className="relative z-10 text-center p-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-sky-500/30 to-cyan-400/20 border-2 border-sky-400/40 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-sky-300">AS</span>
                </div>
                <p className="text-sky-400 font-semibold text-lg">Aisha Sultana</p>
                <p className="text-gray-500 text-sm mt-1">Computer Science Student</p>
              </div>
              <div className="absolute top-4 right-4 w-16 h-16 border border-sky-500/20 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-300 text-base leading-relaxed">
              I'm a Computer Science student driven by a deep curiosity for how technology can reshape the world around us. My focus spans three powerful domains —{' '}
              <span className="text-sky-400 font-medium">Artificial Intelligence & Machine Learning</span>,{' '}
              <span className="text-sky-400 font-medium">Cloud Computing</span>, and{' '}
              <span className="text-sky-400 font-medium">Software Development</span> — where I strive to bridge theory with real-world impact.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Through internships at organizations like <span className="text-white font-medium">Microsoft</span>,{' '}
              <span className="text-white font-medium">McKinsey & Company</span>, and{' '}
              <span className="text-white font-medium">SkillCraft Technologies</span>, I've built hands-on experience across the full software engineering spectrum — from deploying ML models and architecting cloud solutions to building production-ready applications.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              I believe technology is most powerful when it solves real problems for real people. That philosophy drives every project I build — whether it's a cardiovascular disease predictor, an AI career coach, or a healthcare companion for dementia patients.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '6+', label: 'Internships' },
                { value: '15+', label: 'Projects' },
                { value: '3', label: 'Domains' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 rounded-xl bg-white/3 border border-white/8 hover:border-sky-500/30 transition-colors">
                  <div className="text-2xl font-bold text-sky-400">{value}</div>
                  <div className="text-gray-500 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#050810] relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="Skills & Expertise" subtitle="Technologies and capabilities I bring to every project." />
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-6">Technical Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-14">
            {technicalSkills.map((skill, i) => (
              <div
                key={skill.name}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <span className="text-xl">{skill.icon}</span>
                <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-6">Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-300 text-sm font-medium hover:border-sky-400/60 hover:bg-sky-500/10 transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#070b12] relative overflow-hidden"
    >
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle title="Experience" subtitle="Real-world exposure across AI, Cloud, and Software Engineering." />
        <div className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/40 via-sky-500/20 to-transparent hidden md:block" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative md:pl-16 group">
                <div className="hidden md:flex absolute left-0 top-5 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/10 border border-sky-500/30 items-center justify-center text-sky-400 group-hover:border-sky-400/60 group-hover:bg-sky-500/15 transition-all duration-300 z-10">
                  {exp.icon}
                </div>
                <div className="p-6 rounded-2xl bg-white/3 border border-white/8 group-hover:border-sky-500/30 group-hover:bg-sky-500/3 transition-all duration-300">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{exp.title}</h3>
                      <p className="text-sky-400 text-sm font-medium mt-0.5">{exp.org}</p>
                    </div>
                    <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      {exp.icon}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState<ProjectCategory>('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#050810] relative overflow-hidden"
    >
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Projects" subtitle="Building solutions at the intersection of AI, Cloud, and human impact." />

        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 flex-wrap justify-center mb-12">
            <Filter className="w-4 h-4 text-gray-500" />
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                    : 'border border-white/10 text-gray-400 hover:text-sky-300 hover:border-sky-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.name}
                className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  project.featured
                    ? 'border-sky-500/40 bg-gradient-to-br from-sky-500/8 to-cyan-400/3 hover:border-sky-400/60'
                    : 'border-white/8 bg-white/3 hover:border-sky-500/30 hover:bg-sky-500/3'
                }`}
                style={{ transitionDelay: `${(i % 6) * 50}ms` }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base leading-snug group-hover:text-sky-100 transition-colors">
                    {project.name}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400 border border-white/8">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/12 text-gray-300 hover:text-white hover:border-sky-500/40 hover:bg-sky-500/8 text-sm font-medium transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <div className="flex gap-1.5 ml-auto flex-wrap justify-end">
                    {project.category.map((cat) => (
                      <span key={cat} className="px-2 py-0.5 rounded-full text-xs text-sky-400/70 border border-sky-500/20">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/AS88-bot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-sky-500/30 rounded-xl text-sky-300 hover:text-white hover:border-sky-400/60 hover:bg-sky-500/8 font-medium transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              View All on GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  const { ref, inView } = useInView();
  return (
    <section
      id="certifications"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#070b12] relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="Certifications" subtitle="Recognized achievements across AI, Cloud, and professional development." />
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-sky-500/35 hover:bg-sky-500/4 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0 group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300">
                {cert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-snug">{cert.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{cert.issuer}</p>
              </div>
              <Award className="w-4 h-4 text-sky-500/30 ml-auto group-hover:text-sky-400/50 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, inView } = useInView();

  const contacts = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      value: 'AS88-bot',
      href: 'https://github.com/AS88-bot',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://linkedin.com/in/aisha-sultana',
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: 'Instagram',
      value: 'Follow me',
      href: 'https://instagram.com',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'Get in touch',
      href: 'mailto:aisha@example.com',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 bg-[#050810] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(56,189,248,0.06) 0%, transparent 70%)' }}
      />
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Get In Touch" subtitle="Open to internships, collaborations, and interesting opportunities." />

        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you're looking to collaborate on an AI/ML project, discuss cloud architecture, or explore an internship opportunity — I'd love to connect. Let's build something impactful together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 group-hover:border-sky-400/50 group-hover:text-sky-300 transition-all duration-300">
                  {c.icon}
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{c.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{c.value}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-sky-400/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-[#050810] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          Designed &amp; Built by{' '}
          <span className="text-sky-400 font-medium">Aisha Sultana</span>
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/AS88-bot" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-sky-400 transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/aisha-sultana" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-sky-400 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050810] transition-all duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sky-400 font-bold text-lg">AS</span>
        </div>
      </div>
      <p className="mt-4 text-gray-500 text-sm tracking-widest uppercase animate-pulse">Loading</p>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 1200); }, []);

  return (
    <div className="bg-[#050810] text-white font-sans antialiased">
      <LoadingScreen done={loaded} />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
