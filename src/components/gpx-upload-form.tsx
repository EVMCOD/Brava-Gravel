"use client";

import { useState } from "react";

type UploadResult = {
  success: boolean;
  data?: {
    fileName: string;
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

export function GpxUploadForm() {
  const [status, setStatus] = useState<string>("Upload a GPX file to extract route stats.");
  const [result, setResult] = useState<UploadResult["data"]>();
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("gpxFile");

    if (!(file instanceof File) || file.size === 0) {
      setStatus("Select a GPX file first.");
      return;
    }

    setUploading(true);
    setStatus("Parsing GPX file...");

    const payload = new FormData();
    payload.append("gpxFile", file);

    const response = await fetch("/api/gpx/parse", {
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
    setStatus("GPX parsed successfully.");
    setUploading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Upload GPX</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">Turn GPS data into a BRAVA route.</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          This first version accepts a GPX file, extracts points, distance and elevation gain, and prepares the route for future persistence.
        </p>

        <label className="mt-6 flex flex-col gap-3 text-sm text-stone-700">
          <span className="font-medium">GPX file</span>
          <input
            name="gpxFile"
            type="file"
            accept=".gpx,application/gpx+xml"
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4"
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Parsing..." : "Upload route"}
        </button>

        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </form>

      <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Parsed summary</p>
        {result ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-sm text-stone-500">File</p>
              <p className="mt-2 text-lg font-semibold text-stone-950">{result.fileName}</p>
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
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-sm text-stone-500">Start</p>
              <p className="mt-2 text-sm font-semibold text-stone-950">
                {result.summary.startLat?.toFixed(5)}, {result.summary.startLon?.toFixed(5)}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-sm text-stone-500">End</p>
              <p className="mt-2 text-sm font-semibold text-stone-950">
                {result.summary.endLat?.toFixed(5)}, {result.summary.endLon?.toFixed(5)}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-stone-600">
            No GPX parsed yet. This panel will show upload results and route metadata for the next persistence step.
          </p>
        )}
      </article>
    </div>
  );
}
