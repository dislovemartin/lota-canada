import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "./cta-button";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { navigation } from "./navigation-data";
import type { HeaderProps } from "./types";

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/images/brand/LOTA logo SVG.svg"
              alt="LOTA Canada"
              width={320}
              height={50}
              className="h-8 w-auto dark:invert"
              priority
            />
            <span className="sr-only">LOTA Canada</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <DesktopMenu navigation={navigation} />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CTAButton href="/contact" variant="primary" size="sm">
              Become a Member
            </CTAButton>
          </nav>

          {/* Mobile menu trigger */}
          <MobileMenuTrigger />
        </div>
      </div>
    </header>
  );
}
