import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Heart, BookHeart, Sparkles, Star } from "lucide-react";
import { Book3D } from "../components/Book3D";
import { useAppStore } from "../store";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredBook, setHoveredBook] = useState<'story' | 'kural' | null>(null);
  const [selectedBook, setSelectedBook] = useState<'story' | 'kural' | null>(null);
  
  // Track unlock state to delay entry animations
  const isUnlocked = useAppStore((state) => state.isUnlocked);
  
  // Track viewport size for centering calculation
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const checkMd = () => setIsMd(window.innerWidth >= 768);
    checkMd();
    window.addEventListener("resize", checkMd);
    return () => window.removeEventListener("resize", checkMd);
  }, []);

  // Distance from book default layout position to viewport center
  const xOffset = isMd ? 156 : 124;

  const handleSelect = (book: 'story' | 'kural') => {
    if (selectedBook) return; // Prevent double trigger
    setSelectedBook(book);
    
    // Delayed route navigation to match the zoom animation
    setTimeout(() => {
      navigate(book === 'story' ? '/story' : '/kural');
    }, 1000);
  };

  // Floating background particles
  const [particles] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 0.4 + 0.3,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -15,
      drift: Math.random() * 8 - 4,
    }))
  );

  return (
    <div className="h-[100svh] w-full bg-gradient-to-tr from-rose-50/70 via-pink-50/50 to-amber-50/40 overflow-hidden relative selection:bg-rose-200 selection:text-rose-900 font-sans flex flex-col items-center justify-between p-4 md:p-8">
      {/* Viewport Frame Borders */}
      <div className="absolute inset-3 md:inset-4 border border-rose-200/30 pointer-events-none rounded-2xl z-10" />
      <div className="absolute inset-4 md:inset-5 border border-dashed border-amber-300/15 pointer-events-none rounded-2xl z-10" />

      {/* Full-screen seamless transition color overlay */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#faf8f2] z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Cursive Corner Floral Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-44 md:h-44 text-rose-400/10 pointer-events-none z-0 transform rotate-90 scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M10,80 C20,70 40,65 50,45 C55,35 50,20 40,15 C30,10 20,20 25,35 C28,45 42,48 50,40 C60,30 55,10 70,5 C80,2 90,15 85,25 C80,35 65,45 55,60 C45,75 35,90 10,95 Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-44 md:h-44 text-rose-400/10 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M10,80 C20,70 40,65 50,45 C55,35 50,20 40,15 C30,10 20,20 25,35 C28,45 42,48 50,40 C60,30 55,10 70,5 C80,2 90,15 85,25 C80,35 65,45 55,60 C45,75 35,90 10,95 Z" />
        </svg>
      </div>

      {/* Minimal Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: -25 }}
        animate={
          selectedBook 
            ? { opacity: 0, y: -25 } 
            : isUnlocked 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: -25 }
        }
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 z-10 flex flex-col items-center gap-1 select-none pointer-events-none"
      >
        <Heart className="w-4 h-4 text-rose-500 fill-rose-300 animate-pulse" />
        <span className="text-[9px] md:text-xs font-semibold text-rose-800/60 uppercase tracking-[0.35em] font-display">
          Our Digital Sanctuary
        </span>
      </motion.div>

      {/* Drifting Background Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={
            isUnlocked
              ? { x: [0, 50, -30, 0], y: [0, -40, 40, 0], opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            isUnlocked
              ? {
                  x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5 }
                }
              : { duration: 0 }
          }
          className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-rose-200/30 blur-[130px]"
        />
        <motion.div
          animate={
            isUnlocked
              ? { x: [0, -40, 50, 0], y: [0, 40, -40, 0], opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            isUnlocked
              ? {
                  x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5 }
                }
              : { duration: 0 }
          }
          className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-fuchsia-200/25 blur-[130px]"
        />
        <motion.div
          animate={
            isUnlocked
              ? { x: [0, 30, -30, 0], y: [0, 30, -30, 0], opacity: 1 }
              : { opacity: 0 }
          }
          transition={
            isUnlocked
              ? {
                  x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5 }
                }
              : { duration: 0 }
          }
          className="absolute top-1/2 left-1/3 w-[40%] h-[40%] rounded-full bg-amber-100/30 blur-[120px]"
        />
        
        {/* Floating dust/particles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute inset-0 pointer-events-none"
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-rose-300/35"
              initial={{ left: `${p.left}%`, top: "110%", opacity: 0 }}
              animate={{
                top: "-10%",
                x: `${p.drift}vw`,
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            >
              {p.id % 2 === 0 ? (
                <Heart className="w-3.5 h-3.5 fill-rose-200/20 text-rose-300/30" />
              ) : (
                <Star className="w-2.5 h-2.5 fill-amber-200/10 text-amber-300/25" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Interactive Book Selection Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 flex-1">
        
        {/* Animated Books Grid */}
        <div className="flex flex-row gap-12 md:gap-28 justify-center items-end w-full pb-3 mt-4">
          
          {/* BOOK 1: FOR YOU */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 120 }}
            animate={
              selectedBook === 'story'
                ? { x: xOffset, y: -20, scale: 2.3, zIndex: 50, filter: "blur(0px)", opacity: [1, 1, 0.2, 0] }
                : selectedBook === 'kural'
                ? { x: -80, y: 30, scale: 0.7, opacity: 0, filter: "blur(6px)", pointerEvents: "none" }
                : isUnlocked
                ? { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.4, y: 120 }
            }
            transition={
              selectedBook
                ? { duration: 0.95, ease: [0.25, 1, 0.5, 1] }
                : { 
                    type: "spring", 
                    stiffness: 60, 
                    damping: 14, 
                    delay: 0.4 
                  }
            }
            onMouseEnter={() => !selectedBook && setHoveredBook('story')}
            onMouseLeave={() => !selectedBook && setHoveredBook(null)}
            className="z-10"
          >
            <Book3D
              title="For You"
              subtitle="Our Love Story"
              author="By Us"
              tagline="A special gift"
              coverGradient="bg-gradient-to-br from-rose-700 via-rose-800 to-rose-900"
              accentColor="rose"
              icon={<Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />}
              insideHeader="For You Book"
              insideText="Dedicated to our shared laughter, healing milestones, and the beautiful journey we are walking hand-in-hand."
              insideSign="With Love, Always ❤️"
              onClick={() => handleSelect('story')}
              hoverGlowClass="bg-rose-400/20"
              isTransitioning={selectedBook === 'story'}
            />
          </motion.div>

          {/* BOOK 2: DIVYA KURAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 120 }}
            animate={
              selectedBook === 'kural'
                ? { x: -xOffset, y: -20, scale: 2.3, zIndex: 50, filter: "blur(0px)", opacity: [1, 1, 0.2, 0] }
                : selectedBook === 'story'
                ? { x: 80, y: 30, scale: 0.7, opacity: 0, filter: "blur(6px)", pointerEvents: "none" }
                : isUnlocked
                ? { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.4, y: 120 }
            }
            transition={
              selectedBook
                ? { duration: 0.95, ease: [0.25, 1, 0.5, 1] }
                : { 
                    type: "spring", 
                    stiffness: 60, 
                    damping: 14, 
                    delay: 0.55 
                  }
            }
            onMouseEnter={() => !selectedBook && setHoveredBook('kural')}
            onMouseLeave={() => !selectedBook && setHoveredBook(null)}
            className="z-10"
          >
            <Book3D
              title="திவ்யக்குறள்"
              subtitle="Divya Kural"
              author="திருவள்ளுவர் வழி"
              tagline="வகுத்த கவிதைகள்"
              coverGradient="bg-gradient-to-br from-amber-900 via-rose-950 to-stone-900"
              accentColor="amber"
              icon={<BookHeart className="w-6 h-6 text-amber-300 fill-amber-900/40" />}
              insideHeader="திவ்யக்குறள்"
              insideText="தமிழில் உள்ள உயிர் எழுத்துக்கள் போல என் வாழ்க்கையின் பக்கங்களுக்கு உயிர் கொடுத்தவளுக்காக அர்ப்பணிக்கப்பட்ட கவிதைகள்."
              insideSign="அன்புடன் 📖"
              onClick={() => handleSelect('kural')}
              hoverGlowClass="bg-amber-400/15"
              isTransitioning={selectedBook === 'kural'}
            />
          </motion.div>

        </div>

        {/* Glassmorphic Reading Shelf Pedestal */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0.3, y: 30 }}
          animate={
            selectedBook 
              ? { opacity: 0, scaleX: 0.7, y: 15 } 
              : isUnlocked 
              ? { opacity: 1, scaleX: 1, y: 0 } 
              : { opacity: 0, scaleX: 0.3, y: 30 }
          }
          transition={{ 
            type: "spring", 
            stiffness: 70, 
            damping: 15,
            delay: 0.2
          }}
          className="w-full max-w-2xl h-3.5 bg-gradient-to-r from-transparent via-white/35 to-transparent backdrop-blur-[3px] border-y border-white/20 rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.06)] relative z-0 flex items-center justify-center -mt-[32px] md:-mt-[34px]"
        >
          <div className="w-[75%] h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
          {/* Shadow underneath pedestal */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/5 blur-md rounded-full pointer-events-none -z-10" />
        </motion.div>

        {/* Dynamic Detail Info Panel below shelf */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={
            selectedBook 
              ? { opacity: 0, y: 15 } 
              : isUnlocked 
              ? { opacity: 1, y: 0 } 
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-lg mt-12 min-h-[90px] text-center flex flex-col justify-start items-center px-4 select-none pointer-events-none"
        >
          <AnimatePresence mode="wait">
            {!hoveredBook ? (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[11px] md:text-xs font-bold text-rose-955 tracking-[0.2em] font-serif uppercase">
                    Select a Book
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <p className="text-xs text-rose-800/60 leading-relaxed font-serif italic max-w-sm">
                  Hover to inspect a book and read its inner dedication page. Tap or click to open.
                </p>
              </motion.div>
            ) : hoveredBook === 'story' ? (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xs md:text-sm font-bold text-rose-955 font-serif tracking-wider uppercase">
                  Our Love Story Book
                </span>
                <p className="text-[11px] md:text-xs text-rose-800/75 leading-relaxed font-serif italic max-w-sm">
                  Read our memories, milestones, healing journeys, and what the future holds for us. Includes interactive cards and flip animations.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="kural"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xs md:text-sm font-bold text-amber-900 font-serif tracking-wider uppercase">
                  திவ்யக்குறள் • Divya Kural Book
                </span>
                <p className="text-[11px] md:text-xs text-stone-700/80 leading-relaxed font-serif italic max-w-sm">
                  Poetic Tamil verses corresponding to vowel letters (அ, ஆ, இ...). Formatted as strict two-sentence couplets with dedicated definitions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Minimal Bottom Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={
          selectedBook 
            ? { opacity: 0, y: 25 } 
            : isUnlocked 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: 25 }
        }
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-6 z-10 select-none pointer-events-none text-center"
      >
        <span className="text-[9px] md:text-[10px] text-rose-700/50 tracking-widest font-serif italic">
          "Every page holds a piece of our heart"
        </span>
      </motion.div>
    </div>
  );
};
