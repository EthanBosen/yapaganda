// Navbuttons
document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const statsBtn = document.getElementById('stats-btn');
    const nflBtn = document.getElementById('nfl-btn');
    const teamList = document.getElementById('teamList');
    const teams = Array.from(teamList.children);
    const bannerVideo = document.querySelector('video');
    
    // Button event listeners
    homeBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'Home Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/';
    });

    nflBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'NFL Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/nfl';
    });

    statsBtnBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'stats Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/stats';
    });


    merchBtn.addEventListener('click', function() {
        gtag('event', 'button_click', {
            'event_category': 'Navigation',
            'event_label': 'Merch Button',
            'traffic_type': document.body.getAttribute('data-traffic-type')
        });
        window.location.href = '/merch';
    });



    // Video playback rate
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

    // Sorting team list
    if (teamList) {
        const items = Array.from(teamList.getElementsByTagName('li'));
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
        items.forEach(item => teamList.appendChild(item));
    }

    // Splitting team list
    const secondColumn = teamList.cloneNode(true);
    teamList.parentNode.appendChild(secondColumn);

    for (let i = 16; i < teams.length; i++) {
        secondColumn.appendChild(teams[i]);
    }

    for (let i = teams.length - 1; i >= 16; i--) {
        teamList.removeChild(teams[i]);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Assuming you have a function to fetch team data from the API
    // This function would return an array of team objects with records
    
    const teamList = document.getElementById('teamList');
    if (teamList) {
        // This would be replaced by API data in the future
        const teams = [
            // Example data structure for teams
            // { name: 'Bears', record: '5-2', wins: 5, losses: 2 },
            // { name: 'Bengals', record: '3-4', wins: 3, losses: 4 },
            // ... add other teams here
        ];

        // Sort teams by wins (descending) to get winning and losing order
        teams.sort((a, b) => b.wins - a.wins);

        // Create two columns
        const winningColumn = teamList;
        const losingColumn = teamList.cloneNode(true);
        teamList.parentNode.appendChild(losingColumn);

        // Populate columns based on record
        teams.forEach((team, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/public/NFL/teams/${team.name.toLowerCase()}.html`;
            link.textContent = team.name;
            listItem.appendChild(link);

            // Place teams with more wins in the winning column, others in losing
            if (index < teams.length / 2) {
                winningColumn.appendChild(listItem);
            } else {
                losingColumn.appendChild(listItem);
            }
        });
    }
});

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('teamList'); // Assuming teamList is the correct id
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