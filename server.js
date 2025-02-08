const fetch = require('node-fetch').default;
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'nfl.html'));
});

app.get('/merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'merch.html'));
});

app.get('/directory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'home.html'));
});

app.get('/directory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'NFL', 'stats.html'));
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
