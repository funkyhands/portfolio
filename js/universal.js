const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
});

// Shared carousel initializer
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
