document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const nflBtn = document.getElementById('nfl-btn');

    // Check if elements exist before adding event listeners
    if (homeBtn && merchBtn && nflBtn) { // Removed 'statsBtn' since it wasn't declared
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
                'event_label': 'NFL Button',
                'traffic_type': document.body.getAttribute('data-traffic-type')
            });
            window.location.href = '/nfl';
        });
    } 
});