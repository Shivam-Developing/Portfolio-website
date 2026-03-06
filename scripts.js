// Typewriter Effect Module
const typewriter = (function() {
    const textDisplay = document.getElementById('text-display');
    const texts = ["Computer Science Student", "Full Stack Developer", "AI/ML Engineer", "Agentic AI Developer", "Backend Developer", "Python Programmer", "Tech Enthusiast"];
    let currentTextIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 75;
    const pauseDuration = 1000;

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
        "Be yourself; everyone else is already taken. - Oscar Wilde",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Code is like humor. When you have to explain it, it's bad. - Cory House",
        "First, solve the problem. Then, write the code. - John Johnson"
    ];
    let currentQuoteIndex = 0;
    const intervalTime = 10000;

    function displayRandomQuote() {
        quoteElement.classList.remove('fade-in');
        quoteElement.classList.add('fade-out');

        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.textContent = quotes[currentQuoteIndex];
            quoteElement.classList.remove('fade-out');
            quoteElement.classList.add('fade-in');
        }, 500);
    }

    function start() {
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.classList.add('fade-in');
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
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
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
                const navLinksList = document.getElementById('nav-links-list');
                if (navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                }
            });
        });

        const scrollButtons = document.querySelectorAll('button[data-target]:not(.nav-button)');
        scrollButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.currentTarget.dataset.target;
                smoothScroll(targetId);
            });
        });

        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinksList = document.getElementById('nav-links-list');

        hamburgerMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.navbar') && navLinksList.classList.contains('active')) {
                navLinksList.classList.remove('active');
            }
        });
    }

    return {
        init: init
    };
})();

// Scroll Animation Module
const scrollAnimation = (function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
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

// Active Navigation Highlight
const activeNavHighlight = (function() {
    function init() {
        const sections = document.querySelectorAll('section[id]');
        const navButtons = document.querySelectorAll('.nav-button[data-target]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navButtons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.target === current) {
                    button.classList.add('active');
                }
            });
        });
    }

    return {
        init: init
    };
})();

// Contact Form Module
const contactForm = (function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    function init() {
        if (!form) {
            console.log('Contact form not found on this page');
            return;
        }

        form.addEventListener('submit', handleSubmit);
        console.log('Contact form initialized');
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Form submission started...');

        setLoadingState(true);
        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData).toString()
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                console.log('Form submitted successfully');
                showSuccess();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showError();
        } finally {
            setLoadingState(false);
        }
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="submit">Sending...</span><i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="submit">Send Message</span><i class="fas fa-paper-plane" style="margin-left: 8px;"></i>';
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    function showSuccess() {
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.classList.add('fade-in');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('Success message displayed');
    }

    function showError() {
        errorMessage.style.display = 'block';
        errorMessage.classList.add('fade-in');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('Error message displayed');
    }

    window.resetForm = function() {
        form.reset();
        successMessage.style.display = 'none';
        formContainer.style.display = 'block';
        formContainer.classList.add('fade-in');
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log('Form reset');
    };

    window.hideError = function() {
        errorMessage.style.display = 'none';
        console.log('Error hidden');
    };

    return {
        init: init
    };
})();

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing modules...');
    typewriter.start();
    quoteGenerator.start();
    navigation.init();
    scrollAnimation.init();
    activeNavHighlight.init();
    contactForm.init();
});

// Smooth scroll polyfill for Safari
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
        .then(() => {
            window.__forceSmoothScrollPolyfill__ = true;
        })
        .catch(err => console.log('Smooth scroll polyfill not loaded:', err));
}
