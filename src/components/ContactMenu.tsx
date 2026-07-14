'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactMenu() {
  const whatsappNumber = "918235337180";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi!%20I'd%20like%20to%20plan%20a%20trip%20with%20Imagica%20Holidays.`;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999] flex items-center justify-center">
      {/* Pulse ring animation */}
      <div className="absolute w-16 h-16 bg-[#25D366]/30 rounded-full animate-ping pointer-events-none" />

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] border-2 border-white/20 transition-all duration-300 z-50 overflow-hidden"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative w-9 h-9 select-none">
          <Image
            src="/whatsapp_logo.png"
            alt="WhatsApp Chat"
            fill
            className="object-contain"
          />
        </div>
      </motion.a>
    </div>
  );
}
