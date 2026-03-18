import { RouteCoordinate } from "@/lib/route-geometry";
import { lines } from "@/lib/lines-data";

export type LineMatch = {
  lineId: string;
  name: string;
  area: string;
  reason: string;
};

const areaKeywords: Record<string, string[]> = {
  "Casa de Campo": ["40.41", "-3.75", "-3.74"],
  Cercedilla: ["40.73", "-4.05", "-4.06"],
  Alicante: ["38.34", "-0.48", "-0.49"],
};

export function matchLinesFromCoordinates(coordinates: RouteCoordinate[]): LineMatch[] {
  if (coordinates.length === 0) {
    return [];
  }

  const serialized = coordinates
    .slice(0, 80)
    .map((coordinate) => `${coordinate.lat.toFixed(2)},${coordinate.lon.toFixed(2)}`)
    .join("|");

  return lines
    .filter((line) => {
      const keywords = areaKeywords[line.area] ?? [];
      return keywords.some((keyword) => serialized.includes(keyword));
    })
    .map((line) => ({
      lineId: line.id,
      name: line.name,
      area: line.area,
      reason: `Route geometry overlaps the ${line.area} zone.`,
    }));
}
