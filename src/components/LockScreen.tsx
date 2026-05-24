import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, UserCheck, Focus } from "lucide-react";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [phase, setPhase] = useState<'auth' | 'auth-success' | 'lock'>('auth');
  const [progress, setProgress] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [cameraError, setCameraError] = useState(false);
  const targetClicks = 20;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [raindrops, setRaindrops] = useState<{ id: number; type: 'kiss' | 'heart'; x: number; y: number }[]>([]);

  const [isPressing, setIsPressing] = useState(false);
  const [pulseAnim, setPulseAnim] = useState(false);

  useEffect(() => {
    if (phase === 'auth') {

      let stream: MediaStream | null = null;
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => {
          console.error("Error accessing webcam:", err);
          setCameraError(true);
        });

      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (stream) {
                stream.getTracks().forEach(t => t.stop());
              }
              setPhase('auth-success');
            }, 500);
            return 100;
          }
          // Random progress increments
          return Math.min(100, p + Math.floor(Math.random() * 15) + 5);
        });
      }, 300);
      
      return () => {
        clearInterval(interval);
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
        }
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'auth-success') {
      const timer = setTimeout(() => {
        setPhase('lock');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'lock') return;

    let intervalId: NodeJS.Timeout;

    if (!isPressing) {
      intervalId = setInterval(() => {
        setClicks(c => {
          if (c <= 0 || c >= targetClicks) return c;
          return Math.max(0, c - 1); // Gradually reduce by 1
        });
      }, 500); // Reduce every 500ms
    }

    return () => clearInterval(intervalId);
  }, [isPressing, phase, targetClicks]);

  const handleUnlockClick = useCallback(() => {
    if (phase !== 'lock') return;

    setPulseAnim(true);
    setTimeout(() => setPulseAnim(false), 800);

    setRaindrops(prev => [
      ...prev, 
      { id: Date.now() + Math.random(), type: 'kiss', x: Math.random() * 100, y: -10 },
      { id: Date.now() + Math.random(), type: 'heart', x: Math.random() * 100, y: -10 },
      { id: Date.now() + Math.random(), type: 'kiss', x: Math.random() * 100, y: -10 },
      { id: Date.now() + Math.random(), type: 'heart', x: Math.random() * 100, y: -10 }
    ]);

    setClicks(c => {
      if (c >= targetClicks) return c;
      const newCount = c + 1; // Exactly 1 click per tap
      
      if (newCount >= targetClicks && c < targetClicks) {
        setTimeout(onUnlock, 1000);
      }
      return newCount > targetClicks ? targetClicks : newCount;
    });
  }, [phase, onUnlock, targetClicks]);

  // Clean up raindrops over time
  useEffect(() => {
    if (raindrops.length > 0) {
      const timer = setTimeout(() => {
        setRaindrops(prev => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [raindrops]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [phase]);

  // Allow enter key to click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.repeat) {
        // Prevent default to avoid double trigger if a button is focused
        e.preventDefault();
        handleUnlockClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUnlockClick]);


  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm transition-colors duration-500 focus:outline-none"
      style={{
        backgroundColor: phase === 'lock' 
          ? `rgba(255, 241, 242, ${0.95 - (clicks / targetClicks) * 0.2})` 
          : 'rgba(255, 241, 242, 0.95)'
      }}
    >
      {/* Dynamic background glow */}
      {phase === 'lock' && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, rgba(244,63,94,${(clicks/targetClicks) * 0.15}) 0%, transparent 60%)`,
            opacity: clicks > 0 ? 1 : 0
          }}
        />
      )}
      {/* Rain container */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <AnimatePresence>
          {raindrops.map(drop => (
            <motion.div
              key={drop.id}
              initial={{ x: `${drop.x}vw`, y: "-10vh", opacity: 1, scale: 0.5, rotate: 0 }}
              animate={{ y: "110vh", opacity: 0, scale: 1.5, rotate: drop.type === 'kiss' ? [-20, 20, -20] : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 + Math.random(), ease: "easeIn" }}
              className="absolute text-2xl md:text-4xl"
            >
              {drop.type === 'kiss' ? "💋" : <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6 max-w-sm w-full px-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-rose-200 border-4 border-rose-300 relative shadow-xl focus:outline-none">
              {!cameraError ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover -scale-x-100" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rose-100">
                  <Heart className="w-16 h-16 text-rose-400 fill-rose-300 animate-pulse" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 text-rose-500">
                <Focus className="w-full h-full p-6 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-4 border-rose-400 rounded-full animate-ping opacity-20" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-rose-900 font-display text-center">
              Authenticating User...
            </h2>
            <div className="w-full h-3 bg-rose-200 rounded-full overflow-hidden shadow-inner relative">
              <motion.div 
                className="h-full bg-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="text-rose-600/80 font-mono text-sm">
              Analyzing vibe ({progress}%)
            </p>
          </motion.div>
        )}

        {phase === 'auth-success' && (
          <motion.div
            key="auth-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-4 max-w-md w-full px-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <UserCheck className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-800 font-display leading-snug">
              You are the one, the super one
            </h2>
          </motion.div>
        )}

        {phase === 'lock' && (
          <motion.div
            key="lock"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: (isPressing || pulseAnim) 
                ? "0 25px 50px -12px rgba(244, 63, 94, 0.4)" 
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            className={`flex flex-col items-center gap-6 z-20 max-w-sm w-full p-8 bg-white/70 backdrop-blur-md border ${isPressing || pulseAnim ? 'border-rose-300' : 'border-rose-100'} rounded-[2rem] text-center mx-4 transition-colors duration-300 relative overflow-hidden`}
          >
            {/* Background Heartbeat EKG */}
            <div className="absolute inset-0 flex items-center justify-center text-rose-300 opacity-20 pointer-events-none z-0 overflow-hidden rounded-[2rem]">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-current fill-none">
                {isPressing || pulseAnim ? (
                  <motion.path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M 0 50 L 30 50 L 35 25 L 45 80 L 55 10 L 65 70 L 70 50 L 100 50"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                  />
                ) : (
                  <motion.path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    d="M 0 50 L 100 50"
                    opacity={0.5}
                  />
                )}
              </svg>
            </div>

            <div className="z-10 mt-4 relative">
              <h2 className="text-2xl md:text-3xl font-bold text-rose-900 font-display mb-1 drop-shadow-sm">
                Unlock my heart
              </h2>
              <p className="text-rose-700 font-medium text-sm mt-2 text-center">
                Tap the button to fill the heart
              </p>
            </div>

            <motion.button
              onClick={handleUnlockClick}
              onPointerDown={() => setIsPressing(true)}
              onPointerUp={() => setIsPressing(false)}
              onPointerLeave={() => setIsPressing(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-xl shadow-rose-200/50 border-4 border-rose-100 flex items-center justify-center text-5xl md:text-6xl hover:border-rose-300 hover:bg-rose-50 transition-colors focus:outline-none"
            >
              💋
            </motion.button>
            
            <div className="w-full space-y-4 z-10 relative">
              <div className="w-full max-w-[240px] space-y-2 mt-4 mx-auto">
                <div className="flex justify-between text-xs font-bold text-rose-800 uppercase tracking-widest px-1">
                  <span>Keep Tapping...</span>
                </div>
                <div className="w-full h-8 bg-white/80 rounded-full overflow-hidden shadow-inner border-2 border-rose-200 relative p-1">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full relative"
                    style={{ width: `${Math.min(100, (clicks / targetClicks) * 100)}%` }}
                    transition={{ ease: "linear" }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/30 blur-sm rounded-r-full animate-pulse" />
                  </motion.div>
                </div>
              </div>

              {clicks >= targetClicks && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-600 font-bold"
                >
                  Unlocking...
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
