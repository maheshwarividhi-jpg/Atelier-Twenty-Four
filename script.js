// Premium Scroll Reveal — fire once, then unobserve so it never resets on scroll back
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // stop watching — stays visible forever
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll — ORIGINAL, UNCHANGED
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hero Carousel — slide out left, next slides in from right, no gap
(function () {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let current = 0;
    let animating = false;

    // Position all slides: first one visible, rest off-screen to the right
    slides.forEach((slide, i) => {
        slide.style.transition = 'none';
        slide.style.transform = i === 0 ? 'translateX(0%)' : 'translateX(100%)';
    });

    function nextSlide() {
        if (animating) return;
        animating = true;

        const outgoing = slides[current];
        current = (current + 1) % slides.length;
        const incoming = slides[current];

        outgoing.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.18, 1)';
        incoming.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.18, 1)';

        outgoing.style.transform = 'translateX(-100%)';
        incoming.style.transform = 'translateX(0%)';

        setTimeout(() => {
            outgoing.style.transition = 'none';
            outgoing.style.transform = 'translateX(100%)';
            animating = false;
        }, 1050);
    }

    setInterval(nextSlide, 5500);
})();
