"use client";

import { useState } from "react";

export function JoinRideButton({ rideId }: { rideId: string }) {
  const [status, setStatus] = useState("Join this ride to validate the social loop.");
  const [joining, setJoining] = useState(false);

  async function handleJoin() {
    setJoining(true);
    setStatus("Joining ride...");

    const response = await fetch("/api/rides/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rideId }),
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      setStatus(json.error ?? "Could not join ride.");
      setJoining(false);
      return;
    }

    setStatus("You joined the ride.");
    setJoining(false);
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleJoin}
        disabled={joining}
        className="inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {joining ? "Joining..." : "Join ride"}
      </button>
      <p className="mt-4 text-sm text-stone-500">{status}</p>
    </div>
  );
}
