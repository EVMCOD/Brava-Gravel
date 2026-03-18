import { NextResponse } from "next/server";
import { getUploadedRouteById } from "@/lib/db";
import { detectRouteFormat } from "@/lib/file-formats";
import { buildGpxDocument } from "@/lib/gpx-export";
import { deserializeCoordinates } from "@/lib/route-geometry";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const route = getUploadedRouteById(id);

  if (!route) {
    return NextResponse.json({ success: false, data: null, error: "Route not found." }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const format = detectRouteFormat(`file.${searchParams.get("format") ?? "gpx"}`) ?? "gpx";

  if (format !== "gpx") {
    return NextResponse.json(
      { success: false, data: null, error: `${format.toUpperCase()} export is not enabled yet.` },
      { status: 422 },
    );
  }

  const coordinates = deserializeCoordinates(route.route_points);
  const document = buildGpxDocument({ routeName: route.name, coordinates });

  return new NextResponse(document, {
    status: 200,
    headers: {
      "Content-Type": "application/gpx+xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="${route.name.replace(/\s+/g, "-").toLowerCase()}.gpx"`,
    },
  });
}
