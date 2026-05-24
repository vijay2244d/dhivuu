import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Mail, ChevronRight, ChevronLeft, BookHeart } from "lucide-react";
import { cn } from "@/src/lib/utils";

import { useAppStore } from "./store";
import { Home } from "./pages/Home";
import { StoryBeginning } from "./pages/StoryBeginning";
import { StoryBeginningContinued } from "./pages/StoryBeginningContinued";
import { StoryMemories } from "./pages/StoryMemories";
import { StoryMemoriesContinued } from "./pages/StoryMemoriesContinued";
import { StoryFuture } from "./pages/StoryFuture";
import { Reasons } from "./pages/Reasons";
import { ReasonsLeft } from "./pages/ReasonsLeft";
import { Note } from "./pages/Note";
import { HeartRain } from "./components/HeartRain";
import { KissRain } from "./components/KissRain";
import generatedImage1 from "./assets/images/regenerated_image_1779435727014.png";
import generatedImage2 from "./assets/images/regenerated_image_1779454319740.png";
import generatedImage3 from "./assets/images/regenerated_image_1779454586059.png";
import generatedImage4 from "./assets/images/regenerated_image_1779457012542.png";
import generatedImage5 from "./assets/images/regenerated_image_1779458304356.jpg";

const LeftPageFrame = ({ children, isBlank }: { children: React.ReactNode, isBlank?: boolean }) => {
  if (isBlank) return <div className="w-full h-full bg-transparent" />;
  return (
    <div className="w-full h-full bg-[#fdfbf7] rounded-l-sm md:rounded-l-md relative overflow-hidden shadow-[-1px_0_0_#e5ddd0,-2px_0_0_#fdfbf7,-3px_0_0_#e5ddd0,-4px_0_0_#fdfbf7,-5px_0_0_#e5ddd0,-6px_0_0_#fdfbf7,-7px_0_0_#e5ddd0,-8px_0_0_#fdfbf7,-9px_0_0_#e5ddd0,-12px_15px_20px_rgba(0,0,0,0.15)] border-l border-y border-[#e5ddd0] transform-gpu" style={{ maskImage: '-webkit-radial-gradient(white, black)' }}>
      {/* Page edge inner shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />
      {/* Spine shadow and highlight */}
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[rgba(0,0,0,0.18)] via-[rgba(0,0,0,0.06)] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/60 shadow-[0_0_10px_rgba(255,255,255,1)] pointer-events-none z-10" />
      {/* Light sheen */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white/60 to-transparent pointer-events-none z-10" />
      {children}
    </div>
  );
};

const RightPageFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fdfbf7] rounded-r-sm md:rounded-r-md relative overflow-hidden shadow-[1px_0_0_#e5ddd0,2px_0_0_#fdfbf7,3px_0_0_#e5ddd0,4px_0_0_#fdfbf7,5px_0_0_#e5ddd0,6px_0_0_#fdfbf7,7px_0_0_#e5ddd0,8px_0_0_#fdfbf7,9px_0_0_#e5ddd0,12px_15px_20px_rgba(0,0,0,0.15)] border-r border-y border-[#e5ddd0] transform-gpu" style={{ maskImage: '-webkit-radial-gradient(white, black)' }}>
    {/* Page edge inner shadow */}
    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-10" />
    {/* Spine shadow and highlight */}
    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[rgba(0,0,0,0.18)] via-[rgba(0,0,0,0.06)] to-transparent pointer-events-none z-10" />
    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/60 shadow-[0_0_10px_rgba(255,255,255,1)] pointer-events-none z-10" />
    {/* Light sheen */}
    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/60 to-transparent pointer-events-none z-10" />
    {children}
  </div>
);

const ImageContent = ({ src }: { src: string }) => {
  const setZoomedImage = useAppStore(state => state.setZoomedImage);
  return (
  <div className="w-full h-full p-4 md:p-8 flex items-center justify-center">
    <div 
      className="w-full h-full rounded-xl overflow-hidden shadow-inner border-2 border-rose-100 relative transform-gpu bg-rose-50/30 cursor-pointer hover:opacity-90 transition-opacity" 
      style={{ transform: 'translateZ(0)' }}
      onClick={() => setZoomedImage(src)}
    >
       <img src={src} alt="Memory" className="w-full h-full object-cover transform-gpu backface-hidden" style={{ WebkitBackfaceVisibility: 'hidden' }} />
       <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] pointer-events-none" />
       <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
         <Sparkles className="w-8 h-8 text-white drop-shadow-md" />
       </div>
    </div>
  </div>
)};

