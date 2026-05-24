import { motion } from "motion/react";

export const Note = () => {
  return (
    <div className="w-full h-full max-w-sm mx-auto flex flex-col justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="text-center shrink-0">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-rose-900 font-display"
        >
          The Future
        </motion.h1>
      </div>

      <div className="w-full relative flex-1 min-h-0 perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="h-full bg-[length:100%_28px] md:bg-[length:100%_32px] bg-left-top shadow-md border border-rose-100 p-5 md:p-8 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "linear-gradient(transparent 95%, #fca5a5 100%)",
            backgroundColor: "#fffdf9"
          }}
        >
          {/* Vertical margin line for the paper */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-rose-200/50 shadow-sm z-0" />
          
          <div className="relative z-10 w-full px-4">
            <p className="text-rose-800/90 text-lg md:text-xl font-medium leading-relaxed italic font-display" style={{ lineHeight: "32px", transform: "translateZ(10px)" }}>
              The remaining page is to be written in the future by hand...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

