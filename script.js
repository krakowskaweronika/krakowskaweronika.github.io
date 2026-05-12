// --- CANVAS: Dynamiczne tło ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(240, 98, 146, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- LICZNIKI (Stats Counter) ---
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 2000 / target; // Czas animacji to ok. 2 sekundy

        const updateCount = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + 1);
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target + "+";
            }
        };

        if (count === 0) updateCount();
    });
}

// --- INTERSECTION OBSERVER (Animacje pojawiania się) ---
const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Jeśli element zawiera licznik, uruchom go
            if (entry.target.querySelector('.counter')) {
                startCounters();
            }
        }
    });
}, observerOptions);

// --- SMOOTH SCROLL (Płynne przewijanie) ---
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// --- NAV EFFECT (Zmiana tła nav przy skrolowaniu) ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 35px';
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        nav.style.padding = '15px 35px';
        nav.style.background = 'rgba(255, 255, 255, 0.45)';
    }
});

// --- FORMULARZ KONTAKTOWY ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerText;
        
        // Symulacja wysyłania
        btn.innerText = "Wysyłanie...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        setTimeout(() => {
            alert('Dziękuję za wiadomość! Odezwę się wkrótce.');
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}

// --- INICJALIZACJA ---
initCanvas();
createParticles();
animate();

window.addEventListener('resize', () => {
    initCanvas();
    createParticles();
});

// Podpięcie observera pod wszystkie elementy .reveal
document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});