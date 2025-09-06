// DOM Elements
const coin = document.querySelector('.coin');
const flipButton = document.getElementById('flip-button');
const resetButton = document.getElementById('reset-button');
const totalFlips = document.getElementById('total-flips');
const headsCount = document.getElementById('heads-count');
const tailsCount = document.getElementById('tails-count');
const historyList = document.getElementById('history-list');
const themeToggle = document.querySelector('.theme-toggle');
const particlesContainer = document.getElementById('particles-container');
const flipSound = document.getElementById('flip-sound');
const coinSound = document.getElementById('coin-sound');

// Browser compatibility checks
const supportsWebAnimations = typeof document.createElement('div').animate === 'function';
const supportsLocalStorage = (function() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
})();

// Fallback for browsers that don't support Web Animations API
if (!supportsWebAnimations) {
    console.log('Browser does not support Web Animations API. Using CSS animations as fallback.');
}

// Variables
let heads = 0;
let tails = 0;
let isAnimating = false;
let isDarkTheme = false;

// Get theme preference from localStorage if supported
if (supportsLocalStorage) {
    isDarkTheme = localStorage.getItem('darkTheme') === 'true';
} else {
    // Fallback to system preference if localStorage not supported
    isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initialize
function initialize() {
    // Apply saved theme
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
    }

    // Add event listeners
    flipButton.addEventListener('click', flipCoin);
    resetButton.addEventListener('click', resetStats);
    themeToggle.addEventListener('click', toggleTheme);

    // Create initial particles
    createParticles();
}

// Flip the coin
async function flipCoin() {
    if (isAnimating) return;
    
    isAnimating = true;
    flipButton.disabled = true;
    
    // Play flip sound
    flipSound.currentTime = 0;
    flipSound.play();
    
    // Remove previous animation classes
    coin.classList.remove('animate-heads', 'animate-tails');
    
    // Force a reflow to restart animation
    void coin.offsetWidth;
    
    // Randomly determine result
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    
    // Apply animation
    coin.classList.add(`animate-${result}`);
    
    // Create particles
    createFlipParticles();
    
    // Wait for animation to finish
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Play coin landing sound
    coinSound.currentTime = 0;
    coinSound.play();
    
    // Update stats
    updateStats(result);
    
    // Add to history
    addToHistory(result);
    
    isAnimating = false;
    flipButton.disabled = false;
}

// Update statistics
function updateStats(result) {
    if (result === 'heads') {
        heads++;
        headsCount.textContent = heads;
    } else {
        tails++;
        tailsCount.textContent = tails;
    }
    
    totalFlips.textContent = heads + tails;
}

// Reset statistics
function resetStats() {
    heads = 0;
    tails = 0;
    totalFlips.textContent = '0';
    headsCount.textContent = '0';
    tailsCount.textContent = '0';
    historyList.innerHTML = '';
    
    // Create reset particles
    createResetParticles();
}

// Add result to history
function addToHistory(result) {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    
    const resultElement = document.createElement('div');
    resultElement.classList.add('result', `${result}-result`);
    resultElement.textContent = result === 'heads' ? 'H' : 'T';
    
    const textElement = document.createElement('span');
    textElement.textContent = result === 'heads' ? 'Heads' : 'Tails';
    
    const timeElement = document.createElement('span');
    timeElement.classList.add('time');
    timeElement.textContent = new Date().toLocaleTimeString();
    
    historyItem.appendChild(resultElement);
    historyItem.appendChild(textElement);
    historyItem.appendChild(timeElement);
    
    historyList.prepend(historyItem);
    
    // Limit history items
    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Toggle theme
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference if localStorage is supported
    if (supportsLocalStorage) {
        localStorage.setItem('darkTheme', isDarkTheme);
    }
    
    // Create theme toggle particles
    createThemeParticles();
}

// Create background particles - optimized with requestAnimationFrame
let lastParticleTime = 0;
let particleIndex = 0;
const PARTICLE_INTERVAL = 200; // ms between particles
const TOTAL_PARTICLES = 30;

function createParticlesLoop(timestamp) {
    if (!lastParticleTime || timestamp - lastParticleTime > PARTICLE_INTERVAL) {
        if (particleIndex < TOTAL_PARTICLES) {
            createParticle({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 5 + 2,
                color: getRandomColor(0.3),
                duration: Math.random() * 3 + 2
            });
            particleIndex++;
            lastParticleTime = timestamp;
        } else if (particleIndex >= TOTAL_PARTICLES) {
            particleIndex = 0;
            // Wait longer before starting the next batch
            setTimeout(() => {
                requestAnimationFrame(createParticlesLoop);
            }, 10000);
            return;
        }
    }
    
    if (particleIndex < TOTAL_PARTICLES) {
        requestAnimationFrame(createParticlesLoop);
    }
}

function createParticles() {
    particleIndex = 0;
    requestAnimationFrame(createParticlesLoop);
}

// Create particles for coin flip
function createFlipParticles() {
    const coinRect = coin.getBoundingClientRect();
    const centerX = coinRect.left + coinRect.width / 2;
    const centerY = coinRect.top + coinRect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle({
                x: centerX + (Math.random() - 0.5) * 100,
                y: centerY + (Math.random() - 0.5) * 100,
                size: Math.random() * 8 + 4,
                color: getRandomColor(0.7),
                duration: Math.random() * 2 + 1
            });
        }, i * 50);
    }
}

// Create particles for reset
function createResetParticles() {
    const buttonRect = resetButton.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle({
                x: centerX + (Math.random() - 0.5) * 80,
                y: centerY + (Math.random() - 0.5) * 80,
                size: Math.random() * 6 + 3,
                color: getRandomColor(0.6),
                duration: Math.random() * 1.5 + 1
            });
        }, i * 40);
    }
}

// Create particles for theme toggle
function createThemeParticles() {
    const toggleRect = themeToggle.getBoundingClientRect();
    const centerX = toggleRect.left + toggleRect.width / 2;
    const centerY = toggleRect.top + toggleRect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createParticle({
                x: centerX + (Math.random() - 0.5) * 60,
                y: centerY + (Math.random() - 0.5) * 60,
                size: Math.random() * 5 + 2,
                color: isDarkTheme ? '#f1c40f' : '#4cc9f0',
                duration: Math.random() * 1.5 + 1
            });
        }, i * 30);
    }
}

// Create a single particle
function createParticle({ x, y, size, color, duration }) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;
    particle.style.animation = `float ${duration}s ease-in forwards`;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particlesContainer.contains(particle)) {
            particlesContainer.removeChild(particle);
        }
    }, duration * 1000);
}

// Get random color with opacity
function getRandomColor(opacity = 1) {
    const colors = [
        `rgba(67, 97, 238, ${opacity})`,  // primary
        `rgba(76, 201, 240, ${opacity})`,  // accent
        `rgba(58, 12, 163, ${opacity})`,   // secondary
        `rgba(245, 215, 66, ${opacity})`,  // gold
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);