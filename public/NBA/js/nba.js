document.addEventListener('DOMContentLoaded', async function() {
    const homeBtn = document.getElementById('index-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nbaBtn = document.getElementById('nba-btn');
    const bannerVideo = document.querySelector('video');

    // Button event listeners
    homeBtn.addEventListener('click', function() {
        window.location.href = '/index.html';
    });

    nbaBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/nba.html';
    });

    statsBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/stats.html';
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/public/NBA/merch.html';
    });
});

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('teamList');
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