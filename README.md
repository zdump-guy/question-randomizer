# Q&A Randomizer - Quiz Application

A modern, feature-rich quiz application with sound effects, advanced timer tracking, checkpoint system, and modular JavaScript architecture. Built for an engaging and interactive learning experience.

## 🌟 Key Features

### � Loading Screen & Welcome Experience
- **Animated Brand Loading**: Eye-catching letter-by-letter animation with shimmer effects
- **Progress Bar**: Visual feedback during initial load (3.5s duration)
- **Ready Modal**: Pre-quiz warning about sound effects with Yes/No options
- **Smooth Transitions**: Fade effects between loading and main application

### 🎵 Sound Effects System
- **4 Sound Types**: Opening, correct answer, wrong answer, and checkpoint celebration
- **Toggle Control**: Fixed top-right button to enable/disable sounds
- **Persistent Settings**: Sound preference saved to localStorage
- **Visual Feedback**: Icons change based on sound state (green on / red off)
- **Auto-play Prevention Handling**: Graceful fallback for browser restrictions

### ⏱️ Advanced Timer System
- **Real-time Display**: Running timer in MM:SS format during quiz
- **Per-Question Tracking**: Records time spent on each individual question
- **Comprehensive Statistics**:
  - Total quiz time
  - Average time per question
  - Questions answered count
  - Individual question time breakdown
  - Fastest and slowest questions
- **Results Display**: Detailed timing analysis on completion screen

### 🎯 Quiz Mechanics
- **Checkpoint System**: Progress saved every 5 consecutive correct answers
- **Smart Wrong Answer Handling**:
  - Return to last checkpoint on wrong answer (normal mode)
  - Stay on question in review mode
  - Up to 4 attempts per question
  - Skip option after 4 attempts
- **Streak Tracking**: Visual counter for consecutive correct answers
- **Question Randomization**: Shuffles questions and answer options
- **Unique Answer Tracking**: Prevents duplicate counting of correct/wrong answers
- **Review Mode**: Practice wrong answers after quiz completion

### 📊 Statistics & Progress Tracking
- **Live Stats Display**:
  - Current question number / total questions
  - Consecutive streak counter
  - Current checkpoint marker
  - Correct and wrong answer counts
- **Results Screen**:
  - Final score breakdown
  - Complete timer statistics
  - Per-question time analysis
  - Review mistakes button (if applicable)

### 📁 File Management
- **Multiple Input Methods**:
  - Manual CSV file upload
  - Pre-loaded question banks (IS, OS, Network)
  - Download preset CSV files
- **CSV Format Support**: Standard 6-column format (Question, 4 Options, Correct Answer)
- **Validation**: Automatic format checking and error handling
- **File Modal**: Easy-to-use preset file selection interface

### 🎨 Modern Design System
- **Dark Theme**: Professionally designed dark mode interface
- **Glassmorphism**: Subtle backdrop blur and transparency effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Custom Typography**: Inter font with variable weights and sizes
- **Design Tokens**: Comprehensive CSS variable system for consistency
- **Smooth Animations**: Premium transitions and hover effects
- **Tailwind CSS Integration**: Utility-first styling with custom extensions

### 📱 Responsive & Accessible
- **Mobile-Friendly**: Touch-optimized buttons and layouts
- **Breakpoint System**: Adaptive design at 480px, 768px, and larger
- **Minimum Touch Targets**: 48px minimum height for buttons
- **Keyboard Accessible**: Full keyboard navigation support
- **Screen Reader Ready**: Semantic HTML structure

## 🏗️ Project Architecture

### Modular JavaScript System

The application uses a clean, modular architecture with separated concerns:

#### **`js/loadingScreen.js`** - Loading Animation
- Manages initial 3.5s loading screen
- Handles fade-out transition
- Removes loading screen from DOM after animation

#### **`js/audio.js`** - Audio Manager
- Manages 4 sound effect types
- Toggle functionality with icon updates
- localStorage persistence for sound preferences
- Graceful error handling for audio playback

#### **`js/timer.js`** - Timer Manager
- Quiz timer with interval updates
- Per-question time recording
- Statistical calculations (total, average, fastest, slowest)
- Formatted time display utilities

#### **`js/fileHandler.js`** - File Handler
- CSV parsing with validation
- URL-based file loading (fetch API)
- FileReader for uploaded files
- Question count and retrieval methods

