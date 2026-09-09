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

// Nav: becomes solid on scroll past hero
(function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    function updateNav() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
})();

// Hero Carousel — slides out left, next comes from right, updates title/subtitle
(function () {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    const heroTitle    = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroText     = document.getElementById('heroText');

    let current = 0;
    let animating = false;

    // Position all slides
    slides.forEach((slide, i) => {
        slide.style.transition = 'none';
        slide.style.transform = i === 0 ? 'translateX(0%)' : 'translateX(100%)';
        // Prevent default link navigation — we handle clicks manually
        slide.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    });

    function updateText(index) {
        if (!heroTitle || !heroSubtitle) return;
        const slide = slides[index];
        const title = slide.getAttribute('data-title') || '';
        const sub   = slide.getAttribute('data-subtitle') || '';
        // Fade out
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.textContent    = title;
            heroSubtitle.textContent = sub;
            // Update hero link
            if (heroText) {
                heroText.onclick = function () {
                    window.location.href = slide.getAttribute('href');
                };
                heroText.style.cursor = 'pointer';
            }
            // Fade in
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 300);
    }

    function nextSlide() {
        if (animating) return;
        animating = true;

        const outgoing = slides[current];
        current = (current + 1) % slides.length;
        const incoming = slides[current];

        outgoing.style.transition = 'transform 1.05s cubic-bezier(0.77, 0, 0.18, 1)';
        incoming.style.transition = 'transform 1.05s cubic-bezier(0.77, 0, 0.18, 1)';
        outgoing.style.transform  = 'translateX(-100%)';
        incoming.style.transform  = 'translateX(0%)';

        updateText(current);

        setTimeout(() => {
            outgoing.style.transition = 'none';
            outgoing.style.transform  = 'translateX(100%)';
            animating = false;
        }, 1100);
    }

    // Set initial text
    updateText(0);

    setInterval(nextSlide, 3500);
})();
