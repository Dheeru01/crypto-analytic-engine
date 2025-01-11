import {cryptoData} from '../models/CryptoData.js';

export const getStats = async (req, res) => {
    const { coin } = req.query;
    const data = await cryptoData.findOne({ coinId: coin }).sort({ timestamp: -1 });
    if (!data) {
        return res.status(404).json({ message: 'Data not found' });
    }
    res.json({
        price: data.price,
        marketCap: data.marketCap,
        '24hChange': data.change24h
    });
};

