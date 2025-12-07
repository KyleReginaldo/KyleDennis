"use client";

import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

let dotPatternStylesInjected = false;

const ensureDotPatternStyles = () => {
  if (typeof document === "undefined" || dotPatternStylesInjected) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes dotPatternGlow {
      0%, 100% {
        opacity: 0.4;
        transform: scale(1);
      }

      50% {
        opacity: 1;
        transform: scale(1.5);
      }
    }
  `;
  document.head.appendChild(style);
  dotPatternStylesInjected = true;
};

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  style: incomingStyle,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: currentWidth, height: currentHeight } =
          containerRef.current.getBoundingClientRect();
        setDimensions({ width: currentWidth, height: currentHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (glow) {
      ensureDotPatternStyles();
    }
  }, [glow]);

  const columns = Math.max(0, Math.ceil(dimensions.width / width));
  const rows = Math.max(0, Math.ceil(dimensions.height / height));

  const dots = useMemo(() => {
    if (!columns || !rows) {
      return [];
    }

    return Array.from({ length: columns * rows }, (_, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);

      return {
        x: col * width + cx,
        y: row * height + cy,
        delay: glow ? Math.random() * 5 : 0,
        duration: glow ? Math.random() * 3 + 2 : 0,
      };
    });
  }, [columns, rows, width, height, cx, cy, glow]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className,
      )}
      style={{ position: "absolute", top: y, left: x, ...(incomingStyle ?? {}) }}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : "currentColor"}
          style={
            glow
              ? {
                  animation: `dotPatternGlow ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
