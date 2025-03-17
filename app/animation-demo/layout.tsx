import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animation Components Demo | LOTA Canada",
  description:
    "Explore our collection of reusable animation components built with Framer Motion",
};

export default function AnimationDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="animation-demo-layout">{children}</div>;
}
