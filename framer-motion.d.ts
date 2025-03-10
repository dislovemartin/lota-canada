declare module 'framer-motion' {
  import React from 'react';

  // Basic motion components
  export const motion: {
    [key: string]: React.ForwardRefExoticComponent<any>;
  };

  // AnimatePresence component
  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }>;

  // useInView hook
  export function useInView(
    ref: React.RefObject<HTMLElement>,
    options?: {
      root?: React.RefObject<HTMLElement>;
      margin?: string;
      amount?: 'some' | 'all' | number;
      once?: boolean;
    }
  ): boolean;

  // Other exports as needed
  export type Variant = {
    [key: string]: string | number | boolean | Variant;
  };

  export type Variants = {
    [key: string]: Variant;
  };

  export type Transition = {
    delay?: number;
    duration?: number;
    ease?: string | number[];
    type?: string;
    staggerChildren?: number;
    staggerDirection?: number;
    repeat?: number;
    repeatType?: 'loop' | 'reverse' | 'mirror';
    [key: string]: any;
  };
} 