export function getAlertLevel(co2: number, methane: number): {
  level: "safe" | "warning" | "danger"
  message: string
  type: "HIGH_CO2" | "HIGH_METHANE" | "BOTH" | null
} {
  const co2Alert = co2 > 1000
  const methaneAlert = methane > 500

  if (co2Alert && methaneAlert) {
    return {
      level: "danger",
      message: `Cảnh báo! CO2 (${co2}ppm) và Metan (${methane}ppm) vượt ngưỡng an toàn!`,
      type: "BOTH",
    }
  }

  if (co2Alert) {
    return {
      level: "warning",
      message: `Cảnh báo! CO2 (${co2}ppm) vượt ngưỡng an toàn (>1000ppm)!`,
      type: "HIGH_CO2",
    }
  }

  if (methaneAlert) {
    return {
      level: "warning",
      message: `Cảnh báo! Metan (${methane}ppm) vượt ngưỡng an toàn (>500ppm)!`,
      type: "HIGH_METHANE",
    }
  }

  return {
    level: "safe",
    message: "Các chỉ số trong ngưỡng an toàn",
    type: null,
  }
}
