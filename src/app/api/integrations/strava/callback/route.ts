import { NextResponse } from "next/server";
import { getDefaultUser, getExternalConnectionByProvider, upsertExternalConnection } from "@/lib/db";
import { exchangeStravaCodeForToken } from "@/lib/strava";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(`${baseUrl}/integrations?status=strava_denied`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/integrations?status=strava_missing_code`);
  }

  try {
    const user = getDefaultUser();
    const existing = getExternalConnectionByProvider(user.id, "strava");
    const tokenData = await exchangeStravaCodeForToken(code);
    const now = new Date().toISOString();

    upsertExternalConnection({
      id: existing?.id ?? `strava_${user.id}`,
      user_id: user.id,
      provider: "strava",
      external_athlete_id: tokenData.athlete?.id ? String(tokenData.athlete.id) : null,
      status: "connected",
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: new Date(tokenData.expires_at * 1000).toISOString(),
      created_at: existing?.created_at ?? now,
      updated_at: now,
    });

    return NextResponse.redirect(`${baseUrl}/integrations?status=strava_connected`);
  } catch {
    return NextResponse.redirect(`${baseUrl}/integrations?status=strava_error`);
  }
}
