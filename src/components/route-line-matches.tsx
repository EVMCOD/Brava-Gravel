import Link from "next/link";
import { LineMatch } from "@/lib/line-matching";

export function RouteLineMatches({ matches }: { matches: LineMatch[] }) {
  return (
    <article className="rounded-[30px] border border-white/10 bg-white p-6 shadow-sm text-stone-900">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Detected BRAVA Lines</p>
      <div className="mt-5 space-y-3">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.lineId} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-stone-950">{match.name}</p>
                  <p className="mt-1 text-sm text-stone-500">{match.area}</p>
                </div>
                <Link
                  href={`/lines/${match.lineId}`}
                  className="rounded-full border border-stone-300 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900"
                >
                  View line
                </Link>
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-600">{match.reason}</p>
            </div>
          ))
        ) : (
          <p className="text-sm leading-7 text-stone-600">
            No BRAVA Line matches detected yet for this route. As line-matching improves, this will identify sectors crossed by uploaded rides.
          </p>
        )}
      </div>
    </article>
  );
}
