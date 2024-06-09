document.getElementById('banner-video').playbackRate = 0.5;

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];
const videoContainers = document.querySelectorAll('.video-container');
let currentVideoIndex = 0;

function onYouTubeIframeAPIReady() {
    videoContainers.forEach((container, index) => {
        const iframe = container.querySelector('iframe');
        players[index] = new YT.Player(iframe, {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function playNextVideo() {
    const nextVideoIndex = (currentVideoIndex + 1) % players.length;
    players[currentVideoIndex].mute(); 
    players[currentVideoIndex].pauseVideo();
    players[nextVideoIndex].playVideo();
    currentVideoIndex = nextVideoIndex;
}
