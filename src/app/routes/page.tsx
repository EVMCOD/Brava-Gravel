import { SiteShell, PageIntro } from "@/components/site-shell";
import { routeHighlights } from "@/lib/mock-data";

export default function RoutesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Routes"
        title="Curated gravel routes ready for GPS-based uploads"
        description="This section will become the route library: GPX-backed routes, region filters, elevation stats and later map-based discovery with PostGIS."
      />
      <section className="grid gap-5 px-6 pb-10 sm:px-8 lg:grid-cols-3 lg:px-10">
        {routeHighlights.map((route) => (
          <article key={route.id} className="overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-sm">
            <div className="h-44 bg-[linear-gradient(135deg,#d7b98e,#8f6a43)]" />
            <div className="p-6 text-stone-900">
              <p className="text-sm font-medium text-stone-500">{route.region}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{route.name}</h2>
              <div className="mt-5 space-y-2 text-sm leading-7 text-stone-600">
                <p><span className="font-medium text-stone-900">Distance:</span> {route.distance}</p>
                <p><span className="font-medium text-stone-900">Elevation:</span> {route.elevation}</p>
                <p><span className="font-medium text-stone-900">Terrain:</span> {route.terrain}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
