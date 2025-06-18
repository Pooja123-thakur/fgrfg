// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Hamburger Animation
            hamburger.classList.toggle('toggle');
        });

        // Close mobile menu when clicking on a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                links.forEach(link => {
                    link.style.animation = '';
                });
            });
        });
    }

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 0);
        }
    });

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Slider Functionality
    // Slider Functionality
    // Slider Functionality
    const destinationContainer = document.querySelector('.destination-container');
    const destinationGrid = document.querySelector('.destination-grid');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (destinationContainer && destinationGrid && leftArrow && rightArrow) {
        // Get the first card to calculate width
        const card = document.querySelector('.destination-card');
        if (card) {
            const cardStyle = window.getComputedStyle(card);
            const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);
            let currentPosition = 0;

            // Number of cards to move at once (3 for desktop, 1 for mobile)
            let cardsToScroll = window.innerWidth >= 992 ? 3 : 1;

            // Update arrows visibility
            function updateArrows() {
                const containerWidth = destinationContainer.offsetWidth;
                const gridWidth = destinationGrid.scrollWidth;
                const maxScroll = containerWidth - gridWidth;

                leftArrow.style.display = currentPosition === 0 ? 'none' : 'flex';
                rightArrow.style.display = currentPosition <= maxScroll ? 'none' : 'flex';
            }

            // Right arrow click
            rightArrow.addEventListener('click', () => {
                const containerWidth = destinationContainer.offsetWidth;
                const gridWidth = destinationGrid.scrollWidth;
                const maxScroll = containerWidth - gridWidth;

                // Calculate scroll distance (3 cards or remaining cards)
                const scrollDistance = Math.min(
                    cardsToScroll * cardWidth,
                    gridWidth - containerWidth - Math.abs(currentPosition)
                );

                currentPosition = Math.max(currentPosition - scrollDistance, maxScroll);
                destinationGrid.style.transform = `translateX(${currentPosition}px)`;
                updateArrows();
            });

            // Left arrow click
            leftArrow.addEventListener('click', () => {
                // Calculate scroll distance (3 cards or remaining cards)
                const scrollDistance = Math.min(
                    cardsToScroll * cardWidth,
                    Math.abs(currentPosition)
                );

                currentPosition = Math.min(currentPosition + scrollDistance, 0);
                destinationGrid.style.transform = `translateX(${currentPosition}px)`;
                updateArrows();
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                // Update cards to scroll based on screen size
                cardsToScroll = window.innerWidth >= 992 ? 3 : 1;
                updateArrows();
            });

            // Initialize
            updateArrows();
        }
    }

    // Modal functions
    function openForm() {
        const overlay = document.getElementById('overlay');
        const tripForm = document.getElementById('tripForm');
        if (overlay && tripForm) {
            overlay.style.display = 'block';
            tripForm.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }


    function closeForm() {
        const overlay = document.getElementById('overlay');
        const tripForm = document.getElementById('tripForm');
        if (overlay && tripForm) {
            overlay.style.display = 'none';
            tripForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    const requestBtn = document.getElementById('requestItineraryBtn');
    if (requestBtn) {
        requestBtn.addEventListener('click', openForm);
    }
    const cancelBtn = document.querySelector('.btn-secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeForm);
    }
    // Close modal when clicking outside
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            // Only close if clicking directly on the overlay (not bubbling from child elements)
            if (e.target === overlay) {
                closeForm();
            }
        });
    }

    // Prevent modal from closing when clicking inside
    const tripForm = document.getElementById('tripForm');
    if (tripForm) {
        tripForm.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
    // Add event listener to the custom itinerary button



    // Also add event listener to the Book Now button in nav
    const bookNowBtn = document.querySelector('.nav-links .btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openForm();
        });
    }

    // Form submission handler
    const customForm = document.getElementById('customForm');
    if (customForm) {
        customForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                destination: document.getElementById("destination").value,
                travelers: document.getElementById("travelers").value,
                checkIn: document.getElementById("checkIn").value,
                checkOut: document.getElementById("checkOut").value,
                specialRequest: document.getElementById("specialRequest").value,
                departureCity: document.getElementById("departureCity").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                kids: document.getElementById("kids").value,
                kidsAgeRange: document.getElementById("kidsAgeRange").value,
                hotel: document.getElementById("hotel").value,
                timestamp: new Date().toISOString()
            };

            fetch("https://script.google.com/macros/s/AKfycbwkTAUHQ1zm0n77NYcQCYccJdYkkNPO_ygLz30J5D5g4rH8I1_QtPwT8E-MabkUBSQnbw/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(() => {
                alert("Thank you! Your custom itinerary request has been submitted. We'll contact you soon.");
                closeForm();
                customForm.reset();
            }).catch(error => {
                alert("Thank you! Your request has been received. We'll contact you soon.");
                closeForm();
                customForm.reset();
            });
        });
    }

    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.destination-card, .about-image, .testimonial');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const elements = document.querySelectorAll('.destination-card, .about-image, .testimonial');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger animation after a short delay
    setTimeout(animateOnScroll, 300);
    window.addEventListener('scroll', animateOnScroll);
});




