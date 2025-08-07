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
3. **Git** - For version control and checkpoints
4. **Basic text editing skills** - Copy, paste, save files

### Git Setup & Your Workspace:

#### 1. Create Your Personal Branch:
```bash
# Clone the workshop repository (instructor will provide URL)
git clone [workshop-repo-url]
cd sonar-developer-days

# Create your personal workspace - use your name!
git checkout -b my-implementation-[yourname]
# Example: git checkout -b my-implementation-john
```

#### 2. Checkpoint System:
If you get stuck or want to see a working solution:

```bash
# See the solution for step 3:
git checkout step-3
# Look at the files, then go back to your work:
git checkout my-implementation-[yourname]

# Start fresh from a checkpoint:
git checkout step-5
git checkout -b my-work-from-step5
```

**Available checkpoints:** `step-1`, `step-2`, `step-3`, `step-4`, `step-5`, `step-6`, `step-7`, `final`

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

### 🆘 Need Help?
At any point during the workshop:

**Stuck and want to see the solution?**
```bash
git checkout step-3  # See step 3 solution
git checkout my-implementation-[yourname]  # Back to your work
```

**Want to start fresh from a working checkpoint?**
```bash
git checkout step-2  # Start from step 2 solution
git checkout -b my-retry-from-step2  # New branch for fresh start
```

