"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { AuthControls } from "@/components/auth-controls";
import { UiControlsSlot } from "@/components/ui-controls-slot";
import { useUiState } from "@/components/ui-state";
import { t } from "@/lib/i18n";

export function SiteShell({ children }: { children: ReactNode }) {
  const { language } = useUiState();
  const copy = t(language);

  const navigation = [
    { href: "/", label: copy.nav.home },
    { href: "/routes", label: copy.nav.routes },
    { href: "/lines", label: copy.nav.lines },
    { href: "/rides", label: copy.nav.rides },
    { href: "/upload", label: copy.nav.upload },
    { href: "/builder", label: copy.nav.builder },
    { href: "/integrations", label: copy.nav.integrations },
    { href: "/profile", label: copy.nav.profile },
  ];

  return (
    <main className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)] transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
        <section className="overflow-hidden rounded-[36px] border border-black/5 bg-[var(--shell-dark)] text-white shadow-[0_30px_120px_-50px_rgba(0,0,0,0.55)]">
          <nav className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b98e]/40 bg-[#c38b43] text-sm font-bold tracking-[0.28em] text-[#1f1c19]">
                  BG
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[0.2em] text-white">BRAVA GRAVEL</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{copy.shell.tagline}</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-wrap items-center gap-3">
                <AuthControls />
                <UiControlsSlot />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-300">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          {children}
        </section>
      </div>
    </main>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-4 px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b98e]">{eyebrow}</p>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">{description}</p>
    </div>
  );
}
