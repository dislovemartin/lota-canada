import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | LOTA Canada",
  description:
    "Learn about the Leaders of Tomorrow Association, our mission, leadership team, and how we're fostering the next generation of business leaders in Toronto and beyond.",
};

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <>{children}</>;
}
