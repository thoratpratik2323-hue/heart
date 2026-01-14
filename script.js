const container = document.getElementById('hearts-container');
const firefliesContainer = document.getElementById('fireflies-container');
const card = document.querySelector('.container');
const typewriterElement = document.getElementById('typewriter');
const reasonBtn = document.getElementById('reason-btn');
const reasonDisplay = document.getElementById('reason-display');

// Typewriter Effect
const textToType = "I Love You";
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typewriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 200);
    }
}
// Start typing after a short delay
setTimeout(typeWriter, 500);

// Reasons Logic
const reasons = [
    "Your beautiful smile ❤️",
    "The way you care for me",
    "Your amazing laugh",
    "Being my best friend",
    "Everything about you ✨",
    "How you make me better",
    "Your kind heart"
];

if (reasonBtn) {
    reasonBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent heart burst on button click
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
        reasonDisplay.style.opacity = 0;
        
        setTimeout(() => {
            reasonDisplay.innerText = randomReason;
            reasonDisplay.style.opacity = 1;
        }, 300);
    });
}

// Fireflies System
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const animDuration = Math.random() * 5000 + 5000;
    
    firefly.style.left = startX + 'vw';
    firefly.style.top = startY + 'vh';
    firefly.style.animationDuration = animDuration + 'ms';
    
    firefliesContainer.appendChild(firefly);
    
    setTimeout(() => {
        firefly.remove();
    }, animDuration);
}

setInterval(createFirefly, 500);

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    
    // Randomize position and animation properties
    const startLeft = Math.random() * 100;
    const duration = Math.random() * 3000 + 4000; // 4-7 seconds
    // Varied sizes for depth effect
    const size = Math.random() * 20 + 10; 
    const blur = Math.random() * 2; // Subtle blur for depth
    
    heart.style.left = startLeft + 'vw';
    heart.style.animationDuration = duration + 'ms';
    heart.style.fontSize = size + 'px';
    heart.style.filter = `blur(${blur}px)`;
    
    container.appendChild(heart);
    
    // Remove element after animation
    setTimeout(() => {
        heart.remove();
    }, duration);
}

// Create hearts at regular intervals
setInterval(createHeart, 400);

// Add extra hearts on click with scatter effect
document.addEventListener('click', (e) => {
    // Don't trigger if clicking buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.left = (e.clientX / window.innerWidth * 100) + 'vw';
            heart.style.top = (e.clientY / window.innerHeight * 100) + 'vh'; // Start near click
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = '2s';
            container.appendChild(heart);Source: 
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
});

// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);

    // 3D Tilt Effect
    if (card) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});

// Reset tilt when mouse leaves
document.addEventListener('mouseleave', () => {
    if (card) {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
});
