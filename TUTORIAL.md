# 🐋 Build Your First Game: Flappy Sonar Whale
## Complete Beginner's Tutorial (90 minutes)

Welcome! Today you'll learn how to create a fun browser game from scratch. Don't worry if you've never coded before - we'll explain everything step by step!

---

## 📋 What You'll Learn

- How websites and web games work
- The basics of HTML, CSS, and JavaScript
- How to make things move on screen
- How to handle user input (clicks and key presses)
- How to write clean, secure code with SonarQube
- How to publish your game online for everyone to play!

---

## 🛠️ Pre-Workshop Setup (10 minutes)

### What You Need:
1. **Visual Studio Code** (VS Code) - A free code editor
2. **Web Browser** - Chrome, Firefox, Safari, or Edge
3. **Basic text editing skills** - Copy, paste, save files

### VS Code Extensions Setup:

#### 1. Install HTML Preview Extension:
1. Open VS Code
2. Click Extensions icon (4 squares) on the left sidebar
3. Search for "HTML Preview"
4. Install the extension by Thomas Haakon Townsend
5. This lets you preview HTML files directly in VS Code

#### 2. Install SonarQube for IDE Extension:
1. In VS Code Extensions
2. Search for "SonarQube for IDE" 
3. Install the official SonarSource extension
4. This will help us write better, cleaner code later in the workshop

#### 3. Restart VS Code
Close and reopen VS Code to activate the extensions

### How to Use HTML Preview:
Once we create HTML files, you can:
1. **Right-click** on any `index.html` file
2. Select **"Preview"** from the context menu
3. This opens a **live preview** in a right-side panel
4. **Split screen**: Code on left, preview on right - perfect for development!

---

## 🎯 Step 1: Create the Basic Web Page (10 minutes)

Let's start with the foundation - a web page that can show our game.

### What We're Building:
A simple webpage with a blue rectangle (our game canvas) where everything will happen.

### Create the HTML File:

Create a new file called `index.html` and type this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Game</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #001122;
            font-family: Arial, sans-serif;
        }
        
        .game-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
        }
        
        h1 {
            color: white;
            margin-bottom: 20px;
        }
        
        canvas {
            border: 3px solid white;
            border-radius: 8px;
            background: lightblue;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🐋 My First Game 🐋</h1>
        <canvas id="gameCanvas" width="400" height="600"></canvas>
        <p style="color: white; margin-top: 10px;">Game area ready!</p>
    </div>
</body>
</html>
```

### 🧪 Test It:
**Option 1 - VS Code HTML Preview (Recommended):**
1. Save the file (`Ctrl+S` or `Cmd+S`)
2. **Right-click** on `index.html` in VS Code
3. Select **"Preview"** - this opens a live preview panel
4. Arrange windows: code on left, preview on right

**Option 2 - Browser:**
1. Save the file
2. Double-click `index.html` to open in your browser

You should see a blue rectangle with a title!

### 🤔 What Just Happened?

- **HTML** creates the structure of your webpage
- **CSS** (inside `<style>` tags) makes it look pretty
- **`<canvas>`** is like a digital drawing board where we'll draw our game
- The numbers `width="400" height="600"` set the size of our game area

---

## 🎯 Step 2: Add a Moving Square (15 minutes)

Now let's make something appear and move on our canvas!

### Create the JavaScript File:

Create a new file called `game.js` and add this code:

```javascript
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
```

### Update Your HTML:

Add this line just before `</body>` in your `index.html`:

```html
    <script src="game.js"></script>
</body>
```

### 🧪 Test It:
1. **Save both files** (`Ctrl+S` or `Cmd+S`)
2. **Refresh your HTML Preview** (click the refresh icon) or browser
3. You should see **a blue square moving from left to right**!

**💡 HTML Preview Tip**: The preview updates automatically when you save files - no need to manually refresh!

### 🤔 What Just Happened?

- **Variables** (like `player`) store information
- **Objects** (like `{x: 50, y: 300}`) group related information together
- **Functions** (like `draw()`) are reusable blocks of code
- **Game Loop** runs the game continuously, like frames in a movie
- **Canvas Context** (`ctx`) is our paintbrush for drawing

### 🐛 Common Issues:
- **Nothing appears?** Check that both files are saved and script tag is added
- **Square doesn't move?** Check console (F12) for error messages

---

## 🎯 Step 3: Add Gravity and Jumping (15 minutes)

Let's make our square fall down like real objects do, and let players make it jump!

### Update Your `game.js`:

Replace the entire content with this:

```javascript
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
```

### 🧪 Test It:
1. Save and refresh
2. Watch the square fall down
3. Press SPACEBAR or click the canvas to make it jump!

### 🤔 What Just Happened?

- **Physics**: We added gravity (pulls down) and velocity (speed of movement)
- **Event Listeners**: Code that waits for user input (keypresses, clicks)
- **Boundaries**: We prevent the player from going off-screen

### ⚡ Physics Made Simple:
- **Gravity** constantly increases downward velocity
- **Velocity** changes the position each frame
- **Jump** gives instant upward velocity, but gravity brings it back down

---

## 🎯 Step 4: Add Obstacles and Collision (20 minutes)

Now let's add obstacles to avoid and detect when the player hits them!

### Replace Your `game.js` with:

```javascript
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
}

