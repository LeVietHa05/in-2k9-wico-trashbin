"use client"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { L as Lang } from "@/lib/lang"

const markerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 32px; line-height: 1;">📍</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

function ClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function LocationPicker({
  lat,
  lng,
  onLocationSelect,
}: {
  lat: number | null
  lng: number | null
  onLocationSelect: (lat: number, lng: number) => void
}) {
  const center: [number, number] =
    lat !== null && lng !== null ? [lat, lng] : [21.0285, 105.8542]

  return (
    <div className="space-y-2">
      <div className="h-[300px] rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={center}
          zoom={15}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onLocationSelect={onLocationSelect} />
          {lat !== null && lng !== null && (
            <Marker position={[lat, lng]} icon={markerIcon} />
          )}
        </MapContainer>
      </div>
      <p className="text-xs text-gray-500 text-center">
        {Lang.locationPickerHint}
      </p>
    </div>
  )
}
