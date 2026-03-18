import Link from "next/link";
import { notFound } from "next/navigation";
import { LineMapPanel } from "@/components/line-map-panel";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { getLineById } from "@/lib/lines-data";

export default async function LineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const line = getLineById(id);

  if (!line) {
    notFound();
  }

  return (
    <SiteShell>
      <PageIntro
        eyebrow="BRAVA Line"
        title={line.name}
        description={line.overview}
      />
      <section className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
        <div className="grid gap-6">
          <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
            <div className="space-y-3 text-sm text-stone-600">
              <p><span className="font-medium text-stone-900">Area:</span> {line.area}</p>
              <p><span className="font-medium text-stone-900">Region:</span> {line.region}</p>
              <p><span className="font-medium text-stone-900">Length:</span> {line.length}</p>
              <p><span className="font-medium text-stone-900">Grade:</span> {line.grade}</p>
              <p><span className="font-medium text-stone-900">Surface:</span> {line.surface}</p>
            </div>
            <Link
              href="/lines"
              className="mt-6 inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Back to lines
            </Link>
          </article>

          <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Leaderboard</p>
            <div className="mt-5 space-y-3">
              {line.leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div>
                    <p className="text-sm text-stone-500">#{entry.rank}</p>
                    <p className="text-base font-semibold text-stone-950">{entry.rider}</p>
                  </div>
                  <p className="text-lg font-semibold text-stone-950">{entry.time}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Line map</p>
          <div className="mt-5">
            <LineMapPanel coordinates={line.geometry} />
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
