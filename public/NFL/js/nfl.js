document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nflBtn = document.getElementById('nfl-btn');
    const teamList = document.getElementById('teamList');
    const bannerVideo = document.querySelector('video');

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
});

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