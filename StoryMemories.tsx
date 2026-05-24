import { motion } from "motion/react";
import { TiltCard } from "../components/TiltCard";
import { Map } from "lucide-react";

export const StoryFuture = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 md:space-y-6 p-4 md:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col w-full max-w-sm mx-auto perspective-1000 shrink-0"
      >
        <TiltCard className="flex flex-col items-center text-center gap-3 bg-white/80 p-5 md:p-8 shadow-sm border border-rose-50">
          <div style={{ transform: "translateZ(30px)" }} className="bg-rose-100 p-3 md:p-4 mx-auto rounded-full text-rose-600 border border-rose-200">
            <Map className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 style={{ transform: "translateZ(20px)" }} className="text-xl md:text-2xl font-bold text-rose-900 font-display mt-1 md:mt-2">The Future</h3>
          <p style={{ transform: "translateZ(10px)" }} className="text-rose-800/90 text-[10px] md:text-[13px] leading-snug md:leading-relaxed italic">
            "I know the future of ours is going to be an wholesome and sarcastic by your families and as well as mines also I want to create a family by your wish and definitely you are the one to rule me and our family like the couple in “Padayappa” there is no for a single doubt we built the house with the wholesome and joyful for the rest of our life we can talk do the stuff we want, need. If the wall has a chance to tell about our life the wall should be speechless because of our life 🌚"
          </p>
        </TiltCard>
      </motion.div>
    </div>
  );
};
