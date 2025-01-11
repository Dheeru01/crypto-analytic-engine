import mongoose from "mongoose"
export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URI,{
        serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 0, // No socket timeout
    connectTimeoutMS: 0 
    })
    console.log(`Mongo DB connected: ${connection.host}`)
}