#### **`js/ui.js`** - UI Manager
- DOM element management
- Screen transitions (upload, quiz, results)
- Question and answer rendering
- Statistics display updates
- Feedback messages and animations
- Results screen with detailed breakdowns

#### **`js/quiz.js`** - Quiz Manager
- Core quiz logic and state management
- Answer validation
- Checkpoint system (every 5 correct)
- Streak tracking
- Wrong question collection
- Review mode support
- Question shuffling algorithm

#### **`js/main.js`** - Application Entry Point
- Initializes all modules
- Sets up event listeners
- Coordinates module communication
- Handles all user interactions (start, answer, skip, restart, review)

### Module Communication
All modules export singleton instances that communicate through:
- `audioManager` - Audio control
- `timerManager` - Timer control
- `fileHandler` - File operations
- `uiManager` - UI updates
- `quizManager` - Quiz state

## 📂 File Structure

```
question-randomizer/
├── index.html                 # Main HTML with SEO meta tags
├── style.css                  # Complete design system (1000+ lines)
├── robots.txt                 # SEO: Search engine directives
├── sitemap.xml               # SEO: Site structure for crawlers
├── README.md                 # Documentation
│
├── assets/
│   ├── favicon/              # Multi-format favicon files
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── favicon-96x96.png
│   │   ├── apple-touch-icon.png
│   │   └── site.webmanifest
│   └── icons/                # Additional icon assets
│
├── js/                       # Modular JavaScript (7 files)
│   ├── loadingScreen.js      # Loading animation controller
│   ├── audio.js              # Sound effects manager
│   ├── timer.js              # Timer & statistics tracker
│   ├── fileHandler.js        # CSV file parser
│   ├── ui.js                 # UI manager (375 lines)
│   ├── quiz.js               # Quiz logic (311 lines)
│   └── main.js               # App initialization (252 lines)
│
├── csv-files/                # Pre-loaded question banks
│   ├── is.csv                # Information Systems questions
│   ├── os.csv                # Operating Systems questions
│   └── network.csv           # Networking questions
│
└── sound-effects/            # Audio files
    ├── opening.mp3           # Welcome sound
    ├── correct.mp3           # Correct answer feedback
    ├── wrong.mp3             # Wrong answer feedback
    └── checkpoint.mp3        # Milestone celebration
```

## 🚀 How to Use

### Getting Started
1. **Open Application**: Launch `index.html` in any modern web browser
2. **Loading Screen**: Watch the animated "ONE VOXEL" loading sequence (3.5s)
3. **Ready Modal**: Click "Yes" to proceed (enables sound) or "No" to exit
4. **Upload Questions**: Choose from preset CSV files or upload your own

### During the Quiz
1. **Answer Questions**: Click on one of the four answer options
2. **Build Streaks**: Get 5 consecutive correct answers to reach a checkpoint
3. **Manage Sound**: Toggle sound on/off using the button in the top-right
4. **Track Progress**: Monitor your streak, checkpoint, and score in real-time
5. **Skip Option**: After 4 wrong attempts, you can skip the question
6. **Watch Timer**: Your elapsed time is displayed continuously

### After Completion
1. **View Results**: See your score, total time, and average time per question
2. **Analyze Performance**: Review detailed timing for each question answered
3. **Review Mistakes**: Click "Review Your Mistakes" to practice wrong answers
4. **Restart or New File**: Start over with same questions or load new ones

## 📝 CSV File Format

Questions must follow this 6-column structure:

```csv
Question,Option1,Option2,Option3,Option4,CorrectAnswer
```

**Example:**
```csv
What is 2+2?,2,3,4,5,4
What is the capital of France?,London,Paris,Berlin,Madrid,Paris
Which planet is closest to the Sun?,Venus,Mercury,Earth,Mars,Mercury
```

**Requirements:**
- Comma-separated values (CSV format)
- Exactly 6 columns per line
- No header row needed
- Correct answer must match one of the four options exactly
- Quotes around values are optional but supported

## 🎯 Game Mechanics Explained

### Checkpoint System
- **Trigger**: Every 5 consecutive correct answers
- **Purpose**: Save your progress point
- **Effect**: Wrong answers send you back to last checkpoint (normal mode)
- **Visual**: Checkpoint number displayed in stats area
- **Sound**: Special celebration sound plays on checkpoint

### Streak Counter
- **Increments**: +1 for each correct answer
- **Resets**: On any wrong answer → returns to 0
- **Display**: Shows current streak (0-4) before next checkpoint
- **Purpose**: Motivates players to maintain accuracy

