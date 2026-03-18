export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDefaultUser, joinRide } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.rideId) {
    return NextResponse.json(
      { success: false, data: null, error: "rideId is required." },
      { status: 400 },
    );
  }

  const user = getDefaultUser();
  joinRide(String(body.rideId), user.id);

  return NextResponse.json({ success: true, data: { rideId: body.rideId }, error: null });
}
