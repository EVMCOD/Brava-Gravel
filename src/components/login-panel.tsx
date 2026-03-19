"use client";

import { signIn } from "next-auth/react";

export function LoginPanel() {
  return (
    <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm text-stone-900">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Google login</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Keep your routes, rides and imports linked to you.</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
        This is the next step from the demo user model: real account access so BRAVA data belongs to each rider.
      </p>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Continue with Google
      </button>
    </article>
  );
}
