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

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/carousel-data', (req, res) => {
    const carouselItems = [
        { id: 1, image: '/public/media/bluetshirtpreview.jpg', title: 'Blue T-Shirt Collection', link: 'https://bluetshirt.com/collections/all' },
        { id: 2, image: '/public/media/taylorgangpreview.jpg', title: 'Taylor Gang Merchandise', link: 'https://store.taylorgang.com/' },
        { id: 3, image: '/public/media/jetlifeapparelpreview.jpg', title: 'Jet Life Apparel', link: 'https://jetlifeapparel.com/' },
        { id: 4, image: '/public/media/midnightorganicpreview.jpg', title: 'Midnight Organic', link: 'https://midnightorganic.com/' },
        { id: 5, image: '/public/media/problemvjasonpreview.jpg', title: 'Problem vs Jason', link: 'https://shopjasonmartin.com/' },
        { id: 6, image: '/public/media/ETSpreview.jpg', title: 'ETS', link: 'https://theetsofficial.com/collections/ets' },
    ];
    res.json(carouselItems);
});
