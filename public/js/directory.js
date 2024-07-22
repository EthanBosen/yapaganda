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

const bannerVideo = document.getElementById('banner-video');
if (bannerVideo) {
    bannerVideo.playbackRate = 0.5;
}

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

document.addEventListener('DOMContentLoaded', () => {
    const artistList = document.getElementById('artistList');
    const items = Array.from(artistList.getElementsByTagName('li'));

    items.sort((a, b) => a.textContent.localeCompare(b.textContent));

    items.forEach(item => artistList.appendChild(item));
});