'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Phone number without the '+' for wa.me link
  const whatsappNumber = "918235337180";
  const emailAddress = "info@imagicaholidays.com";

  const handleLiveChat = () => {
    // Check if Chatwoot is loaded globally
    if (typeof window !== 'undefined' && window.$chatwoot) {
      window.$chatwoot.toggle();
    } else {
      console.warn("Chatwoot is not loaded yet.");
    }
  };

  const menuItems = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/${whatsappNumber}?text=Hi%21%20I%27d%20like%20to%20plan%20a%20trip%2E`,
      isExternal: true,
      color: 'bg-green-500 hover:bg-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    },
    {
      label: 'Email',
      href: `mailto:${emailAddress}`,
      isExternal: true,
      color: 'bg-[#1e3a8a] text-white hover:bg-blue-900',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    },
    {
      label: 'Make Inquiry',
      href: '/reserve',
      isExternal: false,
      color: 'bg-zinc-800 text-white hover:bg-black',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      )
    },
    {
      label: 'Live Chat',
      onClick: handleLiveChat,
      color: 'bg-[#d4af37] text-white hover:brightness-110',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, staggerChildren: 0.05 }}
            className="flex flex-col items-end gap-3 mb-4 pointer-events-auto"
          >
            {menuItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: (menuItems.length - idx) * 0.05 }}
                className="flex items-center gap-3 relative group origin-right"
              >
                <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm text-zinc-900 border border-zinc-200 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm font-sans tracking-wide">
                  {item.label}
                </div>
                
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${item.color}`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${item.color}`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-50 relative border-2 border-white/20"
        aria-label="Contact Options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
          )}
        </motion.div>
      </button>
    </div>
  );
}
