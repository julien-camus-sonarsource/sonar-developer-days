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

// Start the game loop
setInterval(function() {
    if (gameRunning) {
        update();
        draw();
    }
}, 20);

// S107: Function with too many parameters (11 parameters, max should be 7)
function createObstacleWithSettings(x, y, width, height, color, speed, gap, difficulty, theme, sound, animation) {
    const gapSize = 150;
    const obstacleWidth = 50;
    const gapY = Math.random() * (canvas.height - gapSize - 100) + 50;
    
    obstacles.push({
        x: canvas.width,
        y: 0,
        width: obstacleWidth,
        height: gapY,
        passed: false
    });
    
    obstacles.push({
        x: canvas.width,
        y: gapY + gapSize,
        width: obstacleWidth,
        height: canvas.height - (gapY + gapSize),
        passed: false
    });
}

// Simplified version for our game
function createObstacle() {
    createObstacleWithSettings(400, 0, 50, 200, 'green', 3, 150, 'easy', 'ocean', true, false);
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameOver() {
    gameRunning = false;
}

function jump() {
    if (gameRunning) {
        whale.velocityY = whale.jumpPower;
        whale.targetScale = 0.8;
        setTimeout(() => {
            whale.targetScale = 1.0;
        }, 150);
    }
}

// S3776: Function with high cognitive complexity (too many nested if statements)
function update() {
    if (!gameRunning) return;
    
    whale.velocityY += whale.gravity;
    whale.y += whale.velocityY;
    
    whale.scale += (whale.targetScale - whale.scale) * 0.2;
    whale.rotation = Math.max(-30, Math.min(30, whale.velocityY * 3));
    
    // S1854: Unused assignment, S1481: Unused variable, S4138: should use for-of
    const unusedVariable = 42; // This variable is never used
    for (var i = 0; i < obstacles.length; i++) { // S4138: Traditional for loop
        obstacles[i].x -= 3;
        
        if (isColliding(whale, obstacles[i])) {
            if (score > 10) {
                if (whale.velocityY > 5) {
                    if (obstacles[i].height > 100) {
                        if (Math.random() > 0.5) {
                            if (whale.scale > 0.8) {
                                gameOver();
                                return;
                            } else {
                                whale.velocityY = -5;
                            }
                        } else {
                            gameOver();
                            return;
                        }
                    } else {
                        gameOver();
                        return;
                    }
                } else {
                    gameOver();
                    return;
                }
            } else {
                gameOver();
                return;
            }
        }
        
        if (!obstacles[i].passed && obstacles[i].x + obstacles[i].width < whale.x) {
            obstacles[i].passed = true;
            score++;
        }
    }
    
    if (whale.y > canvas.height - whale.height || whale.y < 0) {
        gameOver();
        return;
    }
    
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        createObstacle();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
            // S3504: Variable declarations should be at the beginning of their enclosing scope
            var sections = Math.ceil(obstacle.height / 200);
            for (var j = 0; j < sections; j++) {
                var sectionHeight = Math.min(200, obstacle.height - j * 200);
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
        ctx.fillText('Press R to restart', canvas.width/2, canvas.height/2 + 50);
        ctx.textAlign = 'left';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    } else if (event.code === 'KeyR' && !gameRunning) {
        // Restart game
        gameRunning = true;
        score = 0;
        whale.y = 300;
        whale.velocityY = 0;
        whale.scale = 1.0;
        whale.targetScale = 1.0;
        whale.rotation = 0;
        obstacles = [];
        createObstacle();
    }
});

canvas.addEventListener('click', jump);

createObstacle();
