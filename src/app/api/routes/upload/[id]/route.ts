import { NextResponse } from "next/server";
import { getUploadedRouteById } from "@/lib/db";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const route = getUploadedRouteById(id);

  if (!route) {
    return NextResponse.json({ success: false, data: null, error: "Route not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: route, error: null });
}
