import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-lg font-semibold shadow-md hover:translate-y-[-1px] border border-transparent",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-semibold shadow-md hover:shadow-lg hover:translate-y-[-1px] border border-transparent",
        outline:
          "border-2 border-gray-300 bg-transparent text-gray-800 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white font-semibold hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-700 font-semibold shadow-sm hover:shadow-md hover:translate-y-[-1px] border border-transparent",
        ghost: "text-gray-800 dark:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white font-semibold",
        link: "text-black dark:text-white underline-offset-4 hover:underline font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300",
        primary: "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 font-bold shadow-md hover:shadow-lg hover:translate-y-[-1px] border border-transparent",
        accent: "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-black font-bold shadow-md hover:shadow-lg hover:translate-y-[-1px] border border-transparent",
      },
      size: {
        default: "h-10 px-5 py-2", // Slightly more horizontal padding
        sm: "h-9 rounded-md px-4", // Slightly more horizontal padding
        lg: "h-12 rounded-md px-8 text-base", // Taller with larger text
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Add subtle shine effect for non-outline/ghost/link variants */}
        {variant !== 'outline' && variant !== 'ghost' && variant !== 'link' && (
          <span className="absolute inset-0 overflow-hidden rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300">
            <span className="absolute top-0 left-[calc(-100%)] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-[-20deg] group-hover:animate-[shine_1.5s_ease_forwards]"></span>
          </span>
        )}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
