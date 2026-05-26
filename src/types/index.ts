export interface BinData {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  userId: string
  createdAt: string
  latestSensor?: SensorData
}

export interface SensorData {
  id: string
  binId: string
  co2: number
  methane: number
  timestamp: string
}

export interface ScanResult {
  id: string
  binId?: string
  userId: string
  imageUrl: string
  result: "Organic" | "Inorganic"
  confidence: number
  createdAt: string
}

export interface AlertData {
  id: string
  binId: string
  userId: string
  type: "HIGH_CO2" | "HIGH_METHANE" | "BOTH"
  message: string
  isRead: boolean
  createdAt: string
  bin?: BinData
}

export interface UserData {
  id: string
  email: string
  name: string
  role: "USER" | "ADMIN"
  createdAt: string
}
