import { motion } from "motion/react";
import { Send } from "lucide-react";
import React, { useState } from "react";

export const Note = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="w-full h-full max-w-sm mx-auto flex flex-col justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="text-center shrink-0">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-rose-900 font-display"
        >
          Leave A Note
        </motion.h1>
      </div>

      <div className="w-full relative flex-1 min-h-0 perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="h-full bg-[length:100%_28px] md:bg-[length:100%_32px] bg-left-top shadow-md border border-rose-100 p-5 md:p-8 rounded-lg overflow-hidden flex flex-col"
          style={{
            backgroundImage: "linear-gradient(transparent 95%, #fca5a5 100%)",
            backgroundColor: "#fffdf9"
          }}
        >
          {/* Vertical margin line for the paper */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-rose-200/50 shadow-sm z-0" />
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full gap-4 md:gap-5 pt-1">
            <div className="space-y-0.5">
              <label className="text-[10px] md:text-xs font-semibold text-rose-800 ml-1 uppercase tracking-wider">Cute nickname</label>
              <input
                type="text"
                placeholder="Honey, Babe..."
                className="w-full px-2 py-0.5 md:py-1 bg-transparent border-none focus:outline-none focus:ring-0 text-rose-950 placeholder:text-rose-300 font-medium text-sm md:text-base border-b border-transparent focus:border-rose-300 transition-colors"
                required
              />
            </div>
            <div className="space-y-0.5">
              <label className="text-[10px] md:text-xs font-semibold text-rose-800 ml-1 uppercase tracking-wider">Dinner plans?</label>
              <input
                type="text"
                placeholder="Pizza? Sushi?"
                className="w-full px-2 py-0.5 md:py-1 bg-transparent border-none focus:outline-none focus:ring-0 text-rose-950 placeholder:text-rose-300 font-medium text-sm md:text-base border-b border-transparent focus:border-rose-300 transition-colors"
              />
            </div>
            <div className="space-y-0.5 flex-1 flex flex-col">
              <label className="text-[10px] md:text-xs font-semibold text-rose-800 ml-1 uppercase tracking-wider">Sweet message</label>
              <textarea
                placeholder="Whisper sweet nothings..."
                className="w-full px-2 py-0.5 md:py-1 flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-rose-950 placeholder:text-rose-300 italic font-medium text-[13px] md:text-sm resize-none border-b border-transparent focus:border-rose-300 transition-colors"
                style={{ lineHeight: "28px" }}
                required
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold shadow-md shadow-pink-500/30 text-sm md:text-base font-display transition-all shrink-0"
            >
              {sent ? "Sent 💋" : "Send Note"} {!sent && <Send className="w-4 h-4 md:w-5 md:h-5" />}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

