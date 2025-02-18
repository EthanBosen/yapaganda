function countdown(endDate) {
    const countdownElement = document.getElementById('draft-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = 'WELCOME TO THE NFL DRAFT';
            clearInterval(timer);
            return;
        }

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="countdown"
        countdownElement.innerHTML = days + "d " + hours + "h " 
        + minutes + "m " + seconds + "s ";
    }

    // Update every second
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to avoid 1 second delay
}

// Set your target date and time here
const targetDateTime = new Date('2025-04-24T20:00:00'); 
countdown(targetDateTime);