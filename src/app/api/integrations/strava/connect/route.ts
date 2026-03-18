import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDefaultUser, upsertExternalConnection } from "@/lib/db";
import { buildStravaAuthorizeUrl } from "@/lib/strava";

export async function POST() {
  const user = getDefaultUser();
  const now = new Date().toISOString();

  upsertExternalConnection({
    id: `strava_${user.id}`,
    user_id: user.id,
    provider: "strava",
    external_athlete_id: null,
    status: "pending",
    access_token: null,
    refresh_token: null,
    expires_at: null,
    created_at: now,
    updated_at: now,
  });

  return NextResponse.json({
    success: true,
    data: {
      state: randomUUID(),
      authorizeUrl: buildStravaAuthorizeUrl(),
      configured: Boolean(buildStravaAuthorizeUrl()),
    },
    error: null,
  });
}
