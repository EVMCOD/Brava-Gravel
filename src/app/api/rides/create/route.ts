export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDefaultUser, insertRide } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const user = getDefaultUser();

  if (!body.routeId || !body.title || !body.meetupAt || !body.meetupPoint) {
    return NextResponse.json(
      { success: false, data: null, error: "Missing required ride fields." },
      { status: 400 },
    );
  }

  const record = {
    id: randomUUID(),
    user_id: user.id,
    route_id: String(body.routeId),
    title: String(body.title),
    meetup_at: String(body.meetupAt),
    meetup_point: String(body.meetupPoint),
    pace_label: String(body.paceLabel ?? "Social"),
    capacity: Number(body.capacity ?? 20),
    notes: typeof body.notes === "string" ? body.notes : null,
    created_at: new Date().toISOString(),
  };

  insertRide(record);

  return NextResponse.json({ success: true, data: record, error: null });
}
