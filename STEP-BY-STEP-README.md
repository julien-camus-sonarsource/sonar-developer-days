# 🎯 Step-by-Step Tutorial Files

This folder contains the complete working code for each step of the Flappy Sonar Whale tutorial. Each folder represents a checkpoint where participants can catch up if they fall behind or compare their progress.

## 📁 Folder Structure

### **step-1-basic-webpage/**
- **What it shows**: Basic HTML structure with styled canvas
- **Key concepts**: HTML, CSS, canvas element
- **Working features**: Empty game area with ocean styling
- **Files**: `index.html`

### **step-2-moving-square/**
- **What it shows**: Blue square moving left to right
- **Key concepts**: JavaScript basics, game loop, drawing on canvas
- **Working features**: Animated rectangle with wraparound
- **Files**: `index.html`, `game.js`

### **step-3-gravity-jumping/**
- **What it shows**: Square affected by gravity that can jump
- **Key concepts**: Physics simulation, user input, event listeners
- **Working features**: Gravity, jumping with spacebar/click, boundaries
- **Files**: `index.html`, `game.js`

### **step-4-obstacles-collision/**
- **What it shows**: Full playable game with green obstacles
- **Key concepts**: Arrays, collision detection, game states, scoring
- **Working features**: Complete Flappy Bird mechanics
- **Files**: `index.html`, `game.js`

### **step-5-beautiful-graphics/**
- **What it shows**: Polished game with whale graphics and ocean theme
- **Key concepts**: SVG assets, animations, canvas transformations
- **Working features**: Whale sprite, seaweed obstacles, squeeze animation
- **Files**: `index.html`, `game.js`, `whale.svg`, `seaweed.svg`

### **step-6-code-issues/**
- **What it shows**: Same beautiful game but with intentional code problems
- **Key concepts**: Code smells, SonarLint integration, debugging
- **Working features**: Game works but has 13+ SonarLint issues
- **Files**: `index.html`, `game.js`, `whale.svg`, `seaweed.svg`
- **Purpose**: For participants to practice finding and fixing issues

### **step-7-clean-code/**
- **What it shows**: Professional-quality code with all issues fixed
- **Key concepts**: Clean code principles, best practices, maintainability
- **Working features**: Same game + debug mode (press D)
- **Files**: `index.html`, `game.js`, `whale.svg`, `seaweed.svg`
- **Bonus**: Press 'D' to see collision boundaries for debugging

## 🚀 How to Use These Files

### **For Instructors:**
1. **Demo each step** by opening the `index.html` files in browser
2. **Show progression** - each step builds on the previous
3. **Help struggling participants** by directing them to appropriate folder
4. **Compare code** between steps to highlight new concepts

### **For Participants:**
1. **Catch up** if you fall behind by copying from the appropriate step
2. **Verify your work** by comparing with the reference implementation  
3. **See the end goal** by looking at later steps for motivation
4. **Debug issues** by comparing your code with the working versions

### **For Self-Study:**
1. **Start with step-1** and work through each folder in order
2. **Don't skip steps** - each builds important concepts
3. **Read the code** in each step to understand the progression
4. **Experiment** - modify the code to see what happens

## 🧪 Testing Each Step

Each folder contains a complete, working version:

1. **Open the folder** in VS Code
2. **Open `index.html`** in your browser (double-click or Live Server)
3. **Verify it works** as described above
4. **Check SonarLint** (steps 6-7) to see the difference in code quality

## 🔍 Code Quality Demonstration

**Step 6 vs Step 7** provides a perfect comparison:

- **step-6-code-issues/game.js**: Contains 13 intentional issues
- **step-7-clean-code/game.js**: All issues fixed with best practices

Open both files in VS Code with SonarLint to see the difference!

## 📚 Learning Objectives by Step

| Step | HTML | CSS | JavaScript | Game Dev | Code Quality |
|------|------|-----|------------|----------|--------------|
| 1    | ✅   | ✅  | ❌         | ❌       | ❌           |
| 2    | ✅   | ✅  | ✅         | ✅       | ❌           |
| 3    | ✅   | ✅  | ✅         | ✅       | ❌           |
| 4    | ✅   | ✅  | ✅         | ✅       | ❌           |
| 5    | ✅   | ✅  | ✅         | ✅       | ❌           |
| 6    | ✅   | ✅  | ✅         | ✅       | ⚠️ (Issues)   |
| 7    | ✅   | ✅  | ✅         | ✅       | ✅           |

## 💡 Tips for Workshop Facilitators

### **If Participants Get Stuck:**
1. **Direct them to previous step** to see working version
2. **Compare their code** with reference implementation
3. **Focus on one concept** - don't try to fix everything at once

### **If Someone is Ahead:**
1. **Let them explore** later steps
2. **Ask them to help** struggling participants
3. **Challenge them** to customize the game

### **Common Issues & Solutions:**
- **Files not loading**: Check file names match exactly
- **SonarLint not working**: Ensure extension is installed and file is saved
- **Images not showing**: SVG files must be in same folder as HTML
- **Game not responding**: Check browser console for JavaScript errors

---

**Happy coding! 🐋✨**