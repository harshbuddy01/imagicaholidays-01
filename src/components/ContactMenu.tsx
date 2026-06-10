'use client';

import { motion } from 'framer-motion';

export default function ContactMenu() {
  const whatsappNumber = "918235337180";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays.`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center">
      {/* Pulse ring animation */}
      <div className="absolute w-16 h-16 bg-[#25D366]/30 rounded-full animate-ping pointer-events-none" />

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] border-2 border-white/20 transition-all duration-300 z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          fill="currentColor" 
          className="bi bi-whatsapp text-white" 
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.562 7.93-7.93a7.9 7.9 0 0 0-2.327-5.592M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-5.454c-.19-.095-1.125-.556-1.298-.622-.173-.067-.3-.098-.426.095-.126.192-.489.621-.6.745-.11.124-.22.14-.41.045-1.82-.91-3.064-2.525-3.51-3.293-.11-.19-.01-.291.085-.386.09-.088.192-.221.288-.33.095-.11.13-.186.195-.31.065-.125.033-.233-.017-.33-.05-.095-.426-1.028-.584-1.41-.154-.372-.325-.322-.426-.327-.1-.004-.215-.004-.33-.004a.64.64 0 0 0-.462.216c-.16.173-.61.597-.61 1.458s.627 1.696.715 1.815c.088.12 1.234 1.884 2.99 2.642.417.18.74.287.993.367.42.132.802.113 1.102.068.334-.05 1.125-.46 1.282-.905.158-.445.158-.826.11-.905-.047-.08-.173-.127-.363-.222"/>
        </svg>
      </motion.a>
    </div>
  );
}
