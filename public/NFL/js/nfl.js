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

    // // Sorting team list
    // if (teamList) {
    //     const items = Array.from(teamList.getElementsByTagName('li'));
    //     items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    //     items.forEach(item => teamList.appendChild(item));
    // }

    // Fetching the Chiefs' record from your server
    try {
        const response = await fetch('/api/chiefs-record');
        const data = await response.json();
        
        if (response.ok) {
            const { wins, losses } = data;
            updateChiefsRecord(wins, losses);
        } else {
            console.error('Error fetching Chiefs record:', data.error);
        }
    } catch (error) {
        console.error('Error fetching Chiefs record:', error);
    }
});

function updateChiefsRecord(wins, losses) {
    const chiefsListItem = document.querySelector('#teamList li a[href="/public/NFL/teams/chiefs.html"]');
    if (chiefsListItem) {
        // Insert the record next to the team name
        chiefsListItem.nextElementSibling.textContent = ` (${wins}-${losses})`;
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