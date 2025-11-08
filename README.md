# Question Randomizer - Quiz Application

A modern, feature-rich quiz application with sound effects, timer tracking, and modular JavaScript architecture.

## Features

### 🎵 Sound Effects Management
- **Opening Modal Warning**: Users are alerted about sound effects before starting
- **Sound Toggle**: Persistent sound on/off button (top-right corner)
- **Multiple Sound Effects**: 
  - Opening sound
  - Correct answer sound
  - Wrong answer sound
  - Checkpoint reached sound
- **Persistent Settings**: Sound preference saved to localStorage

### ⏱️ Advanced Timer System
- **Real-time Timer**: Displays elapsed time during quiz (MM:SS format)
- **Per-Question Timing**: Tracks time spent on each question
- **Detailed Statistics**: 
  - Total quiz time
  - Average time per question
  - Individual question times
  - Questions answered count
- **Results Display**: Comprehensive timing breakdown on results screen

### 📁 Modular JavaScript Architecture

The JavaScript has been separated into focused, maintainable modules:

#### `js/audio.js`
- Manages all sound effects
- Controls sound toggle functionality
- Handles localStorage for sound preferences
- Methods: `playOpening()`, `playCorrect()`, `playWrong()`, `playCheckpoint()`, `toggleSound()`

#### `js/timer.js`
- Tracks quiz timing
- Records per-question times
- Calculates statistics
- Methods: `start()`, `stop()`, `recordQuestionTime()`, `getStatistics()`, `formatTime()`

#### `js/fileHandler.js`
- Handles CSV file loading and parsing
- Supports both file upload and URL loading
- Validates question format
- Methods: `parseCSV()`, `loadFromURL()`, `loadFromFile()`, `getQuestions()`

#### `js/ui.js`
- Manages all DOM manipulations
- Updates UI elements
- Handles screen transitions
- Methods: `displayQuestion()`, `updateStats()`, `showFeedback()`, `displayResults()`

#### `js/quiz.js`
- Core quiz logic and state management
- Handles answer validation
- Manages checkpoints and streaks
- Methods: `start()`, `handleAnswer()`, `skipQuestion()`, `endQuiz()`

#### `js/main.js`
- Application initialization
- Event listener setup
- Coordinates between modules
- Entry point for the application

## File Structure

```
question-randomizer/
├── index.html              # Main HTML file
├── style.css               # Comprehensive styling
├── js/
│   ├── main.js            # Application entry point
│   ├── audio.js           # Sound management
│   ├── timer.js           # Timer functionality
│   ├── fileHandler.js     # CSV parsing
│   ├── ui.js              # UI management
│   └── quiz.js            # Quiz logic
├── csv-files/
│   ├── is.csv             # Information Systems questions
│   ├── os.csv             # Operating Systems questions
│   └── network.csv        # Networking questions
├── sound-effects/
│   ├── opening.mp3
│   ├── correct.mp3
│   ├── wrong.mp3
│   └── checkpoint.mp3
└── favicon/
    └── ...                # Favicon files
```

## How to Use

1. **Start the Quiz**
   - Open `index.html` in a web browser
   - Click "Yes" on the ready modal (warns about sound effects)
   - Upload a CSV file or select from pre-loaded options

2. **During the Quiz**
   - Answer questions by clicking on options
   - Watch your streak to reach checkpoints
   - Toggle sound on/off using the button in the top-right corner
   - Timer runs automatically in the background

3. **Review Results**
   - View your score (correct/wrong answers)
   - Check detailed timer statistics
   - See time spent on each question
   - Review mistakes if any

## CSV File Format

Questions should be in CSV format with 6 columns:
```
Question,Option1,Option2,Option3,Option4,CorrectAnswer
```

Example:
```
What is 2+2?,2,3,4,5,4
What is the capital of France?,London,Paris,Berlin,Madrid,Paris
```

## Key Features

- ✅ Responsive design for all devices
- ✅ Dark mode optimized
- ✅ Checkpoint system (every 5 correct answers)
- ✅ Wrong answer tracking and review mode
- ✅ Skip question after 4 attempts
- ✅ Comprehensive timer statistics
- ✅ Sound effects with toggle control
- ✅ Modular, maintainable code structure

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Development

### Adding New Features

Each module is independent and can be modified without affecting others:
- Add new sounds → Edit `js/audio.js`
- Modify timing logic → Edit `js/timer.js`
- Change quiz behavior → Edit `js/quiz.js`
- Update UI elements → Edit `js/ui.js`

### Module Communication

Modules communicate through global instances:
- `audioManager` - Audio control
- `timerManager` - Timer control
- `fileHandler` - File operations
- `uiManager` - UI updates
- `quizManager` - Quiz state

## Credits

Developed and Published by **One Voxel**

- LinkedIn: [One Voxel Dev](https://www.linkedin.com/company/one-voxel-dev/)
- Instagram: [@onevoxel_dev](https://www.instagram.com/onevoxel_dev)
- Email: onevoxel.dev@gmail.com
- WhatsApp: +201005793518

## License

© 2025 One Voxel. All rights reserved.
