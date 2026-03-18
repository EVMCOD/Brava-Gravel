import { TrackPoint, parseTrackPoints } from "@/lib/gpx";

export type RouteCoordinate = {
  lat: number;
  lon: number;
};

export function compressTrackPoints(points: TrackPoint[], step = 12): RouteCoordinate[] {
  if (points.length <= step) {
    return points.map((point) => ({ lat: point.lat, lon: point.lon }));
  }

  return points
    .filter((_, index) => index % step === 0 || index === points.length - 1)
    .map((point) => ({ lat: point.lat, lon: point.lon }));
}

export function extractCompressedCoordinates(gpxContent: string) {
  const points = parseTrackPoints(gpxContent);
  return compressTrackPoints(points);
}

export function serializeCoordinates(coordinates: RouteCoordinate[]) {
  return JSON.stringify(coordinates);
}

export function deserializeCoordinates(serialized: string): RouteCoordinate[] {
  try {
    const parsed = JSON.parse(serialized) as RouteCoordinate[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
