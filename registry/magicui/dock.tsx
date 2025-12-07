"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "middle" | "right";
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ direction = "middle", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-direction={direction}
        className={cn(
          "group/dock relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-2 shadow-lg shadow-black/20 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-2xl",
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-white/5 after:opacity-0 after:transition-opacity group-hover/dock:after:opacity-100",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Dock.displayName = "Dock";

interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const content = (
      <span className="pointer-events-none transition-transform duration-200 group-hover:scale-110">
        {children}
      </span>
    );

    return (
      <Comp
        ref={ref as any}
        className={cn(
          "group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-gradient-to-b from-white/8 via-white/3 to-white/0 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.08] hover:border-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          className,
        )}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    );
  },
);
DockIcon.displayName = "DockIcon";
