const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

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
    const endpoint = 'https://api.sportradar.us/nba/trial/v8/en/games/2023/REG/schedule.json'; // Update this to the correct endpoint for 2025 or live data

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
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

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});