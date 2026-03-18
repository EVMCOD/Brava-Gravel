"use client";

import { useState } from "react";

type CreateRideResponse = {
  success: boolean;
  data?: {
    id: string;
  };
  error?: string | null;
};

export function CreateRideForm({ initialRouteId }: { initialRouteId?: string }) {
  const [status, setStatus] = useState("Fill out the ride details and publish it.");
  const [creating, setCreating] = useState(false);
  const [routeId, setRouteId] = useState(initialRouteId ?? "");
  const [title, setTitle] = useState("Sunday Social Gravel");
  const [meetupAt, setMeetupAt] = useState("");
  const [meetupPoint, setMeetupPoint] = useState("Casa de Campo parking");
  const [paceLabel, setPaceLabel] = useState("Social");
  const [capacity, setCapacity] = useState(20);
  const [notes, setNotes] = useState("Coffee stop halfway.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setStatus("Creating ride...");

    const response = await fetch("/api/rides/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeId,
        title,
        meetupAt,
        meetupPoint,
        paceLabel,
        capacity,
        notes,
      }),
    });

    const json = (await response.json()) as CreateRideResponse;

    if (!response.ok || !json.success) {
      setStatus(json.error ?? "Could not create ride.");
      setCreating(false);
      return;
    }

    setStatus("Ride created successfully.");
    setCreating(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Ride details</p>
        <div className="mt-5 grid gap-4">
          <input value={routeId} onChange={(event) => setRouteId(event.target.value)} placeholder="Route ID" className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ride title" className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <input type="datetime-local" value={meetupAt} onChange={(event) => setMeetupAt(event.target.value)} className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <input value={meetupPoint} onChange={(event) => setMeetupPoint(event.target.value)} placeholder="Meetup point" className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <input value={paceLabel} onChange={(event) => setPaceLabel(event.target.value)} placeholder="Pace label" className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <input type="number" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} placeholder="Capacity" className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Notes" className="min-h-[140px] rounded-2xl border border-stone-300 bg-stone-50 px-4 py-4" />
        </div>
        <button type="submit" disabled={creating} className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60">
          {creating ? "Creating..." : "Create ride"}
        </button>
        <p className="mt-4 text-sm text-stone-500">{status}</p>
      </article>

      <article className="rounded-[30px] border border-black/5 bg-[#fffaf2] p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">What this unlocks</p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
          <li>Builder route becomes a social ride.</li>
          <li>You define place, pace and group size.</li>
          <li>Next step is RSVP, comments and attendee list.</li>
        </ul>
      </article>
    </form>
  );
}
