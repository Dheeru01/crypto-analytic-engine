import {cryptoData} from '../models/CryptoData.js';

const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    const mean = prices.reduce((a, b) => a + b) / n;
    const variance = prices.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n;
    return Math.sqrt(variance);
};

export const getDeviation = async (req, res) => {
    const { coin } = req.query;
    const data = await cryptoData.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100);
    const prices = data.map(d => d.price);
    const deviation = calculateStandardDeviation(prices);
    res.json({ deviation });
};

