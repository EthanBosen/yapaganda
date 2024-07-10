const fetch = require('node-fetch').default;
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/merch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'merch.html'));
});

app.get('/directory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'directory.html'));
});

app.get('/carousel-data', async (req, res) => {
    try {
    
        const response = await fetch('https://googleads.g.doubleclick.net/pagead/viewthroughconversion/962985656/?backend=innertube&cname=56&cver=20240707&foc_id=8Gk3U3dqXoMiwPN7sefbXg&label=followon_view&ptype=no_rmkt&random=254075896&cv_attributed=0');

        if (!response.ok) {
            throw new Error('Failed to fetch carousel data');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching carousel data:', error);
        res.status(500).json({ error: 'Failed to fetch carousel data' });
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
