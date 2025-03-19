"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { navigation } from "./navigation-data";

export function MobileMenuTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="sr-only">Open menu</span>
        <Menu className="h-6 w-6" />
      </button>

      <MobileMenu
        navigation={navigation}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
