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
      message: `Alert! CO2 (${co2}ppm) and Methane (${methane}ppm) exceeded safe thresholds!`,
      type: "BOTH",
    }
  }

  if (co2Alert) {
    return {
      level: "warning",
      message: `Alert! CO2 (${co2}ppm) exceeded safe threshold (>1000ppm)!`,
      type: "HIGH_CO2",
    }
  }

  if (methaneAlert) {
    return {
      level: "warning",
      message: `Alert! Methane (${methane}ppm) exceeded safe threshold (>500ppm)!`,
      type: "HIGH_METHANE",
    }
  }

  return {
    level: "safe",
    message: "All readings are within safe range",
    type: null,
  }
}
