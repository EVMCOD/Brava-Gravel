"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthControls() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-10 w-[160px]" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-stone-300 sm:text-sm">{session.user.name ?? session.user.email}</span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-full border border-white/15 px-3 py-2 text-xs text-white sm:text-sm"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="rounded-full border border-white/15 px-3 py-2 text-xs text-white sm:text-sm"
    >
      Login with Google
    </button>
  );
}
