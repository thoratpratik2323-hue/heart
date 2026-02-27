document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.getElementById('hearts-container');
    const typewriterElement = document.getElementById('typewriter');
    const reasonBtn = document.getElementById('reason-btn');
    const reasonDisplay = document.getElementById('reason-display');
    const container = document.querySelector('.container');

    // Typewriter Effect
    const textToType = "I Love You Ishu ❤️";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 150);
        }
    }
    setTimeout(typeWriter, 1000);

    // Personalized Reasons
    const reasons = [
        "Your beautiful smile that lights up my world. ✨",
        "The way you care for me like no one else. ❤️",
        "The sound of your laughter, it's my favorite song. 🎵",
        "How you're not just my girl, but my best friend. 🤝",
        "The magic in your eyes when you look at me. ✨",
        "Your kind heart and pure soul. 💖",
        "The way you make every moment special. 🌟",
        "How you support my dreams and believe in me. 💪",
        "Your cute little habits that make me smile. 🥰",
        "Simply because you are YOU, and you're perfect. 💍"
    ];

    if (reasonBtn) {
        reasonBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

            reasonDisplay.style.opacity = 0;
            reasonDisplay.style.transform = 'translateY(10px)';

            setTimeout(() => {
                reasonDisplay.innerText = randomReason;
                reasonDisplay.style.opacity = 1;
                reasonDisplay.style.transform = 'translateY(0)';
            }, 300);

            // Create a burst of hearts
            createHeartBurst(e.clientX, e.clientY);
        });
    }

    // Floating Hearts System
    function createHeart() {
        const heartText = ['❤️', '💖', '💝', '💕', '✨'][Math.floor(Math.random() * 5)];
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartText;

        const startLeft = Math.random() * 100;
        const duration = Math.random() * 4000 + 4000;
        const size = Math.random() * 25 + 15;

        heart.style.left = startLeft + 'vw';
        heart.style.bottom = '-100px';
        heart.style.fontSize = size + 'px';
        heart.style.animation = `floatUp ${duration}ms ease-in forwards`;
        heart.style.opacity = Math.random() * 0.7 + 0.3;

        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), duration);
    }

    setInterval(createHeart, 600);

    // Heart Burst Effect
    function createHeartBurst(x, y) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = '💖';

            const angle = (i / 15) * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (Math.random() * 10 + 20) + 'px';

            document.body.appendChild(heart);

            heart.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, 0, 0.2, 1)'
            }).onfinish = () => heart.remove();
        }
    }

    // Cursor Trail & 3D Tilt
    document.addEventListener('mousemove', (e) => {
        // Trail
        if (Math.random() > 0.85) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            // Random scatter for trail
            const mx = (Math.random() - 0.5) * 50;
            const my = (Math.random() - 0.5) * 50;
            trail.style.setProperty('--mx', mx + 'px');
            trail.style.setProperty('--my', my + 'px');

            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
        }

        // 3D Tilt
        if (container) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Reset Tilt
    document.addEventListener('mouseleave', () => {
        container.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });

    // Modal Logic
    const letterBtn = document.getElementById('letter-btn');
    const modal = document.getElementById('letter-modal');
    const closeBtn = document.querySelector('.close-btn');

    if (letterBtn && modal && closeBtn) {
        letterBtn.addEventListener('click', () => {
            modal.classList.add('visible');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('visible');
        });
    }

    // Love Meter Random Increment
    const lovePercent = document.getElementById('love-percent');
    const meterFill = document.getElementById('meter-fill');

    let currentPercent = 99;
    setInterval(() => {
        if (currentPercent < 100) {
            currentPercent += 0.01;
            lovePercent.textContent = currentPercent.toFixed(2) + '%';
            meterFill.style.width = currentPercent + '%';
        } else {
            lovePercent.textContent = '∞%';
            lovePercent.style.color = '#ffd700';
            lovePercent.style.textShadow = '0 0 20px #ffd700';
        }
    }, 2000);
});
