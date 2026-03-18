import Link from "next/link";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { lines } from "@/lib/lines-data";

export default function LinesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Lines"
        title="Map-worthy sectors with leaderboard potential"
        description="BRAVA Lines is the future segments layer: iconic gravel sectors, route overlays, KOM-style rankings and community notes around each effort."
      />
      <section className="grid gap-5 px-6 pb-10 sm:px-8 lg:grid-cols-3 lg:px-10">
        {lines.map((line) => (
          <article key={line.id} className="rounded-[30px] border border-white/10 bg-[#fffaf2] p-6 shadow-sm text-stone-900">
            <p className="text-sm font-medium text-stone-500">{line.area}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{line.name}</h2>
            <div className="mt-5 space-y-2 text-sm leading-7 text-stone-600">
              <p><span className="font-medium text-stone-900">Length:</span> {line.length}</p>
              <p><span className="font-medium text-stone-900">Grade:</span> {line.grade}</p>
              <p><span className="font-medium text-stone-900">Surface:</span> {line.surface}</p>
              <p><span className="font-medium text-stone-900">Leader:</span> {line.leaderboard[0]?.time} · {line.leaderboard[0]?.rider}</p>
            </div>
            <Link
              href={`/lines/${line.id}`}
              className="mt-5 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:border-stone-900"
            >
              View line
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
