import express from 'express';
import { getDeviation } from '../controllers/deviationController.js';

const router = express.Router();

router.get('/', getDeviation);

export default router;