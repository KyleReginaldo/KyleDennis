"use client"

import { Globe } from "@/components/ui/globe"
import type { COBEOptions } from "cobe"

const CAVITE: [number, number] = [14.4791, 120.897]
const DAVAO: [number, number] = [7.1907, 125.4553]
const VIRGINIA: [number, number] = [37.4316, -78.6569]
const MIAMI: [number, number] = [25.7617, -80.1918]
const SPAIN: [number, number] = [40.4168, -3.7038]

// phi=2.0 starts centered on SE Asia (Philippines ~120°E)
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 2.0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  devicePixelRatio: 2,
  baseColor: [1, 1, 1],
  markerColor: [100 / 255, 200 / 255, 255 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: CAVITE, size: 0.07 },
    { location: DAVAO, size: 0.05 },
    { location: VIRGINIA, size: 0.05 },
    { location: MIAMI, size: 0.05 },
    { location: SPAIN, size: 0.05 },
  ],
  arcs: [
    { from: CAVITE, to: DAVAO },
    { from: CAVITE, to: VIRGINIA },
    { from: CAVITE, to: MIAMI },
    { from: CAVITE, to: SPAIN },
  ],
  arcColor: [100 / 255, 200 / 255, 255 / 255],
  arcWidth: 2,
}

const locations = [
  { label: "Cavite", flag: "🇵🇭", note: "you" },
  { label: "Davao", flag: "🇵🇭" },
  { label: "Virginia", flag: "🇺🇸" },
  { label: "Miami", flag: "🇺🇸" },
  { label: "Spain", flag: "🇪🇸" },
]

export function GlobeSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold">Reach</h2>
        <p className="text-sm text-muted-foreground">
          Remote-first collaborations across timezones — all shipped from Cavite.
        </p>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-muted-foreground/20">
        <Globe config={GLOBE_CONFIG} className="-translate-y-[10%]" />
        {/* fade bottom edge into background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.9),transparent_60%)]" />
      </div>

      <div className="flex flex-wrap gap-2">
        {locations.map((loc) => (
          <div
            key={loc.label}
            className="flex items-center gap-1.5 rounded-full border border-muted-foreground/20 bg-background/60 px-3 py-1.5 text-xs"
          >
            <span>{loc.flag}</span>
            <span className="font-medium">{loc.label}</span>
            {loc.note && (
              <span className="text-muted-foreground/60">({loc.note})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