const SPREADS = [
  { 
    path: '/', 
    name: 'Cover', 
    icon: BookHeart, 
    left: null, 
    right: <Home /> 
  },
  { 
    path: '/story-beginning', 
    name: 'The Beginning', 
    icon: Heart, 
    left: <ImageContent src={generatedImage1} />, 
    right: <StoryBeginning /> 
  },
  { 
    path: '/story-beginning-continued', 
    name: 'Spark', 
    icon: Heart, 
    left: <ImageContent src={generatedImage3} />, 
    right: <StoryBeginningContinued /> 
  },
  { 
    path: '/story-memories', 
    name: 'Memories', 
    icon: Heart, 
    left: <ImageContent src={generatedImage2} />, 
    right: <StoryMemories /> 
  },
  { 
    path: '/story-memories-continued', 
    name: 'Healing', 
    icon: Heart, 
    left: <ImageContent src={generatedImage4} />, 
    right: <StoryMemoriesContinued /> 
  },
  { 
    path: '/story-future', 
    name: 'Future', 
    icon: Heart, 
    left: <ImageContent src={generatedImage5} />, 
    right: <StoryFuture /> 
  },
  { 
    path: '/reasons', 
    name: 'Reasons', 
    icon: Sparkles, 
    left: <ReasonsLeft />, 
    right: <Reasons /> 
  },
  { 
    path: '/note', 
    name: 'Note', 
    icon: Mail, 
    left: <ImageContent src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800" />, 
    right: <Note /> 
  },
];

