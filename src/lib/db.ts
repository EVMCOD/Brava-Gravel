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

  CREATE TABLE IF NOT EXISTS external_connections (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    external_athlete_id TEXT,
    status TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS imported_activities (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    external_activity_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    distance_km REAL NOT NULL,
    elevation_gain_m INTEGER NOT NULL,
    activity_date TEXT NOT NULL,
    route_points TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS rides (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    route_id TEXT NOT NULL,
    title TEXT NOT NULL,
    meetup_at TEXT NOT NULL,
    meetup_point TEXT NOT NULL,
    pace_label TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES uploaded_routes(id)
  );

  CREATE TABLE IF NOT EXISTS ride_attendees (
    id TEXT PRIMARY KEY,
    ride_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(ride_id, user_id),
    FOREIGN KEY (ride_id) REFERENCES rides(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
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

const seedUser = database.prepare(`
  INSERT OR IGNORE INTO users (id, name, home_region, created_at)
  VALUES (@id, @name, @home_region, @created_at)
`);

seedUser.run({
  id: "user_demo_1",
  name: "Enrique",
  home_region: "Madrid",
  created_at: new Date().toISOString(),
});

export type UserRecord = {
  id: string;
  name: string;
  home_region: string;
  created_at: string;
};

export type ExternalConnection = {
  id: string;
  user_id: string;
  provider: string;
  external_athlete_id: string | null;
  status: string;
  access_token: string | null;
  refresh_token: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ImportedActivity = {
  id: string;
  user_id: string;
  provider: string;
  external_activity_id: string;
  name: string;
  distance_km: number;
  elevation_gain_m: number;
  activity_date: string;
  route_points: string;
  created_at: string;
};

export type RideRecord = {
  id: string;
  user_id: string;
  route_id: string;
  title: string;
  meetup_at: string;
  meetup_point: string;
  pace_label: string;
  capacity: number;
  notes: string | null;
  created_at: string;
};

export type RideWithStats = RideRecord & {
  route_name: string;
  route_distance_km: number;
  route_elevation_gain_m: number;
  attendee_count: number;
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

export function getExternalConnectionByProvider(userId: string, provider: string): ExternalConnection | null {
  const statement = database.prepare(`
    SELECT *
    FROM external_connections
    WHERE user_id = ? AND provider = ?
    LIMIT 1
  `);

  return (statement.get(userId, provider) as ExternalConnection | undefined) ?? null;
}

export function listExternalConnections(userId: string): ExternalConnection[] {
  const statement = database.prepare(`
    SELECT *
    FROM external_connections
    WHERE user_id = ?
    ORDER BY datetime(updated_at) DESC
  `);

  return statement.all(userId) as ExternalConnection[];
}

export function upsertExternalConnection(connection: ExternalConnection) {
  const statement = database.prepare(`
    INSERT INTO external_connections (
      id, user_id, provider, external_athlete_id, status,
      access_token, refresh_token, expires_at, created_at, updated_at
    ) VALUES (
      @id, @user_id, @provider, @external_athlete_id, @status,
      @access_token, @refresh_token, @expires_at, @created_at, @updated_at
    )
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status,
      external_athlete_id = excluded.external_athlete_id,
      access_token = excluded.access_token,
      refresh_token = excluded.refresh_token,
      expires_at = excluded.expires_at,
      updated_at = excluded.updated_at
  `);

  statement.run(connection);
}

export function upsertImportedActivity(activity: ImportedActivity) {
  const statement = database.prepare(`
    INSERT INTO imported_activities (
      id, user_id, provider, external_activity_id, name,
      distance_km, elevation_gain_m, activity_date, route_points, created_at
    ) VALUES (
      @id, @user_id, @provider, @external_activity_id, @name,
      @distance_km, @elevation_gain_m, @activity_date, @route_points, @created_at
    )
    ON CONFLICT(external_activity_id) DO UPDATE SET
      name = excluded.name,
      distance_km = excluded.distance_km,
      elevation_gain_m = excluded.elevation_gain_m,
      activity_date = excluded.activity_date,
      route_points = excluded.route_points
  `);

  statement.run(activity);
}

export function listImportedActivities(userId: string): ImportedActivity[] {
  const statement = database.prepare(`
    SELECT *
    FROM imported_activities
    WHERE user_id = ?
    ORDER BY datetime(activity_date) DESC
  `);

  return statement.all(userId) as ImportedActivity[];
}

export function insertRide(ride: RideRecord) {
  const statement = database.prepare(`
    INSERT INTO rides (
      id, user_id, route_id, title, meetup_at, meetup_point, pace_label, capacity, notes, created_at
    ) VALUES (
      @id, @user_id, @route_id, @title, @meetup_at, @meetup_point, @pace_label, @capacity, @notes, @created_at
    )
  `);

  statement.run(ride);
}

export function joinRide(rideId: string, userId: string) {
  const statement = database.prepare(`
    INSERT OR IGNORE INTO ride_attendees (id, ride_id, user_id, created_at)
    VALUES (?, ?, ?, ?)
  `);

  statement.run(`${rideId}_${userId}`, rideId, userId, new Date().toISOString());
}

export function listRides(userId: string): RideWithStats[] {
  const statement = database.prepare(`
    SELECT
      rides.*,
      uploaded_routes.name as route_name,
      uploaded_routes.distance_km as route_distance_km,
      uploaded_routes.elevation_gain_m as route_elevation_gain_m,
      COUNT(ride_attendees.id) as attendee_count
    FROM rides
    JOIN uploaded_routes ON uploaded_routes.id = rides.route_id
    LEFT JOIN ride_attendees ON ride_attendees.ride_id = rides.id
    WHERE rides.user_id = ?
    GROUP BY rides.id
    ORDER BY datetime(rides.meetup_at) ASC
  `);

  return statement.all(userId) as RideWithStats[];
}

export function getRideById(id: string): RideWithStats | null {
  const statement = database.prepare(`
    SELECT
      rides.*,
      uploaded_routes.name as route_name,
      uploaded_routes.distance_km as route_distance_km,
      uploaded_routes.elevation_gain_m as route_elevation_gain_m,
      COUNT(ride_attendees.id) as attendee_count
    FROM rides
    JOIN uploaded_routes ON uploaded_routes.id = rides.route_id
    LEFT JOIN ride_attendees ON ride_attendees.ride_id = rides.id
    WHERE rides.id = ?
    GROUP BY rides.id
    LIMIT 1
  `);

  return (statement.get(id) as RideWithStats | undefined) ?? null;
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
