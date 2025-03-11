"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "button";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant={variant === "button" ? "outline" : "ghost"}
        size={variant === "button" ? "sm" : "icon"}
        className={className}
        disabled
        aria-label="Theme toggle (loading)"
      >
        {variant === "button" ? "Theme" : <Sun className="h-5 w-5" />}
      </Button>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={className}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-4 w-4 mr-2" aria-hidden="true" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 mr-2" aria-hidden="true" />
            Dark Mode
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 transition-all" aria-hidden="true" />
          ) : theme === "light" ? (
            <Sun className="h-5 w-5 transition-all" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-5 w-5 transition-all" aria-hidden="true" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" aria-hidden="true" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" aria-hidden="true" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
