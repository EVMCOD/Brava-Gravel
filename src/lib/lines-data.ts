export type LineGeometryPoint = {
  lat: number;
  lon: number;
};

export const lines = [
  {
    id: "line_1",
    name: "La Tapia Sector",
    area: "Casa de Campo",
    region: "Madrid",
    length: "2.8 km",
    grade: "3.2% avg",
    surface: "Hardpack gravel",
    overview:
      "A fast rolling sector used by local riders to benchmark repeatable power over mixed hardpack terrain.",
    geometry: [
      { lat: 40.414, lon: -3.751 },
      { lat: 40.416, lon: -3.748 },
      { lat: 40.419, lon: -3.744 },
      { lat: 40.421, lon: -3.741 },
    ] as LineGeometryPoint[],
    leaderboard: [
      { rank: 1, rider: "Javier R.", time: "02:41" },
      { rank: 2, rider: "Enrique V.", time: "02:47" },
      { rank: 3, rider: "Marta V.", time: "02:52" },
    ],
  },
  {
    id: "line_2",
    name: "Mirador Dust Climb",
    area: "Cercedilla",
    region: "Madrid",
    length: "4.6 km",
    grade: "5.8% avg",
    surface: "Loose gravel",
    overview:
      "A decisive climbing line with loose corners and enough vertical to justify a proper crown battle.",
    geometry: [
      { lat: 40.737, lon: -4.056 },
      { lat: 40.739, lon: -4.053 },
      { lat: 40.742, lon: -4.049 },
      { lat: 40.745, lon: -4.045 },
    ] as LineGeometryPoint[],
    leaderboard: [
      { rank: 1, rider: "Marta V.", time: "11:08" },
      { rank: 2, rider: "Pau M.", time: "11:21" },
      { rank: 3, rider: "Enrique V.", time: "11:34" },
    ],
  },
  {
    id: "line_3",
    name: "Barranco White Road",
    area: "Alicante",
    region: "Alicante",
    length: "6.1 km",
    grade: "1.4% avg",
    surface: "Fast rolling gravel",
    overview:
      "An exposed speed line where positioning and wind matter as much as watts.",
    geometry: [
      { lat: 38.347, lon: -0.492 },
      { lat: 38.351, lon: -0.489 },
      { lat: 38.356, lon: -0.485 },
      { lat: 38.361, lon: -0.479 },
    ] as LineGeometryPoint[],
    leaderboard: [
      { rank: 1, rider: "Pau M.", time: "08:55" },
      { rank: 2, rider: "Javier R.", time: "09:01" },
      { rank: 3, rider: "Enrique V.", time: "09:08" },
    ],
  },
];

export function getLineById(id: string) {
  return lines.find((line) => line.id === id) ?? null;
}
