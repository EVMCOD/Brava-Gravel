import { CreateRideForm } from "@/components/create-ride-form";
import { PageIntro, SiteShell } from "@/components/site-shell";

export default async function NewRidePage({
  searchParams,
}: {
  searchParams: Promise<{ routeId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Create Ride"
        title="Turn a route into a social ride"
        description="Set the meetup, pace and capacity so your custom route becomes a real BRAVA social ride."
      />
      <section className="px-6 pb-10 sm:px-8 lg:px-10">
        <CreateRideForm initialRouteId={resolvedSearchParams.routeId} />
      </section>
    </SiteShell>
  );
}