// Function to restart the game
function restart() {
    gameRunning = true;
    score = 0;
    player.y = 300;
    player.velocityY = 0;
    obstacles = [];
    createObstacle();
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
        ctx.font = '18px Arial';
        ctx.fillText('Press R to restart', canvas.width/2 - 70, canvas.height/2 + 40);
    }
}

// Event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    } else if (event.code === 'KeyR' && !gameRunning) {
        restart();
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
```

### 🧪 Test It:
1. Save and refresh
2. Navigate through the green obstacles
3. Try to get a high score!
4. Notice the game ends when you hit an obstacle

### 🤔 What Just Happened?

- **Arrays** (`obstacles = []`) store lists of things
- **Loops** (`for` loop) do the same thing to many objects
- **Collision Detection** checks if two rectangles overlap
- **Game States** (`gameRunning`) control when the game should stop
- **Scoring** tracks how many obstacles you've passed

### 🎮 Game Design Notes:
- **Gap Size**: 150 pixels - big enough to fit through, small enough to be challenging
- **Obstacle Speed**: 3 pixels per frame - fast enough to be exciting
- **Random Placement**: `Math.random()` makes each game different

---

## 🎯 Step 5: Make It Look Amazing (15 minutes)

Let's transform our simple rectangles into a beautiful whale game with better graphics!

### Create Better Assets:

First, let's create a simple whale SVG. Create `whale.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40">
  <ellipse cx="30" cy="20" rx="25" ry="15" fill="#4E9BCD" stroke="#2E5F8F" stroke-width="2"/>
  <circle cx="35" cy="15" r="3" fill="white"/>
  <circle cx="36" cy="14" r="1.5" fill="black"/>
  <ellipse cx="50" cy="20" rx="8" ry="12" fill="#4E9BCD"/>
</svg>
```

Create `seaweed.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 200">
  <path d="M10 0 Q20 30 15 60 Q25 90 10 120 Q20 150 15 180 Q25 200 20 200 L30 200 Q20 170 25 150 Q15 120 30 90 Q20 60 25 30 Q15 0 10 0" fill="#228B22"/>
