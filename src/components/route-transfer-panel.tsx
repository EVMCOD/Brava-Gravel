import Link from "next/link";

export function RouteTransferPanel({ routeId }: { routeId: string }) {
  return (
    <article className="rounded-[30px] border border-white/10 bg-[#fffaf2] p-6 shadow-sm text-stone-900">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Route transfer</p>
      <p className="mt-3 text-sm leading-7 text-stone-600">
        Import routes from Garmin exports or bike GPS files, and export BRAVA routes back out for devices and planning tools.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/api/routes/upload/${routeId}/export?format=gpx`}
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Export GPX
        </Link>
        <button
          disabled
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-400"
        >
          TCX export next
        </button>
      </div>

      <div className="mt-6 space-y-2 text-sm text-stone-600">
        <p><span className="font-medium text-stone-900">Import supported now:</span> GPX</p>
        <p><span className="font-medium text-stone-900">Adapters prepared:</span> TCX, FIT</p>
      </div>
    </article>
  );
}
