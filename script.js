let currentPage = 0; // Tracks the current page state (from 0 to 3)
const pages = document.querySelectorAll('.flipbook .page');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

// Event listener for the next button
nextButton.addEventListener('click', function() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    }
});

// Event listener for the previous button
prevButton.addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
    }
});

// Variables to track the swipe movement
let touchStartX = 0;
let touchEndX = 0;

// Event listener for touch start (when the user touches the screen)
document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX; // Get the x-coordinate of touch start
});

// Event listener for touch end (when the user releases the touch)
document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX; // Get the x-coordinate of touch end

    // Check if swipe is left (next) or right (previous)
    if (touchStartX - touchEndX > 50) {
        // Swiped left, simulate next button press
        if (currentPage < pages.length - 2) {
            currentPage++;
            updatePages();
        }
    } else if (touchEndX - touchStartX > 50) {
        // Swiped right, simulate previous button press
        if (currentPage > 0) {
            currentPage--;
            updatePages();
        }
    }
});

// Function to update the visibility of pages and simulate flipping
function updatePages() {
    // Hide all pages first
    pages.forEach(page => page.style.display = 'none');
    
    // Remove any previous transform (to trigger reflow and force animation)
    pages.forEach(page => page.style.transform = ''); 

    // Use setTimeout to allow the browser to "reflow" before adding the flip transform again
    setTimeout(() => {
        if (currentPage === 0) {
            pages[0].style.display = 'block'; // Show Page 1
            pages[0].style.transform = 'rotateY(0deg)';  // Flip Page 1 to front
            prevButton.disabled = true; // Disable "Previous" on first page
        } else if (currentPage === 1) {
            pages[1].style.display = 'block'; // Show Page 2
            pages[2].style.display = 'block'; // Show Page 3
            // Animate the flip effect for Pages 1, 2, and 3
            pages[1].style.transform = 'rotateY(0deg)';
            pages[2].style.transform = 'rotateY(0deg)';
        } else if (currentPage === 2) {
            pages[3].style.display = 'block'; // Show Page 4
            // Animate the flip effect for Pages 2 and 3
            pages[3].style.transform = 'rotateY(0deg)';
        }

        // Enable or disable buttons based on the current page
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pages.length - 2;

    }, 10);  // Small delay to allow for reflow before applying transform
}
  
// Initial page setup
updatePages();
