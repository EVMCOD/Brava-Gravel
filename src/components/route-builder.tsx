"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buildGpxDocument } from "@/lib/gpx-export";

const RouteBuilderMap = dynamic(
  () => import("@/components/route-builder-map").then((module) => module.RouteBuilderMap),
  { ssr: false },
);

type Coordinate = {
  lat: number;
  lon: number;
};

type SaveRouteResponse = {
  success: boolean;
  data?: {
    routeId: string;
    name: string;
    distanceKm: number;
  };
  error?: string | null;
};

const EARTH_RADIUS_M = 6371000;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceBetween(a: Coordinate, b: Coordinate) {
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

export function RouteBuilder() {
  const [routeName, setRouteName] = useState("BRAVA Custom Route");
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [status, setStatus] = useState("Click on the map to start drawing your route.");
  const [savedRouteId, setSavedRouteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const distanceKm = useMemo(() => {
    let totalMeters = 0;
    for (let index = 1; index < coordinates.length; index += 1) {
      totalMeters += distanceBetween(coordinates[index - 1], coordinates[index]);
    }
    return Number((totalMeters / 1000).toFixed(2));
  }, [coordinates]);

  function addPoint(coordinate: Coordinate) {
    setCoordinates((current) => [...current, coordinate]);
    setStatus("Point added to route.");
  }

  function undoLastPoint() {
    setCoordinates((current) => current.slice(0, -1));
    setStatus("Last point removed.");
  }

  function clearRoute() {
    setCoordinates([]);
    setSavedRouteId(null);
    setStatus("Route cleared.");
  }

  async function saveRoute() {
    if (coordinates.length < 2) {
      setStatus("Add at least two points before saving.");
      return;
    }

    setSaving(true);
    setStatus("Saving route into BRAVA...");

    const response = await fetch("/api/builder/save/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeName,
        coordinates,
      }),
    });

    const json = (await response.json()) as SaveRouteResponse;

    if (!response.ok || !json.success || !json.data) {
      setStatus(json.error ?? "Could not save route.");
      setSaving(false);
      return;
    }

    setSavedRouteId(json.data.routeId);
    setStatus(`Route saved: ${json.data.name} (${json.data.distanceKm} km).`);
    setSaving(false);
  }

  function exportGpx() {
    if (coordinates.length < 2) {
      setStatus("Add at least two points before exporting GPX.");
      return;
    }

    const gpx = buildGpxDocument({ routeName, coordinates });
    const blob = new Blob([gpx], { type: "application/gpx+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${routeName.replace(/\s+/g, "-").toLowerCase()}.gpx`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("GPX exported successfully.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Builder map</p>
        <div className="mt-5">
          <RouteBuilderMap coordinates={coordinates} onAddPoint={addPoint} />
        </div>
      </article>

      <div className="grid gap-6">
        <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Route setup</p>
          <label className="mt-4 flex flex-col gap-3 text-sm text-stone-700">
            <span className="font-medium">Route name</span>
            <input
              value={routeName}
              onChange={(event) => setRouteName(event.target.value)}
              className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4"
            />
          </label>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-stone-500">Points</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">{coordinates.length}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-stone-500">Distance</p>
              <p className="mt-2 text-xl font-semibold text-stone-950">{distanceKm} km</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={saveRoute}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save route to BRAVA"}
            </button>
            <button
              type="button"
              onClick={exportGpx}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
            >
              Export GPX
            </button>
            <button
              type="button"
              onClick={undoLastPoint}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
            >
              Undo last point
            </button>
            <button
              type="button"
              onClick={clearRoute}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
            >
              Clear route
            </button>
          </div>

          <p className="mt-4 text-sm text-stone-500">{status}</p>

          {savedRouteId ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/routes/${savedRouteId}`}
                className="inline-flex items-center justify-center rounded-full bg-[#c38b43] px-5 py-3 text-sm font-semibold text-[#1f1c19]"
              >
                View saved route
              </Link>
              <Link
                href={`/rides/new?routeId=${savedRouteId}`}
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900"
              >
                Create ride from route
              </Link>
            </div>
          ) : null}
        </article>

        <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Why this matters</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
            <li>Create your own gravel route from scratch.</li>
            <li>Save it inside BRAVA, not only export it.</li>
            <li>Turn that route into a social ride instantly.</li>
            <li>Future version: snap to gravel roads and estimate surface quality.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
