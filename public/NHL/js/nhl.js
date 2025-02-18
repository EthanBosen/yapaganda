document.addEventListener('DOMContentLoaded', async function() {
    // Button event listeners
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nhlBtn = document.getElementById('nhl-btn');
    const bannerVideo = document.querySelector('video');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    nhlBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/nhl.html';
    });

    statsBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/stats.html'; // Changed to NHL stats
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/merch.html'; // Changed to NHL merch
    });

    // Scoreboard Banner
    const carouselList = document.querySelector('.carousel-list');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function populateCarousel(gamesData) {
        carouselList.innerHTML = ''; 
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

    // Fetch NHL data and populate the carousel
    try {
        const response = await fetch('/api/nhl'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gamesData = await response.json();
        populateCarousel(gamesData);
        
    } catch (error) {
        console.error('Error fetching NHL data:', error);
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