document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/'; // Navigate to homepage
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/merch'; // Navigate to merch page
    });

    directoryBtn.addEventListener('click', function() {
        window.location.href = '/directory'; // Navigate to directory page
    });
});
