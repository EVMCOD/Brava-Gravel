"use client";

import { useEffect, useState } from "react";

type UploadResult = {
  success: boolean;
  data?: {
    id?: string;
    fileName?: string;
    name?: string;
    summary: {
      pointCount: number;
      distanceKm: number;
      elevationGainM: number;
      startLat: number | null;
      startLon: number | null;
      endLat: number | null;
      endLon: number | null;
    };
  };
  error?: string | null;
};

type StoredRoute = {
  id: string;
  name: string;
  file_name: string;
  point_count: number;
  distance_km: number;
  elevation_gain_m: number;
  created_at: string;
};

async function fetchStoredRoutes() {
  const response = await fetch("/api/routes/upload", { cache: "no-store" });
  const json = await response.json();

  if (json.success && Array.isArray(json.data)) {
    return json.data as StoredRoute[];
  }

  return [];
}

export function GpxUploadForm() {
  const [routes, setRoutes] = useState<StoredRoute[]>([]);
  const [routesLoaded, setRoutesLoaded] = useState(false);
  const [status, setStatus] = useState<string>("Upload a GPX file to extract route stats.");
  const [result, setResult] = useState<UploadResult["data"]>();
  const [uploading, setUploading] = useState(false);

  async function loadRoutes() {
    const nextRoutes = await fetchStoredRoutes();
    setRoutes(nextRoutes);
    setRoutesLoaded(true);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRoutes();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("gpxFile");
    const routeName = formData.get("routeName");

    if (!(file instanceof File) || file.size === 0) {
      setStatus("Select a GPX file first.");
      return;
    }

    setUploading(true);
    setStatus("Uploading and parsing GPX file...");

    const payload = new FormData();
    payload.append("gpxFile", file);
    if (typeof routeName === "string") {
      payload.append("routeName", routeName);
    }

    const response = await fetch("/api/routes/upload", {
      method: "POST",
      body: payload,
    });

    const json = (await response.json()) as UploadResult;

    if (!response.ok || !json.success || !json.data) {
      setResult(undefined);
      setStatus(json.error ?? "Could not parse GPX file.");
      setUploading(false);
      return;
    }

    setResult(json.data);
    setStatus("Route uploaded successfully.");
    setUploading(false);
    event.currentTarget.reset();
    await loadRoutes();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Upload GPX</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Turn GPS data into a saved BRAVA route.</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          This version already parses and stores uploaded GPX routes locally, so we now have a path toward maps, user libraries and line matching.
        </p>

        <label className="mt-6 flex flex-col gap-3 text-sm text-stone-700">
          <span className="font-medium">Route name</span>
          <input
            name="routeName"
            type="text"
            placeholder="e.g. Sunday Gravel Loop"
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4"
          />
        </label>

        <label className="mt-4 flex flex-col gap-3 text-sm text-stone-700">
          <span className="font-medium">Route file</span>
          <input
            name="gpxFile"
            type="file"
            accept=".gpx,.tcx,.fit,application/gpx+xml"
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4"
          />
          <span className="text-xs text-stone-500">GPX supported now. TCX and FIT adapters are staged next.</span>
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Save route"}
        </button>

        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </form>

      <div className="grid gap-6">
        <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Latest upload</p>
          {result ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-sm text-stone-500">Route</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{result.name ?? result.fileName}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-sm text-stone-500">Track points</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{result.summary.pointCount}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-sm text-stone-500">Distance</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{result.summary.distanceKm} km</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="text-sm text-stone-500">Elevation gain</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{result.summary.elevationGainM} m+</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-stone-600">
              No route uploaded yet. Save your first GPX route to populate this state.
            </p>
          )}
        </article>

        <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Saved routes</p>
            <span className="text-sm text-stone-400">{routes.length} total</span>
          </div>

          <div className="mt-5 space-y-3">
            {!routesLoaded ? (
              <p className="text-sm leading-7 text-stone-600">Loading saved routes...</p>
            ) : routes.length > 0 ? (
              routes.map((route) => (
                <div key={route.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <a href={`/routes/${route.id}`} className="text-base font-semibold text-stone-950 underline-offset-4 hover:underline">
                        {route.name}
                      </a>
                      <p className="mt-1 text-sm text-stone-500">{route.file_name}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      {new Date(route.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-stone-600">
                    <span>{route.distance_km} km</span>
                    <span>{route.elevation_gain_m} m+</span>
                    <span>{route.point_count} pts</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-stone-600">
                No saved routes yet. Upload your first GPX to create the local route library.
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
