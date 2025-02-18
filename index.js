document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const sportBtn = document.querySelector('#nfl-btn, #nhl-btn, #nba-btn');

    if (homeBtn && merchBtn && sportBtn) {
        // Home button navigation
        homeBtn.addEventListener('click', function() {
            gtag('event', 'button_click', {
                'event_category': 'Navigation',
                'event_label': 'Home Button',
                'traffic_type': document.body.getAttribute('data-traffic-type')
            });
            window.location.href = '/';
        });

        // Merch button navigation
        merchBtn.addEventListener('click', function() {
            gtag('event', 'button_click', {
                'event_category': 'Navigation',
                'event_label': 'Merch Button',
                'traffic_type': document.body.getAttribute('data-traffic-type')
            });
            
            // Determine the sport based on the sport button's ID
            const sport = sportBtn.id.replace('-btn', '').toUpperCase();
            window.location.href = `/${sport.toLowerCase()}-merch`; 
        });

        // Sport button navigation
        sportBtn.addEventListener('click', function() {
            gtag('event', 'button_click', {
                'event_category': 'Navigation',
                'event_label': `${sportBtn.id.replace('-btn', '').toUpperCase()} Button`,
                'traffic_type': document.body.getAttribute('data-traffic-type')
            });
            
            const sport = sportBtn.id.replace('-btn', '').toUpperCase(); // 
            window.location.href = `/${sport.toLowerCase()}`; 
        });
    }
});