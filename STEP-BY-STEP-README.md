# 🎯 Git Branch Structure Guide

This repository uses **Git branches as checkpoints** for the Flappy Sonar Whale tutorial. Each branch represents a working state where participants can catch up, compare progress, or start fresh.

---

## 🌟 Branch Overview

### **Main Branches:**
- **`main`** - Clean starting point with tutorial only (no implementation files)
- **`final`** - Complete implementation with all features and polish

### **Checkpoint Branches:**
- **`step-1`** through **`step-7`** - Progressive tutorial checkpoints

---

## 📋 Branch Details

### **🌟 main**
- **Purpose**: Workshop starting point
- **Contains**: TUTORIAL.md, README.md, documentation only
- **Use case**: Where participants clone and start their work
- **Command**: `git checkout main` (default)

### **🎯 step-1: Basic HTML Foundation**
- **What it shows**: HTML structure with styled canvas
- **Key concepts**: HTML, CSS, canvas element, mobile viewport
- **Working features**: Empty game area with ocean styling
- **Files**: `index.html`, tutorial files, assets/

### **🎯 step-2: JavaScript Basics**  
- **What it shows**: Blue square moving left to right
- **Key concepts**: JavaScript basics, game loop, canvas drawing
- **Working features**: Animated rectangle with wraparound
- **Files**: All step-1 files + `step-2-moving-square/`

### **🎯 step-3: Physics Simulation**
- **What it shows**: Square affected by gravity that can jump
- **Key concepts**: Physics simulation, user input, event listeners
- **Working features**: Gravity, jumping with spacebar/click/touch, boundaries
- **Files**: All previous steps + `step-3-gravity-jumping/`

### **🎯 step-4: Game Mechanics**
- **What it shows**: Full playable game with obstacles
- **Key concepts**: Arrays, collision detection, game states, scoring
- **Working features**: Complete Flappy Bird mechanics with for-of loops
- **Files**: All previous steps + `step-4-obstacles-collision/`

### **🎯 step-5: Beautiful Graphics**
- **What it shows**: Polished game with whale graphics and ocean theme
- **Key concepts**: SVG assets, animations, canvas transformations, mobile support
- **Working features**: Whale sprite, seaweed obstacles, squeeze animation, touch controls
- **Files**: All previous steps + `step-5-beautiful-graphics/` with forgiving collision detection

### **🎯 step-6: Code Issues Demo**
- **What it shows**: Same beautiful game but with intentional code problems
- **Key concepts**: Code smells, SonarQube for IDE integration, issue identification
- **Working features**: Game works but has 6+ real SonarQube issues (S3776, S107, S1854, S1481, S3504, S4138)
- **Files**: All previous steps + `step-6-code-issues/` with mobile support
- **Purpose**: For participants to practice finding and fixing real issues

### **🎯 step-7: Clean Code**
- **What it shows**: Professional-quality code with all issues fixed
- **Key concepts**: Clean code principles, best practices, maintainability
- **Working features**: Same game + debug mode (press D), mobile support, proper resource management
- **Files**: All previous steps + `step-7-clean-code/`
- **Bonus**: Press 'D' to see collision boundaries for debugging

### **🏆 final: Complete Implementation**
- **Purpose**: Instructor reference with all features
- **Contains**: All step folders with complete tutorial progression
- **Use case**: Quick demo, complete reference, instructor preparation

---

## 🚀 How Participants Use Branches

### **Starting the Workshop:**
```bash
# 1. Clone repository
git clone [workshop-repo-url]
cd sonar-developer-days

# 2. Create personal workspace
git checkout -b my-implementation-john

# 3. Follow TUTORIAL.md step by step
```

### **Getting Help When Stuck:**
```bash
# See solution for current step
git checkout step-4
# Study the files, then go back to work
git checkout my-implementation-john
```

### **Starting Fresh from Checkpoint:**
```bash
# Start over from step 3 solution
git checkout step-3
git checkout -b my-fresh-attempt
```

### **Viewing All Options:**
```bash
git branch -a  # See all available branches
```

---

## 🧭 Navigation Commands

### **Quick Reference:**
```bash
# Workshop flow
git checkout main                    # Start here
git checkout -b my-work             # Create workspace
git checkout step-X                 # See step X solution
git checkout my-work                # Back to your code
git checkout -b retry-from-stepX    # Fresh start from step X
git checkout final                  # Complete reference

# See what's available
git branch -a                       # List all branches
git log --oneline                   # See commit history
```

---

## 🔍 Code Quality Demonstration

**Perfect for showing SonarQube for IDE value:**

### **step-6-code-issues** ⚠️
```bash
git checkout step-6
# Open step-6-code-issues/game.js in VS Code
# SonarQube for IDE shows 6+ real issues
```

### **step-7-clean-code** ✅  
```bash
git checkout step-7  
# Open step-7-clean-code/game.js in VS Code
# All issues fixed with modern best practices
```

**Side-by-side comparison shows dramatic improvement!**

---

## 🧪 Testing Each Branch

### **Verification Steps:**
1. **Switch branch**: `git checkout step-X`
2. **Check files**: `ls -la` to see what's included
3. **Test game**: Open appropriate `index.html` in browser
4. **Verify SonarQube**: Check Problems panel in VS Code (steps 6-7)

### **Expected Behavior by Branch:**
| Branch | Game Works? | Mobile Support | SonarQube Issues | Assets |
|--------|-------------|----------------|------------------|---------|
| step-1 | Static page | ✅ | N/A | ✅ |
| step-2 | Moving square | ✅ | N/A | ✅ |
| step-3 | Jumping works | ✅ | N/A | ✅ |
| step-4 | Full gameplay | ✅ | N/A | ✅ |
| step-5 | Beautiful graphics | ✅ | N/A | ✅ |
| step-6 | Full game | ✅ | 6+ issues | ✅ |
| step-7 | Full game + debug | ✅ | 0 issues | ✅ |

---

## 💡 Tips for Instructors

### **Branch Management:**
- **main** stays clean (tutorial only)
- **step-X** branches are reference implementations
- **final** is complete working project
- Participants work in personal branches

### **Common Workflows:**
```bash
# Help struggling participant
git checkout their-branch-name  # See their work
git checkout step-3             # Show working version
git diff step-3 their-branch -- game.js  # Compare differences

# Reset participant to checkpoint
git checkout step-2
git checkout -b participant-fresh-start
```

### **Pre-Workshop Setup:**
```bash
# Verify all branches work
for branch in step-1 step-2 step-3 step-4 step-5 step-6 step-7 final; do
  echo "Testing $branch..."
  git checkout $branch
  # Test that appropriate index.html files work
done
```

---

## 🎯 Learning Progression

### **Concepts Introduced by Branch:**
- **step-1**: HTML, CSS, Canvas basics
- **step-2**: JavaScript, game loops, drawing
- **step-3**: Physics, events, user input  
- **step-4**: Arrays, collision detection, game states
- **step-5**: SVG graphics, animations, mobile support, forgiving collision
- **step-6**: Code quality awareness, real SonarQube issues
- **step-7**: Clean code practices, professional development

### **SonarQube Rules Demonstrated:**
- **S3776**: Cognitive complexity (nested if statements)
- **S107**: Too many parameters (11 parameters)
- **S1854**: Unused assignments 
- **S1481**: Unused local variables
- **S3504**: Variable declarations should be at beginning of scope
- **S4138**: "for...of" should be used instead of "for" loops

---

**🐋 Ready to start the workshop? Begin with `git checkout -b my-implementation-[yourname]` and follow TUTORIAL.md! ✨**