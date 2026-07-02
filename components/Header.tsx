'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ChildLink = { path: string; label: string };
type NavItem = { path?: string; label: string; children?: ChildLink[] };

const navLinks: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  {
    label: 'Orthopedic',
    children: [
      { path: '/treatments/robotic-knee-replacement-pune', label: 'Robotic Knee Replacement' },
      { path: '/treatments/shoulder-surgery-pune', label: 'Shoulder Surgery' },
      { path: '/treatments/knee-surgery-pune', label: 'Knee Surgery' },
      { path: '/treatments/joint-replacement-surgery-pune', label: 'Joint Replacement' },
      { path: '/treatments/hip-surgery-pune', label: 'Hip Surgery' },
      { path: '/treatments/regenerative-medicine', label: 'Regenerative Medicine' },
    ],
  },
  { path: '/sports-medicine', label: 'Sports Medicine' },
  { path: '/expertise', label: 'Expertise' },
  { path: '/blog', label: 'Blog' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (link: NavItem) => {
    if (link.path) return pathname === link.path;
    return link.children?.some((c) => pathname.startsWith('/' + c.path.split('/')[1])) ?? false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-soft' : 'bg-white border-b border-neutral-100'
      }`}
      ref={headerRef}
    >
      {/* CRITICAL FIX: Changed from container-custom to match the exact max-width (1350px) 
        and padding classes (px-6 md:px-12 lg:px-16) used in your HeroCarousel text container!
      */}
      <div className="w-full max-w-[1350px] mx-auto h-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        
        {/* LOGO BLOCK - Aligns perfectly down the vertical axis with the hero content */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="/logo.bmp"
            alt="Dr. Sumedh Magar Logo"
            className="w-14 h-14 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-secondary text-base sm:text-lg leading-tight whitespace-nowrap">
              Dr. Sumedh Magar
            </span>
            <span className="text-xs text-neutral-600 whitespace-nowrap">
              Sports Orthopedic Surgeon
            </span>
          </div>
        </Link>

        {/* SPACER GAPS: Adjusted space-x rules and added xl:gap-2 to give 
          the menu tabs a clean, breathable separator logic.
        */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                      isActive(link)
                        ? 'text-primary bg-primary/10'
                        : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 lg:left-0 mt-2 w-60 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 overflow-hidden z-50"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block px-4 py-2.5 text-sm text-neutral-700 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                href={link.path!}
                className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                  pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-secondary hover:bg-secondary/10 rounded-xl transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE EXPANDABLE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-200 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col space-y-1">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() =>
                          setExpandedMobile(expandedMobile === link.label ? null : link.label)
                        }
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive(link)
                            ? 'text-primary bg-primary/10'
                            : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedMobile === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobile === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 flex flex-col space-y-0.5"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.path}
                                href={child.path}
                                className="px-4 py-2.5 rounded-xl text-sm text-neutral-600 hover:text-primary hover:bg-primary/5 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    href={link.path!}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};