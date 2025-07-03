// Typewriter Effect Module
const typewriter = (function() {
    const textDisplay = document.getElementById('text-display');
    const texts = ["Computer Science Student", "Web Developer", "Android Developer", "Python Programmer", "GEN AI Engineer", "Tech Enthusiast", "Business Analyst"];
    let currentTextIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 75;
    const pauseDuration = 1000; // Increased pause duration for better readability

    function type() {
        const currentText = texts[currentTextIndex];

        if (isDeleting) {
            textDisplay.textContent = currentText.substring(0, currentCharacterIndex - 1);
            currentCharacterIndex--;

            if (currentCharacterIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(type, pauseDuration);
                return;
            }
        } else {
            textDisplay.textContent = currentText.substring(0, currentCharacterIndex + 1);
            currentCharacterIndex++;

            if (currentCharacterIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
                return;
            }
        }
        setTimeout(type, typingSpeed);
    }

    return {
        start: type
    };
})();

// Random Quote Generator Module
const quoteGenerator = (function() {
    const quoteElement = document.getElementById('quote-display');
    const quotes = [
        "“Be yourself; everyone else is already taken.” ― Oscar Wilde",
        "“The only way to do great work is to love what you do.” ― Steve Jobs",
        "“Innovation distinguishes between a leader and a follower.” ― Steve Jobs",
        "“The future belongs to those who believe in the beauty of their dreams.” ― Eleanor Roosevelt",
        "“Strive not to be a success, but rather to be of value.” ― Albert Einstein"
    ];
    let currentQuoteIndex = 0;
    const intervalTime = 10000; // 10 seconds

    function displayRandomQuote() {
        // Add fade-out class
        quoteElement.classList.remove('fade-in');
        quoteElement.classList.add('fade-out');

        setTimeout(() => {
            // Change quote after fade-out
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = quotes[currentQuoteIndex];

            // Add fade-in class
            quoteElement.classList.remove('fade-out');
            quoteElement.classList.add('fade-in');
        }, 500); // Half of the fade transition duration
    }

    function start() {
        // Display initial quote
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.classList.add('fade-in');

        // Start changing quotes every 10 seconds
        setInterval(displayRandomQuote, intervalTime);
    }

    return {
        start: start
    };
})();

// Navigation Module
const navigation = (function() {
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    }

    function init() {
        const navButtons = document.querySelectorAll('.nav-button[data-target]');
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.target.dataset.target;
                smoothScroll(targetId);
                // Close mobile menu if open
                const navLinksList = document.getElementById('nav-links-list');
                if (navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                }
            });
        });

        // Handle other buttons that might use data-target for scrolling
        const scrollButtons = document.querySelectorAll('button[data-target]:not(.nav-button)');
        scrollButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.target.dataset.target;
                smoothScroll(targetId);
            });
        });

        // Hamburger menu toggle
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinksList = document.getElementById('nav-links-list');

        hamburgerMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
    }

    return {
        init: init
    };
})();

// Certifications Slideshow Module
const slideshow = (function() {
    let slideIndex = 1;
    let autoSlideInterval;

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n) {
        clearTimeout(autoSlideInterval); // Clear existing interval
        showSlides(slideIndex += n);
        startAutoSlideshow(); // Restart interval
    }

    function currentSlide(n) {
        clearTimeout(autoSlideInterval); // Clear existing interval
        showSlides(slideIndex = n);
        startAutoSlideshow(); // Restart interval
    }

    function startAutoSlideshow() {
        autoSlideInterval = setTimeout(() => {
            plusSlides(1); // Move to next slide
        }, 5000); // Change image every 5 seconds
    }

    function init() {
        showSlides(slideIndex);
        startAutoSlideshow();
    }

    // Expose functions to global scope for onclick attributes in HTML
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;

    return {
        init: init
    };
})();

// Scroll Animation Module (Intersection Observer)
const scrollAnimation = (function() {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    function init() {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    return {
        init: init
    };
})();


// Initialize all modules when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typewriter.start();
    quoteGenerator.start();
    navigation.init();
    slideshow.init();
    scrollAnimation.init();
});
