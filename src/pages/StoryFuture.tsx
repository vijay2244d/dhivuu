import { motion } from "motion/react";
import { Infinity } from "lucide-react";

export const StoryFuture = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start space-y-4 md:space-y-6 pt-10 pb-24 px-4 md:p-8 overflow-y-auto overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col w-full max-w-sm md:max-w-md mx-auto"
      >
        <div className="flex flex-col items-center text-center gap-4 bg-white/80 p-5 md:p-8 rounded-[2rem] shadow-sm border border-rose-50">
          <div className="bg-rose-100 p-3 md:p-4 mx-auto rounded-full text-rose-600 border border-rose-200">
            <Infinity className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-rose-900 font-display mt-1 md:mt-2">Future</h1>
          
          <p className="text-rose-800/90 text-[13px] md:text-base leading-snug md:leading-relaxed font-medium mt-4 text-justify">
            I know the future of ours is going to be an wholesome and sarcastic by your families and as well as mines also I want to create an family by your wish and definitely your are the one to rule me and our family like the couple in the “padayappa” there is no for an single doubt we built the house with the wholesome and joyful for the rest of our life we can talk do the stuff we want, need... If the wall has an chance to tell about the our life the wall should be speechless because of our life🌚
          </p>
        </div>
      </motion.div>
    </div>
  );
};