//luxury
// Add event listeners to all "Book This Package" buttons
// Updated openForm function (now accepts a destination parameter)
window.openForm = function (destination) {
    const overlay = document.getElementById('overlay');
    const tripForm = document.getElementById('tripForm');
    const destinationInput = document.getElementById('destination');

    if (overlay && tripForm && destinationInput) {
        // Auto-fill the destination if provided
        if (destination) {
            destinationInput.value = destination;
        }

        overlay.style.display = 'block';
        tripForm.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

// Close function remains the same
window.closeForm = function () {
    const overlay = document.getElementById('overlay');
    const tripForm = document.getElementById('tripForm');
    if (overlay && tripForm) {
        overlay.style.display = 'none';
        tripForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Add event listeners to all "Book This Package" buttons (alternative to onclick)
document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const destination = this.getAttribute('data-destination');
        openForm(destination);
    });
});

// Destination Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.destination-container');
    const slider = document.querySelector('.destination-grid');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const destinationCards = document.querySelectorAll('.destination-card');

    if (!sliderContainer || !slider || !leftArrow || !rightArrow || destinationCards.length === 0) return;

    // Calculate card width including margin
    const cardStyle = window.getComputedStyle(destinationCards[0]);
    const cardWidth = destinationCards[0].offsetWidth +
        parseInt(cardStyle.marginRight) +
        parseInt(cardStyle.marginLeft);

    // Number of visible cards based on screen size
    function getVisibleCards() {
        if (window.innerWidth >= 992) return 3; // Desktop
        if (window.innerWidth >= 768) return 2; // Tablet
        return 1; // Mobile
    }

    let visibleCards = getVisibleCards();
    let currentIndex = 0;
    const maxIndex = Math.max(destinationCards.length - visibleCards, 0);

    // Update slider position
    function updateSlider() {
        const offset = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${offset}px)`;

        // Update arrow states
        leftArrow.style.visibility = currentIndex <= 0 ? 'hidden' : 'visible';
        rightArrow.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
    }

    // Left arrow click
    leftArrow.addEventListener('click', function () {
        currentIndex = Math.max(currentIndex - visibleCards, 0);
        updateSlider();
    });

    // Right arrow click
    rightArrow.addEventListener('click', function () {
        currentIndex = Math.min(currentIndex + visibleCards, maxIndex);
        updateSlider();
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        visibleCards = getVisibleCards();
        currentIndex = Math.min(currentIndex, Math.max(destinationCards.length - visibleCards, 0));
        updateSlider();
    });

    // Initialize
    updateSlider();

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        const difference = touchStartX - touchEndX;

        if (difference > threshold) {
            // Swipe left - move right
            currentIndex = Math.min(currentIndex + 1, maxIndex);
        } else if (difference < -threshold) {
            // Swipe right - move left
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        updateSlider();
    }
});