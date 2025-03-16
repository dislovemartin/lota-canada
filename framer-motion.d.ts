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

  // Motion value hooks
  export function useMotionValue<T = number>(initial: T): {
    get: () => T;
    set: (v: T) => void;
    subscribe: (subscriber: (v: T) => void) => () => void;
    onChange: (callback: (v: T) => void) => () => void;
  };

  // useTransform with callback function (for hero-modern.tsx)
  export function useTransform<T = number>(
    transform: () => T
  ): {
    get: () => T;
    onChange: (callback: (v: T) => void) => () => void;
  };

  // useTransform with input range and output range
  export function useTransform<T>(
    value: { get: () => number },
    inputRange: number[],
    outputRange: T[],
    options?: { clamp?: boolean }
  ): {
    get: () => T;
    onChange: (callback: (v: T) => void) => () => void;
  };

  export function useSpring(
    value: { get: () => number },
    springConfig?: { damping?: number; stiffness?: number; mass?: number }
  ): {
    get: () => number;
    set: (v: number) => void;
    onChange: (callback: (v: number) => void) => () => void;
  };

  // Animation controls
  export function useAnimation(): {
    start: (definition: any, options?: any) => Promise<any>;
    stop: () => void;
    [key: string]: any;
  };

  // Scroll hooks
  export function useScroll(options?: {
    container?: React.RefObject<HTMLElement>;
    target?: React.RefObject<HTMLElement>;
    offset?: string[] | [string, string];
  }): {
    scrollX: {
      get: () => number;
      onChange: (callback: (v: number) => void) => () => void;
    };
    scrollY: {
      get: () => number;
      onChange: (callback: (v: number) => void) => () => void;
    };
    scrollXProgress: {
      get: () => number;
      onChange: (callback: (v: number) => void) => () => void;
    };
    scrollYProgress: {
      get: () => number;
      onChange: (callback: (v: number) => void) => () => void;
    };
  };

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