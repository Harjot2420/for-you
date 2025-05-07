// DOM Elements
const btnOpenLetter = document.querySelector('.btn-open-letter');
const letterContent = document.querySelector('.letter-content');
const options = document.querySelectorAll('.option');
const interactiveSections = document.querySelectorAll('.interactive');
const moodOptions = document.querySelectorAll('.mood-option');
const moodResult = document.querySelector('.mood-result');

// Data
const comfortData = {
    hugs: [
        "Sending you the warmest hug!",
        "Virtual hug incoming! 🤗",
        "You deserve all the hugs today!",
        "Squeeze! That was a hug from me!",
        "Hug delivery for my favorite person!"
    ],
    tips: [
        "💖 Warm ginger tea with honey",
        "💖 Gentle yoga stretches",
        "💖 Heating pad for cramps",
        "💖 Dark chocolate (70%+)",
        "💖 Warm bath with Epsom salts",
        "💖 Favorite comfort movie",
        "💖 Cozy blanket nest",
        "💖 Light meditation",
        "💖 Hydration with herbal tea",
        "💖 Pillow fort relaxation"
    ],
    moodBoosters: {
        happy: [
            "You bring so much joy to the world! 🌟",
            "Your smile is my favorite thing! 😊",
            "Happy looks beautiful on you! 🌸"
        ],
        silly: [
            "Why don't eggs tell jokes? They'd crack each other up! 🥚",
            "What do you call a fake noodle? An impasta! 🍝",
            "I would tell you a chemistry joke but I know I wouldn't get a reaction! ⚗️"
        ],
        calm: [
            "Breathe in... and out... You've got this �",
            "Imagine yourself in your happy place 🌿",
            "Peace begins with a smile ☺️"
        ],
        loved: [
            "You are deeply loved, more than words can express 💝",
            "Every part of you is precious and worthy 🌹",
            "If love were a color, it would look like you 🌈"
        ]
    },
    affirmations: [
        "You're stronger than you think 💪",
        "Your feelings are valid 💖",
        "This discomfort is temporary ⏳",
        "You're doing amazing 🌟",
        "Your body is wise and wonderful 🌸",
        "Rest is productive too 🛌",
        "You deserve comfort and care 🧸",
        "Be gentle with yourself today 🤍"
    ]
};

// Initialize
let hugCount = 0;
let shownTips = 5; // Show first 5 tips initially

// Event Listeners
btnOpenLetter.addEventListener('click', toggleLetter);
options.forEach(option => option.addEventListener('click', showInteractiveSection));
moodOptions.forEach(option => option.addEventListener('click', showMoodBooster));

// Functions
function toggleLetter() {
    letterContent.classList.toggle('hidden');
    if (!letterContent.classList.contains('hidden')) {
        btnOpenLetter.textContent = 'Close Letter 💌';
        animateHearts(letterContent, 5);
    } else {
        btnOpenLetter.textContent = 'Open My Love Letter 💌';
    }
}

function showInteractiveSection() {
    // Hide all interactive sections first
    interactiveSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    const sectionId = this.id + '-content';
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Setup section-specific features
    if (sectionId === 'hugs-content') {
        setupHugsSection();
    } else if (sectionId === 'tips-content') {
        setupTipsSection();
    } else if (sectionId === 'distract-content') {
        setupDoodleSection();
    }
}

function setupHugsSection() {
    const btnHug = document.querySelector('.btn-hug');
    const hugCounter = document.querySelector('.hug-counter span');
    const hugAnimation = document.querySelector('.hug-animation');
    
    btnHug.addEventListener('click', function() {
        hugCount++;
        hugCounter.textContent = hugCount;
        
        // Create hug animation
        hugAnimation.innerHTML = '';
        const hug = document.createElement('div');
        hug.innerHTML = '🤗';
        hug.style.fontSize = '5rem';
        hug.style.position = 'absolute';
        hug.style.left = '50%';
        hug.style.top = '50%';
        hug.style.transform = 'translate(-50%, -50%)';
        hug.style.animation = 'hugPulse 1.5s ease-out';
        
        hugAnimation.appendChild(hug);
        
        // Add random message
        const message = document.createElement('p');
        message.textContent = comfortData.hugs[Math.floor(Math.random() * comfortData.hugs.length)];
        message.style.textAlign = 'center';
        message.style.marginTop = '20px';
        message.style.animation = 'fadeIn 0.5s ease-out';
        hugAnimation.appendChild(message);
        
        // Remove after animation
        setTimeout(() => {
            hug.remove();
            message.remove();
        }, 2000);
    });
}

function setupTipsSection() {
    const tipsList = document.querySelector('.tips-list');
    const btnMoreTips = document.querySelector('.btn-more-tips');
    
    // Display initial tips
    updateTipsList();
    
    btnMoreTips.addEventListener('click', function() {
        shownTips = Math.min(shownTips + 3, comfortData.tips.length);
        updateTipsList();
        
        if (shownTips >= comfortData.tips.length) {
            btnMoreTips.style.display = 'none';
        }
        
        animateHearts(tipsList, 3);
    });
    
    function updateTipsList() {
        tipsList.innerHTML = '';
        comfortData.tips.slice(0, shownTips).forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
    }
}

function setupDoodleSection() {
    const canvas = document.querySelector('.doodle-canvas');
    const btnClear = document.querySelector('.btn-clear-doodle');
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    btnClear.addEventListener('click', function() {
        canvas.innerHTML = '';
        animateHearts(canvas, 2);
    });
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(
            e.type === 'touchstart' ? 'mousedown' : 'mousemove',
            {
                clientX: touch.clientX,
                clientY: touch.clientY
            }
        );
        canvas.dispatchEvent(mouseEvent);
    }
    
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.borderRadius = '50%';
        
        // Random pastel colors
        const colors = ['#ffb6c1', '#ffd700', '#98fb98', '#add8e6', '#dda0dd'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = randomColor;
        
        canvas.appendChild(dot);
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
}

function showMoodBooster() {
    const mood = this.dataset.mood;
    const boosters = comfortData.moodBoosters[mood];
    const affirmation = comfortData.affirmations[Math.floor(Math.random() * comfortData.affirmations.length)];
    
    moodResult.innerHTML = `
        <p>${boosters[Math.floor(Math.random() * boosters.length)]}</p>
        <p class="affirmation">${affirmation}</p>
    `;
    
    animateHearts(moodResult, 5);
}

function animateHearts(container, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'][Math.floor(Math.random() * 9)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.left = (Math.random() * 80 + 10) + '%';
            heart.style.top = '0';
            heart.style.animation = `floatUp ${Math.random() * 2 + 1}s ease-in forwards`;
            heart.style.opacity = '0.8';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, i * 200);
    }
}

// Initialize floating hearts in footer
setInterval(() => {
    animateHearts(document.querySelector('.hearts-animation'), 1);
}, 1000);

// Add hug pulse animation to head
const style = document.createElement('style');
style.textContent = `
    @keyframes hugPulse {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(style);