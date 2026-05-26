import { Server as HTTPServer } from "http"
import { Server } from "socket.io"

let io: Server | null = null

export function getIO(): Server | null {
  if (typeof window !== "undefined") return null
  if (!io) {
    try {
      const httpServer = new HTTPServer()
      io = new Server(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] },
      })
      httpServer.listen(0)
      io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id)
        socket.on("disconnect", () => {
          console.log("Socket disconnected:", socket.id)
        })
      })
    } catch {
      return null
    }
  }
  return io
}
