const stats = [
  { label: "Riders activos", value: "1,248" },
  { label: "Rutas gravel", value: "326" },
  { label: "Social rides", value: "42" },
  { label: "Ciudades", value: "18" },
];

const upcomingRides = [
  {
    title: "Sunrise Gravel Madrid",
    date: "Sáb 22 Mar · 08:00",
    location: "Casa de Campo",
    distance: "64 km",
    difficulty: "Intermedio",
    riders: 18,
  },
  {
    title: "Sierra Mixed Terrain",
    date: "Dom 23 Mar · 07:30",
    location: "Cercedilla",
    distance: "82 km",
    difficulty: "Avanzado",
    riders: 11,
  },
  {
    title: "Coffee & Gravel Valencia",
    date: "Sáb 29 Mar · 09:00",
    location: "L'Eliana",
    distance: "47 km",
    difficulty: "Beginner-friendly",
    riders: 26,
  },
];

const featuredRoutes = [
  {
    name: "Jarama River Loop",
    region: "Madrid",
    surface: "72% gravel · 28% road",
    elevation: "780 m+",
    distance: "58 km",
  },
  {
    name: "Montserrat Dust Line",
    region: "Barcelona",
    surface: "64% gravel · 36% trail",
    elevation: "1,120 m+",
    distance: "71 km",
  },
  {
    name: "Costa Blanca White Roads",
    region: "Alicante",
    surface: "55% gravel · 45% road",
    elevation: "640 m+",
    distance: "92 km",
  },
];

const clubs = [
  {
    name: "Madrid Gravel Club",
    members: 214,
    description: "Salidas semanales, ritmo medio y café obligatorio.",
  },
  {
    name: "Catalunya Mixed Riders",
    members: 167,
    description: "Rutas largas, puertos y terreno roto sin postureo.",
  },
  {
    name: "Levante Sunset Gravel",
    members: 96,
    description: "Afterwork rides, costa y buen social plan.",
  },
];

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-zinc-600 sm:text-lg">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#fafaf9_35%,_#f4f4f5_100%)] text-zinc-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-6 rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Local MVP · Gravel + Social rides
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
                La red social de gravel pensada para rutas, grupos y quedadas reales.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                Un MVP local para validar una alternativa a Strava enfocada en discovery de rutas,
                social rides, comunidad local y cultura gravel. Sin meter todavía la complejidad de tracking live.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
              <a
                href="#rides"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Ver rides
              </a>
              <a
                href="#routes"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950"
              >
                Explorar rutas
              </a>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">{stat.value}</p>
              </article>
            ))}
          </section>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              eyebrow="Producto"
              title="Qué valida este MVP"
              subtitle="Si la gente quiere descubrir rutas de gravel, sumarse a rides locales y participar en comunidad sin depender de un clon completo de Strava."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Rutas con metadata útil: superficie, dificultad, desnivel y distancia.",
                "Social rides con RSVP, punto de salida y número de riders apuntados.",
                "Clubs locales para organizar comunidad por ciudad o región.",
                "Feed visual simple para fotos, actividad y comentarios.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Roadmap</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
              <li><span className="font-semibold text-white">Fase 1:</span> routes + rides + clubs + feed.</li>
              <li><span className="font-semibold text-white">Fase 2:</span> import GPX + sync con Strava/Garmin.</li>
              <li><span className="font-semibold text-white">Fase 3:</span> badges, rankings, route intelligence y recomendaciones.</li>
              <li><span className="font-semibold text-white">Fase 4:</span> app móvil y tracking nativo si hay tracción real.</li>
            </ul>
          </aside>
        </section>

        <section id="rides" className="space-y-8">
          <SectionTitle
            eyebrow="Social rides"
            title="Próximas salidas"
            subtitle="La parte más diferenciadora: rides públicos, locales y fáciles de descubrir."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {upcomingRides.map((ride) => (
              <article key={ride.title} className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {ride.difficulty}
                  </span>
                  <span className="text-sm text-zinc-500">{ride.riders} riders</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-950">{ride.title}</h3>
                <div className="mt-4 space-y-2 text-sm leading-7 text-zinc-600">
                  <p>{ride.date}</p>
                  <p>{ride.location}</p>
                  <p>{ride.distance}</p>
                </div>
                <button className="mt-6 inline-flex rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  Apuntarme
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="routes" className="space-y-8">
          <SectionTitle
            eyebrow="Routes"
            title="Rutas destacadas"
            subtitle="El descubrimiento de rutas debe ser más útil que un simple mapa: superficie, elevación y contexto local."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredRoutes.map((route) => (
              <article key={route.name} className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-amber-700">{route.region}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">{route.name}</h3>
                <dl className="mt-5 space-y-2 text-sm leading-7 text-zinc-600">
                  <div>
                    <dt className="inline font-medium text-zinc-800">Superficie:</dt> <dd className="inline">{route.surface}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-zinc-800">Desnivel:</dt> <dd className="inline">{route.elevation}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-zinc-800">Distancia:</dt> <dd className="inline">{route.distance}</dd>
                  </div>
                </dl>
                <button className="mt-6 inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950">
                  Ver detalle
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              eyebrow="Clubs"
              title="Comunidad local"
              subtitle="Sin comunidad local no hay producto defensible. Aquí está el verdadero moat."
            />
            <div className="mt-8 space-y-4">
              {clubs.map((club) => (
                <div key={club.name} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-zinc-950">{club.name}</h3>
                    <span className="text-sm text-zinc-500">{club.members} miembros</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{club.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              eyebrow="Go-to-market"
              title="Cómo lo vendería"
              subtitle="No como app de fitness generalista, sino como infraestructura social para el mundo gravel."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Embajadores locales que creen las primeras rutas y rides.",
                "Tiendas y cafés como partners de comunidad.",
                "Eventos curatoriales en vez de simple feed infinito.",
                "Premium para clubs, route packs y visibilidad local.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
