import { NextResponse } from "next/server";
import { parseGpxSummary } from "@/lib/gpx";

export async function POST(request: Request) {
  const formData = await request.formData();
  const gpxFile = formData.get("gpxFile");

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

  return NextResponse.json({
    success: true,
    data: {
      fileName: gpxFile.name,
      summary,
    },
    error: null,
  });
}
