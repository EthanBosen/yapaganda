document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');

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

    const bannerVideo = document.querySelector('video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    const artistList = document.getElementById('artistList');
    const items = Array.from(artistList.getElementsByTagName('li'));

    items.sort((a, b) => a.textContent.localeCompare(b.textContent));

    items.forEach(item => artistList.appendChild(item));
});

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('artistList');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
