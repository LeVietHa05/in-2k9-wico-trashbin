"use client"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { BinData } from "@/types"
import { getAlertLevel } from "@/lib/utils"

const binIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 28px; line-height: 1;">🗑️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

const dangerIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 28px; line-height: 1;">⚠️</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

const selectedIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div style="font-size: 34px; line-height: 1;">📌</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
})

function MarkerClickHandler({
  bins,
  onBinSelect,
}: {
  bins: BinData[]
  onBinSelect: (bin: BinData | null) => void
}) {
  useMapEvents({
    click(e) {
      let found = false
      for (const bin of bins) {
        const markerLat = bin.lat
        const markerLng = bin.lng
        const dx = e.latlng.lat - markerLat
        const dy = e.latlng.lng - markerLng
        //check clicked point vs bins -> find what pin is clicked
        if (Math.sqrt(dx * dx + dy * dy) < 0.005) {
          onBinSelect(bin)
          found = true
          break
        }
      }
      if (!found) onBinSelect(null)
    },
  })
  return null
}

export function BinMap({
  bins,
  selectedId,
  onBinSelect,
}: {
  bins: BinData[]
  selectedId: string | null
  onBinSelect: (bin: BinData | null) => void
}) {
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
      <MarkerClickHandler bins={bins} onBinSelect={onBinSelect} />
      {bins.map((bin) => {
        const co2 = bin.latestSensor?.co2 ?? 0
        const methane = bin.latestSensor?.methane ?? 0
        const { level } = getAlertLevel(co2, methane)
        let icon = level === "danger" ? dangerIcon : binIcon
        if (bin.id === selectedId) icon = selectedIcon

        return (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={icon}
            eventHandlers={{
              // same as markerclickhandler
              click: () => onBinSelect(bin),
            }}
          />
        )
      })}
    </MapContainer>
  )
}
