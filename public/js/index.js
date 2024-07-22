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
                } catch (error) {
                    console.error(`Failed to initialize player for iframe ${index}:`, error);
                }
            });
        } catch (error) {
            console.error('Failed to initialize YouTube API:', error);
        }
    };

    function getYouTubeVideoId(url) {
        try {
            const urlParams = new URLSearchParams(new URL(url).search);
            return urlParams.get('v') || '';
        } catch (error) {
            console.error('Failed to extract YouTube video ID:', error);
            return '';
        }
    }

    // Add error handling to search functionality
    if (searchInput) {
        searchInput.addEventListener('keyup', search);
    } else {
        console.error('Search input not found.');
    }

    function search() {
        try {
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
        } catch (error) {
            console.error('Error occurred during search:', error);
        }
    }

    function onPlayerStateChange(event) {
        // Implement player state change handling if needed
    }
});
