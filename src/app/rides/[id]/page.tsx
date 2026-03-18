import { notFound } from "next/navigation";
import { JoinRideButton } from "@/components/join-ride-button";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { getRideById } from "@/lib/db";

export default async function RideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ride = getRideById(id);

  if (!ride) {
    notFound();
  }

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Ride detail"
        title={ride.title}
        description="A BRAVA social ride with route stats, meetup details and a first join flow for validating the community side of the product."
      />
      <section className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
          <div className="space-y-3 text-sm text-stone-600">
            <p><span className="font-medium text-stone-900">Meetup:</span> {new Date(ride.meetup_at).toLocaleString()}</p>
            <p><span className="font-medium text-stone-900">Point:</span> {ride.meetup_point}</p>
            <p><span className="font-medium text-stone-900">Pace:</span> {ride.pace_label}</p>
            <p><span className="font-medium text-stone-900">Route:</span> {ride.route_name}</p>
            <p><span className="font-medium text-stone-900">Stats:</span> {ride.route_distance_km} km · {ride.route_elevation_gain_m} m+</p>
            <p><span className="font-medium text-stone-900">Attendees:</span> {ride.attendee_count}/{ride.capacity}</p>
          </div>
          <JoinRideButton rideId={ride.id} />
        </article>

        <article className="rounded-[30px] border border-white/10 bg-[#fffaf2] p-6 shadow-sm text-stone-900">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Notes</p>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            {ride.notes ?? "No extra notes yet."}
          </p>
        </article>
      </section>
    </SiteShell>
  );
}
