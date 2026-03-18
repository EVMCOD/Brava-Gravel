import { IntegrationsPanel } from "@/components/integrations-panel";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { StravaSyncPanel } from "@/components/strava-sync-panel";
import { getDefaultUser, getExternalConnectionByProvider, listExternalConnections, listImportedActivities } from "@/lib/db";

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const user = getDefaultUser();
  const connections = listExternalConnections(user.id);
  const stravaConnection = getExternalConnectionByProvider(user.id, "strava");
  const activities = listImportedActivities(user.id);
  const resolvedSearchParams = await searchParams;

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Integrations"
        title="Connect BRAVA to Strava and future GPS providers"
        description="A clean, low-friction connection flow for bringing real activities, routes and ride history into BRAVA from Strava and, later, other GPS platforms."
      />
      <section className="space-y-6 px-6 pb-10 sm:px-8 lg:px-10">
        <IntegrationsPanel
          connections={connections}
          initialStatus={resolvedSearchParams.status}
        />
        <StravaSyncPanel
          initiallyConnected={stravaConnection?.status === "connected"}
          initialActivities={activities}
        />
      </section>
    </SiteShell>
  );
}
