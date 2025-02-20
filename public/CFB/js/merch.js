document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nflBtn = document.getElementById('nfl-btn');
    const bannerVideo = document.querySelector('video');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/';
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