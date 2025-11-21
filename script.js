document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax Effect for Hero (Desktop only)
    const hero = document.querySelector('.hero');
    const orb = document.querySelector('.glowing-orb');

    if (window.matchMedia("(min-width: 768px)").matches) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            if (orb) {
                orb.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
            }

            const cards = document.querySelectorAll('.glass-card');
            cards.forEach((card, index) => {
                const speed = (index + 1) * 20;
                card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // Countdown Timer
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        // Set deadline to 4 hours from now
        let deadline = new Date();
        deadline.setHours(deadline.getHours() + 4);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance < 0) {
                deadline = new Date();
                deadline.setHours(deadline.getHours() + 4);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownEl.innerHTML =
                (hours < 10 ? "0" + hours : hours) + ":" +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);
        };

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});
