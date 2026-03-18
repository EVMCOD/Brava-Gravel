import Link from "next/link";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { getDefaultUser, listRides } from "@/lib/db";

export default function RidesPage() {
  const user = getDefaultUser();
  const rides = listRides(user.id);

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Rides"
        title="Social rides built around route, pace and meetup"
        description="A real MVP list of BRAVA rides with route stats, meetup details and enough structure to start validating the social planning loop."
      />
      <section className="grid gap-5 px-6 pb-10 sm:px-8 lg:grid-cols-3 lg:px-10">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <article key={ride.id} className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#ece1d2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-700">
                  {ride.pace_label}
                </span>
                <span className="text-sm text-stone-500">{ride.attendee_count}/{ride.capacity}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{ride.title}</h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-stone-600">
                <p>{new Date(ride.meetup_at).toLocaleString()}</p>
                <p>{ride.meetup_point}</p>
                <p>{ride.route_name}</p>
                <p>{ride.route_distance_km} km · {ride.route_elevation_gain_m} m+</p>
              </div>
              <Link href={`/rides/${ride.id}`} className="mt-6 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800">
                View ride
              </Link>
            </article>
          ))
        ) : (
          <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900 lg:col-span-3">
            <p className="text-sm leading-7 text-stone-600">No rides created yet. Use the Builder or a saved route to create your first BRAVA ride.</p>
          </article>
        )}
      </section>
    </SiteShell>
  );
}
