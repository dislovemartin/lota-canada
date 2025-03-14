"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const liquidTextVariants = cva("inline-block relative", {
  variants: {
    variant: {
      liquid: "text-primary",
      bounce: "text-secondary",
      wave: "text-foreground",
      reveal: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
      gradient: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
  defaultVariants: {
    variant: "liquid",
    size: "xl",
  },
});

export interface LiquidTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof liquidTextVariants> {
  text: string;
  triggerOnce?: boolean;
  delay?: number;
  staggerChildren?: number;
  interactive?: boolean;
}

export function LiquidText({
  className,
  variant,
  size,
  text,
  triggerOnce = true,
  delay = 0,
  staggerChildren = 0.02,
  interactive = false,
  ...props
}: LiquidTextProps) {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  // Split text into individual characters
  const characters = text.split("");

  // Define animation variants for the container
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Define animation variants based on the selected variant
  const getLiquidVariants = (index: number): Variants => {
    return {
      hidden: {
        y: 15,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: delay + index * staggerChildren,
        },
      },
      hover: {
        y: -5,
        scale: 1.1,
        transition: {
          duration: 0.3,
          delay: index * 0.02,
        },
      },
    };
  };

  const getBounceVariants = (index: number): Variants => {
    return {
      hidden: {
        y: -20,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 5,
          stiffness: 200,
          delay: delay + index * staggerChildren,
        },
      },
      hover: {
        y: -10,
        transition: {
          duration: 0.4,
          yoyo: Infinity,
          delay: index * 0.02,
        },
      },
    };
  };

  const getWaveVariants = (index: number): Variants => {
    return {
      hidden: {
        y: 0,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          delay: delay + index * staggerChildren,
        },
      },
      hover: {
        y: -15,
        transition: {
          duration: 0.6,
          delay: index * 0.05,
          repeat: Infinity,
          repeatType: "mirror",
        },
      },
    };
  };

  const getRevealVariants = (index: number): Variants => {
    return {
      hidden: {
        opacity: 0,
        scale: 1.5,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 150,
          delay: delay + index * staggerChildren,
        },
      },
      hover: {
        scale: 1.2,
        rotate: 5,
        transition: {
          duration: 0.3,
          delay: index * 0.02,
          repeatType: "mirror",
          repeat: Infinity,
        },
      },
    };
  };

  const getGradientVariants = (index: number): Variants => {
    return {
      hidden: {
        opacity: 0,
        x: -10,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.8,
          delay: delay + index * staggerChildren,
        },
      },
      hover: {
        scale: 1.2,
        transition: {
          duration: 0.8,
          delay: index * 0.03,
          yoyo: 1,
        },
      },
    };
  };

  // Get the appropriate variants based on the selected animation style
  const getCharacterVariants = (index: number) => {
    switch (variant) {
      case "liquid":
        return getLiquidVariants(index);
      case "bounce":
        return getBounceVariants(index);
      case "wave":
        return getWaveVariants(index);
      case "reveal":
        return getRevealVariants(index);
      case "gradient":
        return getGradientVariants(index);
      default:
        return getLiquidVariants(index);
    }
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.span
      className={cn(liquidTextVariants({ variant, size, className }))}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      {...props}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={getCharacterVariants(index)}
          animate={hovered ? "hover" : "visible"}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
} 