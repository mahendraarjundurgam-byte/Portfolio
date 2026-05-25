/* --- 1. PRELOADER --- */
window.addEventListener("load", () => {
    const loaderBar = document.querySelector('.loader-bar');
    const preloader = document.querySelector('.preloader');

    if (loaderBar) {
        loaderBar.style.width = '100%';
    }

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hide');
        }
    }, 1000);
});

/* --- 2. CUSTOM CURSOR & HOVER --- */
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

/* MOBILE DETECTION */
const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

/* REMOVE CURSOR ON MOBILE */
if (isTouchDevice) {
    document.querySelector('.cursor-dot')?.remove();
    document.querySelector('.cursor-outline')?.remove();
}

window.addEventListener('mousemove', (e) => {

    if (cursorDot && cursorOutline && !isTouchDevice) {

        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, {
            duration: 500,
            fill: "forwards"
        });
    }
});

/* HOVER EFFECTS */
const interactables = document.querySelectorAll(
    'a, button, input, textarea, .project-card, .spotlight-card'
);

interactables.forEach(el => {

    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });

});

/* --- 3. PARALLAX COVER PAGE --- */
document.addEventListener("mousemove", parallax);

function parallax(e) {

    if (isTouchDevice) return;

    document.querySelectorAll(".parallax").forEach(function(move){

        var moving_value = move.getAttribute("data-speed");

        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        move.style.transform = `translate(${x}px, ${y}px)`;
    });
}

/* --- 4. MAGNETIC BUTTONS --- */
document.querySelectorAll('.magnetic').forEach(btn => {

    btn.addEventListener('mousemove', (e) => {

        if (isTouchDevice) return;

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });

});

/* --- 5. SPOTLIGHT GLOW EFFECT --- */
const cards = document.querySelectorAll(".spotlight-card");

cards.forEach(card => {

    card.onmousemove = e => {

        if (isTouchDevice) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

        card.style.setProperty(
            "--glow-color",
            card.getAttribute("data-glow")
        );
    };
});

/* --- 6. HACKER TEXT EFFECT --- */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll(".hacker-effect").forEach(target => {

    target.addEventListener('mouseover', event => {

        let iterations = 0;

        const originalText = event.target.dataset.value;

        const interval = setInterval(() => {

            event.target.innerText = originalText
                .split("")
                .map((letter, index) => {

                    if (index < iterations) {
                        return originalText[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];

                }).join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;

        }, 30);
    });
});

/* --- 7. TYPEWRITER --- */
const textElement = document.querySelector('.typewriter');

const phrases = [
    "Digital Experiences.",
    "Robust Code.",
    "Visual Stories."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {

    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {

        textElement.textContent =
            currentPhrase.substring(0, charIndex - 1);

        charIndex--;

    } else {

        textElement.textContent =
            currentPhrase.substring(0, charIndex + 1);

        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {

        isDeleting = true;

        setTimeout(type, 2000);

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        phraseIndex = (phraseIndex + 1) % phrases.length;

        setTimeout(type, 500);

    } else {

        setTimeout(type, isDeleting ? 50 : 100);
    }
}

document.addEventListener('DOMContentLoaded', type);

/* --- 8. SCROLL REVEAL --- */
window.addEventListener('scroll', () => {

    /* PROGRESS BAR */
    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    const progressBar = document.querySelector(".scroll-progress");

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    /* REVEALS */
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {

        const windowHeight = window.innerHeight;

        const revealTop = reveal.getBoundingClientRect().top;

        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });

    /* HERO REVEAL */
    const heroSection = document.querySelector('.hero');

    if (
        heroSection &&
        heroSection.getBoundingClientRect().top <
        window.innerHeight / 1.5
    ) {

        document
            .querySelectorAll('.reveal-group .reveal-item')
            .forEach((el, index) => {

                setTimeout(() => {
                    el.style.opacity = '1';
                }, index * 100);

                setTimeout(() => {
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
    }
});

/* --- 9. PARTICLES --- */
const canvas = document.getElementById('particles-canvas');

if (canvas) {

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {

        constructor() {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.size = Math.random() * 2;

            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }

            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        }

        draw() {

            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    }

    function initParticles() {

        particlesArray = [];

        const particleCount = isTouchDevice ? 25 : 50;

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {

            particlesArray[i].update();
            particlesArray[i].draw();
        }

        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initParticles();
    });

    initParticles();
    animateParticles();
}

/* --- 10. TILT EFFECT --- */
const card = document.querySelector('#tilt-card');

const cardInner = document.querySelector('.profile-card');

if (card && cardInner) {

    card.addEventListener('mousemove', (e) => {

        if (isTouchDevice) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardInner.style.transform =
            `perspective(1000px)
            rotateX(${-((y - rect.height/2) / 10)}deg)
            rotateY(${((x - rect.width/2) / 10)}deg)
            scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {

        cardInner.style.transform =
            'perspective(1000px) rotate(0)';
    });
}
