# 🐋 Flappy Sonar Whale Workshop

Welcome to the Flappy Sonar Whale workshop! This tutorial will guide you through discovering SonarQube and clean code principles using a fun, interactive game.

## 🎮 Overview

"Flappy Sonar Whale" is a Flappy Bird–inspired mini-game where players keep a whale afloat by tapping or pressing the spacebar to navigate through rising seaweed obstacles. Each gap passed increases the score. 

**The twist:** The underlying JavaScript code is intentionally infused with common code smells, and you'll use SonarLint in VS Code to identify and fix them!

## 🎯 Learning Objectives

- Understand basic game loops and event handling in JavaScript
- Recognize common code smells detectable by SonarLint
- Apply real-time static analysis to improve code quality
- Experience clean-code principles: readability, maintainability, and reliability

## 🛠️ Prerequisites & Setup

### Required Tools
- **VS Code** with **SonarLint extension** installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps
1. Install VS Code if you haven't already
2. Install the SonarLint extension:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "SonarLint"
   - Install the official SonarSource extension
3. Clone or download this repository
4. Open the project folder in VS Code

### Verify Setup
1. Open `flappy-whale.js` in VS Code
2. Check the **Problems** panel (View → Problems or Ctrl+Shift+M)
3. You should see several SonarLint warnings highlighted

## 🎲 How to Play

1. Open `index.html` in your web browser
2. Press **SPACE** to make the whale flap upward
3. Navigate through the green seaweed obstacles
4. Each gap passed = +1 point
5. Avoid collisions and stay within bounds
6. Press **R** to restart after game over

## 🏗️ Workshop Structure

### 👥 Participants
- **Teams:** 2 teams of 3 students
- **Duration:** ~60 minutes

### 📋 Workshop Flow

#### 1. Intro & Demo (10 min)
- Run the game in your browser
- Explore the code in VS Code
- Review the SonarLint Problems pane
- Identify the 5 intentional code smells

#### 2. Smell Hunt (20 min)
Teams work together to locate and understand each code smell:

| # | Code Smell | SonarLint Rule | Location | Description |
|---|------------|----------------|----------|-------------|
| 1 | **Unclosed interval** | S2095 | `setInterval(...)` | Resource leak - interval never cleared |
| 2 | **var instead of let/const** | S4334 | Loop in `update()` | Using deprecated `var` declaration |
| 3 | **Magic number** | S109 | `whale.vy = -8` | Hard-coded flap force value |
| 4 | **Missing debug logging** | S106 | `gameOver()` function | No logging on crash events |
| 5 | **Duplicated literals** | S1192 | Canvas dimensions | Hard-coded values repeated multiple times |

#### 3. Refactor & Quick Fix (20 min)
- Apply SonarLint Quick Fixes where available
- Manual corrections for remaining issues
- Goal: **0 SonarLint alerts**
- Test the game after each fix

#### 4. Debrief (10 min)
- Review each smell and its solution
- Discuss clean-code principles
- Share team experiences

## 🔧 Step-by-Step Fixes

### Fix #1: Unclosed Interval (S2095)
**Problem:** `setInterval` creates a memory leak
```javascript
// ❌ Before
setInterval(function() {
    if (gameRunning) {
        update();
        draw();
    }
}, 20);

// ✅ After
let gameLoop;
function startGameLoop() {
    gameLoop = setInterval(function() {
        if (gameRunning) {
            update();
            draw();
        }
    }, 20);
}

function stopGameLoop() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }
}
```

### Fix #2: var → let/const (S4334)
**Problem:** Using deprecated `var` in loop
```javascript
// ❌ Before
for (var i = 0; i < obstacles.length; i++) {

// ✅ After  
for (let i = 0; i < obstacles.length; i++) {
```

### Fix #3: Magic Numbers (S109)
**Problem:** Hard-coded flap force
```javascript
// ❌ Before
whale.vy = -8;

// ✅ After
const FLAP_FORCE = -8;
whale.vy = FLAP_FORCE;
```

### Fix #4: Missing Debug Logging (S106)
**Problem:** No debugging information on game over
```javascript
// ❌ Before
function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
}

// ✅ After
function gameOver() {
    console.log('Game Over - Score:', score, 'Whale position:', whale.x, whale.y);
    gameRunning = false;
    gameOverElement.style.display = 'block';
}
```

### Fix #5: Duplicated Literals (S1192)
**Problem:** Canvas dimensions hard-coded multiple times
```javascript
// ❌ Before
if (whale.y > 600 || whale.y < 0) {
ctx.clearRect(0, 0, 400, 600);

// ✅ After
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;

if (whale.y > CANVAS_HEIGHT || whale.y < 0) {
ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
```

## 📝 Verification Checklist

After implementing all fixes:
- [ ] **Problems panel shows 0 SonarLint issues**
- [ ] **Game still functions correctly**
- [ ] **All constants are properly defined**
- [ ] **Interval is properly managed**
- [ ] **Debug logging works in console**

## 🎓 Key Takeaways

### Clean Code Principles
1. **Readability:** Code should be self-documenting
2. **Maintainability:** Easy to modify and extend
3. **Reliability:** Fewer bugs through better structure
4. **Performance:** Proper resource management

### SonarLint Benefits
- **Real-time feedback** during development
- **Consistent code quality** across teams
- **Educational tool** for learning best practices
- **Integration** with development workflow

### Best Practices Applied
- Use `const`/`let` instead of `var`
- Extract magic numbers to named constants
- Proper resource cleanup (intervals, timeouts)
- Meaningful logging for debugging
- Avoid code duplication

## 🚀 Next Steps

1. **Install SonarLint** in your regular development environment
2. **Configure rules** based on your project needs
3. **Share learnings** with your development team
4. **Apply these principles** to real projects

## 📚 Additional Resources

- [SonarSource Documentation](https://docs.sonarqube.org/)
- [Clean Code by Robert Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [VS Code SonarLint Extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

---

**Happy coding and whale flapping! 🐋✨**