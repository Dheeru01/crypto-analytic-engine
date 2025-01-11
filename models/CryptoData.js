import mongoose from "mongoose";

const cryptoDataSchema = new mongoose.Schema({
    coinId: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
})
export const cryptoData = mongoose.model("CryptoData",cryptoDataSchema);