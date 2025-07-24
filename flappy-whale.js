// Flappy Sonar Whale Game - Intentionally contains code smells for SonarLint workshop

// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

// Game state
let gameRunning = true;
let score = 0;

// Whale object
const whale = {
    x: 50,
    y: 300,
    width: 40,
    height: 30,
    vy: 0,
    gravity: 0.5
};

// Obstacles array
let obstacles = [];

// Code Smell #1: Unclosed interval (resource leak) - S2095
// This setInterval is never cleared, causing a memory leak
setInterval(function() {
    if (gameRunning) {
        update();
        draw();
    }
}, 20);

// Code Smell #2: var instead of let/const in loop - S4334
function update() {
    // Apply gravity
    whale.vy += whale.gravity;
    whale.y += whale.vy;
    
    // Move obstacles
    for (var i = 0; i < obstacles.length; i++) {  // Should use let/const
        obstacles[i].x -= 3;
        
        // Check for scoring
        if (!obstacles[i].scored && obstacles[i].x + obstacles[i].width < whale.x) {
            score++;
            obstacles[i].scored = true;
            scoreElement.textContent = 'Score: ' + score;
        }
    }
    
    // Remove obstacles that are off-screen
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    // Add new obstacles
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 250) {
        addObstacle();
    }
    
    // Check collisions
    checkCollisions();
    
    // Check boundaries
    if (whale.y > 600 || whale.y < 0) {  // Code Smell #5: Magic numbers - S1192
        gameOver();
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, 400, 600);  // Code Smell #5: Duplicated literals - S1192
    
    // Draw whale
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(whale.x, whale.y, whale.width, whale.height);
    
    // Draw whale eye
    ctx.fillStyle = 'white';
    ctx.fillRect(whale.x + 25, whale.y + 8, 8, 8);
    ctx.fillStyle = 'black';
    ctx.fillRect(whale.x + 27, whale.y + 10, 4, 4);
    
    // Draw obstacles
    ctx.fillStyle = '#228B22';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function addObstacle() {
    const gapSize = 150;
    const obstacleWidth = 50;
    const gapY = Math.random() * (400 - gapSize) + 50;
    
    // Top obstacle
    obstacles.push({
        x: 400,  // Code Smell #5: Magic number - S1192
        y: 0,
        width: obstacleWidth,
        height: gapY,
        scored: false
    });
    
    // Bottom obstacle
    obstacles.push({
        x: 400,  // Code Smell #5: Magic number - S1192
        y: gapY + gapSize,
        width: obstacleWidth,
        height: 600 - (gapY + gapSize),  // Code Smell #5: Magic number - S1192
        scored: false
    });
}

function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (whale.x < obstacle.x + obstacle.width &&
            whale.x + whale.width > obstacle.x &&
            whale.y < obstacle.y + obstacle.height &&
            whale.y + whale.height > obstacle.y) {
            gameOver();
        }
    });
}

function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
    // Code Smell #4: Missing debug logging - S106
    // No console.log for debugging game over scenarios
}

function flap() {
    if (gameRunning) {
        whale.vy = -8;  // Code Smell #3: Magic number for flap force - S109
    }
}

function restart() {
    gameRunning = true;
    score = 0;
    whale.y = 300;  // Code Smell #5: Magic number - S1192
    whale.vy = 0;
    obstacles = [];
    scoreElement.textContent = 'Score: 0';
    gameOverElement.style.display = 'none';
}

// Event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        flap();
    } else if (event.code === 'KeyR' && !gameRunning) {
        restart();
    }
});

// Touch support for mobile
canvas.addEventListener('touchstart', function(event) {
    event.preventDefault();
    flap();
});

// Mouse support
canvas.addEventListener('click', function() {
    flap();
});

// Initialize first obstacle
addObstacle();