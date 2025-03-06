const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import CORS middleware
const cors = require('cors');

require('dotenv').config();

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin === 'https://www.yapaganda.com' || origin === 'http://localhost:3000') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Serve static files from the root directory and public directory (once)
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Homepage (single route for index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// NFL Routes
app.get('/nfl', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'nfl.html'));
});

app.get('/nfl-merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'merch.html'));
});

app.get('/nfl-stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'stats.html'));
});

// NHL Routes
app.get('/nhl', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NHL', 'nhl.html'));
});

app.get('/nhl-merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NHL', 'merch.html'));
});

app.get('/nhl-stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NHL', 'stats.html'));
});

// NBA Routes
app.get('/nba', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NBA', 'nba.html')); 
});

app.get('/nba-merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NBA', 'merch.html'));
});

app.get('/nba-stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NBA', 'stats.html'));
});

// NBA API - Game Schedule
app.get('/api/nba', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const endpoint = `https://api.sportradar.com/nba/trial/v8/en/games/2025/03/06/schedule.json?api_key=${apiKey}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(endpoint, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ error: 'Failed to fetch NBA data' });
    }
});

// NBA API - Standings
app.get('/api/nba-standings', async (req, res) => {
    const apiKey = process.env.API_KEY; // Using the same API_KEY as your other endpoints
    const endpoint = `https://api.sportradar.com/nba/trial/v8/en/seasons/2024/REG/standings.json?api_key=${apiKey}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('There was a problem fetching NBA standings:', error);
        res.status(500).json({ error: 'Failed to fetch NBA standings' });
    }
});

// NHL API
app.get('/api/nhl', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const endpoint = `https://api.sportradar.com/nhl/trial/v7/en/games/2025/03/06/schedule.json?api_key=${apiKey}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(endpoint, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ error: 'Failed to fetch NHL data' });
    }
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});