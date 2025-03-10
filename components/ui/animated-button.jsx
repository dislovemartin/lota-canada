"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export function AnimatedButton({ children, href, onClick, variant = "primary", size = "md", className, icon = true, }) {
    const [isHovered, setIsHovered] = useState(false);
    const baseStyles = "relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300";
    const variantStyles = {
        primary: "bg-black text-white hover:bg-black/90",
        secondary: "bg-white text-black hover:bg-gray-100 border border-gray-200",
        outline: "bg-transparent border border-black text-black hover:bg-black/5",
    };
    const sizeStyles = {
        sm: "text-sm px-4 py-2",
        md: "px-6 py-3",
        lg: "text-lg px-8 py-4",
    };
    const ButtonContent = () => (<>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (<ArrowRight className={cn("transition-transform duration-300", isHovered ? "translate-x-1" : "")} size={size === "sm" ? 16 : size === "lg" ? 20 : 18}/>)}
      </span>
      <span className={cn("absolute inset-0 z-0 scale-x-0 transition-transform duration-300 origin-left", variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-gray-200" : "bg-black/10")} style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
        }}/>
    </>);
    if (href) {
        return (<a href={href} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <ButtonContent />
      </a>);
    }
    return (<button onClick={onClick} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ButtonContent />
    </button>);
}
