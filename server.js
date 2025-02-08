const fetch = require('node-fetch').default;
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config(); // Load environment variables

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

// New endpoint to fetch Chiefs' record
app.get('/api/chiefs-record', async (req, res) => {
    const apiKey = process.env.SPORTSRADAR_API_KEY;
    const apiEndpoint = `https://api.sportradar.us/nfl/trial/v7/en/teams/KC/profile.json?api_key=${apiKey}`;
    
    try {
        const response = await fetch(apiEndpoint, {
            headers: {
                'Accept': 'application/json' // Specify JSON in the accept header
            }
        });
        const text = await response.text(); // First, get the response as text
        
        try {
            const data = JSON.parse(text); // Try to parse the text as JSON
            const record = data.record;
            const wins = record.wins;
            const losses = record.losses;
            
            res.json({ wins, losses });
        } catch (parseError) {
            // If parsing fails, log the error and send back the text response
            console.error('Failed to parse JSON:', parseError.message);
            console.error('Received text:', text.slice(0, 100) + '...'); // Log first 100 characters to avoid overwhelming the console
            res.status(500).json({ error: 'Failed to parse JSON response', response: text.slice(0, 100) + '...' });
        }
    } catch (fetchError) {
        console.error('Error fetching Chiefs record:', fetchError);
        res.status(500).json({ error: 'Failed to fetch Chiefs record', message: fetchError.message });
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});