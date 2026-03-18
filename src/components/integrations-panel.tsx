"use client";

import { useState } from "react";

type StravaConnectResponse = {
  success: boolean;
  data?: {
    state: string;
    authorizeUrl: string | null;
    configured: boolean;
  };
  error?: string | null;
};

type Connection = {
  id: string;
  provider: string;
  status: string;
  updated_at: string;
};

export function IntegrationsPanel({ connections }: { connections: Connection[] }) {
  const [status, setStatus] = useState("Connect Strava to bring real activities and routes into BRAVA.");
  const [connecting, setConnecting] = useState(false);

  async function handleConnectStrava() {
    setConnecting(true);
    setStatus("Preparing Strava connection...");

    const response = await fetch("/api/integrations/strava/connect", {
      method: "POST",
    });

    const json = (await response.json()) as StravaConnectResponse;

    if (!response.ok || !json.success || !json.data) {
      setStatus(json.error ?? "Could not prepare Strava connection.");
      setConnecting(false);
      return;
    }

    if (!json.data.configured || !json.data.authorizeUrl) {
      setStatus("Strava auth is scaffolded, but STRAVA_CLIENT_ID and STRAVA_REDIRECT_URI are still missing.");
      setConnecting(false);
      return;
    }

    window.location.href = json.data.authorizeUrl;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Connect providers</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Bring real routes into BRAVA.</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Strava is the first serious integration path. Once connected, activities and routes can be normalized into BRAVA for maps, lines and rankings.
        </p>

        <button
          type="button"
          onClick={handleConnectStrava}
          disabled={connecting}
          className="mt-6 inline-flex rounded-full bg-[#fc4c02] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {connecting ? "Preparing..." : "Connect Strava"}
        </button>

        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </article>

      <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Connection status</p>
          <span className="text-sm text-stone-400">{connections.length} linked</span>
        </div>

        <div className="mt-5 space-y-3">
          {connections.length > 0 ? (
            connections.map((connection) => (
              <div key={connection.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-stone-950 capitalize">{connection.provider}</p>
                    <p className="mt-1 text-sm text-stone-500">Updated {new Date(connection.updated_at).toLocaleString()}</p>
                  </div>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                    {connection.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm leading-7 text-stone-600">
              No providers linked yet. Start with Strava so BRAVA can work with real routes and activity history.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
