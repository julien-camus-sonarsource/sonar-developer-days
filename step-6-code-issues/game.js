// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const whaleImg = new Image();
const seaweedImg = new Image();
let imagesLoaded = 0;

whaleImg.src = 'whale.svg';
seaweedImg.src = 'seaweed.svg';

whaleImg.onload = () => { imagesLoaded++; };
seaweedImg.onload = () => { imagesLoaded++; };

// Game state
let gameRunning = true;
let score = 0;

// Our whale player
const whale = {
    x: 50,
    y: 300,
    width: 40,
    height: 30,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -10,
    scale: 1.0,
    targetScale: 1.0,
    rotation: 0
};

let obstacles = [];

// BUG 1: This interval is never cleared (memory leak)
setInterval(function() {
    if (gameRunning) {
        update();
        draw();
    }
}, 20);

function createObstacle() {
    const gapSize = 150;
    const obstacleWidth = 50;
    const gapY = Math.random() * (400 - gapSize) + 50; // BUG 2: Magic number 400
    
    obstacles.push({
        x: 400, // BUG 3: Magic number 400
        y: 0,
        width: obstacleWidth,
        height: gapY,
        passed: false
    });
    
    obstacles.push({
        x: 400, // BUG 4: Duplicated magic number
        y: gapY + gapSize,
        width: obstacleWidth,
        height: 600 - (gapY + gapSize), // BUG 5: Magic number 600
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
    gameRunning = false;
    // BUG 6: No debugging information when game ends
}

function jump() {
    if (gameRunning) {
        whale.velocityY = -10; // BUG 7: Magic number -10
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
    
    // BUG 8: var instead of let/const
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 3;
        
        if (isColliding(whale, obstacles[i])) {
            gameOver();
            return;
        }
        
        if (!obstacles[i].passed && obstacles[i].x + obstacles[i].width < whale.x) {
            obstacles[i].passed = true;
            score++;
        }
    }
    
    if (whale.y > 600 || whale.y < 0) { // BUG 9: Magic number 600
        gameOver();
        return;
    }
    
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 200) {
        createObstacle();
    }
}

function draw() {
    ctx.clearRect(0, 0, 400, 600); // BUG 10: Magic numbers 400, 600
    
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
            var sections = Math.ceil(obstacle.height / 200); // BUG 11: var instead of let
            for (var j = 0; j < sections; j++) { // BUG 12: var instead of let
                var sectionHeight = Math.min(200, obstacle.height - j * 200); // BUG 13: var instead of let
                ctx.drawImage(seaweedImg, 
                             obstacle.x, obstacle.y + j * 200, 
                             obstacle.width, sectionHeight);
            }
        } else {
            ctx.fillStyle = '#228B22';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
    
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);
        ctx.font = '18px Arial';
        ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 20);
        ctx.fillText('Refresh to play again', canvas.width/2, canvas.height/2 + 50);
        ctx.textAlign = 'left';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
});

canvas.addEventListener('click', jump);

createObstacle();