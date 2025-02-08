document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const nflBtn = document.getElementById('nfl-btn');
    
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

    nflBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'nfl Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/nfl';
    });

    const bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    let players = [];

});
