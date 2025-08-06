// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Our player - a simple square
const player = {
    x: 50,        // Position from left edge
    y: 300,       // Position from top edge  
    width: 30,    // How wide
    height: 30,   // How tall
    color: 'blue' // What color
};

// Function to draw everything
function draw() {
    // Clear the canvas (like erasing a whiteboard)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw our player square
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to update the game
function update() {
    // Move the player to the right
    player.x = player.x + 2;
    
    // If player goes off screen, bring it back to the left
    if (player.x > canvas.width) {
        player.x = -player.width;
    }
}

// Game loop - runs many times per second
function gameLoop() {
    update(); // Calculate new positions
    draw();   // Draw everything
}

// Start the game loop (run gameLoop every 20 milliseconds)
setInterval(gameLoop, 20);

// Draw once to start
draw();