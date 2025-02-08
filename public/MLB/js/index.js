document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');
    const searchInput = document.getElementById('searchInput');

    // Check if elements exist before adding event listeners
    if (homeBtn && merchBtn && directoryBtn) {
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
    } else {
        console.error('Navigation buttons not found.');
    }

    // Initialize YouTube API and handle errors
    let players = [];

    window.onYouTubeIframeAPIReady = function() {
        try {
            const videoContainers = document.querySelectorAll('iframe');
            if (videoContainers.length === 0) {
                console.warn('No YouTube iframes found.');
                return;
            }

            videoContainers.forEach((iframe, index) => {
                try {
                    const videoId = getYouTubeVideoId(iframe.getAttribute('src'));
                    const player = new YT.Player(iframe, {
                        events: {
                            'onStateChange': onPlayerStateChange
                        }
                    });
                    players.push(player);
                } catch (err) {
                    console.error(`Error initializing player for iframe ${index}:`, err);
                }
            });
        } catch (err) {
            console.error('Error initializing YouTube API:', err);
        }
    };

    function getYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            let nextPlayer;
            for (let i = 0; i < players.length; i++) {
                if (players[i] === event.target) {
                    nextPlayer = players[i + 1];
                    break;
                }
            }
            if (nextPlayer) {
                nextPlayer.playVideo();
                nextPlayer.getIframe().scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toUpperCase();
        const videoContainers = document.querySelectorAll('.video-container');

        videoContainers.forEach(container => {
            const anchor = container.querySelector('a');
            if (anchor) {
                const textValue = anchor.textContent || anchor.innerText;
                container.style.display = textValue.toUpperCase().includes(filter) ? '' : 'none';
            }
        });
    });
});
