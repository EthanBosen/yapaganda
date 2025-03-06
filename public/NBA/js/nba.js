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

    // Fetch NBA game schedule data and populate the carousel
    try {
        const response = await fetch('/api/nba');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const gamesData = await response.json();
        populateCarousel(gamesData);
        
    } catch (error) {
        console.error('Error fetching NBA data:', error);
        carouselList.innerHTML = '<p>Failed to load game schedule. Please try again later.</p>';
    }

    // Event listeners for navigation
    prevButton.addEventListener('click', () => slideCarousel('prev'));
    nextButton.addEventListener('click', () => slideCarousel('next'));

    // Fetch NBA win loss record
    async function fetchNBAStandings() {
        try {
            const response = await fetch('/api/nba-standings');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const standingsData = await response.json();
            updateTeamRecords(standingsData);
        } catch (error) {
            console.error('Error fetching NBA standings:', error);
            const teamList = document.querySelector('.team-list');
            teamList.innerHTML = '<p>Failed to load standings. Please try again later.</p>';
        }
    }

    // Function to update team records in the HTML
    function updateTeamRecords(standingsData) {
        // Flatten the team data from conferences and divisions
        const teams = [];
        standingsData.conferences.forEach(conference => {
            conference.divisions.forEach(division => {
                division.teams.forEach(team => {
                    teams.push({
                        name: team.name,
                        wins: team.wins,
                        losses: team.losses
                    });
                });
            });
        });

        // Map team names to their respective HTML class names
        const teamClassMap = {
            'Thunder': 'thunder',
            'Cavaliers': 'cavaliers',
            'Celtics': 'celtics',
            'Grizzlies': 'grizzlies',
            'Knicks': 'knicks',
            'Nuggets': 'nuggets',
            'Lakers': 'lakers',
            'Rockets': 'rockets',
            'Timberwolves': 'timberwolves',
            'Clippers': 'clippers',
            'Pacers': 'pacers',
            'Bucks': 'bucks',
            'Pistons': 'pistons',
            'Kings': 'kings',
            'Heat': 'heat',
            'Warriors': 'warriors',
            'Hawks': 'hawks',
            'Mavericks': 'mavericks',
            'Magic': 'magic',
            'Suns': 'suns',
            'Spurs': 'spurs',
            'Bulls': 'bulls',
            'Trail Blazers': 'trail-blazers',
            'Raptors': 'raptors',
            'Nets': 'nets',
            '76ers': 'sixers',
            'Hornets': 'hornets',
            'Jazz': 'jazz',
            'Pelicans': 'pelicans',
            'Wizards': 'wizards'
        };

        // Update each team's record in the HTML
        teams.forEach(team => {
            const className = teamClassMap[team.name];
            if (className) {
                const teamElement = document.querySelector(`.${className} .team-record`);
                if (teamElement) {
                    teamElement.textContent = `(${team.wins}-${team.losses})`;
                }
            }
        });
    }

    // Call the function to fetch standings when the page loads
    fetchNBAStandings();

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

    // Expose the search function to the global scope (since it's called from HTML)
    window.search = search;
});