"use client";

import { useState } from "react";

type ImportedActivity = {
  id: string;
  name: string;
  distance_km: number;
  elevation_gain_m: number;
  activity_date: string;
};

type SyncResponse = {
  success: boolean;
  data?: {
    importedCount: number;
    activities: ImportedActivity[];
  };
  error?: string | null;
};

export function StravaSyncPanel({
  initiallyConnected,
  initialActivities,
}: {
  initiallyConnected: boolean;
  initialActivities: ImportedActivity[];
}) {
  const [activities, setActivities] = useState(initialActivities);
  const [status, setStatus] = useState(
    initiallyConnected
      ? "Strava is connected. Import your recent rides into BRAVA."
      : "Connect Strava first to import real rides.",
  );
  const [syncing, setSyncing] = useState(false);

  async function handleSync() {
    setSyncing(true);
    setStatus("Importing Strava activities...");

    const response = await fetch("/api/integrations/strava/sync", {
      method: "POST",
    });

    const json = (await response.json()) as SyncResponse;

    if (!response.ok || !json.success || !json.data) {
      setStatus(json.error ?? "Could not import Strava activities.");
      setSyncing(false);
      return;
    }

    setActivities(json.data.activities);
    setStatus(`Imported ${json.data.importedCount} Strava activities into BRAVA.`);
    setSyncing(false);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Import rides</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Sync your recent Strava history.</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Pull recent activities into BRAVA so routes, maps and lines can start using real ride data instead of only manual uploads.
        </p>

        <button
          type="button"
          onClick={handleSync}
          disabled={!initiallyConnected || syncing}
          className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {syncing ? "Syncing..." : "Sync now"}
        </button>

        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </article>

      <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Imported activities</p>
          <span className="text-sm text-stone-400">{activities.length} total</span>
        </div>

        <div className="mt-5 space-y-3">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-base font-semibold text-stone-950">{activity.name}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-stone-600">
                  <span>{activity.distance_km} km</span>
                  <span>{activity.elevation_gain_m} m+</span>
                  <span>{new Date(activity.activity_date).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm leading-7 text-stone-600">
              No imported Strava activities yet.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
