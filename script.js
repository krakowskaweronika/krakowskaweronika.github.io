// Dynamiczne tło (Canvas)
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
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
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
    const count = window.innerWidth < 768 ? 30 : 70;
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// Obsługa Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.querySelector('.counter')) startCounters();
        }
    });
}, { threshold: 0.1 });

// Start funkcji
window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animate();

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function scrollToSection(id) {
    const el = document.getElementById(id);
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

function startCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const update = () => {
            const count = +counter.innerText;
            const inc = target / 50;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(update, 30);
            } else counter.innerText = target;
        };
        update();
    });
}