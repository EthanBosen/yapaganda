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

// Adding a route to serve the carousel data (if necessary)
app.get('/carousel-data', (req, res) => {
    const carouselItems = [
        { id: 1, image: 'path_to_image1.jpg', title: 'Item 1' },
        { id: 2, image: 'path_to_image2.jpg', title: 'Item 2' },
        { id: 3, image: 'path_to_image3.jpg', title: 'Item 3' }
        // Add more items as needed
    ];
    res.json(carouselItems);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
