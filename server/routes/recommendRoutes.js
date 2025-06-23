// recommendRoutes.js
import express from 'express';
import { getRecommendations } from '../controllers/recommendController.js';

const router = express.Router();

// Define the POST route for recommendations
router.post('/recommend', getRecommendations);

export default router;
