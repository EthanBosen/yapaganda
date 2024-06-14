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

    // Function to initialize YouTube players
    function onYouTubeIframeAPIReady() {
        videoContainers.forEach(function(container, index) {
            let videoId = container.querySelector('iframe').getAttribute('src').split('/')[4]; 
            players[index] = new YT.Player(container, {
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }

    // Autoplay next video when the current one ends
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            // Move to the next video
            currentVideoIndex++;
            if (currentVideoIndex >= players.length) {
                currentVideoIndex = 0; 
            }
            players[currentVideoIndex].playVideo();
        }
    }

    // YouTube API script insertion
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    document.getElementById('banner-video').playbackRate = 0.5;
});


function onYouTubeIframeAPIReady() {
}
