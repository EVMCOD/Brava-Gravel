import Link from "next/link";
import { notFound } from "next/navigation";
import { RouteLineMatches } from "@/components/route-line-matches";
import { RouteMapPanel } from "@/components/route-map-panel";
import { RouteTransferPanel } from "@/components/route-transfer-panel";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { matchLinesFromCoordinates } from "@/lib/line-matching";
import { deserializeCoordinates } from "@/lib/route-geometry";

async function getRoute(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/routes/upload/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json.success ? json.data : null;
}

export default async function RouteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = await getRoute(id);

  if (!route) {
    notFound();
  }

  const coordinates = deserializeCoordinates(route.route_points);
  const matches = matchLinesFromCoordinates(coordinates);

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Route detail"
        title={route.name}
        description="This detail page is the next real product step: saved route metadata, geometry, transfer options and initial BRAVA Line detection around uploaded GPS tracks."
      />
      <section className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
        <div className="grid gap-6">
          <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
            <p className="text-sm text-stone-500">Uploaded file</p>
            <p className="mt-2 text-lg font-semibold">{route.file_name}</p>

            <div className="mt-6 space-y-3 text-sm text-stone-600">
              <p><span className="font-medium text-stone-900">Distance:</span> {route.distance_km} km</p>
              <p><span className="font-medium text-stone-900">Elevation gain:</span> {route.elevation_gain_m} m+</p>
              <p><span className="font-medium text-stone-900">Track points:</span> {route.point_count}</p>
              <p><span className="font-medium text-stone-900">Start:</span> {route.start_lat?.toFixed(5)}, {route.start_lon?.toFixed(5)}</p>
              <p><span className="font-medium text-stone-900">End:</span> {route.end_lat?.toFixed(5)}, {route.end_lon?.toFixed(5)}</p>
            </div>

            <Link
              href="/upload"
              className="mt-6 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Upload another route
            </Link>
          </article>

          <RouteTransferPanel routeId={route.id} />
          <RouteLineMatches matches={matches} />
        </div>

        <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Route map</p>
          <div className="mt-5">
            <RouteMapPanel coordinates={coordinates} />
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
