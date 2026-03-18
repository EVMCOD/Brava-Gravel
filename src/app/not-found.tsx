import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="px-6 py-16 text-white sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b98e]">Not found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">That BRAVA page does not exist.</h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-stone-300">
          The route or page you tried to access is not available yet.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[#c38b43] px-5 py-3 text-sm font-semibold text-[#1f1c19]">
          Back home
        </Link>
      </section>
    </SiteShell>
  );
}
