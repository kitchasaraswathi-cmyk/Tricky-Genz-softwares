import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Globe, 
  Settings, 
  Video, 
  Palette, 
  FileText, 
  Instagram, 
  Mail, 
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Users,
  Clock,
  CheckCircle2,
  Zap,
  Menu,
  X
} from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    title: 'Websites',
    icon: <Globe className="w-8 h-8" />,
    items: ['Business Sites', 'Company Portals', 'E-Commerce', 'Portfolio Designs']
  },
  {
    id: '02',
    title: 'Projects',
    icon: <Settings className="w-8 h-8" />,
    items: ['Mini Projects', 'Final Year Academics', 'IoT Solutions', 'Technical Prototypes']
  },
  {
    id: '03',
    title: 'Video Editz',
    icon: <Video className="w-8 h-8" />,
    items: ['Commercial Ads', 'Startup Promotions', 'Personal Content', 'AI Based Promotion']
  },
  {
    id: '04',
    title: 'Posters & Resumes',
    icon: <Palette className="w-8 h-8" />,
    items: ['Brand Posters', 'Ad Campaigns', 'Announcements', 'Professional Resumes']
  },
  {
    id: '05',
    title: 'Content & Docs',
    icon: <FileText className="w-8 h-8" />,
    items: ['Script Writing', 'Project Documentation', 'Paper Publish Support', 'IEEE Format Docs']
  }
];

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-brand-red rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? "rgba(220, 38, 38, 0.3)" : "rgba(220, 38, 38, 0)",
      }}
    />
  );
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SERVICES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-red overflow-x-hidden md:cursor-none">
      <CustomCursor />
      {/* GLOBAL DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/20 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          {/* Desktop Left Links / Mobile Spacer */}
          <div className="flex-1 hidden md:flex items-center gap-8">
            <motion.a whileTap={{ scale: 0.95 }} href="#services" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-brand-red transition-colors text-gray-400">Services</motion.a>
            <motion.a whileTap={{ scale: 0.95 }} href="#about" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-brand-red transition-colors text-gray-400">About</motion.a>
          </div>
          <div className="md:hidden flex-1" />

          {/* Logo - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0 text-center"
          >
            <span className="font-heading text-2xl font-bold tracking-tighter uppercase text-white/90">Tricky <span className="text-brand-red">GenZ</span></span>
          </motion.div>

          {/* Desktop Right Links / Mobile Menu Button */}
          <div className="flex-1 flex items-center justify-end">
            <div className="hidden md:flex items-center justify-end">
              <motion.a whileTap={{ scale: 0.95 }} href="#contact" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-brand-red transition-colors text-gray-400">Contact</motion.a>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col gap-8 p-8 items-center text-center">
                <motion.a 
                  whileTap={{ scale: 0.9 }}
                  href="#services" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-brand-red transition-colors"
                >
                  Services
                </motion.a>
                <motion.a 
                  whileTap={{ scale: 0.9 }}
                  href="#about" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-brand-red transition-colors"
                >
                  About
                </motion.a>
                <motion.a 
                  whileTap={{ scale: 0.9 }}
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-brand-red transition-colors"
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ABOUT COMPANY SECTION (FIRST) */}
      <section id="about" className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group lg:pr-10"
            >
              <div className="absolute -inset-4 bg-brand-red/20 blur-3xl rounded-full group-hover:bg-brand-red/30 transition-all duration-1000 opacity-40" />
              <div className="relative glass-card overflow-hidden shadow-2xl flex items-center justify-center bg-brand-dark/40 border-white/10 max-w-2xl mx-auto">
                <video 
                  src="/tg-animation.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto block transition-all duration-700 hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center md:text-left"
            >
              <p className="text-brand-red font-bold tracking-[0.3em] uppercase text-[10px] mb-4">The Digital Architect</p>
              <h1 className="font-display text-7xl md:text-[100px] leading-[0.8] italic uppercase tracking-tighter mb-8">
                TRICKY<br />
                <span className="text-brand-red text-glow-red">GENZ</span>
              </h1>
              <div className="mb-10">
                <p className="text-gray-400 leading-relaxed text-lg md:text-xl md:border-l-2 border-brand-red md:pl-6 max-w-2xl mx-auto md:mx-0">
                  We create powerful, user-friendly websites tailored to your brand and client needs. 
                  Beyond websites, we deliver complete digital solutions — projects, documentation, 
                  posters, video edits, AI videos, and portfolios. “We provide solutions beyond your ideas and thoughts.”
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto md:mx-0">
                {[
                  { label: "Client Satisfaction", value: "100%" },
                  { label: "Active Support", value: "24/7" },
                  { label: "Delivery", value: "Fast" },
                  { label: "Design", value: "Premium" }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-white font-display text-4xl">{stat.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <p className="text-brand-red font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Our Expertise</p>
            <h2 className="font-display text-5xl md:text-7xl">WHAT WE <span className="text-brand-red">OFFER</span></h2>
          </motion.div>
          <div className="flex gap-4">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="relative px-6 max-w-7xl mx-auto">
          <div className="relative h-[450px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 grid md:grid-cols-2 gap-10 items-center"
              >
                <div className="relative h-full flex flex-col justify-center">
                  <div className="absolute -left-10 top-0 text-[10rem] font-display text-white/5 pointer-events-none select-none">
                    {SERVICES[activeSlide].id}
                  </div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red mb-8 shadow-[0_0_30px_rgba(192,0,26,0.3)] animate-pulse">
                      {SERVICES[activeSlide].icon}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl mb-6">
                      {SERVICES[activeSlide].title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "text-brand-red" : ""}>{word} </span>
                      ))}
                    </h3>
                  </div>
                </div>
                
                <div className="glass-card p-8 md:p-12 relative overflow-hidden group-hover:border-brand-red/50">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                     <Zap className="w-20 h-20 text-brand-red fill-current" />
                   </div>
                   <ul className="space-y-4">
                     {SERVICES[activeSlide].items.map((item, i) => (
                       <motion.li 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        key={i} 
                        className="flex items-center gap-4 text-gray-300 group/item"
                       >
                         <ChevronRight className="w-4 h-4 text-brand-red group-hover/item:translate-x-1 transition-transform" />
                         <span className="text-lg font-medium group-hover/item:text-brand-red transition-colors">{item}</span>
                       </motion.li>
                     ))}
                   </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-3 mt-12">
            {SERVICES.map((_, i) => (
              <motion.button 
                whileTap={{ scale: 0.8 }}
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${i === activeSlide ? "w-12 bg-brand-red" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-12 bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex items-center gap-20 whitespace-nowrap"
          >
            {[1, 2, 3, 4].map((_) => (
              <div key={_} className="flex items-center gap-20">
                <span className="flex items-center gap-4 text-white font-display text-3xl">
                  <Zap className="w-6 h-6 fill-white" /> 100% QUALITY
                </span>
                <span className="flex items-center gap-4 text-white font-display text-3xl">
                  <CheckCircle2 className="w-6 h-6 fill-white" /> FAST DELIVERY
                </span>
                <span className="flex items-center gap-4 text-white font-display text-3xl">
                  <Users className="w-6 h-6 fill-white" /> CLIENT FOCUSED
                </span>
                <span className="flex items-center gap-4 text-white font-display text-3xl">
                  <Clock className="w-6 h-6 fill-white" /> 24/7 SUPPORT
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.p 
              initial="hidden"
              whileInView="visible"
              variants={revealVariants}
              className="text-brand-red font-bold tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              Reach Out
            </motion.p>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              variants={revealVariants}
              className="font-display text-5xl md:text-7xl"
            >
              CONTACT <span className="text-brand-red">US</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Instagram Link */}
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://instagram.com/tricky_genz"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-6 md:p-8 hover:border-brand-red relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <span className="-mt-1">📸</span>
                  </div>
                  <div>
                    <div className="text-xs text-brand-red font-bold uppercase tracking-widest mb-1">Instagram</div>
                    <div className="text-xl md:text-2xl font-bold tracking-tight">@tricky_genz</div>
                  </div>
                </div>
                <div className="text-3xl opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  →
                </div>
              </div>
            </motion.a>

            {/* Email Link */}
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:id-trickygenz@gmail.com"
              className="group glass-card p-6 md:p-8 hover:border-brand-red relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-3xl border border-white/10 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500 shadow-none hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <span className="-mt-1">✉️</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 group-hover:text-brand-red/60 transition-colors">Gmail</div>
                    <div className="text-xl md:text-2xl font-bold tracking-tight">id-trickygenz</div>
                  </div>
                </div>
                <div className="text-3xl opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  →
                </div>
              </div>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+910000000000"
              className="group bg-brand-red p-6 md:p-8 rounded-2xl md:col-span-2 shadow-[0_0_50px_rgba(220,38,38,0.2)] hover:bg-red-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-brand-dark/20 rounded-xl flex items-center justify-center text-3xl">
                    <span className="-mt-1">📱</span>
                  </div>
                  <div>
                    <div className="text-xs text-white/70 font-bold uppercase tracking-widest mb-1">Quick Connect</div>
                    <div className="text-xl md:text-2xl font-black italic tracking-tighter uppercase px-1">Call Now</div>
                  </div>
                </div>
                <div className="text-3xl group-hover:translate-x-3 transition-transform">
                  →
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-brand-dark text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <span className="font-display text-2xl tracking-wider text-white">TRICKY <span className="text-brand-red">GENZ</span></span>
          </div>
          <p className="text-xs text-gray-500 font-medium tracking-[0.2em] mb-4">
            © 2026 TRICKY GENZ SOFTWARES · YOUR VISION, OUR CREATION.
          </p>
          <div className="flex justify-center gap-6">
             <a href="#" className="text-gray-500 hover:text-brand-red transition-colors text-[10px] uppercase font-bold tracking-widest">Terms</a>
             <a href="#" className="text-gray-500 hover:text-brand-red transition-colors text-[10px] uppercase font-bold tracking-widest">Privacy</a>
             <a href="#" className="text-gray-500 hover:text-brand-red transition-colors text-[10px] uppercase font-bold tracking-widest">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
