'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { useEffect } from 'react';

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string, external?: boolean) => {
    onClose();
    if (!external && href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white dark:bg-gray-950 shadow-2xl z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
              <Button
                color="tertiary"
                size="sm"
                onClick={onClose}
                className="w-9 h-9 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="space-y-2"
              >
                {links.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        className="flex items-center px-4 py-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors active:bg-gray-200 dark:active:bg-gray-700"
                        onClick={() => handleLinkClick(link.href, true)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="flex items-center px-4 py-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors active:bg-gray-200 dark:active:bg-gray-700"
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                          }
                          handleLinkClick(link.href);
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                © {new Date().getFullYear()} Jai M Sanghavi
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
