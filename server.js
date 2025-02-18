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

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'merch.html'));
});

app.get('/nfl', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'nfl.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'stats.html'));
});

//NBA API
app.get('/api/nba', async (req, res) => {
    const apiKey = process.env.NBA_API_KEY;
    const endpoint = `https://api.sportradar.com/nba/trial/v8/en/games/2025/02/19/schedule.json?api_key=${apiKey}`;

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

//NHL API
app.get('/api/nhl', async (req, res) => {
    const apiKey = process.env.NHL_API_KEY;
    const endpoint = `https://api.sportradar.com/nhl/trial/v7/en/games/2025/02/17/schedule.json?api_key=${apiKey}`;

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


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});