</svg>
```

### Update Your HTML for Ocean Theme:

Replace the `<style>` section in your `index.html`:

```html
<style>
    body {
        margin: 0;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(180deg, #001122 0%, #003366 30%, #004477 60%, #0066AA 100%);
        font-family: Arial, sans-serif;
    }
    
    .game-container {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 20px;
    }
    
    h1 {
        color: white;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    canvas {
        border: 3px solid white;
        border-radius: 8px;
        background: linear-gradient(to bottom, #87CEEB 0%, #4682B4 40%, #2F4F4F 70%, #1e3a5f 100%);
    }
    
    .controls {
        color: white;
        margin-top: 10px;
        font-size: 14px;
    }
</style>
```

### Update Your Game JavaScript:

Replace your `game.js` with this enhanced version:

```javascript
// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const whaleImg = new Image();
const seaweedImg = new Image();
let imagesLoaded = 0;

// Load SVG files
whaleImg.src = 'whale.svg';
seaweedImg.src = 'seaweed.svg';

whaleImg.onload = () => { imagesLoaded++; };
seaweedImg.onload = () => { imagesLoaded++; };

// Game state
let gameRunning = true;
let score = 0;

// Our whale player with animation
const whale = {
    x: 50,
    y: 300,
    width: 40,
    height: 30,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -10,
    // Animation properties
    scale: 1.0,
    targetScale: 1.0,
    rotation: 0
};

// Array to store obstacles
let obstacles = [];

// Function to create obstacles
function createObstacle() {
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

// Collision detection
function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Game over
function gameOver() {
    gameRunning = false;
}

// Restart function
function restart() {
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

// Jump function with animation
function jump() {
    if (gameRunning) {
        whale.velocityY = whale.jumpPower;
        // Squeeze animation
        whale.targetScale = 0.8;
        setTimeout(() => {
            whale.targetScale = 1.0;
        }, 150);
    }
}

// Update game
function update() {
    if (!gameRunning) return;
    
    // Update whale physics
    whale.velocityY += whale.gravity;
    whale.y += whale.velocityY;
    
    // Update whale animation
    whale.scale += (whale.targetScale - whale.scale) * 0.2;
    whale.rotation = Math.max(-30, Math.min(30, whale.velocityY * 3));
    
    // Check boundaries
    if (whale.y > canvas.height - whale.height || whale.y < 0) {
        gameOver();
        return;
    }
    
    // Update obstacles
    for (let i = 0; i < obstacles.length; i++) {
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
    
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
    
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        createObstacle();
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw whale with animation
    ctx.save();
    ctx.translate(whale.x + whale.width/2, whale.y + whale.height/2);
    ctx.rotate(whale.rotation * Math.PI / 180);
    ctx.scale(whale.scale, 1 / whale.scale);
    
    if (imagesLoaded >= 2) {
        ctx.drawImage(whaleImg, -whale.width/2, -whale.height/2, whale.width, whale.height);
    } else {
        // Fallback rectangle
        ctx.fillStyle = '#4E9BCD';
        ctx.fillRect(-whale.width/2, -whale.height/2, whale.width, whale.height);
    }
    
    ctx.restore();
    
    // Draw obstacles
    obstacles.forEach(obstacle => {
        if (imagesLoaded >= 2) {
            // Draw seaweed
            let sections = Math.ceil(obstacle.height / 200);
            for (let j = 0; j < sections; j++) {
                let sectionHeight = Math.min(200, obstacle.height - j * 200);
                ctx.drawImage(seaweedImg, 
                             obstacle.x, obstacle.y + j * 200, 
                             obstacle.width, sectionHeight);
            }
        } else {
            // Fallback rectangle
            ctx.fillStyle = '#228B22';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    });
    
    // Draw UI
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

// Event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    } else if (event.code === 'KeyR' && !gameRunning) {
        restart();
    }
});

canvas.addEventListener('click', jump);

// Game loop
function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 20);
createObstacle();
draw();
```

### Add Controls Info to HTML:

Add this before the closing `</div>` in your HTML:

```html
        <div class="controls">Press SPACE or click to flap! Press R to restart when game over.</div>
```

### 🧪 Test It:
1. Save all files
2. Refresh your browser
3. Enjoy your beautiful whale game with ocean theme!

### 🤔 What Just Happened?

- **SVG Images**: Vector graphics that look crisp at any size
- **Canvas Transformations**: Rotation, scaling, translation for animation
- **Gradients**: CSS creates beautiful color transitions
- **Image Loading**: We wait for images to load before using them
- **Fallback Graphics**: Show rectangles if images don't load

---

## 🎯 Step 6: Clean Code with SonarQube (20 minutes)

Now let's learn about code quality! Even though our game works, there might be hidden problems that could cause bugs or security issues.

### What is SonarQube?
SonarQube is like a spell-checker for code. It finds:
- **Bugs**: Code that might not work correctly
- **Vulnerabilities**: Security problems
- **Code Smells**: Code that works but is hard to read or maintain

### Let's Add Some Problems On Purpose:

Replace your `game.js` with this version that has intentional issues:

```javascript
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
        ctx.fillText('Press R to restart', canvas.width/2, canvas.height/2 + 50);
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
```

### 🧪 Test It:
The game should still work, but let's see what SonarLint finds!

### Using SonarQube for IDE to Find Issues:

Remember the **SonarQube for IDE extension** we installed at the beginning? Now it's time to see it in action!

1. **Open VS Code** with your project
2. **Open your `game.js` file** in the editor
3. **Look for Visual Indicators**:
   - **Red squiggly underlines**: Serious problems (bugs, security issues)
   - **Yellow squiggly underlines**: Code smells (could be better)
   - **Numbers in circles**: Issue count in the scrollbar

4. **Open the Problems Panel**:
   - Go to **View → Problems** (or press `Ctrl+Shift+M` / `Cmd+Shift+M`)
   - You should see a list of all detected issues
   - Each issue shows: file, line number, and description

5. **Understand the Issues**:
   - **Hover over squiggly lines**: See detailed explanations
   - **Click on problems**: Jump directly to the issue in your code
   - **Rule codes** (like S2095, S4334): These are SonarQube's standardized issue identifiers

6. **Real-time Analysis**:
   - SonarQube for IDE analyzes your code **as you type**
   - No need to run separate tools or wait for builds
   - Issues appear and disappear instantly as you fix them

### Common Issues SonarLint Will Find:

1. **S2095 - Unclosed Resource**: The `setInterval` creates a timer that's never cleaned up
2. **S4334 - var Keyword**: Should use `let` or `const` instead of `var`
3. **S109 - Magic Numbers**: Hard-coded numbers should be named constants
4. **S1192 - Duplicated Literals**: Same values repeated multiple times
5. **S106 - Missing Logging**: No debugging information

### Let's Fix These Issues:

Create a new file called `game-fixed.js`:

```javascript
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

whaleImg.src = 'whale.svg';
seaweedImg.src = 'seaweed.svg';

whaleImg.onload = () => { imagesLoaded++; };
seaweedImg.onload = () => { imagesLoaded++; };

// Game state
let gameRunning = true;
let score = 0;
let gameLoop = null; // FIXED: Store interval reference

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
    console.log('Game Over! Final score:', score); // FIXED: Add debugging
    gameRunning = false;
    stopGameLoop(); // FIXED: Clean up resources
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
    
    // FIXED: Use const instead of var
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
    }
});

canvas.addEventListener('click', jump);

// Start the game
startGameLoop();
createObstacle();
```

### Update Your HTML:

Change the script line in your `index.html`:

```html
    <script src="game-fixed.js"></script>
```

### 🧪 Test the Fixed Version:
1. **Save** your files (`Ctrl+S` or `Cmd+S`)
2. **Refresh** your HTML Preview or browser
3. **Check the Problems panel** - should show **0 issues**! 🎉
4. **Test the game** - it should work exactly the same but with better code
5. **Open Developer Console** (F12 in browser) and play - you'll see debug messages when you crash

### 🤔 What We Fixed:

1. **Memory Leaks**: Now we properly clean up timers
2. **Magic Numbers**: Hard-coded values are now named constants
3. **Variable Declarations**: Used `const`/`let` instead of `var`
4. **Debugging**: Added console logging for troubleshooting
5. **Code Duplication**: Constants prevent repeating values

### 💡 Why This Matters:

- **Maintainability**: Easy to change game speed, size, etc.
- **Debugging**: Console logs help find problems
- **Performance**: No memory leaks
- **Security**: Modern JavaScript practices
- **Teamwork**: Other developers can understand your code

---

## 🎯 Step 7: Publish Your Game Online (10 minutes)

Let's make your game available to the world using GitHub Pages!

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub Account**: Go to github.com and sign up

2. **Create a New Repository**:
   - Click "New repository"
   - Name it: `flappy-whale-game`
   - Check "Add a README file"
   - Make it Public
   - Click "Create repository"

3. **Upload Your Files**:
   - Click "uploading an existing file"
   - Drag and drop all your files:
     - `index.html`
     - `game-fixed.js`
     - `whale.svg`
     - `seaweed.svg`
   - Scroll down, add commit message: "Initial game upload"
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Click "Save"

5. **Your Game URL**:
   - Wait 2-3 minutes
   - Your game will be at: `https://yourusername.github.io/flappy-whale-game`

### Option 2: Netlify (Alternative)

1. **Go to netlify.com** and sign up
2. **Drag your project folder** to Netlify's deploy area
3. **Get instant URL** - your game is live immediately!

### 🧪 Test Your Published Game:
1. Visit your game URL
2. Share it with friends and family!
3. Play it on your phone

### 🎉 Congratulations!
You've created and published your first web game!

---

## 🎯 Step 8: Customize Your Game (Bonus - 15 minutes)

Now make it uniquely yours!

### Easy Customizations:

#### Change Colors:
In your CSS, modify these values:
```
/* Ocean background */
background: linear-gradient(180deg, #your-color1, #your-color2);

/* Canvas background */
background: linear-gradient(to bottom, #your-color3, #your-color4);
```

#### Change Game Title:
In your HTML:
```html
<h1>🎮 Your Game Name Here 🎮</h1>
```

#### Adjust Difficulty:
In your JavaScript constants:
```javascript
const JUMP_POWER = -12;      // Higher = easier jumping
const OBSTACLE_SPEED = 2;    // Lower = easier dodging
const GAP_SIZE = 200;        // Bigger = easier to pass through
```

#### Add Sound Effects:
Add this to your HTML head:
```html
<audio id="jumpSound" preload="auto">
    <source src="jump.wav" type="audio/wav">
</audio>
<audio id="scoreSound" preload="auto">
    <source src="score.wav" type="audio/wav">
</audio>
```

Then in your JavaScript jump function:
```javascript
function jump() {
    if (gameRunning) {
        document.getElementById('jumpSound').play();
        // ... rest of jump code
    }
}
```

### Advanced Customizations:

#### Create Your Own Character:
1. Draw a simple SVG in any vector editor
2. Replace `whale.svg` with your drawing
3. Adjust size in the whale object

#### Different Obstacles:
1. Create new SVG obstacles
2. Replace seaweed.svg
3. Maybe add variety with multiple obstacle types

#### Power-ups:
Add collectible items that give special abilities!

---

## 📚 What You've Learned

### Programming Concepts:
- **Variables**: Store information (`let score = 0`)
- **Objects**: Group related data (`const whale = {x: 50, y: 300}`)
- **Functions**: Reusable code blocks (`function jump()`)
- **Arrays**: Lists of things (`let obstacles = []`)
- **Loops**: Do something many times (`for` loop)
- **Conditions**: Make decisions (`if` statements)
- **Events**: React to user input (clicks, keypresses)

### Game Development:
- **Game Loop**: Continuous update and draw cycle
- **Physics**: Gravity, velocity, collision detection
- **Animation**: Scaling, rotation, smooth transitions
- **Assets**: Images, sounds, graphics
- **User Interface**: Score display, game over screen

### Web Development:
- **HTML**: Structure of web pages
- **CSS**: Styling and layout
- **JavaScript**: Interactive behavior
- **Canvas**: Drawing graphics
- **SVG**: Vector graphics
- **Responsive Design**: Works on different devices

### Software Quality:
- **Code Smells**: Bad practices that should be fixed
- **Constants**: Named values instead of magic numbers
- **Resource Management**: Cleaning up timers and memory
- **Debugging**: Console logging for troubleshooting
- **Static Analysis**: Tools like SonarLint that check code quality

### DevOps & Deployment:
- **Version Control**: Git and GitHub
- **Static Site Hosting**: GitHub Pages, Netlify
- **Public URLs**: Making your project accessible worldwide

---

## 🚀 Next Steps

### Immediate Improvements:
1. **Add High Score**: Store best score in browser
2. **Multiple Lives**: Give players second chances
3. **Particle Effects**: Add splash effects on jump
4. **Mobile Controls**: Better touch support

### Intermediate Features:
1. **Multiple Levels**: Different backgrounds, speeds
2. **Character Selection**: Choose different whales
3. **Achievements**: Unlock rewards for milestones
4. **Leaderboards**: Compare scores with friends

### Advanced Projects:
1. **Multiplayer**: Two players racing
2. **Physics Engine**: More realistic movement
3. **Level Editor**: Let players create custom levels
4. **Mobile App**: Convert to React Native or Cordova

### Learning Path:
1. **More JavaScript**: ES6+, async/await, modules
2. **Frameworks**: React, Vue, or Angular
3. **Backend**: Node.js for multiplayer features
4. **Databases**: Store user data and scores
5. **Game Engines**: Phaser.js, Unity, Godot

---

## 🛠️ Troubleshooting Guide

### Game Won't Load:
- Check browser console (F12) for errors
- Verify all file names match exactly
- Make sure files are in same folder

### Images Don't Show:
- Check SVG file syntax
- Verify file paths are correct
- Wait for images to load (they start as rectangles)

### SonarLint Not Working:
- Restart VS Code
- Check extension is installed and enabled
- Try opening/closing the file

### Can't Deploy:
- Make sure repository is public
- Check all files are uploaded
- Wait 5-10 minutes for GitHub Pages to build

### Game Too Easy/Hard:
- Adjust constants at top of JavaScript file
- Test different values until it feels right

---

## 🎓 Certificate of Completion

**Congratulations!** 🎉

You have successfully completed the **Flappy Sonar Whale Game Development Workshop**!

**Skills Acquired:**
- ✅ HTML/CSS/JavaScript fundamentals
- ✅ Canvas-based game development  
- ✅ Physics simulation (gravity, collision)
- ✅ Event handling and user input
- ✅ Image loading and SVG graphics
- ✅ Code quality with SonarQube/SonarLint
- ✅ Web deployment and publishing
- ✅ Debugging and troubleshooting

**You built:** A complete, playable web game published online!

**Next mission:** Build something even more amazing! 🚀

---

*Workshop created with ❤️ for future (game) developers.*  
*Keep coding, keep creating, keep learning!*
