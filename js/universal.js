
// ===== Preloader =====
(function () {
    // Only show preloader on first visit per session
    if (sessionStorage.getItem('preloaded')) {
        const loader = document.querySelector('.preloader');
        if (loader) loader.remove();
        document.body.classList.add('page-enter');
        return;
    }

    const loader = document.querySelector('.preloader');
    if (!loader) {
        document.body.classList.add('page-enter');
        return;
    }

    const textEl = loader.querySelector('.preloader-text');
    const letters = 'NIGEL QUEK';
    letters.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = (i * 0.06) + 's';
        textEl.appendChild(span);
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('done');
            document.body.classList.add('page-enter');
            sessionStorage.setItem('preloaded', '1');
            setTimeout(() => loader.remove(), 600);
        }, 1200);
    });
})();

// ===== Everything after DOM is ready =====
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Nav Toggle
    const toggleButton = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Back to Top
    const toTop = document.querySelector('.to-top');

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        if (toTop) {
            if (window.pageYOffset > 100) {
                toTop.classList.add('active');
            } else {
                toTop.classList.remove('active');
            }
        }

        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        }
    });

    // Page Transitions — enter (only if no preloader)
    if (!document.querySelector('.preloader')) {
        document.body.classList.add('page-enter');
    }

    // Exit animation on internal link clicks
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href ||
            href.startsWith('#') ||
            href.startsWith('http') ||
            href.startsWith('mailto') ||
            link.target === '_blank' ||
            href.endsWith('.pdf')) return;

        e.preventDefault();
        document.body.classList.remove('page-enter');
        document.body.classList.add('page-exit');

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });

});

// ===== Shared Carousel Initializer =====
function initCarousel(carouselId, indicatorsId, labelId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicatorWrap = document.getElementById(indicatorsId);
    const labelEl = document.getElementById(labelId);
    let current = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        indicatorWrap.appendChild(dot);
    });

    function goTo(index) {
        current = index;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        indicatorWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
        labelEl.textContent = slides[current].dataset.label;
    }

    carousel.querySelector('.prev').addEventListener('click', () => {
        goTo(current === 0 ? slides.length - 1 : current - 1);
    });
    carousel.querySelector('.next').addEventListener('click', () => {
        goTo(current === slides.length - 1 ? 0 : current + 1);
    });

    let startX = 0;
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    carousel.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? goTo(Math.min(current + 1, slides.length - 1)) : goTo(Math.max(current - 1, 0));
        }
    });
}