**See all available branches:**
```bash
git branch -a  # Shows: step-1, step-2, step-3... final
```

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
    for (const obstacle of obstacles) {
        obstacle.x -= 3; // Move left
        
        // Check for collision
        if (isColliding(player, obstacle)) {
            gameOver();
            return;
        }
        
        // Check if player passed obstacle (for scoring)
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
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
        ctx.fillText('Press R or tap to restart', canvas.width/2 - 70, canvas.height/2 + 40);
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

// Desktop: Click to jump/restart
canvas.addEventListener('click', function(event) {
    if (gameRunning) {
        jump();
    } else {
        restart(); // Click to restart too
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
- **Modern Loops** (`for...of` loop) iterate through collections cleanly
- **Array Methods** (`forEach`) apply functions to each array element
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

### Use the Provided Assets:

We'll use the beautiful SonarQube-themed SVG graphics that are already provided in the `assets/` folder of the project:
- `assets/sonar-whale-light-bg.svg` - A professional Sonar-themed whale with the classic SonarQube colors
- `assets/seaweed.svg` - Realistic seaweed obstacles for our ocean environment

These assets are already optimized and branded - no need to create new files!

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
whaleImg.src = './assets/sonar-whale-light-bg.svg';
seaweedImg.src = './assets/seaweed.svg';

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
        ctx.fillText('Press R or tap to restart', canvas.width/2, canvas.height/2 + 50);
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

// Desktop: Click to jump/restart
canvas.addEventListener('click', function(event) {
    if (gameRunning) {
        jump();
    } else {
        restart(); // Click to restart too
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
        <div class="controls">Press SPACE, click, or tap to flap! Tap to restart when game over.</div>
```

### 🧪 Test It:
1. Save all files
2. Refresh your browser
3. Enjoy your beautiful whale game with ocean theme!
4. **Mobile Test**: Open it on your phone - tap the screen to play!

### 🤔 What Just Happened?

- **SVG Images**: Vector graphics that look crisp at any size
- **Canvas Transformations**: Rotation, scaling, translation for animation
- **Gradients**: CSS creates beautiful color transitions
- **Image Loading**: We wait for images to load before using them
- **Fallback Graphics**: Show rectangles if images don't load
- **Mobile Support**: Touch events work seamlessly on phones and tablets
- **Forgiving Hitboxes**: Collision detection accounts for transparent areas in SVG graphics

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

whaleImg.src = './assets/sonar-whale-light-bg.svg';
seaweedImg.src = './assets/seaweed.svg';

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
        ctx.fillText('Press R or tap to restart', canvas.width/2, canvas.height/2 + 50);
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

// Desktop: Click to jump/restart
canvas.addEventListener('click', function(event) {
    if (gameRunning) {
        jump();
    } else {
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

// Mobile: Touch to jump/restart
canvas.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevent zoom and scroll
    if (gameRunning) {
        jump();
    } else {
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

7. **Visual Indicators to Look For**:
   - **Red squiggly underlines** 🔴: Security hotspots and critical bugs
   - **Yellow/orange underlines** 🟡: Code smells and maintainability issues
   - **Lightbulb icons** 💡: Quick fixes available
   - **Problem count in status bar**: Shows total issues in current file
   - **Scrollbar annotations**: Colored marks showing issue locations

### Issues SonarQube for IDE Will Detect:

Looking at our problematic code, SonarQube for IDE detects exactly these issues:

#### 🐛 **Code Smells & Maintainability Issues:**

1. **S3776 - Cognitive Complexity**: Function has too many nested if statements (line 94)
2. **S107 - Too Many Parameters**: Function has 11 parameters, max should be 7 (line 45) 
3. **S1172 - Unused Parameters**: 11 function parameters that are never used (line 45)
4. **S1854 - Unused Assignments**: Variables assigned but never read (line 104)
5. **S1481 - Unused Local Variables**: Variables declared but never used (line 104)
6. **S2870 - Variable Declarations**: Should use `let`/`const` instead of `var` (lines 105, 175-177)
7. **S4138 - For-of Loop Preferred**: Traditional for-loop should use for-of (line 105)

#### 📊 **What You'll See in VS Code:**
- **Yellow squiggly underlines**: All these are code smell issues
- **Problems panel**: Shows 15+ issues detected (11 unused parameters + multiple var declarations)
- **Rule codes**: Each issue shows the specific SonarQube rule ID (S3776, S107, etc.)
- **Hover tooltips**: Detailed explanations of why each issue matters and how to fix them

### Let's Fix These Issues:

Create a new file called `game-fixed.js`:

```javascript
// Get the canvas and drawing tools
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const whaleImg = new Image();
const seaweedImg = new Image();
let imagesLoaded = 0;

whaleImg.src = './assets/sonar-whale-light-bg.svg';
seaweedImg.src = './assets/seaweed.svg';

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

// FIXED: S107 - Simplified function with configuration object
function createObstacle(config = {}) {
    const settings = {
        gapSize: 150,
        obstacleWidth: 50,
        ...config
    };
    
    const gapY = Math.random() * (canvas.height - settings.gapSize - 100) + 50;
    
    obstacles.push({
        x: canvas.width,
        y: 0,
        width: settings.obstacleWidth,
        height: gapY,
        passed: false
    });
    
    obstacles.push({
        x: canvas.width,
        y: gapY + settings.gapSize,
        width: settings.obstacleWidth,
        height: canvas.height - (gapY + settings.gapSize),
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

// FIXED: S3776 - Simplified cognitive complexity with early returns
function update() {
    if (!gameRunning) return;
    
    whale.velocityY += whale.gravity;
    whale.y += whale.velocityY;
    
    whale.scale += (whale.targetScale - whale.scale) * 0.2;
    whale.rotation = Math.max(-30, Math.min(30, whale.velocityY * 3));
    
    // FIXED: S4138, S2870 - Use for-of loop and proper variable declarations
    for (const obstacle of obstacles) {
        obstacle.x -= 3;
        
        // FIXED: S3776 - Simplified collision logic
        if (isColliding(whale, obstacle)) {
            gameOver();
            return;
        }
        
        if (!obstacle.passed && obstacle.x + obstacle.width < whale.x) {
            obstacle.passed = true;
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
            // FIXED: S2870 - Use const/let instead of var
            const sections = Math.ceil(obstacle.height / 200);
            for (let j = 0; j < sections; j++) {
                const sectionHeight = Math.min(200, obstacle.height - j * 200);
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
        ctx.fillText('Press R or tap to restart', canvas.width/2, canvas.height/2 + 50);
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

// Desktop: Click to jump/restart
canvas.addEventListener('click', function(event) {
    if (gameRunning) {
        jump();
    } else {
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

// Mobile: Touch to jump/restart
canvas.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Prevent zoom and scroll
    if (gameRunning) {
        jump();
    } else {
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
5. **Mobile Test** - Try it on your phone! The touch controls work perfectly
6. **Open Developer Console** (F12 in browser) and play - you'll see debug messages when you crash

### 🤔 What We Fixed:

#### 🐛 **Code Quality & Maintainability Issues:**

1. **S3776 - Cognitive Complexity**: Simplified nested if statements by removing complex collision logic
2. **S107 - Too Many Parameters**: Refactored function to use configuration object with defaults
3. **S1172 - Unused Parameters**: Removed the overly complex function with unused parameters
4. **S1854/S1481 - Unused Variables**: Removed unused variable declarations  
5. **S2870 - Variable Declarations**: Replaced `var` with `let`/`const` for proper scoping
6. **S4138 - Loop Optimization**: Used `for...of` loops instead of traditional index-based for-loops
7. **General Code Quality**: Improved readability, maintainability, and followed modern JavaScript practices

### 💡 Why This Matters:

- **Maintainability**: Simplified complex logic makes code easier to modify and extend
- **Readability**: Proper variable scoping and cleaner loops improve code clarity
- **Performance**: Optimized loops and no unused variables reduce memory usage
- **Reliability**: Reduced cognitive complexity means fewer bugs and easier debugging
- **Code Quality**: Following JavaScript best practices and modern standards
- **Teamwork**: Clean, well-structured code that other developers can understand
- **Professional Development**: These are the same issues you'll encounter in real projects
- **User Experience**: Forgiving collision detection and mobile support make the game more enjoyable

---

## 🎯 Step 7: Publish Your Game Online (5 minutes)

Let's make your game available to the world instantly!

### Option 1: Netlify Drop (Recommended!)

1. **Go to Netlify Drop**: Visit [drop.netlify.com](https://drop.netlify.com)

2. **Create Free Account (Recommended)**:
   - Click "Sign up" for a free Netlify account
   - This allows multiple deployments and easier updates
   - Without an account, you can only use Netlify Drop once per day

3. **Drag Your Entire Project Folder**:
   - Take your whole `sonar-developer-days` folder
   - Drag and drop it onto the Netlify Drop zone
   - Wait for upload to complete (usually 10-30 seconds)

4. **Get Your Live URL**:
   - Netlify will give you a URL like: `https://inspiring-cupcake-123456.netlify.app`
   - **Your Game URL**: `https://your-url.netlify.app/`

5. **Share Your Game**: Copy the full URL and share it with everyone!

### Option 2: Surge.sh (Long-term Alternative)

If you want a custom name for your game URL:

1. **Install Surge** (one-time setup):
   - Open your terminal/command prompt
   - Run: `npm install --global surge`

2. **Deploy Your Game**:
   - Navigate to your project root folder (where `index.html` is located)
   - Run: `surge`
   - Choose a custom domain like: `your-name-whale-game.surge.sh`
   - **⚠️ Important**: Use a unique name like `john-whale-game-2024.surge.sh` so other workshop participants don't override your game!

3. **Your Game URL**: `https://your-unique-name.surge.sh`

### 🧪 Test Your Published Game:
1. Visit your game URL on desktop
2. Make sure the whale graphics load properly  
3. Test the game controls (spacebar/click)
4. **Mobile Test**: Open the URL on your phone and test touch controls
5. Share the link with friends - they can play it on any device!

### 🎉 Congratulations!
You've created and published your first web game that works perfectly on both desktop and mobile devices!

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
2. Replace `assets/sonar-whale-light-bg.svg` with your drawing
3. Adjust size in the whale object

#### Different Obstacles:
1. Create new SVG obstacles
2. Replace `assets/seaweed.svg` 
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
