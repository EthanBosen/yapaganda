const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const validPages = ['index', 'merch', 'directory']; 
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `${page}.html`));
    } else {
        res.status(404).send('Page not found');
    }
});

app.get('/search/:query', (req, res) => {
    const query = req.params.query.toUpperCase();
    res.send(`You searched for: ${query}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
