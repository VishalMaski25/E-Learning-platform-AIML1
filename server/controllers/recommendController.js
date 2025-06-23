// recommendController.js
import axios from 'axios';

// Function to handle the recommendation request
export const getRecommendations = async (req, res) => {
    const { title } = req.body;

    try {
        // Forward the request to the Flask server
        const response = await axios.post('http://127.0.0.1:5000/recommend', { title });
        res.json(response.data);  // Send back the recommendations received from Flask
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
