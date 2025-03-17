"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type AnimationVariant =
  | "words"
  | "chars"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  once?: boolean;
}

/**
 * AnimatedText Component
 *
 * A reusable component that animates text with various effects.
 *
 * @example
 * <AnimatedText
 *   text="Welcome to our website"
 *   variant="words"
 *   tag="h1"
 *   className="text-4xl font-bold"
 * />
 */
export function AnimatedText({
  text,
  className,
  variant = "fade",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  tag = "p",
  once = true,
}: AnimatedTextProps) {
  // Split text based on animation variant
  const words = text.split(" ");
  const chars = text.split("");

  // Container variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Animation variants for individual elements
  const itemVariants = {
    words: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    chars: {
      hidden: { y: 20, opacity: 0, rotateZ: 10 },
      visible: {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          ease: "easeOut",
        },
      },
    },
    "slide-up": {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    "slide-down": {
      hidden: { y: -20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    "slide-left": {
      hidden: { x: 20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    "slide-right": {
      hidden: { x: -20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  };

  // Render different animation variants
  const renderAnimatedText = () => {
    switch (variant) {
      case "words":
        return (
          <motion.span
            className="inline-block whitespace-pre-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            variants={containerVariants}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] last:mr-0"
                variants={itemVariants.words}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        );
      case "chars":
        return (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            variants={containerVariants}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={{ marginRight: char === " " ? "0.25em" : "0" }}
                variants={itemVariants.chars}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        );
      default:
        return (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            variants={itemVariants[variant]}
            transition={{ delay }}
          >
            {text}
          </motion.span>
        );
    }
  };

  // Render the component with the appropriate HTML tag
  const Tag = tag;
  return <Tag className={cn(className)}>{renderAnimatedText()}</Tag>;
}
