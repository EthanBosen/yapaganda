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

    const bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let players = [];

    window.onYouTubeIframeAPIReady = function() {
        const videoContainers = document.querySelectorAll('iframe');
        videoContainers.forEach((iframe, index) => {
            const videoId = getYouTubeVideoId(iframe.getAttribute('src'));
            const player = new YT.Player(iframe, {
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 1
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
            players.push(player);
        });
    };

    function getYouTubeVideoId(url) {
        const videoId = url.split('/').pop().split('?')[0];
        return videoId;
    }
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', search);

    function search() {
        const filter = searchInput.value.toLowerCase();
        const videoContainers = document.querySelectorAll('.video-container');

        videoContainers.forEach(container => {
            const aTag = container.querySelector('a');
            const text = aTag ? aTag.textContent.toLowerCase() : '';

            if (text.includes(filter)) {
                container.style.display = '';
            } else {
                container.style.display = 'none';
            }
        });
    }
});
