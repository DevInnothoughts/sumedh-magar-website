'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SubChildLink = { path: string; label: string };

type ChildItem = {
  path?: string;
  label: string;
  children?: SubChildLink[];
};

type NavItem = {
  path?: string;
  label: string;
  children?: ChildItem[];
};

const navLinks: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  {
    label: 'Orthopedic',
    children: [
      { path: '/treatments/knee-surgery-pune', label: 'Knee Surgery' },
      {
        label: 'Other Services',
        children: [
          { path: '/treatments/robotic-knee-replacement-pune', label: 'Robotic Knee Replacement' },
          { path: '/treatments/shoulder-surgery-pune', label: 'Shoulder Surgery' },
          { path: '/treatments/joint-replacement-surgery-pune', label: 'Joint Replacement' },
          { path: '/treatments/hip-surgery-pune', label: 'Hip Surgery' },
          { path: '/treatments/regenerative-medicine', label: 'Regenerative Medicine' },
        ],
      },
    ],
  },
  { path: '/sports-medicine', label: 'Sports Medicine' },
  // { path: '/expertise', label: 'Expertise' },
  { path: '/blog', label: 'Blog' },
  // { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [expandedMobileSub, setExpandedMobileSub] = useState<string | null>(null);
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
    setOpenSubmenu(null);
    setExpandedMobile(null);
    setExpandedMobileSub(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (link: NavItem) => {
    if (link.path) return pathname === link.path;
    if (!link.children) return false;
    return link.children.some((c) => {
      if (c.path && pathname.startsWith(c.path)) return true;
      if (c.children) {
        return c.children.some((sub) => pathname.startsWith(sub.path));
      }
      return false;
    });
  };

  const isChildActive = (child: ChildItem) => {
    if (child.path) return pathname === child.path;
    if (child.children) {
      return child.children.some((sub) => pathname.startsWith(sub.path));
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-soft' : 'bg-white border-b border-neutral-100'
        }`}
      ref={headerRef}
    >
      <div className="w-full max-w-[1350px] mx-auto h-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* LOGO BLOCK */}
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

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => {
                    setOpenDropdown(null);
                    setOpenSubmenu(null);
                  }}
                >
                  <button
                    onClick={() => {
                      setOpenDropdown(openDropdown === link.label ? null : link.label);
                      setOpenSubmenu(null);
                    }}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${isActive(link)
                        ? 'text-primary bg-primary/10'
                        : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''
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
                        className="absolute top-full left-0 pt-2 z-50"
                      >
                        <div className="w-56 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 py-1.5 overflow-visible">
                          {link.children.map((child) => {
                            if (child.children) {
                              return (
                                <div
                                  key={child.label}
                                  className="relative"
                                  onMouseEnter={() => setOpenSubmenu(child.label)}
                                  onMouseLeave={() => setOpenSubmenu(null)}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenSubmenu(
                                        openSubmenu === child.label ? null : child.label
                                      )
                                    }
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${isChildActive(child)
                                        ? 'text-primary bg-primary/5 font-medium'
                                        : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                                      }`}
                                  >
                                    <span>{child.label}</span>
                                    <ChevronRight
                                      className={`w-4 h-4 transition-transform ${openSubmenu === child.label
                                          ? 'text-primary translate-x-0.5'
                                          : 'text-neutral-400'
                                        }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {openSubmenu === child.label && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-0 left-full pl-2 z-50"
                                      >
                                        <div className="w-64 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 py-1.5">
                                          {child.children.map((sub) => (
                                            <Link
                                              key={sub.path}
                                              href={sub.path}
                                              onClick={() => {
                                                setOpenDropdown(null);
                                                setOpenSubmenu(null);
                                              }}
                                              className={`block px-4 py-2.5 text-sm transition-colors ${pathname === sub.path
                                                  ? 'text-primary bg-primary/10 font-medium'
                                                  : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                                                }`}
                                            >
                                              {sub.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={child.path}
                                href={child.path!}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setOpenSubmenu(null);
                                }}
                                className={`block px-4 py-2.5 text-sm transition-colors ${pathname === child.path
                                    ? 'text-primary bg-primary/10 font-medium'
                                    : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                                  }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
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
                className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${pathname === link.path
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
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive(link)
                            ? 'text-primary bg-primary/10'
                            : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                          }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expandedMobile === link.label ? 'rotate-180' : ''
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
                            {link.children.map((child) => {
                              if (child.children) {
                                return (
                                  <div key={child.label} className="flex flex-col">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedMobileSub(
                                          expandedMobileSub === child.label ? null : child.label
                                        )
                                      }
                                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isChildActive(child)
                                          ? 'text-primary bg-primary/10'
                                          : 'text-neutral-700 hover:text-primary hover:bg-primary/5'
                                        }`}
                                    >
                                      <span>{child.label}</span>
                                      <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${expandedMobileSub === child.label
                                            ? 'rotate-180 text-primary'
                                            : 'text-neutral-400'
                                          }`}
                                      />
                                    </button>
                                    <AnimatePresence>
                                      {expandedMobileSub === child.label && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="ml-3 pl-3 border-l-2 border-primary/20 my-1 flex flex-col space-y-0.5 overflow-hidden"
                                        >
                                          {child.children.map((sub) => (
                                            <Link
                                              key={sub.path}
                                              href={sub.path}
                                              onClick={() => setIsOpen(false)}
                                              className={`px-3 py-2 rounded-lg text-sm transition-colors ${pathname === sub.path
                                                  ? 'text-primary font-semibold'
                                                  : 'text-neutral-600 hover:text-primary'
                                                }`}
                                            >
                                              {sub.label}
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
                                  key={child.path}
                                  href={child.path!}
                                  onClick={() => setIsOpen(false)}
                                  className={`px-4 py-2.5 rounded-xl text-sm transition-colors ${pathname === child.path
                                      ? 'text-primary bg-primary/10 font-semibold'
                                      : 'text-neutral-600 hover:text-primary hover:bg-primary/5'
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
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
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === link.path
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
