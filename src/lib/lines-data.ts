export type LineGeometryPoint = {
  lat: number;
  lon: number;
};

export const lines = [
  {
    id: "line_1",
    name: "Begur Cliff Sector",
    area: "Begur",
    region: "Costa Brava",
    length: "2.8 km",
    grade: "3.2% avg",
    surface: "Hardpack gravel",
    overview:
      "A rolling Costa Brava sector with sea air, compact gravel and enough speed to create repeatable efforts.",
    geometry: [
      { lat: 41.956, lon: 3.208 },
      { lat: 41.959, lon: 3.211 },
      { lat: 41.963, lon: 3.216 },
      { lat: 41.967, lon: 3.221 },
    ] as LineGeometryPoint[],
    leaderboard: [
      { rank: 1, rider: "Javier R.", time: "02:41" },
      { rank: 2, rider: "Enrique V.", time: "02:47" },
      { rank: 3, rider: "Marta V.", time: "02:52" },
    ],
  },
  {
    id: "line_2",
    name: "Banyoles Dust Climb",
    area: "Banyoles",
    region: "Girona",
    length: "4.6 km",
    grade: "5.8% avg",
    surface: "Loose gravel",
    overview:
      "A punchy Girona gravel climb with loose corners and enough vertical to justify a proper crown battle.",
    geometry: [
      { lat: 42.123, lon: 2.754 },
      { lat: 42.126, lon: 2.759 },
      { lat: 42.129, lon: 2.765 },
      { lat: 42.132, lon: 2.771 },
    ] as LineGeometryPoint[],
    leaderboard: [
      { rank: 1, rider: "Marta V.", time: "11:08" },
      { rank: 2, rider: "Pau M.", time: "11:21" },
      { rank: 3, rider: "Enrique V.", time: "11:34" },
    ],
  },
  {
    id: "line_3",
    name: "Cap de Creus Wind Road",
    area: "Cadaqués",
    region: "Costa Brava",
    length: "6.1 km",
    grade: "1.4% avg",
    surface: "Fast rolling gravel",
    overview:
      "An exposed speed line where Mediterranean wind matters as much as watts.",
    geometry: [
      { lat: 42.289, lon: 3.286 },
      { lat: 42.293, lon: 3.291 },
      { lat: 42.297, lon: 3.298 },
      { lat: 42.301, lon: 3.305 },
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
