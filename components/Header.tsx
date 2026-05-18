'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ChildLink = { path: string; label: string };
type NavItem = { path?: string; label: string; children?: ChildLink[] };

const navLinks: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  {
    label: 'Treatments',
    children: [
      { path: '/treatments', label: 'All Treatments' },
      { path: '/treatments/acl-tear-treatment-pune', label: 'ACL Tear Treatment' },
      { path: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
      { path: '/treatments/shoulder-arthroscopy-pune', label: 'Shoulder Arthroscopy' },
      { path: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
      { path: '/treatments/knee-pain-treatment-pune', label: 'Knee Pain' },
      { path: '/treatments/sports-rehabilitation-pune', label: 'Sports Rehabilitation' },
    ],
  },
  {
    label: 'Sports Injuries',
    children: [
      { path: '/sports-injuries', label: 'All Sports Injuries' },
      { path: '/sports-injuries/cricket-injuries', label: 'Cricket Injuries' },
      { path: '/sports-injuries/football-knee-injuries', label: 'Football Injuries' },
      { path: '/sports-injuries/gym-shoulder-injuries', label: 'Gym & Weight Training' },
      { path: '/sports-injuries/runner-knee-pain', label: "Runner's Knee" },
    ],
  },
  { path: '/expertise', label: 'Expertise' },
  { path: '/sports-medicine', label: 'Sports Medicine' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-soft' : 'bg-white/95 backdrop-blur-sm'
      }`}
      ref={headerRef}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-secondary text-lg leading-tight">
                Dr. Sumedh Magar
              </span>
              <span className="text-xs text-neutral-600">Sports Orthopedic Surgeon</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-0.5">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
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
                          className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 overflow-hidden z-50"
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
                  className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-secondary hover:bg-secondary/10 rounded-xl transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-200 overflow-hidden"
          >
            <nav className="container-custom px-4 py-4 flex flex-col space-y-1">
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
