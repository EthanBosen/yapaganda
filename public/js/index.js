document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/'; 
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/merch'; 
    });

    directoryBtn.addEventListener('click', function() {
        window.location.href = '/directory'; 
    });

    let bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    // Load YouTube API script
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let apiKey = "AIzaSyAwl2b2wSx6iSkZ6sHTXUu_okcAzSbqR1c"; 

    tag.onload = function() {
        tag.src += "&key=" + apiKey;
    };
});

let players = [];
let currentVideoIndex = 0;

function onYouTubeIframeAPIReady() {
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach((container, index) => {
        const videoId = container.querySelector('a').href.split('v=')[1];
        players[index] = new YT.Player(container.querySelector('iframe'), {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function playNextVideo() {
    const nextVideoIndex = (currentVideoIndex + 1) % players.length;
    players[currentVideoIndex].stopVideo();
    players[nextVideoIndex].playVideo();
    currentVideoIndex = nextVideoIndex;
}

function search() {
    var input, filter, div, iframes, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    div = document.getElementById('artistList');
    iframes = div.getElementsByTagName('iframe');

    for (i = 0; i < iframes.length; i++) {
        txtValue = iframes[i].getAttribute('data-searchable-text');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            iframes[i].parentNode.style.display = '';
        } else {
            iframes[i].parentNode.style.display = 'none';
        }
    }
}
