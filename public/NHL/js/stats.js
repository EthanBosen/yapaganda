document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nhlBtn = document.getElementById('nba-btn');
    const bannerVideo = document.querySelector('video');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    nhlBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/nhl.html';
    });

    statsBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/stats.html';
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/public/NHL/merch.html';
    });
    
    // Video playback rate
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }
});