### Attempt System
- **Track Per Question**: Each question tracks its own attempts
- **Visual Feedback**: "Attempt X/4" shown after wrong answers
- **Skip Unlock**: Skip button appears after 4th attempt
- **Clears on Correct**: Attempt counter resets when answered correctly

### Review Mode
- **Activation**: "Review Your Mistakes" button after quiz completion
- **Behavior**: Practice only the questions you got wrong
- **Difference**: Wrong answers don't send you to checkpoint
- **Timer**: Separate timing starts for review session

## 🎨 Design System Highlights

### CSS Architecture
- **Design Tokens**: 140+ CSS variables for colors, spacing, typography
- **Color Palette**: 
  - Background gradients (bg-900 to bg-600)
  - Text hierarchy (text-100 to text-60)
  - Accent colors (muted, success, error, warning)
- **Spacing Scale**: 8-point grid system (xs to 3xl)
- **Typography**: 
  - Font sizes: xs (0.75rem) to 6xl (4rem)
  - Font weights: 300-900
  - Line heights: tight to loose
- **Shadows**: 6 levels from subtle to dramatic
- **Border Radius**: 8 presets from none to full

### Component System
- **Cards**: Multi-layer backgrounds with hover effects
- **Glass Elements**: Backdrop blur and transparency
- **Buttons**: State-based styling (enabled, disabled, hover, active)
- **Feedback**: Animated messages with type-based colors
- **Grid System**: Responsive column layouts with auto-fit

### Responsive Breakpoints
- **Desktop**: Default styles
- **Tablet** (768px): Adjusted padding and 2-column grids
- **Mobile** (480px): Single column, larger touch targets

## 🔧 Technical Specifications

### Technologies Used
- **HTML5**: Semantic markup with comprehensive SEO meta tags
- **CSS3**: Custom design system with CSS variables and modern features
- **Vanilla JavaScript (ES6+)**: Modular architecture with classes
- **Tailwind CSS**: Utility classes via CDN
- **Google Fonts**: Inter font family
- **Web APIs**: FileReader, localStorage, Audio, fetch

