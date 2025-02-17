document.addEventListener('DOMContentLoaded', async function() {
    // Button event listeners
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nbaBtn = document.getElementById('nba-btn');
    const bannerVideo = document.querySelector('video');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    nbaBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/nba.html';
    });

    statsBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/stats.html';
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/merch.html';
    });

    // Scoreboard Banner
    const carouselList = document.querySelector('.carousel-list');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    // Function to populate the carousel with game data
    function populateCarousel(gamesData) {
        carouselList.innerHTML = ''; // Clear existing items
        gamesData.games.forEach(game => {
            const listItem = document.createElement('li');
            const homeTeam = game.home.name;
            const awayTeam = game.away.name;
            const scheduledTime = new Date(game.scheduled).toLocaleTimeString('en-US', { timeZone: game.time_zones.home });
            
            listItem.innerHTML = `
                <p>${awayTeam} @ ${homeTeam}</p>
                <p>Scheduled: ${scheduledTime}</p>
                <p>Venue: ${game.venue.name}, ${game.venue.city}, ${game.venue.state}</p>
            `;
            
            carouselList.appendChild(listItem);
        });
    }

    // Function to slide the carousel
    function slideCarousel(direction) {
        const listItems = document.querySelectorAll('.carousel-list li');
        const itemWidth = listItems[0].offsetWidth + 20; // Width of item + margin
        
        if (direction === 'next' && currentIndex < listItems.length - 1) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }
        
        const translateX = -currentIndex * itemWidth;
        carouselList.style.transform = `translateX(${translateX}px)`;
        
        // Disable buttons if at the start or end
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === listItems.length - 1;
    }

    // Fetch NBA data and populate the carousel
    try {
        const response = await fetch('/api/nba');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gamesData = await response.json();
        populateCarousel(gamesData);
        
    } catch (error) {
        console.error('Error fetching NBA data:', error);
        // Optionally, handle the error by showing a message in the UI
        carouselList.innerHTML = '<p>Failed to load game schedule. Please try again later.</p>';
    }

    // Event listeners for navigation
    prevButton.addEventListener('click', () => slideCarousel('prev'));
    nextButton.addEventListener('click', () => slideCarousel('next'));

    // Search Function
    function search() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById('teamList');
        li = ul.getElementsByTagName('li');

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
    }
});