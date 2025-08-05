// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameRunning = true;
let score = 0;

// Our player
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: 'blue',
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -10
};

// Array to store obstacles
let obstacles = [];

// Function to create a new obstacle
function createObstacle() {
    const gapSize = 150;
    const obstacleWidth = 50;
    const gapY = Math.random() * (canvas.height - gapSize - 100) + 50;
    
    // Top obstacle
    obstacles.push({
        x: canvas.width,
        y: 0,
        width: obstacleWidth,
        height: gapY,
        color: 'green',
        passed: false
    });
    
    // Bottom obstacle
    obstacles.push({
        x: canvas.width,
        y: gapY + gapSize,
        width: obstacleWidth,
        height: canvas.height - (gapY + gapSize),
        color: 'green',
        passed: false
    });
}

// Function to check if two rectangles are touching
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Function to end the game
function gameOver() {
    gameRunning = false;
    alert('Game Over! Your score: ' + score + '. Refresh to play again.');
}

// Function to make player jump
function jump() {
    if (gameRunning) {
        player.velocityY = player.jumpPower;
    }
}

// Function to update the game
function update() {
    if (!gameRunning) return;
    
    // Apply gravity to player
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    // Check boundaries
    if (player.y > canvas.height - player.height || player.y < 0) {
        gameOver();
        return;
    }
    
    // Move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 3; // Move left
        
        // Check for collision
        if (isColliding(player, obstacles[i])) {
            gameOver();
            return;
        }
        
        // Check if player passed obstacle (for scoring)
        if (!obstacles[i].passed && obstacles[i].x + obstacles[i].width < player.x) {
            obstacles[i].passed = true;
            score++;
        }
    }
    
    // Remove obstacles that are off-screen
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    // Add new obstacles
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        createObstacle();
    }
}

// Function to draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw obstacles
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
    
    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    // Draw game over message
    if (!gameRunning) {
        ctx.fillStyle = 'red';
        ctx.font = '36px Arial';
        ctx.fillText('GAME OVER', canvas.width/2 - 100, canvas.height/2);
    }
}

// Event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
});

canvas.addEventListener('click', jump);

// Game loop
function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 20);

// Create first obstacle
createObstacle();
draw();