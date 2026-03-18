import { GpxUploadForm } from "@/components/gpx-upload-form";
import { PageIntro, SiteShell } from "@/components/site-shell";

export default function UploadPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="GPS Upload"
        title="Upload GPX routes and extract the core ride data"
        description="This is the first functional bridge into GPS workflows: upload a GPX file, persist it locally, parse the route, and prepare import/export flows with Garmin or bike GPS devices."
      />
      <section className="px-6 pb-10 sm:px-8 lg:px-10">
        <GpxUploadForm />
      </section>
    </SiteShell>
  );
}
