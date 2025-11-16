'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onNavClick?: (section: string) => void;
}

export const Header = ({ onNavClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About Bitso', id: 'about' },
    { label: 'Prices', id: 'prices' },
    { label: 'Products', id: 'products' },
    { label: 'Support', id: 'support' },
  ]; // ← FIXED: this should end with ";" not "}"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="text-2xl font-bold text-blue-600">
              ₿itso
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                variants={itemVariants}
                onClick={() => onNavClick?.(item.id)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Right side buttons */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Log in
            </button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              Sign up
            </Button>
          </motion.div>

          {/* Mobile menu */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick?.(item.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="px-3 py-2 space-y-2">
              <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600">
                Log in
              </button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                Sign up
              </Button>
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};
