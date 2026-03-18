"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

type RouteMapProps = {
  coordinates: Array<{ lat: number; lon: number }>;
};

export function RouteMap({ coordinates }: RouteMapProps) {
  if (coordinates.length === 0) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-[28px] border border-stone-200 bg-stone-100 text-sm text-stone-500">
        No route geometry available.
      </div>
    );
  }

  const center = [coordinates[0].lat, coordinates[0].lon] as [number, number];
  const path = coordinates.map((point) => [point.lat, point.lon] as [number, number]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200">
      <MapContainer center={center} zoom={11} scrollWheelZoom={false} className="h-[340px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} pathOptions={{ color: "#c38b43", weight: 4 }} />
      </MapContainer>
    </div>
  );
}
