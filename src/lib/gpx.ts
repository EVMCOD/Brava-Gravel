export type ParsedGpxSummary = {
  pointCount: number;
  distanceKm: number;
  elevationGainM: number;
  startLat: number | null;
  startLon: number | null;
  endLat: number | null;
  endLon: number | null;
};

export type TrackPoint = {
  lat: number;
  lon: number;
  ele: number | null;
};

const EARTH_RADIUS_M = 6371000;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function haversineDistanceMeters(a: TrackPoint, b: TrackPoint) {
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export function parseTrackPoints(gpxContent: string): TrackPoint[] {
  const matches = [...gpxContent.matchAll(/<trkpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*>([\s\S]*?)<\/trkpt>/g)];

  return matches
    .map((match) => {
      const lat = Number.parseFloat(match[1]);
      const lon = Number.parseFloat(match[2]);
      const eleMatch = match[3].match(/<ele>([^<]+)<\/ele>/);
      const ele = eleMatch ? Number.parseFloat(eleMatch[1]) : null;

      if (Number.isNaN(lat) || Number.isNaN(lon)) {
        return null;
      }

      return { lat, lon, ele } satisfies TrackPoint;
    })
    .filter((point): point is TrackPoint => point !== null);
}

export function parseGpxSummary(gpxContent: string): ParsedGpxSummary {
  const points = parseTrackPoints(gpxContent);

  if (points.length === 0) {
    return {
      pointCount: 0,
      distanceKm: 0,
      elevationGainM: 0,
      startLat: null,
      startLon: null,
      endLat: null,
      endLon: null,
    };
  }

  let distanceMeters = 0;
  let elevationGainM = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];

    distanceMeters += haversineDistanceMeters(previous, current);

    if (previous.ele !== null && current.ele !== null && current.ele > previous.ele) {
      elevationGainM += current.ele - previous.ele;
    }
  }

  const first = points[0];
  const last = points[points.length - 1];

  return {
    pointCount: points.length,
    distanceKm: Number((distanceMeters / 1000).toFixed(2)),
    elevationGainM: Math.round(elevationGainM),
    startLat: first.lat,
    startLon: first.lon,
    endLat: last.lat,
    endLon: last.lon,
  };
}
