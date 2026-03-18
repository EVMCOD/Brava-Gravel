import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { chapters, featuredRides, lineHighlights, routeHighlights, stats } from "@/lib/mock-data";

const featurePillars = [
  "Discover beautiful gravel routes with real metadata.",
  "Join public rides with RSVP and clear ride expectations.",
  "Build local chapters around cities, cafés and bike shops.",
  "Share photos, stories and ride culture — not just numbers.",
];

function SectionHeader({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{label}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-stone-600 sm:text-lg">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#d7b98e]" />
            New concept website · premium gravel social platform
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              A more beautiful social home for the gravel world.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              BRAVA GRAVEL is a community-first cycling platform built for route discovery,
              social rides, local chapters and GPS-backed uploads — not just activity tracking.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-full bg-[#c38b43] px-6 py-3 text-sm font-semibold text-[#1f1c19] transition hover:bg-[#d7b98e]"
            >
              Upload GPX route
            </Link>
            <Link
              href="/lines"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Explore BRAVA Lines
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-stone-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <article className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b98e]">Functional next step</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">GPS uploads are already in the product</h3>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              We already support GPX upload parsing so the next step is persistence, map rendering and segment matching. That gives us a real bridge from static brand site into usable product.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-stone-200">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-stone-400">GPS ingestion</p>
                <p className="mt-2 text-xl font-semibold text-white">Live</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-stone-400">Route parser</p>
                <p className="mt-2 text-xl font-semibold text-white">Ready</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-stone-400">Lines concept</p>
                <p className="mt-2 text-xl font-semibold text-white">Defined</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-stone-400">Persistence</p>
                <p className="mt-2 text-xl font-semibold text-white">Next</p>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border border-[#d7b98e]/30 bg-[#c38b43] p-6 text-[#1f1c19]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]">Brand direction</p>
            <p className="mt-3 text-lg font-semibold tracking-tight">
              Premium outdoor aesthetic. Editorial feel. Social, warm and design-forward.
            </p>
          </article>
        </div>
      </div>

      <section className="grid gap-6 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <article className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            label="Positioning"
            title="Not another Strava clone"
            text="The wedge is simple: make gravel culture easier to discover, join and share. Routes, rides and community first. Hardcore tracking later."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {featurePillars.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-[32px] border border-black/5 bg-[#ece1d2] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-600">Core loop</p>
          <ol className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
            <li><span className="font-semibold text-stone-950">1.</span> Discover a route worth riding.</li>
            <li><span className="font-semibold text-stone-950">2.</span> Join a public social ride or create one.</li>
            <li><span className="font-semibold text-stone-950">3.</span> Meet local riders and chapters.</li>
            <li><span className="font-semibold text-stone-950">4.</span> Upload GPS data and attach it to routes.</li>
            <li><span className="font-semibold text-stone-950">5.</span> Come back for the next ride, not just the next stat.</li>
          </ol>
        </aside>
      </section>

      <section className="space-y-8 px-6 py-4 sm:px-8 lg:px-10">
        <SectionHeader
          label="Routes"
          title="Curated gravel routes with real context"
          text="Beautiful cards, clearer metadata and a more editorial presentation than typical training apps."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {routeHighlights.map((route) => (
            <article key={route.id} className="overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-sm">
              <div className="h-44 bg-[linear-gradient(135deg,#d7b98e,#8f6a43)]" />
              <div className="p-6">
                <p className="text-sm font-medium text-stone-500">{route.region}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{route.name}</h3>
                <div className="mt-5 space-y-2 text-sm leading-7 text-stone-600">
                  <p><span className="font-medium text-stone-900">Distance:</span> {route.distance}</p>
                  <p><span className="font-medium text-stone-900">Elevation:</span> {route.elevation}</p>
                  <p><span className="font-medium text-stone-900">Terrain:</span> {route.terrain}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 px-6 py-16 sm:px-8 lg:px-10">
        <SectionHeader
          label="Lines"
          title="Map-worthy gravel sectors with ranking potential"
          text="BRAVA Lines gives the product its competitive edge: iconic sectors, leaderboard logic and map-first discovery."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {lineHighlights.map((line) => (
            <article key={line.id} className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
              <p className="text-sm font-medium text-stone-500">{line.area}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{line.name}</h3>
              <div className="mt-5 space-y-2 text-sm leading-7 text-stone-600">
                <p><span className="font-medium text-stone-900">Length:</span> {line.length}</p>
                <p><span className="font-medium text-stone-900">Grade:</span> {line.grade}</p>
                <p><span className="font-medium text-stone-900">Surface:</span> {line.surface}</p>
                <p><span className="font-medium text-stone-900">Leader:</span> {line.leader}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 px-6 pb-16 sm:px-8 lg:px-10">
        <SectionHeader
          label="Rides"
          title="Join beautiful local rides"
          text="The most important surface in the product: discovery of real rides with a clear mood, level and social promise."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredRides.map((ride) => (
            <article key={ride.title} className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#ece1d2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-700">
                  {ride.vibe}
                </span>
                <span className="text-sm text-stone-500">{ride.riders} riders</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-stone-950">{ride.title}</h3>
              <div className="mt-4 space-y-2 text-sm leading-7 text-stone-600">
                <p>{ride.date}</p>
                <p>{ride.location}</p>
                <p>{ride.distance}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 px-6 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <article className="rounded-[32px] border border-black/5 bg-[#1f1c19] p-6 text-white shadow-sm sm:p-8">
          <SectionHeader
            label="Local chapters"
            title="City-based communities"
            text="This is where retention and identity come from. People stay for groups, recurring rides and local belonging."
          />
        </article>

        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <article key={chapter.name} className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-stone-950">{chapter.name}</h3>
                <span className="text-sm text-stone-500">{chapter.members} members</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-600">{chapter.text}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
