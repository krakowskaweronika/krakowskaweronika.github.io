function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Odejmowanie wysokości navbaru
            behavior: 'smooth'
        });
    }
}

// Dodatkowy efekt dla nawigacji przy przewijaniu
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 10%';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.padding = '20px 10%';
        nav.style.background = 'var(--white)';
    }
});