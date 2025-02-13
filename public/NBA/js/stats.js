document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nbaBtn = document.getElementById('nba-btn');
    const bannerVideo = document.querySelector('video');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/index';
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
    
    // Video playback rate
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }
});