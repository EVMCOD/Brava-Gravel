import { PageIntro, SiteShell } from "@/components/site-shell";
import { featuredRides } from "@/lib/mock-data";

export default function RidesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Rides"
        title="Social rides built around place, pace and community"
        description="This section will evolve into the real product loop: RSVP, meetup location, route attachment, ride chat and later attendance plus activity sync."
      />
      <section className="grid gap-5 px-6 pb-10 sm:px-8 lg:grid-cols-3 lg:px-10">
        {featuredRides.map((ride) => (
          <article key={ride.title} className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#ece1d2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-700">
                {ride.vibe}
              </span>
              <span className="text-sm text-stone-500">{ride.riders} riders</span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">{ride.title}</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-stone-600">
              <p>{ride.date}</p>
              <p>{ride.location}</p>
              <p>{ride.distance}</p>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