### Browser Compatibility
- ✅ Chrome/Edge 90+ (recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Requires JavaScript enabled
- ⚠️ Sound requires user interaction (auto-play policies)

### Performance Features
- **Lazy Sound Loading**: Audio preload="auto" for faster playback
- **Efficient Timer**: Single interval, updates every 1s
- **Minimal Dependencies**: Only Tailwind CSS from CDN
- **Optimized Animations**: CSS transforms and transitions
- **Smart Rendering**: DOM updates only when necessary

### SEO & Metadata
- **Comprehensive Meta Tags**: Description, keywords, author
- **Open Graph**: Facebook/LinkedIn sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap.xml**: Search engine site structure
- **Robots.txt**: Crawler directives
- **Canonical URL**: Vercel deployment URL
- **Favicon**: Multi-format support (ico, svg, png, webmanifest)

### Data Persistence
- **localStorage**: Sound preference saved across sessions
- **Session State**: Quiz state resets on page reload
- **No Backend**: Fully client-side application
- **No User Data Collection**: Privacy-focused design

## 🛠️ Development & Customization

### Adding New Sound Effects
1. Add audio file to `sound-effects/` folder
2. Add `<audio>` element in `index.html`
3. Register in `AudioManager` constructor (`audio.js`)
4. Create play method in `AudioManager`
5. Call the method where needed in quiz logic

### Creating New Question Banks
1. Create CSV file with 6-column format
2. Save to `csv-files/` directory
3. Add download link in files modal (`index.html`)
4. Add auto-add button with data-file attribute
5. Update `setupEventListeners()` in `main.js`

### Modifying Quiz Behavior
- **Checkpoint Frequency**: Edit `consecutiveStreak === 5` in `quiz.js`
- **Attempts Before Skip**: Edit `currentAttempts >= 4` in `quiz.js`
- **Timer Update Interval**: Edit `setInterval(..., 1000)` in `timer.js`
- **Feedback Duration**: Edit `setTimeout(..., 1500)` delays in `quiz.js`

### Customizing Styling
- **Colors**: Modify CSS variables in `:root` selector (`style.css`)
- **Fonts**: Change Google Fonts import and font-family variables
- **Spacing**: Adjust spacing scale variables (--space-*)
- **Animations**: Edit duration and easing variables (--duration-*, --ease-*)
- **Breakpoints**: Modify @media queries at bottom of `style.css`

### Module Extension
Each module is designed for easy extension:
- **Add UI Elements**: Extend `UIManager` class methods
- **New Quiz Modes**: Add methods to `QuizManager`
- **Enhanced Statistics**: Extend `TimerManager` calculations
- **File Formats**: Add parsers to `FileHandler`

## 📊 Feature Comparison

| Feature | Status | Description |
|---------|--------|-------------|
| Question Randomization | ✅ | Shuffles both questions and answers |
| Checkpoint System | ✅ | Every 5 correct answers |
| Timer Tracking | ✅ | Total and per-question timing |
| Sound Effects | ✅ | 4 types with toggle control |
| Review Mode | ✅ | Practice wrong answers |
| Skip Questions | ✅ | After 4 attempts |
| Statistics | ✅ | Comprehensive timing breakdown |
| Mobile Responsive | ✅ | Optimized for all screen sizes |
| Dark Theme | ✅ | Modern dark UI design |
| CSV Support | ✅ | Standard format parsing |
| Preset Questions | ✅ | 3 pre-loaded question banks |
| SEO Optimized | ✅ | Meta tags, sitemap, robots.txt |
| Offline Support | ❌ | Requires internet for CDN assets |
| Multi-language | ❌ | English only |
| User Accounts | ❌ | No backend/authentication |
| Question Editor | ❌ | CSV editing only |

## 🐛 Known Issues & Limitations

- **Auto-play Restriction**: Some browsers block auto-play audio; click "Yes" on ready modal to enable
- **CSV Format Strict**: Malformed CSV lines are skipped with console warnings
- **No Progress Save**: Refreshing the page resets all quiz progress
- **Internet Required**: Tailwind CSS and Google Fonts loaded from CDN
- **Large CSVs**: Very large question files (1000+) may cause slower loading

## 🔮 Future Enhancements

Potential features for future development:
- 🔄 Progressive Web App (PWA) with offline support
- 💾 Backend integration for progress persistence
- 👥 User accounts and leaderboards
- 🌍 Multi-language support
- 📊 Advanced analytics dashboard
- 🎮 Timed quiz mode with countdown
- 🏆 Achievement system and badges
- 📱 Native mobile app versions
- 🔗 Social media sharing of results
- 🎨 Theme customization options

## 📄 License & Usage

© 2025 One Voxel. All rights reserved.

This project is developed and maintained by One Voxel for educational and demonstration purposes.

## 👥 Credits

**Developed and Published by One Voxel**

### Connect With Us
- 🔗 **LinkedIn**: [One Voxel Dev](https://www.linkedin.com/company/one-voxel-dev/)
- 📸 **Instagram**: [@onevoxel_dev](https://www.instagram.com/onevoxel_dev)
- 📧 **Email**: onevoxel.dev@gmail.com
- 💬 **WhatsApp**: +201005793518

### Deployment
- 🌐 **Live Demo**: [ov-qa-randomizer.vercel.app](https://ov-qa-randomizer.vercel.app/)
- 🗂️ **Repository**: GitHub (question-randomizer)

## 🤝 Contributing

While this is primarily a showcase project, suggestions and feedback are welcome:
1. Report issues or bugs via email
2. Suggest features on LinkedIn or Instagram
3. Share your experience using the application
4. Create your own question banks (CSV files)

## 📚 Additional Resources

### Learning Resources
- **JavaScript Modules**: Understanding ES6+ class-based architecture
- **CSS Variables**: Creating maintainable design systems
- **Web Audio API**: Implementing sound effects in web apps
- **FileReader API**: Handling client-side file uploads
- **localStorage**: Browser data persistence

### Question Bank Examples
The included CSV files demonstrate:
- **is.csv**: Information Systems fundamentals
- **os.csv**: Operating Systems concepts
- **network.csv**: Computer networking topics

### Best Practices Demonstrated
- ✅ Separation of concerns (modular architecture)
- ✅ Single responsibility principle (each module has one job)
- ✅ DRY (Don't Repeat Yourself) code organization
- ✅ Consistent naming conventions
- ✅ Comprehensive code documentation
- ✅ Responsive mobile-first design
- ✅ Accessible UI components
- ✅ SEO optimization techniques

---

**Last Updated**: November 8, 2025  
**Version**: 1.0.0  
**Built with ❤️ by One Voxel**
