"use client";

import { ReactNode } from "react";

interface SafeChildrenProps {
  children: ReactNode;
  as?: "div" | "span" | "button" | "a";
  className?: string;
  [key: string]: any;
}

/**
 * SafeChildren component
 *
 * A utility component that ensures children are wrapped in a single element
 * for use with components that use React.Children.only() internally (like Radix UI triggers).
 *
 * @example
 * <TooltipTrigger>
 *   <SafeChildren>
 *     <Icon />
 *     <span>Hover me</span>
 *   </SafeChildren>
 * </TooltipTrigger>
 */
export function SafeChildren({
  children,
  as = "div",
  className = "",
  ...props
}: SafeChildrenProps) {
  const Component = as;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

/**
 * withSafeChildren HOC
 *
 * A higher-order component that wraps a component to ensure it always
 * provides a single child to its parent.
 *
 * @example
 * const SafeButton = withSafeChildren(Button);
 *
 * <TooltipTrigger>
 *   <SafeButton>
 *     <Icon />
 *     <span>Click me</span>
 *   </SafeButton>
 * </TooltipTrigger>
 */
export function withSafeChildren<P extends object>(
  Component: React.ComponentType<P>
) {
  return function SafeComponent(props: P & { className?: string }) {
    return (
      <SafeChildren className={props.className}>
        <Component {...props} />
      </SafeChildren>
    );
  };
}
