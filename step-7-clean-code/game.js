// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// FIXED: Define constants instead of magic numbers
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const JUMP_POWER = -10;
const OBSTACLE_SPEED = 3;
const GAP_SIZE = 150;
const OBSTACLE_WIDTH = 50;

// Load images
const whaleImg = new Image();
const seaweedImg = new Image();
let imagesLoaded = 0;

whaleImg.src = '../assets/sonar-whale-light-bg.svg';
seaweedImg.src = '../assets/seaweed.svg';

whaleImg.onload = () => { imagesLoaded++; };
seaweedImg.onload = () => { imagesLoaded++; };

// Game state
let gameRunning = true;
let score = 0;
let gameLoop = null; // FIXED: Store interval reference
let debugMode = false; // Debug mode for collision visualization

// Our whale player
const whale = {
    x: 50,
    y: 300,
    width: 40,
    height: 30,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: JUMP_POWER, // FIXED: Use constant
    scale: 1.0,
    targetScale: 1.0,
    rotation: 0
};

let obstacles = [];

// FIXED: Function to start game loop that can be stopped
function startGameLoop() {
    gameLoop = setInterval(function() {
        if (gameRunning) {
            update();
            draw();
        }
    }, 20);
}

// FIXED: Function to stop game loop
function stopGameLoop() {
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
}

function createObstacle() {
    const gapY = Math.random() * (CANVAS_HEIGHT - GAP_SIZE - 100) + 50; // FIXED: Use constant
    
    obstacles.push({
        x: CANVAS_WIDTH,  // FIXED: Use constant
        y: 0,
        width: OBSTACLE_WIDTH,
        height: gapY,
        passed: false
    });
    
    obstacles.push({
        x: CANVAS_WIDTH,  // FIXED: Use constant
        y: gapY + GAP_SIZE,
        width: OBSTACLE_WIDTH,
        height: CANVAS_HEIGHT - (gapY + GAP_SIZE), // FIXED: Use constant
        passed: false
    });
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameOver() {
    console.log('Game Over! Final score:', score, 'Whale position:', whale.x, whale.y); // FIXED: Add debugging
    gameRunning = false;
    stopGameLoop(); // FIXED: Clean up resources
}

function restart() {
    console.log('Restarting game'); // FIXED: Add debugging
    gameRunning = true;
    score = 0;
    whale.y = 300; // Could be improved with a constant
    whale.velocityY = 0;
    whale.squeezeScale = 1.0;
    whale.targetSqueezeScale = 1.0;
    whale.rotation = 0;
    obstacles = [];
    createObstacle();
    startGameLoop();
}

function jump() {
    if (gameRunning) {
        whale.velocityY = JUMP_POWER; // FIXED: Use constant
        whale.targetScale = 0.8;
        setTimeout(() => {
            whale.targetScale = 1.0;
        }, 150);
    }
}

function update() {
    if (!gameRunning) return;
    
    whale.velocityY += whale.gravity;
    whale.y += whale.velocityY;
    
    whale.scale += (whale.targetScale - whale.scale) * 0.2;
    whale.rotation = Math.max(-30, Math.min(30, whale.velocityY * 3));
    
    // FIXED: Use modern for-of loop instead of traditional for loop with var
    for (const obstacle of obstacles) {
        obstacle.x -= OBSTACLE_SPEED; // FIXED: Use constant
        
        if (isColliding(whale, obstacle)) {
            gameOver();
            return;
        }
        
        if (!obstacle.passed && obstacle.x + obstacle.width < whale.x) {
            obstacle.passed = true;
            score++;
        }
    }
    
    if (whale.y > CANVAS_HEIGHT - whale.height || whale.y < 0) { // FIXED: Use constant
        gameOver();
        return;
    }
    
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 200) {
        createObstacle();
    }
}

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // FIXED: Use constants
    
    ctx.save();
    ctx.translate(whale.x + whale.width/2, whale.y + whale.height/2);
    ctx.rotate(whale.rotation * Math.PI / 180);
    ctx.scale(whale.scale, 1 / whale.scale);
    
    if (imagesLoaded >= 2) {
        ctx.drawImage(whaleImg, -whale.width/2, -whale.height/2, whale.width, whale.height);
    } else {
        ctx.fillStyle = '#4E9BCD';
        ctx.fillRect(-whale.width/2, -whale.height/2, whale.width, whale.height);
    }
    
    ctx.restore();
    
    obstacles.forEach(obstacle => {
        if (imagesLoaded >= 2) {
            const sections = Math.ceil(obstacle.height / 200); // FIXED: Use const
            for (let j = 0; j < sections; j++) { // FIXED: Use let
                const sectionHeight = Math.min(200, obstacle.height - j * 200); // FIXED: Use const
                ctx.drawImage(seaweedImg, 
                             obstacle.x, obstacle.y + j * 200, 
                             obstacle.width, sectionHeight);
            }
        } else {
            ctx.fillStyle = '#228B22';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
        
        // Debug: Draw collision boundaries
        if (debugMode) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
    
    // Debug: Draw whale collision boundary
    if (debugMode) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(whale.x, whale.y, whale.width, whale.height);
    }
    
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    if (debugMode) {
        ctx.fillStyle = 'yellow';
        ctx.font = '12px Arial';
        ctx.fillText('DEBUG MODE - Blue: whale, Red: obstacles', 10, CANVAS_HEIGHT - 10);
    }
    
    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
        ctx.font = '18px Arial';
        ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 20);
        ctx.fillText('Press R or tap to restart', canvas.width/2, canvas.height/2 + 50);
        ctx.textAlign = 'left';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    } else if (event.code === 'KeyR' && !gameRunning) {
        restart();
    } else if (event.code === 'KeyD') {
        // Toggle debug mode to see collision boundaries
        debugMode = !debugMode;
        console.log('Debug mode:', debugMode ? 'ON' : 'OFF');
    }
});

// Desktop: Click to jump
canvas.addEventListener('click', function(event) {
    if (gameRunning) {
        jump();
    } else {
        restart(); // Click to restart on desktop too
    }
});

// Mobile: Touch to jump/restart
canvas.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevent zoom and scroll
    if (gameRunning) {
        jump();
    } else {
        restart();
    }
});

// Start the game
startGameLoop();
createObstacle();