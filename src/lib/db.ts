import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "brava-gravel.db");

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const database = new Database(databasePath);

database.exec(`
  CREATE TABLE IF NOT EXISTS uploaded_routes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    point_count INTEGER NOT NULL,
    distance_km REAL NOT NULL,
    elevation_gain_m INTEGER NOT NULL,
    start_lat REAL,
    start_lon REAL,
    end_lat REAL,
    end_lon REAL,
    gpx_content TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

export type StoredRoute = {
  id: string;
  name: string;
  file_name: string;
  point_count: number;
  distance_km: number;
  elevation_gain_m: number;
  start_lat: number | null;
  start_lon: number | null;
  end_lat: number | null;
  end_lon: number | null;
  gpx_content: string;
  created_at: string;
};

export function insertUploadedRoute(route: StoredRoute) {
  const statement = database.prepare(`
    INSERT INTO uploaded_routes (
      id, name, file_name, point_count, distance_km, elevation_gain_m,
      start_lat, start_lon, end_lat, end_lon, gpx_content, created_at
    ) VALUES (
      @id, @name, @file_name, @point_count, @distance_km, @elevation_gain_m,
      @start_lat, @start_lon, @end_lat, @end_lon, @gpx_content, @created_at
    )
  `);

  statement.run(route);
}

export function listUploadedRoutes(): StoredRoute[] {
  const statement = database.prepare(`
    SELECT *
    FROM uploaded_routes
    ORDER BY datetime(created_at) DESC
  `);

  return statement.all() as StoredRoute[];
}
