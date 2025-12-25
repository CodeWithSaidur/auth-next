import mongoose from 'mongoose'

type ConObj = {
  isConnected?: number
}

const con: ConObj = {}

export async function connectDB(): Promise<void> {
  if (con.isConnected === 1) {
    console.log('DB already connected')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!)
    con.isConnected = db.connections[0].readyState
    console.log('Connected To DB')
  } catch (error) {
    console.log('DB Connection Failed', error)
    process.exit(1)
  }
}
