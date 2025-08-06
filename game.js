// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Our player with physics
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: 'blue',
    velocityY: 0,    // How fast moving up/down
    gravity: 0.5,    // How strong gravity pulls down
    jumpPower: -10   // How strong jumps are (negative = up)
};

// Function to make player jump
function jump() {
    player.velocityY = player.jumpPower;
}

// Function to update the game
function update() {
    // Apply gravity
    player.velocityY = player.velocityY + player.gravity;
    
    // Move player based on velocity
    player.y = player.y + player.velocityY;
    
    // Don't let player fall through the floor
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0; // Stop falling
    }
    
    // Don't let player go above the ceiling
    if (player.y < 0) {
        player.y = 0;
        player.velocityY = 0;
    }
}

// Function to draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Listen for spacebar presses
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        jump();
    }
});

// Listen for mouse clicks
canvas.addEventListener('click', function() {
    jump();
});

// Game loop
function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 20);
draw();