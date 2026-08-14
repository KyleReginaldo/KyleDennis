import type React from "react";

import { cn } from "@/lib/utils";

interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  category?: string;
  image?: string;
  logo?: string;
  link?: string;
  accent?: string;
  type?: "content" | "simple-image"; // Decides between text or image
}

export function shade(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// ContentCard Component for rendering text over a brand-color gradient
const ContentCard: React.FC<CaseStudyCardProps> = ({ title, category, logo, accent }) => {
  const base = accent ?? "#0071e3";
  const dark = shade(base, -60);

  return (
    <div
      className="relative flex h-full flex-col items-start justify-between overflow-hidden rounded-lg p-2.5 sm:p-4"
      style={{ background: `linear-gradient(155deg, ${base} 0%, ${dark} 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.28), transparent 55%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)" }}
      />

      <div className="relative z-10">
        {category && <div className="text-[10px] font-medium text-white/70 sm:text-xs">{category}</div>}

        {title && (
          <div className="mr-2 text-xs font-bold leading-tight tracking-wide text-white sm:text-base md:text-lg">
            {title}
          </div>
        )}
      </div>
      {logo && (
        <div className="z-10 flex h-6 w-6 items-center justify-center rounded-md bg-white/90 p-1 shadow-sm sm:h-9 sm:w-9 sm:rounded-lg sm:p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={title} className="h-full w-full object-contain" />
        </div>
      )}
    </div>
  );
};

// SimpleImageCard component for rendering only image
const SimpleImageCard: React.FC<CaseStudyCardProps> = ({ image }) => {
  return (
    <div
      className="relative flex w-full flex-col items-start justify-between rounded-lg p-4"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

const HoverRevealSlip = ({ show, previewImage }: { show: React.ReactNode; previewImage?: string }) => {
  const common = "absolute flex w-full h-full [backface-visibility:hidden]";

  return (
    <div className={cn("group/study relative aspect-[13/15] w-full perspective-[1000px]")}>
      {/* Back cover - static */}
      <div className={cn("absolute inset-0 h-full w-[92%] rounded-lg bg-gray-50 shadow-md")}></div>

      {/* Card container with slight book opening effect on hover */}
      <div
        className={cn(
          "relative z-50 h-full w-[92%] origin-left transition-transform duration-500 ease-out transform-3d group-hover/study:transform-[rotateY(-30deg)]",
        )}
      >
        {/* Front side of the card */}
        <div className={cn("h-full w-full rounded-lg bg-white shadow-md", common)}>{show}</div>
      </div>

      {/* Sliding link/tab coming out from behind - previews the project when revealed */}
      <div
        className={cn(
          "z-1 absolute bottom-0 right-0 flex h-[80%] w-[27%] -translate-x-[70%] transform items-start justify-start overflow-hidden rounded-r-lg bg-black pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out backface-hidden group-hover/study:translate-x-0 group-hover/study:rotate-[5deg]",
        )}
        
      >
        <div className="-rotate-90 whitespace-nowrap pb-16 pr-9 text-[10px] sm:text-xs">VIEW DETAILS</div>
      </div>
    </div>
  );
};

// Main CaseStudyCard Component
export default function CaseStudyCard({
  title,
  category,
  link,
  image,
  logo,
  accent,
  type,
}: CaseStudyCardProps) {
  return (
    <div className="flex w-full">
      <a href={link} className="block w-full">
        <HoverRevealSlip
          previewImage={image}
          show={
            type === "content" ? (
              <ContentCard title={title} category={category} logo={logo} accent={accent} />
            ) : (
              <SimpleImageCard image={image} title={title} />
            )
          }
        />
      </a>
    </div>
  );
}
