type Coordinate = {
  lat: number;
  lon: number;
};

export function buildGpxDocument({
  routeName,
  coordinates,
}: {
  routeName: string;
  coordinates: Coordinate[];
}) {
  const points = coordinates
    .map((coordinate) => `      <trkpt lat="${coordinate.lat}" lon="${coordinate.lon}"></trkpt>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="BRAVA GRAVEL" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${routeName}</name>
    <trkseg>
${points}
    </trkseg>
  </trk>
</gpx>`;
}
