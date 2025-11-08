/**
 * Main Application Entry Point
 * Initializes all modules and sets up event listeners
 */

// Application state
const app = {
    initialized: false
};

/**
 * Initialize the application
 */
function initializeApp() {
    if (app.initialized) return;

    // Initialize all managers
    audioManager.init();
    timerManager.init();
    uiManager.init();

    // Set up event listeners
    setupEventListeners();

    // Show ready modal on load
    uiManager.showReadyModal();

    app.initialized = true;
    console.log('Quiz application initialized successfully');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Ready Modal
    const readyYesBtn = document.getElementById('ready-yes-btn');
    const readyNoBtn = document.getElementById('ready-no-btn');

    readyYesBtn.addEventListener('click', handleReadyYes);
    readyNoBtn.addEventListener('click', handleReadyNo);

    // File Upload
    const csvFileInput = document.getElementById('csv-file');
    csvFileInput.addEventListener('change', handleFileUpload);

    // Quiz Controls
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', handleStartQuiz);

    const answersGrid = document.getElementById('answers-grid');
    answersGrid.addEventListener('click', handleAnswerClick);

    const skipButton = document.getElementById('skip-button');
    skipButton.addEventListener('click', handleSkipQuestion);

    // Results Controls
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', handleRestart);

    const newFileButton = document.getElementById('new-file-button');
    newFileButton.addEventListener('click', handleNewFile);

    const reviewButton = document.getElementById('review-button');
    reviewButton.addEventListener('click', handleReview);

    // Files Modal
    const showFilesBtn = document.getElementById('show-files-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const filesModal = document.getElementById('files-modal');

    showFilesBtn.addEventListener('click', () => uiManager.showFilesModal());
    closeModalBtn.addEventListener('click', () => uiManager.hideFilesModal());
    
    filesModal.addEventListener('click', (e) => {
        if (e.target === filesModal) {
            uiManager.hideFilesModal();
        }
    });

    // Auto-add file buttons
    const autoAddButtons = document.querySelectorAll('.auto-add-btn');
    autoAddButtons.forEach(btn => {
        btn.addEventListener('click', () => handleAutoAddFile(btn.dataset.file));
    });
}

/**
 * Handle Ready Modal - Yes button
 */
function handleReadyYes() {
    uiManager.hideReadyModal();
    audioManager.showSoundToggle();
    audioManager.playOpening();
}

/**
 * Handle Ready Modal - No button
 */
function handleReadyNo() {
    window.close();
    setTimeout(() => {
        window.location.href = 'about:blank';
    }, 100);
}

/**
 * Handle file upload from input
 * @param {Event} e - Change event
 */
async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        const questions = await fileHandler.loadFromFile(file);
        
        if (questions.length > 0) {
            uiManager.updateStartButton(true, questions.length);
        } else {
            uiManager.updateStartButton(false);
            alert('No valid questions found in the file.');
        }
    } catch (error) {
        console.error('Error loading file:', error);
        alert('Error reading the file. Please check the format.');
        uiManager.updateStartButton(false);
    }
}

/**
 * Handle auto-add file from preset options
 * @param {string} filePath - Path to CSV file
 */
async function handleAutoAddFile(filePath) {
    try {
        const questions = await fileHandler.loadFromURL(filePath);
        
        if (questions.length > 0) {
            uiManager.updateStartButton(true, questions.length);
            uiManager.hideFilesModal();
        } else {
            alert('No valid questions found in the file.');
        }
    } catch (error) {
        console.error('Error loading CSV file:', error);
        alert('Error loading the file. Please try downloading it instead.');
    }
}

/**
 * Handle Start Quiz button
 */
function handleStartQuiz() {
    if (!fileHandler.hasQuestions()) {
        alert('Please upload a CSV file first.');
        return;
    }

    const questions = fileHandler.getQuestions();
    quizManager.start(questions, false);
}

/**
 * Handle answer button click
 * @param {Event} e - Click event
 */
function handleAnswerClick(e) {
    if (!e.target.classList.contains('answer-btn')) return;
    quizManager.handleAnswer(e.target);
}

/**
 * Handle skip question
 */
function handleSkipQuestion() {
    quizManager.skipQuestion();
}

/**
 * Handle restart quiz
 */
function handleRestart() {
    if (!fileHandler.hasQuestions()) {
        uiManager.showUploadScreen();
        return;
    }

    const questions = fileHandler.getQuestions();
    timerManager.reset();
    quizManager.start(questions, false);
}

/**
 * Handle new file upload
 */
function handleNewFile() {
    fileHandler.clear();
    uiManager.resetFileInput();
    uiManager.updateStartButton(false);
    uiManager.showUploadScreen();
    timerManager.reset();
    audioManager.hideSoundToggle();
}

/**
 * Handle review mistakes
 */
function handleReview() {
    const wrongQuestions = quizManager.getWrongQuestions();
    
    if (wrongQuestions.length === 0) {
        alert('No mistakes to review!');
        return;
    }

    timerManager.reset();
    quizManager.start(wrongQuestions, true);
}

/**
 * Initialize app when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
