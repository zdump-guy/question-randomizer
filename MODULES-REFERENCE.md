# JavaScript Modules Reference Guide

## Module Overview

This document provides a quick reference for all JavaScript modules in the Quiz Application.

---

## 📢 audio.js - Audio Management

### Purpose
Manages all sound effects and audio controls throughout the application.

### Global Instance
```javascript
audioManager
```

### Key Methods

| Method | Description | Usage Example |
|--------|-------------|---------------|
| `init()` | Initialize audio elements | Called automatically on app start |
| `showSoundToggle()` | Display sound toggle button | `audioManager.showSoundToggle()` |
| `hideSoundToggle()` | Hide sound toggle button | `audioManager.hideSoundToggle()` |
| `toggleSound()` | Toggle sound on/off | Triggered by button click |
| `playOpening()` | Play opening sound | `audioManager.playOpening()` |
| `playCorrect()` | Play correct answer sound | `audioManager.playCorrect()` |
| `playWrong()` | Play wrong answer sound | `audioManager.playWrong()` |
| `playCheckpoint()` | Play checkpoint sound | `audioManager.playCheckpoint()` |

### Properties
- `soundEnabled` (boolean) - Current sound state
- `sounds` (object) - Contains all audio elements

---

## ⏱️ timer.js - Timer Management

### Purpose
Tracks time for the entire quiz and individual questions.

### Global Instance
```javascript
timerManager
```

### Key Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `init()` | Initialize timer display | void |
| `start()` | Start quiz timer | void |
| `stop()` | Stop timer | void |
| `reset()` | Reset all timing data | void |
| `recordQuestionTime(questionText)` | Record time for current question | void |
| `getTotalTime()` | Get total elapsed seconds | number |
| `getTotalTimeFormatted()` | Get formatted time (MM:SS) | string |
| `getAverageTime()` | Get average time per question | number |
| `getQuestionTimes()` | Get all question times | Array |
| `getStatistics()` | Get comprehensive stats | Object |
| `formatTime(seconds)` | Format seconds to readable string | string |

### Statistics Object Structure
```javascript
{
  totalTime: number,              // Seconds
  totalTimeFormatted: string,     // "MM:SS"
  averageTime: number,            // Seconds
  questionsAnswered: number,
  questionTimes: Array,           // Detailed breakdown
  fastestQuestion: Object,
  slowestQuestion: Object
}
```

---

## 📄 fileHandler.js - File Management

### Purpose
Handles CSV file loading, parsing, and validation.

### Global Instance
```javascript
fileHandler
```

### Key Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `parseCSV(csvText)` | Parse CSV text into questions | Array |
| `loadFromURL(filePath)` | Load CSV from URL | Promise<Array> |
| `loadFromFile(file)` | Load CSV from File object | Promise<Array> |
| `getQuestions()` | Get all loaded questions | Array |
| `getQuestionCount()` | Get number of questions | number |
| `hasQuestions()` | Check if questions are loaded | boolean |
| `clear()` | Clear all questions | void |

### Question Object Structure
```javascript
{
  question: string,
  options: [string, string, string, string],
  correct: string
}
```

---

## 🎨 ui.js - UI Management

### Purpose
Manages all DOM manipulations and user interface updates.

### Global Instance
```javascript
uiManager
```

### Key Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `init()` | Initialize UI elements | - |
| `showUploadScreen()` | Display upload screen | - |
| `showQuizScreen()` | Display quiz screen | - |
| `showResultsScreen()` | Display results screen | - |
| `showReadyModal()` | Show ready modal | - |
| `hideReadyModal()` | Hide ready modal | - |
| `showFilesModal()` | Show files modal | - |
| `hideFilesModal()` | Hide files modal | - |
| `showSkipButton()` | Display skip button | - |
| `hideSkipButton()` | Hide skip button | - |
| `displayQuestion(question, number)` | Display a question | question object, number |
| `updateStats(stats)` | Update statistics display | stats object |
| `showFeedback(message, type)` | Show feedback message | message string, type string |
| `displayResults(results)` | Display final results | results object |
| `markAnswerCorrect(button)` | Mark button as correct | button element |
| `markAnswerWrong(button)` | Mark button as wrong | button element |
| `disableAnswerButtons()` | Disable all answer buttons | - |
| `updateStartButton(enabled, count)` | Update start button state | boolean, number |

### Stats Object Structure
```javascript
{
  currentQuestion: number,
  totalQuestions: number,
  streak: number,
  checkpoint: number,
  correct: number,
  wrong: number
}
```

