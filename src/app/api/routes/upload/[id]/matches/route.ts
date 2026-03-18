export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getUploadedRouteById } from "@/lib/db";
import { matchLinesFromCoordinates } from "@/lib/line-matching";
import { deserializeCoordinates } from "@/lib/route-geometry";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const route = getUploadedRouteById(id);

  if (!route) {
    return NextResponse.json({ success: false, data: null, error: "Route not found." }, { status: 404 });
  }

  const coordinates = deserializeCoordinates(route.route_points);
  const matches = matchLinesFromCoordinates(coordinates);

  return NextResponse.json({ success: true, data: matches, error: null });
}
