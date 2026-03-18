import { RouteBuilder } from "@/components/route-builder";
import { PageIntro, SiteShell } from "@/components/site-shell";

export default function BuilderPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Route Builder"
        title="Create your own BRAVA route from scratch"
        description="A first builder MVP for planning your own gravel route, exporting it to GPX and preparing it for rides, sharing and device transfer."
      />
      <section className="px-6 pb-10 sm:px-8 lg:px-10">
        <RouteBuilder />
      </section>
    </SiteShell>
  );
}
