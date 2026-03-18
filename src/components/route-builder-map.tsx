"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet";

type Coordinate = {
  lat: number;
  lon: number;
};

function ClickHandler({ onAddPoint }: { onAddPoint: (coordinate: Coordinate) => void }) {
  useMapEvents({
    click(event) {
      onAddPoint({ lat: event.latlng.lat, lon: event.latlng.lng });
    },
  });

  return null;
}

export function RouteBuilderMap({
  coordinates,
  onAddPoint,
}: {
  coordinates: Coordinate[];
  onAddPoint: (coordinate: Coordinate) => void;
}) {
  const center = coordinates.length > 0
    ? ([coordinates[0].lat, coordinates[0].lon] as [number, number])
    : ([41.9794, 3.1318] as [number, number]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200">
      <MapContainer center={center} zoom={10} scrollWheelZoom className="h-[460px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onAddPoint={onAddPoint} />
        {coordinates.map((coordinate, index) => (
          <Marker key={`${coordinate.lat}-${coordinate.lon}-${index}`} position={[coordinate.lat, coordinate.lon]} />
        ))}
        {coordinates.length > 1 ? (
          <Polyline positions={coordinates.map((point) => [point.lat, point.lon] as [number, number])} pathOptions={{ color: "#c38b43", weight: 4 }} />
        ) : null}
      </MapContainer>
    </div>
  );
}
