// Import fetch for making API calls if you're using Node.js environment
// If this is for client-side, you might not need this import
// const fetch = require('node-fetch').default;

document.addEventListener('DOMContentLoaded', async function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nflBtn = document.getElementById('nfl-btn');
    const teamList = document.getElementById('teamList');
    const bannerVideo = document.querySelector('video');

    // Button event listeners
    homeBtn.addEventListener('click', function() {
        window.location.href = '/index';
    });

    nflBtn.addEventListener('click', function() {
        window.location.href = '/public/NFL/nfl.html';
    });

    statsBtn.addEventListener('click', function() {
        window.location.href = '/public/NFL/stats.html';
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/public/NFL/merch.html';
    });

    // Video playback rate
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    // Sorting team list
    if (teamList) {
        const items = Array.from(teamList.getElementsByTagName('li'));
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
        items.forEach(item => teamList.appendChild(item));
    }

    // Splitting team list
    const secondColumn = teamList.cloneNode(true);
    teamList.parentNode.appendChild(secondColumn);

    const teams = Array.from(teamList.children);
    for (let i = 16; i < teams.length; i++) {
        secondColumn.appendChild(teams[i]);
    }

    for (let i = teams.length - 1; i >= 16; i--) {
        teamList.removeChild(teams[i]);
    }

    // Fetching the Chiefs' record
    try {
        const apiKey = process.env.SPORTSRADAR_API_KEY;
        const apiEndpoint = `https://api.sportradar.us/nfl/trial/v7/en/teams/KC/profile.json?api_key=${apiKey}`;
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Assuming the structure of the response includes a 'record' object with 'wins' and 'losses'
        const record = data.record;
        const wins = record.wins;
        const losses = record.losses;
        
        // Update the Chiefs' record in the HTML
        updateChiefsRecord(wins, losses);
    } catch (error) {
        console.error('Error fetching Chiefs record:', error);
    }
});

function updateChiefsRecord(wins, losses) {
    const chiefsListItem = document.querySelector('#teamList li a[href="/public/NFL/teams/chiefs.html"]');
    if (chiefsListItem) {
        // Insert the record next to the team name
        chiefsListItem.insertAdjacentHTML('afterend', ` (${wins}-${losses})`);
    }
}

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