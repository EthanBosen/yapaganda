document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');

    fetch('/carousel-data')
        .then(response => response.json())
        .then(carouselItems => {
            carouselItems.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('merch-item');
                li.innerHTML = `
                    <a href="${item.link}" target="_blank">
                        <img src="${item.image}" alt="${item.title}">
                    </a>
                    <p>${item.title}</p>
                `;
                carousel.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching carousel data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load carousel items.';
            carousel.appendChild(errorMessage);
        });

    const bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 0.5;
    }

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
