import { lines } from "@/lib/lines-data";
import { RouteCoordinate } from "@/lib/route-geometry";

export type LineMatch = {
  lineId: string;
  name: string;
  area: string;
  reason: string;
};

function getBoundingBox(points: Array<{ lat: number; lon: number }>) {
  const latitudes = points.map((point) => point.lat);
  const longitudes = points.map((point) => point.lon);

  return {
    minLat: Math.min(...latitudes),
    maxLat: Math.max(...latitudes),
    minLon: Math.min(...longitudes),
    maxLon: Math.max(...longitudes),
  };
}

function expandBoundingBox(
  box: ReturnType<typeof getBoundingBox>,
  margin = 0.01,
) {
  return {
    minLat: box.minLat - margin,
    maxLat: box.maxLat + margin,
    minLon: box.minLon - margin,
    maxLon: box.maxLon + margin,
  };
}

function hasAnyCoordinateInBox(
  coordinates: RouteCoordinate[],
  box: ReturnType<typeof expandBoundingBox>,
) {
  return coordinates.some(
    (coordinate) =>
      coordinate.lat >= box.minLat &&
      coordinate.lat <= box.maxLat &&
      coordinate.lon >= box.minLon &&
      coordinate.lon <= box.maxLon,
  );
}

export function matchLinesFromCoordinates(coordinates: RouteCoordinate[]): LineMatch[] {
  if (coordinates.length === 0) {
    return [];
  }

  return lines
    .filter((line) => {
      const lineBox = expandBoundingBox(getBoundingBox(line.geometry));
      return hasAnyCoordinateInBox(coordinates, lineBox);
    })
    .map((line) => ({
      lineId: line.id,
      name: line.name,
      area: line.area,
      reason: `Route geometry intersects the ${line.area} line zone.`,
    }));
}
