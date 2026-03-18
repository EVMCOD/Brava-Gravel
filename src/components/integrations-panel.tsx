"use client";

import { useMemo, useState } from "react";

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

const statusMessages: Record<string, string> = {
  strava_connected: "Strava connected successfully. BRAVA can now start working with your real rides.",
  strava_denied: "Strava permission was denied. You can try connecting again anytime.",
  strava_missing_code: "Strava returned without an authorization code.",
  strava_error: "Strava connection failed during token exchange. Check your client settings and try again.",
};

export function IntegrationsPanel({
  connections,
  initialStatus,
}: {
  connections: Connection[];
  initialStatus?: string;
}) {
  const [status, setStatus] = useState(
    initialStatus && statusMessages[initialStatus]
      ? statusMessages[initialStatus]
      : "Connect Strava in one click and start bringing real rides into BRAVA.",
  );
  const [connecting, setConnecting] = useState(false);

  const stravaConnection = useMemo(
    () => connections.find((connection) => connection.provider === "strava") ?? null,
    [connections],
  );

  const connectionState = stravaConnection?.status ?? "not_connected";

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
      setStatus("Almost ready: add STRAVA_CLIENT_ID and STRAVA_REDIRECT_URI to finish the one-click flow.");
      setConnecting(false);
      return;
    }

    window.location.href = json.data.authorizeUrl;
  }

  return (
    <section className="space-y-6">
      <article className="overflow-hidden rounded-[36px] border border-black/5 bg-[#1f1c19] text-white shadow-sm">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b98e]">Simple connection flow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Bring your real Girona and Costa Brava rides into BRAVA with almost no friction.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
              Connect Strava, return to BRAVA, and be ready to import real routes, ride history and future line matches without dealing with file workflows every time.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleConnectStrava}
                disabled={connecting}
                className="inline-flex items-center justify-center rounded-full bg-[#fc4c02] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {connecting ? "Preparing Strava..." : connectionState === "connected" ? "Reconnect Strava" : "Connect Strava"}
              </button>
              <a
                href="/upload"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                Upload files instead
              </a>
            </div>

            <p className="mt-4 text-sm text-stone-400">{status}</p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-stone-400">Current state</p>
              <p className="mt-2 text-2xl font-semibold text-white capitalize">
                {connectionState.replaceAll("_", " ")}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-stone-400">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-200">
                <li>1. Connect your Strava account</li>
                <li>2. Return to BRAVA automatically</li>
                <li>3. Import recent rides and routes</li>
                <li>4. Match activity against BRAVA Lines</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Designed for low friction</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm text-stone-500">Step 1</p>
              <p className="mt-2 text-base font-semibold text-stone-950">Tap connect</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm text-stone-500">Step 2</p>
              <p className="mt-2 text-base font-semibold text-stone-950">Approve Strava</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm text-stone-500">Step 3</p>
              <p className="mt-2 text-base font-semibold text-stone-950">Import real rides</p>
            </div>
          </div>
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
      </div>
    </section>
  );
}
