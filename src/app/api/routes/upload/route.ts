import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { insertUploadedRoute, listUploadedRoutes } from "@/lib/db";
import { parseGpxSummary } from "@/lib/gpx";
import { extractCompressedCoordinates, serializeCoordinates } from "@/lib/route-geometry";

export async function GET() {
  const routes = listUploadedRoutes();

  return NextResponse.json({ success: true, data: routes, error: null });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const gpxFile = formData.get("gpxFile");
  const routeNameValue = formData.get("routeName");
  const routeName = typeof routeNameValue === "string" && routeNameValue.trim().length > 0
    ? routeNameValue.trim()
    : null;

  if (!(gpxFile instanceof File)) {
    return NextResponse.json(
      { success: false, data: null, error: "No GPX file provided." },
      { status: 400 },
    );
  }

  const text = await gpxFile.text();
  const summary = parseGpxSummary(text);

  if (summary.pointCount === 0) {
    return NextResponse.json(
      { success: false, data: null, error: "The GPX file does not contain valid track points." },
      { status: 422 },
    );
  }

  const record = {
    id: randomUUID(),
    name: routeName ?? gpxFile.name.replace(/\.gpx$/i, ""),
    file_name: gpxFile.name,
    point_count: summary.pointCount,
    distance_km: summary.distanceKm,
    elevation_gain_m: summary.elevationGainM,
    start_lat: summary.startLat,
    start_lon: summary.startLon,
    end_lat: summary.endLat,
    end_lon: summary.endLon,
    route_points: serializeCoordinates(extractCompressedCoordinates(text)),
    gpx_content: text,
    created_at: new Date().toISOString(),
  };

  insertUploadedRoute(record);

  return NextResponse.json({
    success: true,
    data: {
      id: record.id,
      name: record.name,
      summary,
    },
    error: null,
  });
}
