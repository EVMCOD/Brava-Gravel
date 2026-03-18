import { NextResponse } from "next/server";

const routes = [
  {
    id: "route_1",
    name: "Jarama River Loop",
    region: "Madrid",
    distanceKm: 58,
    elevationGainM: 780,
    surfaceMix: "72% gravel · 28% road",
  },
  {
    id: "route_2",
    name: "Montserrat Dust Line",
    region: "Barcelona",
    distanceKm: 71,
    elevationGainM: 1120,
    surfaceMix: "64% gravel · 36% trail",
  },
  {
    id: "route_3",
    name: "Costa Blanca White Roads",
    region: "Alicante",
    distanceKm: 92,
    elevationGainM: 640,
    surfaceMix: "55% gravel · 45% road",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: routes, error: null });
}
