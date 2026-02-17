// Scroll Reveal — fires once, unobserved after so never re-triggers on scroll back
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hero Carousel — one image at a time, slides out left, next comes from right
(function () {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let current = 0;
    let animating = false;

    // First slide visible, all others stacked off-screen to the right
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

        // Both move simultaneously — outgoing left, incoming from right, no gap
        outgoing.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.18, 1)';
        incoming.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.18, 1)';
        outgoing.style.transform = 'translateX(-100%)';
        incoming.style.transform = 'translateX(0%)';

        setTimeout(() => {
            // Reset outgoing off-screen right, ready for its next turn
            outgoing.style.transition = 'none';
            outgoing.style.transform = 'translateX(100%)';
            animating = false;
        }, 1050);
    }

    // 4.5s on screen + 1s transition = 5.5s interval
    setInterval(nextSlide, 5500);
})();