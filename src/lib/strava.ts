type StravaTokenExchangeResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete?: {
    id: number;
  };
};

export type StravaActivity = {
  id: number;
  name: string;
  distance: number;
  total_elevation_gain: number;
  start_date: string;
  map?: {
    summary_polyline?: string;
  };
};

export function buildStravaAuthorizeUrl() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    approval_prompt: "auto",
    scope: "read,activity:read_all",
  });

  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
}

export async function exchangeStravaCodeForToken(code: string) {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Strava client credentials.");
  }

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strava token exchange failed: ${errorText}`);
  }

  return (await response.json()) as StravaTokenExchangeResponse;
}

export async function fetchStravaActivities(accessToken: string, perPage = 10) {
  const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strava activities fetch failed: ${errorText}`);
  }

  return (await response.json()) as StravaActivity[];
}
