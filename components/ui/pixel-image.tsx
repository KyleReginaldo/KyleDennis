"use client";

import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  // Accept either a URL string or Next.js static image import (StaticImageData)
  src: string | StaticImageData;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  // Allow callers to pass additional classes (e.g., width/height) to control size
  className?: string;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      // deterministic percent formatter with fixed decimals so server/client match
      const fmt = (n: number) => (Math.round(n * 10000) / 10000).toFixed(4) + "%";

      const x1 = col * (100 / cols);
      const y1 = row * (100 / rows);
      const x2 = (col + 1) * (100 / cols);
      const y2 = (row + 1) * (100 / rows);

      const clipPath = `polygon(${fmt(x1)} ${fmt(y1)}, ${fmt(x2)} ${fmt(y1)}, ${fmt(x2)} ${fmt(y2)}, ${fmt(x1)} ${fmt(y2)})`;

      // deterministic pseudo-random based on index/rows/cols so server and client produce the same value
      const raw = ((index * 9301 + rows * 1237 + cols * 7919) % 233280) / 233280;
      const delay = Math.round(raw * maxAnimationDelay);

      return {
        clipPath,
        delay,
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  return (
    <div
      className={cn(
        "relative select-none mx-auto",
        // default size if caller doesn't provide one
        className ?? "h-72 w-72 md:h-96 md:w-96",
      )}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
            <img
              src={typeof src === "string" ? src : src.src}
              alt={`Pixel image piece ${index + 1}`}
              className={cn(
                "z-1 object-cover object-center w-full h-full rounded-[2.5rem]",
                grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
              )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
