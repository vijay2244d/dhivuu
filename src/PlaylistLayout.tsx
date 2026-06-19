import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Heart,
  Sparkles,
  Music,
  BookHeart,
  FolderHeart,
  Volume2,
  VolumeX,
  Sparkle
} from "lucide-react";
import { useAppStore } from "./store";
import { MusicNoteRain } from "./components/MusicNoteRain";
import {
  PlaylistCover,
  PlaylistIntroPage,
  MusicPlayerPage,
  ScrapbookJournalPage,
  PlaylistEnd,
  SCRAPBOOK_IMAGES,
  SCRAPBOOK_IMAGE_NAMES
} from "./pages/PlaylistPages";
import introConductor from "./assets/images/intro_conductor.jpg";

const NOTE_SYMBOLS = ["♩", "♪", "♫", "♬", "♭", "♯", "𝄞", "𝄢", "𝄽"];

// Background falling and drifting music notes decoration
const BackgroundDecor = () => {
  const [particles] = useState(() =>
    Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      size: Math.random() * 1.2 + 0.8,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * -20,
      drift: Math.random() * 10 - 5,
      rotation: Math.random() * 360,
      symbol: NOTE_SYMBOLS[idx % NOTE_SYMBOLS.length]
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-950/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-950/20 blur-[120px]" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-purple-400/10 font-serif font-bold select-none pointer-events-none"
          initial={{ left: `${p.left}%`, top: "-10%", rotate: p.rotation, opacity: 0, scale: p.size }}
          animate={{
            top: "110%",
            x: `${p.drift}vw`,
            rotate: p.rotation + (p.drift > 0 ? 180 : -180),
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{ fontSize: `${p.size * 22}px` }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

const gdrive = (id: string) => `https://drive.google.com/uc?export=open&id=${id}`;



// Configure your Google Drive audio file IDs here, mapped by image filename.
export const PLAYLIST_SONGS: Record<string, string | string[]> = {
  cover: "",
  end: "",
  "aga naga": gdrive("1WPWz91V8uqtNfzEgFXZg4Ld_fI4rTO33"),
  "anbil aval": gdrive("1LQy-c3Ag_gcRNrjoPp2JOFXSGfzkQTJV"),
  "aval": [
    gdrive("1VjtJnmoNpeWqEORgPQ9WO8u4HZ4Zw74a"),
    gdrive("16tykraB3JCFDJ56KDy4QTLJRmIkf_zZK")
  ],
  "avalukena": [
    gdrive("1t2dckh1v8ZNgMeifQ8S5QlNTkHvarFN4"),
    gdrive("168XCrSjfMn-zZ4g6TGPwk7832WjpwYHV")
  ],
  "avalum naanum": gdrive("1WZG_5kshfcRaWe4MH2dlRkQLdwWHP_Ln"),
  "azhagiye": gdrive("153ck2hMYi1z1ba-7olz4G2c5lb-l0b6G"),
  "comrade": gdrive("1nn4F-mCo4DEKU0VCryHCpsPGmwpUo8Lw"),
  "aaruyire": gdrive("1ssSKIARuMponBfJdyMWlGvy_f-UPguLZ"),
  "Akkam pakkam": gdrive("118P6PnQTQaUlzWg0jmTXJNmiuxuAK3-j"),
  "endha pakkam": [
    gdrive("1s1-kNfH1Mmo15ANAAdpbQYZnLvPTRaTd"),
    gdrive("1cP37eeX1PQogPtDLbQ2iClLpBMhIjgF5")
  ],
  "ennadi maayavi": [
    gdrive("1wk4r_4jPHdonYonnWjDv7Rovjayi19C1"),
    gdrive("11MRQ8IKND_od6OpoQH2B2_cmaap0BUJ1")
  ],
  "ennai saithale": [
    gdrive("1-j-cRSQRR2lXvh-VZXlYq_oW2t9dW99_"),
    gdrive("16yijHFgxO6VxeZk6QorFg6Rt9Ovr_QPi")
  ],
  "en manpura mangai": gdrive("1L9qEOwcTrVeeVcS9ihqNqGOHrrYOp_XG"),
  "en moochum venam": gdrive("1nY3cCemu0dA-wPhYE1VbHnWn6CmVtc7w"),
  "hayyoda": gdrive("12s32Y3TBGytSjiYDjA5GcQxOOFunh2rW"),
  "hosana": gdrive("1oB57_ad0H_a4jA5-8cplw5qvEV4qmksT"),
  "i think they call this love": gdrive("1gx2TwsnO-YcNOHner3Vu-t2zafIoFGWT"),
  "imaye": gdrive("1up2sS0125rCQzpVvNl-JlyrQii95p6Vj"),
  "jaalakkari": gdrive("1gucAA7foafFlo5vGp1upxoBBvCwp4Efe"),
  "jersey": gdrive("1qyPznrDCvRCH_KwKKfAG5rxKjgWOYhCw"),
  "kaadhal aada": gdrive("1JDfEz747c3FcGwEdjunoTY8PFTtFx1tL"),
  "kadhal aasai": gdrive("1jMV6Q_5b9-hZkuTyH2EkSY7nlfdRYAl7"),
  "kalank": gdrive("1Te2A7w7fRMh0sa5R3aOosKRt75LLbtAX"),
  "kanimozhiye": gdrive("149Xg8voIUd2nlOjDMQs7QTKluU1aWjEu"),
  "kannaana kannae": [
    gdrive("1hwh6N0XY6Lw-5vHIzuPcIeAAzrxpIYSq"),
    gdrive("15jufJWCA5zz0kXaklaieLPIzC4SY4Vql"),
    gdrive("17I-1YZ6lbwKq_dlqJZ_4HvKHU9gjfZ1t")
  ],
  "maruvaarthai": [
    gdrive("17NEWeqMfm9RlpRaBy8z35DUS_kl48ybS"),
    gdrive("1aLBtpuSaZVFreSpfdBtlrJ78h5rj8CxH")
  ],
  "mayanadhi": [
    gdrive("1-qyithk2i6-B_14HX2OqvSH5DdxW4OsM"),
    gdrive("1sIdcCTzLltA5Qrt7XF13uA26m2y3B2em"),
    gdrive("1AYFF0OGSAfK0TrzMfwOa0tDpDRU5WnuH")
  ],
  "megamo aval": gdrive("18WwxN0jfUm0yEm2fJWmJuCCtd7Nscbfz"),
  "mudhal nee mudivum nee": [
    gdrive("1TIja18pTmrXARXWs53ETIXIBmfH34pwt"),
    gdrive("1ZITMetY4nQdmi89UUkIgb5JeR2yyGpWb")
  ],
  "mulumathi": gdrive("181BtMYFHW2PqCUIKutC7q5qXrwDQzThu"),
  "munbae va": gdrive("1GKFOtzLplLl3ZIczdBlyPJYsWhLl7KnV"),
  "naan pizhai": "",
  "nallai allai": gdrive("1G1f149W1VX9uDHBVaj-GfoXZJbetN_3r"),
  "nee kavithaigala": gdrive("1JmMLyzu3q1JyPgX9DLR8H48rXVj3nEZI"),
  "nee paartha paarvai": gdrive("1wzCsVC_ZJr6_qD0nOCgoW8zA-ZIZWSk2"),
  "neethane en ponvasantham": gdrive("1BsU0ALH8MQeuH7LB3k1lMOd_YzC-wFZ1"),
  "new york nagaram": gdrive("14otgfns1s1-Ys3KJeBhrJKM4HkAHnI6S"),
  "oh my kadvule": gdrive("1NGZeb2CGQnXieXivcWMkW9R133RwRsjS"),
  "oorumblood": "",
  "paiya": gdrive("1HpQSBCIYJkOVQyZOfFfcpKJOGlXnDb7p"),
  "pattuma": gdrive("1Y89BO_QpenCVd8RdklIF5MEo_WrE2HnL"),
  "pavazhamzhi": [
    gdrive("14iVLWQJ0sfxc6YjXfEr-iHS9ClihxThr"),
    gdrive("1sX9FyB1Ts9-HpbFLJrh_Os-LCynpGetH")
  ],
  "perfect": gdrive("165U7HdxDUaraoETfkee6N25QOVRTW653"),
  "por": gdrive("1pKSDTGsSJB6xpbrcrCj7f0You-eos2ph"),
  "pottala muttaya": gdrive("1uqyyORuG86O-XIUGDkNTgNekpnzfVVC7"),
  "raati": gdrive("1agVnM597gPl1pRlCZCSh8uW0DXWbbmJB"),
  "sidu sidu": gdrive("1AnwQstWidDxqoSzUwT79s2n333XQyoYb"),
  "sirai": "",
  "thaandavam": gdrive("1LnTnk1dp9Y9pLZ7wtOMLe-lItk91UXka"),
  "uyire": [
    gdrive("1PkiUHRfQX36YRy2vqBEkdL4eM59zcW3f"),
    gdrive("1AxnNpHPLODSzBAGfDWbQDTntxubQJycT")
  ],
  "vaaranam aairam": "",
  "veera": gdrive("1GLcnItQFzUXowW0ZdHxyfOvwonldwVti"),
  "zero": gdrive("1_8nEO6d6izwVAHagjJ8OcwLwHN6P_lzV")
};
const isValidAudioSrc = (src: string | undefined): boolean => {
  if (!src) return false;
  return src.startsWith("https://drive.google.com/uc") ||
    src.startsWith("https://drive.usercontent.google.com") ||
    src.startsWith("/gdrive/");
};



export const PlaylistLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUnlocked = useAppStore((state) => state.isUnlocked);

  // Audio Player State & Ref
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default fallback: 3 minutes
  const [showMusicNoteRain, setShowMusicNoteRain] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const shouldAutoPlayRef = useRef(false);
  // Parse active CD from route path:
  // /playlist ➔ null (closed crate)
  // /playlist/cover ➔ 0 (Intro CD)
  // /playlist/end ➔ 54 (Outro CD)
  // /playlist/:id ➔ 1 to 53 (Moment CDs)
  const activeCd = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const subRoute = parts[1];
    if (subRoute === "cover") return 0;
    if (subRoute === "end") return 54;
    const parsed = parseInt(subRoute, 10);
    return isNaN(parsed) ? null : parsed;
  }, [location.pathname]);

  const cds = useMemo(() => {
    const list = [];
    // 1. Golden Intro CD
    list.push({
      id: 0,
      path: "/playlist/cover",
      name: "Opening Anthem",
      isSpecial: "gold",
      image: introConductor,
      fileName: "cover"
    });
    // 2. Moments CDs
    SCRAPBOOK_IMAGES.forEach((img, i) => {
      list.push({
        id: i + 1,
        path: `/playlist/${i + 1}`,
        name: `Moment Track ${i + 1}`,
        isSpecial: false,
        image: img,
        fileName: SCRAPBOOK_IMAGE_NAMES[i] || ""
      });
    });
    // 3. Silver Outro CD
    list.push({
      id: 54,
      path: "/playlist/end",
      name: "Closing Outro",
      isSpecial: "silver",
      image: introConductor,
      fileName: "end"
    });
    return list;
  }, []);

  // Helper to get playlist entry for a CD id
  const getPlaylistEntry = (cdId: number | null): string | string[] => {
    if (cdId === null) return "";
    if (cdId === 0) return PLAYLIST_SONGS["cover"] || "";
    if (cdId === 54) return PLAYLIST_SONGS["end"] || "";
    const cdItem = cds.find(c => c.id === cdId);
    if (cdItem && cdItem.fileName) {
      return PLAYLIST_SONGS[cdItem.fileName] || "";
    }
    return "";
  };

  const [activeSongIndex, setActiveSongIndex] = useState(0);

  // Reset active song index when CD changes
  useEffect(() => {
    setActiveSongIndex(0);
  }, [activeCd]);


  // Sync playback state & trigger note rain when a CD opens (with autoplay support)
  useEffect(() => {
    if (activeCd !== null) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowMusicNoteRain(true);
      shouldAutoPlayRef.current = true;

      const timer = setTimeout(() => {
        setShowMusicNoteRain(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      shouldAutoPlayRef.current = false;
      setIsPlaying(false);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    }
  }, [activeCd]);

  // Splash Screen control based on pathname
  useEffect(() => {
    if (location.pathname !== "/playlist") {
      setShowSplash(false);
    }
  }, [location.pathname]);

  // Load the corresponding audio track when activeCd or activeSongIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playlistEntry = getPlaylistEntry(activeCd);
    const trackSrc = Array.isArray(playlistEntry)
      ? (playlistEntry[activeSongIndex] || "")
      : playlistEntry as string;

    if (trackSrc && isValidAudioSrc(trackSrc)) {
      audio.src = trackSrc;
      audio.load();
    } else {
      audio.src = '';
    }
    setCurrentTime(0);
    setIsPlaying(false);
  }, [activeCd, activeSongIndex, cds]);

  // Fallback progress tick when no audio source is loaded
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const audio = audioRef.current;
    const hasRealAudio = audio && isValidAudioSrc(audio.getAttribute('src') || '');

    if (isPlaying && !hasRealAudio) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (isValidAudioSrc(audio.getAttribute('src') || '')) {
        audio.play().catch(err => {
          console.log("Playback error: ", err);
        });
      }
      setIsPlaying(true);
    }
  };

  const handleScrubChange = (val: number) => {
    setCurrentTime(val);
    const audio = audioRef.current;
    if (audio && isValidAudioSrc(audio.getAttribute('src') || '')) {
      audio.currentTime = val;
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    const hasRealAudio = audio && isValidAudioSrc(audio.getAttribute('src') || '');
    if (hasRealAudio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setDuration(audio.duration);
    } else {
      setDuration(180);
    }
  };

  const onCanPlay = () => {
    const audio = audioRef.current;
    if (audio && shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Autoplay blocked: ", err);
          setIsPlaying(false);
        });
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // CD list has been moved up to resolve hoisting issues

  // Split CDs into 3 rows for stacking in the crate
  const rows = useMemo(() => {
    const chunkSize = Math.ceil(cds.length / 3);
    const r1 = cds.slice(0, chunkSize);
    const r2 = cds.slice(chunkSize, chunkSize * 2);
    const r3 = cds.slice(chunkSize * 2);
    return [r1, r2, r3];
  }, [cds]);


  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get active CD details
  const currentCd = activeCd !== null ? cds.find(c => c.id === activeCd) || null : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-[100svh] w-full bg-zinc-950 overflow-hidden relative selection:bg-purple-800 selection:text-purple-200 font-sans flex flex-col items-center justify-center p-2 md:p-8 wood-floor"
    >
      {/* Hidden audio element for Google Drive streaming */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={onCanPlay}
        onEnded={onEnded}
        preload="auto"
      />
      {/* Wood plank horizontal seams simulated via styling */}
      <style>{`
        .wood-floor {
          background-color: #2b1810;
          background-image: 
            repeating-linear-gradient(90deg, transparent, transparent 150px, rgba(0,0,0,0.3) 150px, rgba(0,0,0,0.3) 153px),
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px);
          background-size: 300px 100%, 100% 120px;
        }
      `}</style>

      {/* Ambient warm lighting overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,_rgba(251,191,36,0.14)_0%,_transparent_75%)] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_90%,_rgba(168,85,247,0.1)_0%,_transparent_55%)] z-10" />

      {/* Background drifting music symbols */}
      <BackgroundDecor />

      {/* Page Rain transition effect */}
      <MusicNoteRain active={showMusicNoteRain} />

      {/* Intro Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#141210] flex flex-col items-center justify-center p-6 text-center select-none overflow-y-auto"
          >
            <div className="absolute inset-3 md:inset-4 border border-purple-800/10 pointer-events-none rounded-2xl" />
            <div className="absolute inset-4 md:inset-5 border border-dashed border-purple-800/5 pointer-events-none rounded-2xl" />

            <div className="flex flex-col items-center max-w-lg mx-auto gap-5 md:gap-7 my-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="w-full max-w-[200px] md:max-w-[240px] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-4 border-amber-950/20 relative animate-pulse"
                style={{ animationDuration: '3.5s' }}
              >
                <img src={introConductor} alt="Portrait Intro" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-500 px-2 tracking-wide uppercase">
                  காதல் இசை • Our Playlist
                </h1>
                <p className="text-xs text-amber-200/60 leading-relaxed font-serif italic max-w-xs mx-auto">
                  "உன் இதயம் மீட்டும் இசையிலே என் உலகம் சுழலுதடி... 🎵"
                </p>
                <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto" />
              </div>

              <motion.button
                onClick={() => setShowSplash(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium text-[10px] md:text-xs uppercase tracking-widest shadow-lg cursor-pointer transition-all border border-red-500/30 font-sans mt-2"
              >
                Open Crate • பெட்டியைத் திறக்கவும் 🎵
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Playlist View: The CD Crate */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-5xl">

        {/* Back to library signpost */}
        {!activeCd && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="mb-8 px-5 py-2 rounded-lg bg-stone-900/65 border border-amber-950/40 text-amber-400 hover:text-amber-300 font-serif text-xs uppercase tracking-widest flex items-center gap-2 shadow-md hover:bg-stone-900/80 transition-all cursor-pointer select-none"
          >
            <FolderHeart className="w-4 h-4" />
            <span>Back to Dashboard 📚</span>
          </motion.button>
        )}

        {/* Vintage red crate holding row stacks of CDs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.1
          }}
          className={`relative w-full max-w-[850px] p-6 pb-20 rounded-2xl border-t-8 border-red-500 bg-gradient-to-b from-red-600 via-red-700 to-red-800 shadow-[0_35px_80px_rgba(0,0,0,0.8)] flex flex-col gap-6 select-none transition-all duration-500 ${activeCd !== null ? 'blur-sm scale-95 opacity-30 pointer-events-none' : ''}`}
        >
          {/* Internal shadow floor of the crate */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent rounded-2xl pointer-events-none z-0" />

          {/* Crate Handles side slots */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-24 bg-red-950/90 border border-red-800/40 rounded-full z-10 shadow-inner" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-24 bg-red-950/90 border border-red-800/40 rounded-full z-10 shadow-inner" />

          {/* Rows of standing CD jewel cases */}
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            {rows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="relative flex items-center justify-center bg-black/60 rounded-xl px-4 py-3 border border-red-900/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] h-32 md:h-36 overflow-hidden"
              >
                {/* Horizontal metal dividers/rack bars */}
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-red-900/40 border-b border-white/5 pointer-events-none" />

                {/* Overlapping stacked CDs */}
                <div className="flex -space-x-4 md:-space-x-5 overflow-visible">
                  {row.map((cd, cdIdx) => {
                    const isGold = cd.isSpecial === "gold";
                    const isSilver = cd.isSpecial === "silver";

                    return (
                      <motion.div
                        key={cd.id}
                        whileHover={{
                          y: -24,
                          scale: 1.08,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 350, damping: 18 }
                        }}
                        onClick={() => navigate(cd.path)}
                        className={`w-12 h-24 md:w-14 md:h-28 rounded-sm relative cursor-pointer border border-white/10 shadow-[2px_5px_8px_rgba(0,0,0,0.5)] transform-gpu origin-bottom flex flex-col justify-between p-1 bg-zinc-950 transition-shadow hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)]`}
                      >
                        {/* CD Shiny Spine Highlight */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/20 pointer-events-none" />

                        {/* Jewel Case Tray backing lines */}
                        <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-stone-900 border-l border-white/5" />

                        {/* Top corner track badge */}
                        <div className={`text-[7px] md:text-[8px] font-mono text-center tracking-tighter py-0.5 rounded ${isGold ? 'bg-amber-500/30 text-amber-300' :
                            isSilver ? 'bg-stone-500/30 text-stone-300' : 'bg-purple-900/30 text-purple-300'
                          }`}>
                          {cd.id === 0 ? "INTRO" : cd.id === 54 ? "OUTRO" : cd.id.toString().padStart(2, '0')}
                        </div>

                        {/* Colored spine strip */}
                        <div className={`h-8 w-1.5 mx-auto rounded-full ${isGold ? 'bg-amber-400' :
                            isSilver ? 'bg-stone-400' :
                              cd.id % 2 === 0 ? 'bg-purple-500' : 'bg-pink-500'
                          }`} />

                        {/* Romantic minimal logo on the spine */}
                        <div className="text-[7px] text-white/40 flex justify-center pb-0.5 font-sans font-bold">
                          {isGold || isSilver ? <Sparkles className="w-2 h-2 text-amber-300" /> : "♪"}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Front Crate Brand Label (Coca-Cola style) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#fffdf9] border-2 border-red-950 px-10 py-1.5 rounded-md shadow-lg transform -rotate-1 flex flex-col items-center select-none pointer-events-none z-10">
            <span className="font-serif font-black text-red-700 tracking-wider text-xs md:text-sm uppercase italic">
              Our Playlist Crate
            </span>
            <span className="text-[7px] text-red-900/40 uppercase tracking-widest font-sans font-bold -mt-0.5">
              Est. 2026 • For Divya
            </span>
          </div>

          {/* Decorative crate hollow grid cutouts */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-10 flex justify-between px-6 pointer-events-none z-0">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-6 h-10 bg-red-950 border border-red-800/40 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
            ))}
          </div>
        </motion.div>

        {/* Retro Title below crate */}
        {!activeCd && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center select-none pointer-events-none"
          >
            <h2 className="text-sm font-serif font-bold text-amber-500/80 uppercase tracking-widest flex items-center gap-1.5 justify-center">
              <Music className="w-3.5 h-3.5" />
              <span>காதல் இசை • The Music Crate</span>
            </h2>
            <p className="text-[10px] text-amber-200/45 italic font-serif mt-1">
              Select any mystery CD jewel case to play the song and open its memory liner booklet.
            </p>
          </motion.div>
        )}
      </div>

      {/* Immersive Selected CD Case Player Overlay */}
      <AnimatePresence>
        {activeCd !== null && currentCd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Close Button / Eject */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/playlist')}
              className="absolute top-4 right-4 px-5 py-2.5 rounded-full bg-red-700 hover:from-red-600 hover:to-red-700 text-white font-medium text-[10px] md:text-xs uppercase tracking-widest shadow-lg border border-red-500/30 cursor-pointer flex items-center gap-2 z-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Eject CD ⏏️</span>
            </motion.button>

            {/* The Open CD Jewel Case Container */}
            <motion.div
              initial={{ scale: 0.88, y: 40, rotateX: 15, rotateY: -6, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 40, rotateX: -15, rotateY: 6, opacity: 0, transition: { delay: 0.4, duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 120, damping: 19 }}
              className="w-full max-w-[950px] aspect-auto md:aspect-[16/9] bg-[#141211] rounded-2xl shadow-[0_35px_80px_rgba(0,0,0,0.85)] border border-stone-850 flex flex-col md:flex-row relative z-40"
              style={{ transformStyle: "preserve-3d", perspective: 1500 }}
            >
              {/* Spine Line Hinge Divider */}
              <div className="absolute left-1/2 top-0 bottom-0 w-2.5 -ml-[5px] bg-[#1e1b18] border-x border-[#0e0c0b] shadow-[inset_0_0_8px_rgba(0,0,0,0.9)] z-20 pointer-events-none hidden md:block" />

              {/* 3D Swing Cover Cover */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -110 }}
                exit={{ rotateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 18,
                  delay: 0.3
                }}
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d"
                }}
                className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 bg-stone-900 border border-stone-850 rounded-l-2xl z-30 shadow-2xl flex flex-col items-center justify-center p-6 select-none pointer-events-none animate-none"
              >
                {/* Glossy Jewel Case Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10 pointer-events-none" />
                {/* Inner Plastic Border */}
                <div className="absolute inset-3 border-4 border-stone-800 rounded-lg pointer-events-none z-10" />

                <div className="w-44 h-44 md:w-48 md:h-48 rounded-lg overflow-hidden border border-white/10 shadow-lg relative z-0 mb-4 bg-stone-950">
                  <img src={currentCd.image} alt={currentCd.name} className="w-full h-full object-cover" />
                </div>

                <div className="text-center z-10 space-y-1.5">
                  <span className="text-[9px] font-mono text-purple-400 font-bold tracking-widest uppercase">
                    {activeCd === 0 ? "INTRO CD" : activeCd === 54 ? "OUTRO CD" : `MOMENT TRACK ${activeCd}`}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                    {activeCd === 0 ? "Opening Anthem" : activeCd === 54 ? "Closing Outro" : `Memory Disc ${activeCd}`}
                  </h3>
                  <div className="w-12 h-[1px] bg-purple-500/30 mx-auto" />
                  <span className="text-[8px] text-white/40 uppercase tracking-widest font-sans font-semibold block">
                    Love Collection Vol. 2
                  </span>
                </div>
              </motion.div>

              {/* LEFT WING: Cover Photo, QR Code & Player controls */}
              <div
                className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none bg-zinc-950 select-none"
              >
                {/* Full-bleed background cover image */}
                <img
                  src={currentCd.image}
                  alt={currentCd.name}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
                />

                {/* Vignette overlay removed per user request */}

                {/* Main Content Area */}
                <div
                  onClick={togglePlay}
                  className="relative z-20 flex-1 flex flex-col items-center justify-center cursor-pointer group"
                >
                  {/* Hover play/pause overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div
                      className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100' : 'opacity-90 scale-100'
                        }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-white text-white" />
                      ) : (
                        <Play className="w-6 h-6 fill-white text-white translate-x-[1.5px]" />
                      )}
                    </div>
                  </div>

                  {/* Multi-track song selection pills */}
                  {activeCd !== null && Array.isArray(getPlaylistEntry(activeCd)) && (getPlaylistEntry(activeCd) as string[]).length > 1 && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-4 flex gap-2.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg z-30"
                    >
                      {(getPlaylistEntry(activeCd) as string[]).map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSongIndex(index);
                            const audio = audioRef.current;
                            if (audio) {
                              const trackSrc = (getPlaylistEntry(activeCd) as string[])[index] || "";
                              if (isValidAudioSrc(trackSrc)) {
                                shouldAutoPlayRef.current = true;
                                audio.src = trackSrc;
                                audio.load();
                              }
                            }
                          }}
                          className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeSongIndex === index
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-white/20"
                              : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                          Song {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>


                {/* Floating romantic music notes */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <AnimatePresence>
                    {isPlaying && Array.from({ length: 5 }).map((_, i) => {
                      const symbols = ["🎵", "♪", "♫", "♩", "💜"];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 320, x: 40 + i * 45, scale: 0.6 }}
                          animate={{
                            opacity: [0, 0.75, 0],
                            y: 40,
                            x: 40 + i * 45 + Math.sin(currentTime + i) * 20,
                            scale: [0.6, 1.1, 0.7]
                          }}
                          transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.9 }}
                          className="absolute text-purple-300 font-serif drop-shadow-lg text-sm md:text-base"
                        >
                          {symbols[i % symbols.length]}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Visualizer overlay at the bottom */}
                <div className="relative z-30 w-full flex flex-col gap-2 pointer-events-none">
                  {/* Track Info Badge */}
                  <div className="flex items-center justify-between text-white/90">
                    <span className="text-[8px] font-bold font-mono tracking-widest text-purple-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/5">
                      {activeCd === 0 ? "INTRO CD" : activeCd === 54 ? "OUTRO CD" : `MOMENT TRACK ${activeCd}`}
                    </span>
                    {isPlaying && (
                      <span className="text-[7.5px] font-mono text-purple-300 animate-pulse tracking-wide font-bold">
                        PLAYING • {formatTime(currentTime)}
                      </span>
                    )}
                  </div>

                  {/* Visualizer frequency bars */}
                  <div className="flex gap-[3.5px] items-end justify-center h-8 bg-black/40 backdrop-blur-xs py-1 px-3 rounded-xl border border-white/10 shadow-lg">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const delays = [0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0.6, 0.2, 0.5, 0.3, 0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0.6, 0.2, 0.5, 0.3, 0.1, 0.4, 0.2, 0.5, 0.1, 0.3, 0.6, 0.2];
                      return (
                        <motion.div
                          key={i}
                          className="w-[2.5px] bg-gradient-to-t from-purple-400 via-pink-500 to-amber-300 rounded-full"
                          animate={isPlaying ? {
                            height: [4, 24, 6, 28, 4],
                          } : {
                            height: 4
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: delays[i]
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT WING: Liner Notes Booklet Insert */}
              <div className="w-full md:w-1/2 h-full bg-[#fcfaf4] relative flex flex-col overflow-y-auto rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                {/* Visual shadow effect on the page spine seam */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/[0.08] to-transparent pointer-events-none z-10" />
                <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-white/70 shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none z-10" />

                {/* Conditional render of CD booklet pages */}
                <div className="flex-1 min-h-0 relative z-0 flex flex-col justify-center items-center">
                  {activeCd === 0 ? (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <PlaylistCover />
                    </div>
                  ) : activeCd === 54 ? (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <PlaylistEnd />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <ScrapbookJournalPage pageNumber={activeCd} />
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
