"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as React from "react"
import { SafeChildren } from "./safe-children"

const Collapsible = CollapsiblePrimitive.Root

// Wrap the CollapsibleTrigger to ensure it only receives a single child
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ children, ...props }, ref) => {
  // Check if children is a valid React element
  const isValidElement = React.isValidElement(children);
  
  // If it's not a valid element or it's a fragment, wrap it in SafeChildren
  const safeChildren = isValidElement ? 
    children : 
    <SafeChildren>{children}</SafeChildren>;
  
  return (
    <CollapsiblePrimitive.CollapsibleTrigger ref={ref} {...props}>
      {safeChildren}
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
});
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleContent, CollapsibleTrigger }

