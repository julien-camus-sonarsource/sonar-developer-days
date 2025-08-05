// Flappy Sonar Whale Game - Intentionally contains code smells for SonarLint workshop

// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

// Images
const whaleImg = new Image();
const seaweedImg = new Image();
let imagesLoaded = 0;

// Load external SVG files
whaleImg.src = 'sonar-whale-light-bg.svg';
seaweedImg.src = 'seaweed.svg';

whaleImg.onload = () => { imagesLoaded++; };
seaweedImg.onload = () => { imagesLoaded++; };

// Game state
let gameRunning = false; // Start paused until images load
let score = 0;
let debugMode = false; // Set to true to see collision boundaries

// Whale object with animation and collision bounds
const whale = {
    x: 50,
    y: 300,
    width: 40,
    height: 30,
    vy: 0,
    gravity: 0.5,
    squeezeScale: 1.0,
    targetSqueezeScale: 1.0,
    rotation: 0,
    // Collision bounds are smaller than visual bounds for better gameplay
    collisionWidth: 32,
    collisionHeight: 24,
    collisionOffsetX: 4,
    collisionOffsetY: 3
};

// Obstacles array
let obstacles = [];

// Wait for images to load before starting
function checkImagesLoaded() {
    if (imagesLoaded >= 2) {
        gameRunning = true;
        startGame();
    } else {
        setTimeout(checkImagesLoaded, 100);
    }
}

checkImagesLoaded();

// Code Smell #1: Unclosed interval (resource leak) - S2095
// This setInterval is never cleared, causing a memory leak
function startGame() {
    setInterval(function() {
        if (gameRunning) {
            update();
            draw();
        }
    }, 20);
}

// Code Smell #2: var instead of let/const in loop - S4334
function update() {
    // Apply gravity
    whale.vy += whale.gravity;
    whale.y += whale.vy;
    
    // Update whale animation
    whale.squeezeScale += (whale.targetSqueezeScale - whale.squeezeScale) * 0.2;
    whale.rotation = Math.max(-30, Math.min(30, whale.vy * 3));
    
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
    
    // Draw whale with animation
    ctx.save();
    ctx.translate(whale.x + whale.width/2, whale.y + whale.height/2);
    ctx.rotate(whale.rotation * Math.PI / 180);
    ctx.scale(whale.squeezeScale, 1 / whale.squeezeScale);
    
    if (imagesLoaded >= 2) {
        ctx.drawImage(whaleImg, -whale.width/2, -whale.height/2, whale.width, whale.height);
    } else {
        // Fallback rectangle if image not loaded
        ctx.fillStyle = '#4169E1';
        ctx.fillRect(-whale.width/2, -whale.height/2, whale.width, whale.height);
    }
    
    ctx.restore();
    
    // Draw obstacles
    obstacles.forEach(obstacle => {
        if (imagesLoaded >= 2) {
            // Draw seaweed image repeated to fill obstacle height
            // The SVG seaweed is designed for 400px height, so we scale accordingly
            var sections = Math.ceil(obstacle.height / 400);
            for (var j = 0; j < sections; j++) {
                var sectionHeight = Math.min(400, obstacle.height - j * 400);
                var scaleY = sectionHeight / 400;
                ctx.drawImage(seaweedImg, 
                             obstacle.x, obstacle.y + j * 400, 
                             obstacle.width, sectionHeight);
            }
        } else {
            // Fallback rectangle if image not loaded
            ctx.fillStyle = '#228B22';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
        
        // Debug: Draw collision boundaries
        if (debugMode) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x + obstacle.collisionOffsetX, 
                          obstacle.y + obstacle.collisionOffsetY, 
                          obstacle.collisionWidth, 
                          obstacle.collisionHeight);
        }
    });
    
    // Debug: Draw whale collision boundary
    if (debugMode) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(whale.x + whale.collisionOffsetX, 
                      whale.y + whale.collisionOffsetY, 
                      whale.collisionWidth, 
                      whale.collisionHeight);
    }
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
        scored: false,
        // Collision bounds are narrower than visual for more forgiving gameplay
        collisionWidth: 40,
        collisionHeight: gapY,
        collisionOffsetX: 5,
        collisionOffsetY: 0
    });
    
    // Bottom obstacle
    obstacles.push({
        x: 400,  // Code Smell #5: Magic number - S1192
        y: gapY + gapSize,
        width: obstacleWidth,
        height: 600 - (gapY + gapSize),  // Code Smell #5: Magic number - S1192
        scored: false,
        // Collision bounds are narrower than visual for more forgiving gameplay
        collisionWidth: 40,
        collisionHeight: 600 - (gapY + gapSize),  // Code Smell #5: Magic number - S1192
        collisionOffsetX: 5,
        collisionOffsetY: 0
    });
}

function checkCollisions() {
    obstacles.forEach(obstacle => {
        // Use collision bounds instead of visual bounds for more accurate detection
        const whaleCollisionX = whale.x + whale.collisionOffsetX;
        const whaleCollisionY = whale.y + whale.collisionOffsetY;
        const obstacleCollisionX = obstacle.x + obstacle.collisionOffsetX;
        const obstacleCollisionY = obstacle.y + obstacle.collisionOffsetY;
        
        if (whaleCollisionX < obstacleCollisionX + obstacle.collisionWidth &&
            whaleCollisionX + whale.collisionWidth > obstacleCollisionX &&
            whaleCollisionY < obstacleCollisionY + obstacle.collisionHeight &&
            whaleCollisionY + whale.collisionHeight > obstacleCollisionY) {
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
        // Trigger squeeze animation
        whale.targetSqueezeScale = 0.8;
        setTimeout(() => {
            whale.targetSqueezeScale = 1.0;
        }, 150);
    }
}

function restart() {
    gameRunning = true;
    score = 0;
    whale.y = 300;  // Code Smell #5: Magic number - S1192
    whale.vy = 0;
    whale.squeezeScale = 1.0;
    whale.targetSqueezeScale = 1.0;
    whale.rotation = 0;
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
    } else if (event.code === 'KeyD') {
        // Toggle debug mode to see collision boundaries
        debugMode = !debugMode;
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
