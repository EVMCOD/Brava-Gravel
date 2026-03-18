export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDefaultUser, getExternalConnectionByProvider, listImportedActivities, upsertImportedActivity, upsertExternalConnection } from "@/lib/db";
import { decodePolyline } from "@/lib/polyline";
import { fetchStravaActivities } from "@/lib/strava";

export async function POST() {
  const user = getDefaultUser();
  const connection = getExternalConnectionByProvider(user.id, "strava");

  if (!connection?.access_token) {
    return NextResponse.json(
      { success: false, data: null, error: "Strava is not connected." },
      { status: 400 },
    );
  }

  const activities = await fetchStravaActivities(connection.access_token, 12);
  const now = new Date().toISOString();

  for (const activity of activities) {
    const coordinates = activity.map?.summary_polyline
      ? decodePolyline(activity.map.summary_polyline)
      : [];

    upsertImportedActivity({
      id: `strava_activity_${activity.id}`,
      user_id: user.id,
      provider: "strava",
      external_activity_id: String(activity.id),
      name: activity.name,
      distance_km: Number((activity.distance / 1000).toFixed(2)),
      elevation_gain_m: Math.round(activity.total_elevation_gain),
      activity_date: activity.start_date,
      route_points: JSON.stringify(coordinates),
      created_at: now,
    });
  }

  upsertExternalConnection({
    ...connection,
    updated_at: now,
  });

  return NextResponse.json({
    success: true,
    data: {
      importedCount: activities.length,
      activities: listImportedActivities(user.id),
    },
    error: null,
  });
}
