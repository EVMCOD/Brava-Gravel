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
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    home_region TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS uploaded_routes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    point_count INTEGER NOT NULL,
    distance_km REAL NOT NULL,
    elevation_gain_m INTEGER NOT NULL,
    start_lat REAL,
    start_lon REAL,
    end_lat REAL,
    end_lon REAL,
    route_points TEXT NOT NULL DEFAULT '[]',
    gpx_content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

const routeColumns = database.prepare("PRAGMA table_info(uploaded_routes)").all() as Array<{ name: string }>;
const hasRoutePointsColumn = routeColumns.some((column) => column.name === "route_points");
const hasUserIdColumn = routeColumns.some((column) => column.name === "user_id");

if (!hasRoutePointsColumn) {
  database.exec("ALTER TABLE uploaded_routes ADD COLUMN route_points TEXT NOT NULL DEFAULT '[]'");
}

if (!hasUserIdColumn) {
  database.exec("ALTER TABLE uploaded_routes ADD COLUMN user_id TEXT NOT NULL DEFAULT 'user_demo_1'");
}

const existingUserCount = database.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };

if (existingUserCount.count === 0) {
  const seedUser = database.prepare(`
    INSERT INTO users (id, name, home_region, created_at)
    VALUES (@id, @name, @home_region, @created_at)
  `);

  seedUser.run({
    id: "user_demo_1",
    name: "Enrique",
    home_region: "Madrid",
    created_at: new Date().toISOString(),
  });
}

export type UserRecord = {
  id: string;
  name: string;
  home_region: string;
  created_at: string;
};

export type StoredRoute = {
  id: string;
  user_id: string;
  name: string;
  file_name: string;
  point_count: number;
  distance_km: number;
  elevation_gain_m: number;
  start_lat: number | null;
  start_lon: number | null;
  end_lat: number | null;
  end_lon: number | null;
  route_points: string;
  gpx_content: string;
  created_at: string;
};

export function getDefaultUser(): UserRecord {
  const statement = database.prepare(`
    SELECT *
    FROM users
    WHERE id = 'user_demo_1'
    LIMIT 1
  `);

  return statement.get() as UserRecord;
}

export function insertUploadedRoute(route: StoredRoute) {
  const statement = database.prepare(`
    INSERT INTO uploaded_routes (
      id, user_id, name, file_name, point_count, distance_km, elevation_gain_m,
      start_lat, start_lon, end_lat, end_lon, route_points, gpx_content, created_at
    ) VALUES (
      @id, @user_id, @name, @file_name, @point_count, @distance_km, @elevation_gain_m,
      @start_lat, @start_lon, @end_lat, @end_lon, @route_points, @gpx_content, @created_at
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

export function getUploadedRouteById(id: string): StoredRoute | null {
  const statement = database.prepare(`
    SELECT *
    FROM uploaded_routes
    WHERE id = ?
    LIMIT 1
  `);

  return (statement.get(id) as StoredRoute | undefined) ?? null;
}
