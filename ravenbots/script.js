function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

function handleScroll() {
    const slideLeft = document.querySelectorAll('.slide-in-left');
    const slideRight = document.querySelectorAll('.slide-in-right');
    const fadeIn = document.querySelectorAll('.fade-in');
    const scaleUp = document.querySelectorAll('.scale-up');
    const screenPosition = window.innerHeight / 1.3;

    slideLeft.forEach(el => {
        if (el.getBoundingClientRect().top < screenPosition) {
            el.style.transition = 'transform 1s ease-out';
            el.style.transform = 'translateX(0)';
        } else {
            el.style.transform = 'translateX(-100%)';
        }
    });

    slideRight.forEach(el => {
        if (el.getBoundingClientRect().top < screenPosition) {
            el.style.transition = 'transform 1s ease-out';
            el.style.transform = 'translateX(0)';
        } else {
            el.style.transform = 'translateX(100%)';
        }
    });

    fadeIn.forEach(el => {
        if (el.getBoundingClientRect().top < screenPosition) {
            el.style.transition = 'opacity 1s ease-in';
            el.style.opacity = '1';
        } else {
            el.style.opacity = '0';
        }
    });

    scaleUp.forEach(el => {
        if (el.getBoundingClientRect().top < screenPosition) {
            el.style.transition = 'transform 0.5s ease-in-out';
            el.style.transform = 'scale(1)';
        } else {
            el.style.transform = 'scale(0.5)';
        }
    });

}

window.addEventListener('scroll', handleScroll);
handleScroll();

const heroImage = document.querySelector('.feature img');
let animationFrameId;

function animateImageCorners() {
    let cornerOffset = 20;
    let progress = 0;
    const speed = 0.04;

    function updateCorners() {
        const randomX1 = Math.sin(progress) * cornerOffset;
        const randomY1 = Math.cos(progress) * cornerOffset;
        const randomX2 = Math.cos(progress + Math.PI / 2) * cornerOffset;
        const randomY2 = Math.sin(progress + Math.PI / 2) * cornerOffset;
        const randomX3 = Math.sin(progress + Math.PI) * cornerOffset;
        const randomY3 = Math.cos(progress + Math.PI) * cornerOffset;
        const randomX4 = Math.cos(progress + 3 * Math.PI / 2) * cornerOffset;
        const randomY4 = Math.sin(progress + 3 * Math.PI / 2) * cornerOffset;

        if (heroImage) {
            heroImage.style.clipPath = `polygon(
                ${randomX1}px ${randomY1}px,
                calc(100% + ${randomX2}px) ${randomY2}px,
                calc(100% + ${randomX3}px) calc(100% + ${randomY3}px),
                ${randomX4}px calc(100% + ${randomY4}px)
            )`;
        }

        progress += speed;
        animationFrameId = requestAnimationFrame(updateCorners);
    }

    updateCorners();
}

if (document.querySelector('.feature img')) {
    animateImageCorners();
}

function stopImageAnimation() {
    if (heroImage && (heroImage.getBoundingClientRect().top > window.innerHeight || heroImage.getBoundingClientRect().bottom < 0)) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    } else if (heroImage && animationFrameId === null) {
        animateImageCorners();
    }
}

window.addEventListener('scroll', stopImageAnimation);
