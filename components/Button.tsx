'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
}

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'px-6 py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 shadow-soft hover:shadow-soft-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-soft hover:shadow-soft-lg',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
  };

  const MotionButton = motion.button as React.ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      whileHover?: object;
      whileTap?: object;
    }
  >;

  return (
    <MotionButton
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionButton>
  );
};