const BackgroundDecor = () => {
  const [particles] = useState(() => 
    Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 0.8 + 0.4,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * -20,
      drift: Math.random() * 20 - 10,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-200/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-200/40 blur-[120px]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-300/30 blur-[100px]" />
      
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ left: `${p.left}%`, top: "110%", rotate: 0, opacity: 0, x: 0 }}
          animate={{
            top: "-20%",
            x: `${p.drift}vw`,
            rotate: 360,
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        >
          <Heart 
            className="text-rose-400/30 fill-rose-400/20" 
            style={{ width: `${p.size * 30}px`, height: `${p.size * 30}px` }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEnvelopeOpen = useAppStore((state) => state.isEnvelopeOpen);
  const isUnlocked = useAppStore((state) => state.isUnlocked);
  const zoomedImage = useAppStore((state) => state.zoomedImage);
  const setZoomedImage = useAppStore((state) => state.setZoomedImage);
  
  const matchedIndex = SPREADS.findIndex(s => s.path === location.pathname);
  const targetIndex = matchedIndex === -1 ? 0 : matchedIndex;

  const [renderedSpread, setRenderedSpread] = useState(targetIndex);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [showKissRain, setShowKissRain] = useState(false);

  useEffect(() => {
    if (targetIndex !== renderedSpread && !isFlipping) {
      setFlipDirection(targetIndex > renderedSpread ? 'forward' : 'backward');
      setIsFlipping(true);
    }
  }, [targetIndex, renderedSpread, isFlipping]);

  const goToPage = (newIndex: number) => {
    if (newIndex === targetIndex || isFlipping || newIndex < 0 || newIndex >= SPREADS.length) return;
    navigate(SPREADS[newIndex].path);
  };

  const currentLeft = SPREADS[isFlipping && flipDirection === 'backward' ? targetIndex : renderedSpread].left;
  const currentRight = SPREADS[isFlipping && flipDirection === 'forward' ? targetIndex : renderedSpread].right;

  return (
    <div className="h-[100svh] w-full bg-pink-50 overflow-hidden relative selection:bg-rose-200 selection:text-rose-900 font-sans flex flex-col items-center justify-center p-2 md:p-8">
      <BackgroundDecor />
      {isEnvelopeOpen && location.pathname === '/reasons' && <HeartRain />}
      <KissRain active={showKissRain} />

      {/* Kiss Emoji Button Right Side */}
      {isUnlocked && (
        <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50">
          <button 
            onClick={() => {
              setShowKissRain(true);
              setTimeout(() => setShowKissRain(false), 3000); // Stop rain after 3s
              if (targetIndex < SPREADS.length - 1) {
                goToPage(targetIndex + 1);
              } else {
                goToPage(0);
              }
            }}
            disabled={isFlipping}
            className="text-5xl md:text-6xl filter drop-shadow-md hover:scale-110 active:scale-95 transition-transform disabled:opacity-50"
            title="Next Page and Kiss Rain"
          >
            💋
          </button>
        </div>
      )}

      <div 
        className="relative flex z-10 perspective-[2500px] mt-4"
        style={{ 
          width: 'min(98vw, 1600px, calc((100svh - 60px) * (1600 / 1250)))', 
          aspectRatio: '1600 / 1250',
          maxHeight: 'min(1250px, calc(100svh - 60px))'
        }}
      >
        
        {/* Book Binding Shadow */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-black/20 blur-md pointer-events-none z-0" />

        {/* Stationary Left Page */}
        <div className="w-1/2 h-full relative z-10 shrink-0">
          <LeftPageFrame isBlank={currentLeft === null}>
            {currentLeft}
          </LeftPageFrame>
        </div>
        
        {/* Stationary Right Page */}
        <div className="w-1/2 h-full relative z-10 shrink-0">
          <RightPageFrame>
            {currentRight}
          </RightPageFrame>
        </div>

        {/* Flipping Forward */}
        {isFlipping && flipDirection === 'forward' && (
          <motion.div
            initial={{ rotateY: 0, z: 0 }}
            animate={{ 
              rotateY: -180,
              z: [0, 80, 0],
              rotateX: [0, 3, 0]
            }}
            transition={{ duration: 1.4, ease: [0.645, 0.045, 0.355, 1.000] }}
            onAnimationComplete={() => {
               setRenderedSpread(targetIndex);
               setIsFlipping(false);
            }}
            className="absolute right-0 w-1/2 h-full z-30 origin-left transform-style-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front (Old Right) */}
            <div className="absolute inset-0 backface-hidden shadow-[20px_0_30px_rgba(0,0,0,0.15)] flex">
              <RightPageFrame>
                {SPREADS[renderedSpread].right}
              </RightPageFrame>
              {/* Dynamic shadow as it turns away */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-l from-black/0 to-black/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeIn" }}
              />
            </div>
            {/* Back (New Left) */}
            <div className="absolute inset-0 backface-hidden shadow-[-20px_0_30px_rgba(0,0,0,0.15)] flex" style={{ transform: 'rotateY(180deg)' }}>
              <LeftPageFrame isBlank={SPREADS[targetIndex].left === null}>
                {SPREADS[targetIndex].left}
              </LeftPageFrame>
              {/* Dynamic shadow as it turns towards viewer */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/20 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Flipping Backward */}
        {isFlipping && flipDirection === 'backward' && (
          <motion.div
            initial={{ rotateY: 0, z: 0 }}
            animate={{ 
              rotateY: 180,
              z: [0, 80, 0],
              rotateX: [0, 3, 0]
            }}
            transition={{ duration: 1.4, ease: [0.645, 0.045, 0.355, 1.000] }}
            onAnimationComplete={() => {
               setRenderedSpread(targetIndex);
               setIsFlipping(false);
            }}
            className="absolute left-0 w-1/2 h-full z-30 origin-right transform-style-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front (Old Left) */}
            <div className="absolute inset-0 backface-hidden shadow-[-20px_0_30px_rgba(0,0,0,0.15)] flex">
              <LeftPageFrame isBlank={SPREADS[renderedSpread].left === null}>
                {SPREADS[renderedSpread].left}
              </LeftPageFrame>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeIn" }}
              />
            </div>
            {/* Back (New Right) */}
            <div className="absolute inset-0 backface-hidden shadow-[20px_0_30px_rgba(0,0,0,0.15)] flex" style={{ transform: 'rotateY(180deg)' }}>
              <RightPageFrame>
                {SPREADS[targetIndex].right}
              </RightPageFrame>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-l from-black/0 to-black/20 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={zoomedImage} 
              alt="Zoomed" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20" 
            />
            {/* Close instruction */}
            <div className="absolute top-6 right-6 text-white/50 text-sm font-medium tracking-wider">
              CLICK TO CLOSE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
