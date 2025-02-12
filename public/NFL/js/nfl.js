document.addEventListener('DOMContentLoaded', async function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nflBtn = document.getElementById('nfl-btn');
    // const teamList = document.getElementById('teamList');
    const bannerVideo = document.querySelector('video');

    // Button event listeners
    homeBtn.addEventListener('click', function() {
        window.location.href = '/index.html';
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