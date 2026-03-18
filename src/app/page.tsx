const stats = [
  { label: "Active riders", value: "1,248" },
  { label: "Curated routes", value: "326" },
  { label: "Weekly social rides", value: "42" },
  { label: "Local chapters", value: "18" },
];

const featuredRides = [
  {
    title: "Dawn Patrol Madrid",
    date: "Saturday · 08:00",
    location: "Casa de Campo",
    distance: "64 km",
    vibe: "Fast social",
    riders: 18,
  },
  {
    title: "Dust & Climb Session",
    date: "Sunday · 07:30",
    location: "Cercedilla",
    distance: "82 km",
    vibe: "Challenge ride",
    riders: 11,
  },
  {
    title: "Coffee Loop Valencia",
    date: "Saturday · 09:00",
    location: "L'Eliana",
    distance: "47 km",
    vibe: "Open pace",
    riders: 26,
  },
];

const routeHighlights = [
  {
    name: "Jarama White Line",
    region: "Madrid",
    distance: "58 km",
    elevation: "780 m+",
    terrain: "72% gravel · 28% road",
  },
  {
    name: "Montserrat Dust Line",
    region: "Barcelona",
    distance: "71 km",
    elevation: "1,120 m+",
    terrain: "64% gravel · 36% trail",
  },
  {
    name: "Costa Blanca Escape",
    region: "Alicante",
    distance: "92 km",
    elevation: "640 m+",
    terrain: "55% gravel · 45% road",
  },
];

const chapters = [
  {
    name: "BRAVA Madrid",
    members: 214,
    text: "Weekly gravel rides, solid pace, no ego, mandatory coffee stop.",
  },
  {
    name: "BRAVA Catalunya",
    members: 167,
    text: "Long routes, mixed terrain, mountain legs and real community.",
  },
  {
    name: "BRAVA Levante",
    members: 96,
    text: "Sunset rides, coast loops and good social energy after work.",
  },
];

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
    <main className="min-h-screen bg-[#f6f1e8] text-stone-900">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
        <section className="overflow-hidden rounded-[36px] border border-black/5 bg-[#1f1c19] text-white shadow-[0_30px_120px_-50px_rgba(0,0,0,0.55)]">
          <nav className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b98e]/40 bg-[#c38b43] text-sm font-bold tracking-[0.28em] text-[#1f1c19]">
                BG
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[0.2em] text-white">BRAVA GRAVEL</p>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Ride beautiful. Ride together.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-300">
              <a href="#routes" className="transition hover:text-white">Routes</a>
              <a href="#rides" className="transition hover:text-white">Rides</a>
              <a href="#chapters" className="transition hover:text-white">Chapters</a>
              <a href="#vision" className="transition hover:text-white">Vision</a>
              <a
                href="#waitlist"
                className="rounded-full border border-white/20 px-4 py-2 font-medium text-white transition hover:border-white/50"
              >
                Join waitlist
              </a>
            </div>
          </nav>

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
                  social rides, local chapters and the culture around gravel — not just activity tracking.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-[#c38b43] px-6 py-3 text-sm font-semibold text-[#1f1c19] transition hover:bg-[#d7b98e]"
                >
                  Get early access
                </a>
                <a
                  href="#routes"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Explore concept
                </a>
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
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b98e]">Hero ride</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Sierra Dust Weekend</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  Start in the mountains, roll through forest gravel, finish with brunch and photos.
                  The platform should feel like this ride: aspirational, social and actually usable.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-stone-200">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-stone-400">Distance</p>
                    <p className="mt-2 text-xl font-semibold text-white">74 km</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-stone-400">Elevation</p>
                    <p className="mt-2 text-xl font-semibold text-white">1,040 m+</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-stone-400">Surface</p>
                    <p className="mt-2 text-xl font-semibold text-white">67% gravel</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-stone-400">Spots left</p>
                    <p className="mt-2 text-xl font-semibold text-white">8 / 20</p>
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
        </section>

        <section id="vision" className="grid gap-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
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
              <li><span className="font-semibold text-stone-950">4.</span> Share photos, stories and route notes.</li>
              <li><span className="font-semibold text-stone-950">5.</span> Come back for the next ride, not just the next stat.</li>
            </ol>
          </aside>
        </section>

        <section id="routes" className="space-y-8 py-4">
          <SectionHeader
            label="Routes"
            title="Curated gravel routes with real context"
            text="Beautiful cards, clearer metadata and a more editorial presentation than typical training apps."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {routeHighlights.map((route) => (
              <article key={route.name} className="overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-sm">
                <div className="h-44 bg-[linear-gradient(135deg,#d7b98e,#8f6a43)]" />
                <div className="p-6">
                  <p className="text-sm font-medium text-stone-500">{route.region}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{route.name}</h3>
                  <div className="mt-5 space-y-2 text-sm leading-7 text-stone-600">
                    <p><span className="font-medium text-stone-900">Distance:</span> {route.distance}</p>
                    <p><span className="font-medium text-stone-900">Elevation:</span> {route.elevation}</p>
                    <p><span className="font-medium text-stone-900">Terrain:</span> {route.terrain}</p>
                  </div>
                  <button className="mt-6 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:border-stone-900">
                    View route
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="rides" className="space-y-8 py-16">
          <SectionHeader
            label="Rides"
            title="Join beautiful local rides"
            text="The most important surface in the product: discovery of real rides with a clear mood, level and social promise."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredRides.map((ride) => (
              <article key={ride.title} className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
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
                <button className="mt-6 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800">
                  RSVP ride
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="chapters" className="grid gap-6 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
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

        <section id="waitlist" className="pb-10">
          <div className="rounded-[36px] border border-black/5 bg-[#c38b43] px-6 py-10 text-[#1f1c19] shadow-sm sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em]">Join BRAVA</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Build the first version with early riders, clubs and founders.
                </h2>
                <p className="mt-4 text-base leading-7 text-[#34281c]">
                  A cleaner brand, a more social product and a more aspirational entry point into the gravel community.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="min-w-[240px] rounded-full border border-[#8f6a43]/30 bg-white px-5 py-3 text-sm outline-none placeholder:text-stone-400"
                />
                <button className="rounded-full bg-[#1f1c19] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
                  Request access
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
