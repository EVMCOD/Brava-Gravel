"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(
  () => import("@/components/route-map").then((module) => module.RouteMap),
  { ssr: false },
);

export function RouteMapPanel({ coordinates }: { coordinates: Array<{ lat: number; lon: number }> }) {
  return <RouteMap coordinates={coordinates} />;
}