### Results Object Structure
```javascript
{
  correct: number,
  wrong: number,
  wrongQuestions: Array,
  isReviewMode: boolean,
  timerStats: Object  // From timerManager.getStatistics()
}
```

---

## 🎯 quiz.js - Quiz Logic

### Purpose
Core quiz logic, state management, and game flow control.

### Global Instance
```javascript
quizManager
```

### Key Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `start(questions, isReview)` | Start new quiz | questions Array, isReview boolean |
| `displayCurrentQuestion()` | Display current question | - |
| `handleAnswer(button)` | Process answer selection | button element |
| `skipQuestion()` | Skip current question | - |
| `endQuiz()` | End quiz and show results | - |
| `updateStats()` | Update statistics | - |
| `getWrongQuestions()` | Get all wrong questions | - |

### State Properties
- `shuffledQuestions` - Current question set
- `currentQuestionIndex` - Current position
- `checkpointIndex` - Last checkpoint position
- `consecutiveStreak` - Current correct streak
- `totalCorrect` - Total correct answers
- `totalWrong` - Total wrong answers
- `questionAttempts` - Attempts per question
- `wrongQuestions` - Array of wrong questions
- `isReviewMode` - Review mode flag

---

## 🚀 main.js - Application Entry

### Purpose
Application initialization and event coordination.

### Key Functions

| Function | Description |
|----------|-------------|
| `initializeApp()` | Initialize all modules |
| `setupEventListeners()` | Set up all event handlers |
| `handleReadyYes()` | Handle ready modal acceptance |
| `handleReadyNo()` | Handle ready modal rejection |
| `handleFileUpload(event)` | Handle file upload |
| `handleAutoAddFile(path)` | Handle preset file selection |
| `handleStartQuiz()` | Start quiz |
| `handleAnswerClick(event)` | Handle answer selection |
| `handleSkipQuestion()` | Handle skip |
| `handleRestart()` | Restart quiz |
| `handleNewFile()` | Upload new file |
| `handleReview()` | Start review mode |

---

## 🔄 Module Communication Flow

```
main.js (Entry Point)
  ↓
  ├─→ audioManager.init()
  ├─→ timerManager.init()
  └─→ uiManager.init()

User Action
  ↓
main.js (Event Handler)
  ↓
  ├─→ fileHandler (if file operation)
  ├─→ quizManager (if quiz action)
  │     ↓
  │     ├─→ timerManager (timing)
  │     ├─→ audioManager (sounds)
  │     └─→ uiManager (display)
  └─→ uiManager (direct UI update)
```

---

## 📝 Common Usage Patterns

### Starting a Quiz
```javascript
const questions = fileHandler.getQuestions();
quizManager.start(questions, false);
```

### Playing Sound
```javascript
audioManager.playCorrect();
```

### Recording Time
```javascript
timerManager.recordQuestionTime(question.question);
```

### Updating UI
```javascript
uiManager.updateStats({
  currentQuestion: 5,
  totalQuestions: 50,
  streak: 3,
  checkpoint: 1,
  correct: 10,
  wrong: 2
});
```

### Getting Results
```javascript
const stats = timerManager.getStatistics();
const wrongQ = quizManager.getWrongQuestions();
```

---

## 🐛 Debugging Tips

1. **Check Console**: Each module logs important events
2. **Inspect Global Instances**: Use browser console to check state
   ```javascript
   console.log(quizManager);
   console.log(timerManager.getStatistics());
   ```
3. **Verify Initialization**: Check `app.initialized` in console
4. **Monitor Events**: Look for event listener issues in main.js

---

## 🔧 Extending Modules

### Adding New Sound
1. Add audio element to HTML
2. Add property to `audioManager.sounds`
3. Create new play method in `audio.js`

### Adding New Statistic
1. Track data in appropriate module
2. Add to statistics object
3. Update UI in `ui.js`

### Adding New Feature
1. Create new module file (e.g., `js/feature.js`)
2. Create manager class with `init()` method
3. Initialize in `main.js`
4. Add to module communication flow

---

## ✅ Best Practices

1. **Always call `init()` methods** before using modules
2. **Use global instances** for module communication
3. **Handle errors** with try-catch in async operations
4. **Update UI through uiManager** for consistency
5. **Keep modules focused** on single responsibility
6. **Document new methods** with JSDoc comments

---

*Last Updated: November 8, 2025*
