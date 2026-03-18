export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDefaultUser, insertUploadedRoute } from "@/lib/db";
import { buildGpxDocument } from "@/lib/gpx-export";

type Coordinate = {
  lat: number;
  lon: number;
};

const EARTH_RADIUS_M = 6371000;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceBetween(a: Coordinate, b: Coordinate) {
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export async function POST(request: Request) {
  const body = await request.json();
  const routeName = typeof body.routeName === "string" ? body.routeName.trim() : "BRAVA Custom Route";
  const coordinates = Array.isArray(body.coordinates) ? (body.coordinates as Coordinate[]) : [];

  if (coordinates.length < 2) {
    return NextResponse.json(
      { success: false, data: null, error: "Add at least two points before saving a route." },
      { status: 400 },
    );
  }

  let distanceMeters = 0;
  for (let index = 1; index < coordinates.length; index += 1) {
    distanceMeters += distanceBetween(coordinates[index - 1], coordinates[index]);
  }

  const user = getDefaultUser();
  const now = new Date().toISOString();
  const gpx = buildGpxDocument({ routeName, coordinates });

  const record = {
    id: randomUUID(),
    user_id: user.id,
    name: routeName,
    file_name: `${routeName.replace(/\s+/g, "-").toLowerCase()}.gpx`,
    point_count: coordinates.length,
    distance_km: Number((distanceMeters / 1000).toFixed(2)),
    elevation_gain_m: 0,
    start_lat: coordinates[0]?.lat ?? null,
    start_lon: coordinates[0]?.lon ?? null,
    end_lat: coordinates.at(-1)?.lat ?? null,
    end_lon: coordinates.at(-1)?.lon ?? null,
    route_points: JSON.stringify(coordinates),
    gpx_content: gpx,
    created_at: now,
  };

  insertUploadedRoute(record);

  return NextResponse.json({
    success: true,
    data: {
      routeId: record.id,
      name: record.name,
      distanceKm: record.distance_km,
    },
    error: null,
  });
}
