"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { BinData } from "@/types"
import { Badge } from "@/components/ui/badge"
import { getAlertLevel } from "@/lib/utils"

const binIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 28px; line-height: 1;">🗑️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

const dangerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 28px; line-height: 1;">⚠️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

export function BinMap({ bins }: { bins: BinData[] }) {
  const center: [number, number] =
    bins.length > 0
      ? [bins[0].lat, bins[0].lng]
      : [21.0285, 105.8542]

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full rounded-xl"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bins.map((bin) => {
        const co2 = bin.latestSensor?.co2 ?? 0
        const methane = bin.latestSensor?.methane ?? 0
        const { level } = getAlertLevel(co2, methane)
        const icon = level === "danger" ? dangerIcon : binIcon

        return (
          <Marker key={bin.id} position={[bin.lat, bin.lng]} icon={icon}>
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-base mb-1">{bin.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{bin.address}</p>
                <div className="space-y-1 text-sm">
                  <p>
                    CO₂: <strong>{co2} ppm</strong>
                  </p>
                  <p>
                    Metan: <strong>{methane} ppm</strong>
                  </p>
                  {level !== "safe" && (
                    <Badge
                      variant={level === "danger" ? "danger" : "warning"}
                    >
                      {level === "danger" ? "Nguy hiểm" : "Cảnh báo"}
                    </Badge>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
