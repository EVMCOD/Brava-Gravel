import { NextResponse } from "next/server";

const rides = [
  {
    id: "ride_1",
    title: "Sunrise Gravel Madrid",
    date: "2026-03-22T08:00:00+01:00",
    location: "Casa de Campo, Madrid",
    distanceKm: 64,
    difficulty: "intermediate",
    ridersJoined: 18,
  },
  {
    id: "ride_2",
    title: "Sierra Mixed Terrain",
    date: "2026-03-23T07:30:00+01:00",
    location: "Cercedilla, Madrid",
    distanceKm: 82,
    difficulty: "advanced",
    ridersJoined: 11,
  },
  {
    id: "ride_3",
    title: "Coffee & Gravel Valencia",
    date: "2026-03-29T09:00:00+01:00",
    location: "L'Eliana, Valencia",
    distanceKm: 47,
    difficulty: "beginner",
    ridersJoined: 26,
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: rides, error: null });
}
