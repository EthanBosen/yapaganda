document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');
    
    gtag('event', 'page_view', {
        'traffic_type': document.body.getAttribute('data-traffic-type')
    });

    homeBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'Home Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/';
    });

    merchBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'Merch Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/merch';
    });

    directoryBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'Directory Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/directory';
    });

    const bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

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
        const merchCards = document.querySelectorAll('.merch-card');

        merchCards.forEach(card => {
            const aTag = card.querySelector('a');
            const text = aTag ? aTag.textContent.toLowerCase() : '';
            const dataName = aTag ? aTag.getAttribute('data-name').toLowerCase() : '';

            if (text.includes(filter) || dataName.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
