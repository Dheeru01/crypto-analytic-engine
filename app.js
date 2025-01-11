import express from 'express';
import cron from 'node-cron';
import { cryptoData } from './models/CryptoData.js';
import { fetchCryptoData } from './services/coinGeckoService.js';
import statsRouter from './routes/stats.js';
import deviationRouter from './routes/deviation.js';
import { config } from 'dotenv';// Load environment variables

config({
    path:"./config/config.env",
})

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchAndStoreData = async () => {
    for (const coin of coins) {
        try {
            console.log(`Fetching data for ${coin}...`);
            const data = await fetchCryptoData(coin);
            console.log(`Data fetched for ${coin}:`, data);

            const newCryptoData = new cryptoData({
                coinId: coin,
                price: data.price,
                marketCap: data.marketCap,
                change24h: data.change24h
            });

            console.log(`Saving data for ${coin} to the database...`);
            await newCryptoData.save();
            console.log(`Data for ${coin} saved successfully.`);
        } catch (error) {
            console.error(`Error fetching or saving data for ${coin}:`, error.message);
        }
    }
    console.log('fetchAndStoreData completed.');
};

// Schedule the background job to run every 2 hours
cron.schedule('0 */2 * * *', fetchAndStoreData);
console.log('Background job scheduled to run every 2 hours.');


const app = express();


app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)



app.use('/stats', statsRouter);
app.use('/deviation', deviationRouter);

export default app;