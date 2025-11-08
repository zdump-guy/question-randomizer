/**
 * UI Manager Module
 * Handles all UI updates and DOM manipulations
 */

class UIManager {
    constructor() {
        // Container elements
        this.uploadContainer = null;
        this.quizContainer = null;
        this.resultsContainer = null;
        this.filesModal = null;
        this.readyModal = null;
        this.skipContainer = null;

        // Quiz elements
        this.questionText = null;
        this.answersGrid = null;
        this.feedbackMessage = null;
        
        // Stats elements
        this.questionNumberSpan = null;
        this.totalQuestionsSpan = null;
        this.streakCounterSpan = null;
        this.checkpointMarkerSpan = null;
        this.correctCountSpan = null;
        this.wrongCountSpan = null;

        // Results elements
        this.finalCorrectSpan = null;
        this.finalWrongSpan = null;
        this.finalTotalTime = null;
        this.finalAvgTime = null;
        this.finalQuestionsAnswered = null;
        this.questionTimesList = null;
        this.reviewButton = null;

        // Buttons
        this.startButton = null;
        this.restartButton = null;
        this.newFileButton = null;
        this.skipButton = null;

        this.feedbackTimeout = null;
    }

    /**
     * Initialize all UI elements
     */
    init() {
        // Containers
        this.uploadContainer = document.getElementById('upload-container');
        this.quizContainer = document.getElementById('quiz-container');
        this.resultsContainer = document.getElementById('results-container');
        this.filesModal = document.getElementById('files-modal');
        this.readyModal = document.getElementById('ready-modal');
        this.skipContainer = document.getElementById('skip-container');

        // Quiz elements
        this.questionText = document.getElementById('question-text');
        this.answersGrid = document.getElementById('answers-grid');
        this.feedbackMessage = document.getElementById('feedback-message');

        // Stats elements
        this.questionNumberSpan = document.getElementById('question-number');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.streakCounterSpan = document.getElementById('streak-counter');
        this.checkpointMarkerSpan = document.getElementById('checkpoint-marker');
        this.correctCountSpan = document.getElementById('correct-count');
        this.wrongCountSpan = document.getElementById('wrong-count');

        // Results elements
        this.finalCorrectSpan = document.getElementById('final-correct');
        this.finalWrongSpan = document.getElementById('final-wrong');
        this.finalTotalTime = document.getElementById('final-total-time');
        this.finalAvgTime = document.getElementById('final-avg-time');
        this.finalQuestionsAnswered = document.getElementById('final-questions-answered');
        this.questionTimesList = document.getElementById('question-times-list');
        this.reviewButton = document.getElementById('review-button');

        // Buttons
        this.startButton = document.getElementById('start-button');
        this.restartButton = document.getElementById('restart-button');
        this.newFileButton = document.getElementById('new-file-button');
        this.skipButton = document.getElementById('skip-button');
    }

    /**
     * Show upload screen
     */
    showUploadScreen() {
        this.hideAll();
        this.uploadContainer.classList.remove('hidden');
    }

    /**
     * Show quiz screen
     */
    showQuizScreen() {
        this.hideAll();
        this.quizContainer.classList.remove('hidden');
    }

    /**
     * Show results screen
     */
    showResultsScreen() {
        this.hideAll();
        this.resultsContainer.classList.remove('hidden');
    }

    /**
     * Hide all screens
     */
    hideAll() {
        this.uploadContainer.classList.add('hidden');
        this.quizContainer.classList.add('hidden');
        this.resultsContainer.classList.add('hidden');
    }

    /**
     * Show ready modal
     */
    showReadyModal() {
        this.readyModal.classList.remove('hidden');
    }

    /**
     * Hide ready modal
     */
    hideReadyModal() {
        this.readyModal.classList.add('hidden');
    }

    /**
     * Show files modal
     */
    showFilesModal() {
        this.filesModal.classList.remove('hidden');
    }

    /**
     * Hide files modal
     */
    hideFilesModal() {
        this.filesModal.classList.add('hidden');
    }

    /**
     * Show skip button
     */
    showSkipButton() {
        this.skipContainer.classList.remove('hidden');
    }

    /**
     * Hide skip button
     */
    hideSkipButton() {
        this.skipContainer.classList.add('hidden');
    }

    /**
     * Update quiz statistics display
     * @param {Object} stats - Statistics object
     */
    updateStats(stats) {
        if (this.questionNumberSpan) {
            this.questionNumberSpan.textContent = stats.currentQuestion;
        }
        if (this.totalQuestionsSpan) {
            this.totalQuestionsSpan.textContent = stats.totalQuestions;
        }
        if (this.streakCounterSpan) {
            this.streakCounterSpan.textContent = stats.streak;
        }
        if (this.checkpointMarkerSpan) {
            this.checkpointMarkerSpan.textContent = stats.checkpoint;
        }
        if (this.correctCountSpan) {
            this.correctCountSpan.textContent = stats.correct;
        }
        if (this.wrongCountSpan) {
            this.wrongCountSpan.textContent = stats.wrong;
        }
    }

    /**
     * Display a question with shuffled answers
     * @param {Object} question - Question object
     * @param {number} questionNumber - Current question number
     */
    displayQuestion(question, questionNumber) {
        this.questionText.textContent = question.question;
        this.questionNumberSpan.textContent = questionNumber;

        // Shuffle options
        const shuffledOptions = this.shuffleArray([...question.options]);

        // Clear previous answers
        this.answersGrid.innerHTML = '';

        // Create answer buttons
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-btn w-full py-3 sm:py-4 px-4 sm:px-5 rounded-lg text-left text-base sm:text-lg focus:outline-none transition-all';
            button.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.015)); border: 1px solid var(--border); color: var(--text-100); min-height: 48px;';
            button.textContent = option;
            button.dataset.answer = option;
            
            if (option === question.correct) {
                button.dataset.correct = 'true';
            }
            
            this.answersGrid.appendChild(button);
        });

        this.showFeedback('', null);
    }

    /**
     * Show feedback message
     * @param {string} message - Feedback message
     * @param {string} type - Type of feedback (correct, wrong, checkpoint)
     */
    showFeedback(message, type) {
        if (this.feedbackTimeout) {
            clearTimeout(this.feedbackTimeout);
        }

        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `feedback ${type || ''}`;

        if (message) {
            void this.feedbackMessage.offsetWidth;
            this.feedbackMessage.classList.add('show');
        }
    }

    /**
     * Mark answer button as correct
     * @param {HTMLElement} button - Button element
     */
    markAnswerCorrect(button) {
        button.classList.add('correct');
    }

    /**
     * Mark answer button as wrong
     * @param {HTMLElement} button - Button element
     */
    markAnswerWrong(button) {
        button.classList.add('wrong');
    }

    /**
     * Disable all answer buttons
     */
    disableAnswerButtons() {
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    /**
     * Get correct answer button
     * @returns {HTMLElement|null}
     */
    getCorrectAnswerButton() {
        return this.answersGrid.querySelector('[data-correct="true"]');
    }

    /**
     * Update start button state
     * @param {boolean} enabled - Whether button should be enabled
     * @param {number} questionCount - Number of questions loaded
     */
    updateStartButton(enabled, questionCount = 0) {
        if (!this.startButton) return;

        this.startButton.disabled = !enabled;
        
        if (enabled && questionCount > 0) {
            this.startButton.textContent = `Start Quiz (${questionCount} Questions)`;
            this.startButton.style.cssText = 'background: linear-gradient(180deg, var(--muted-300), var(--muted-200)); color: var(--text-100); border: 1px solid var(--border); cursor: pointer;';
        } else if (!enabled) {
            this.startButton.textContent = 'Start Quiz';
            this.startButton.style.cssText = 'background: var(--bg-600); color: var(--text-80); border: 1px solid var(--border); cursor: not-allowed; opacity: 0.5;';
        }
    }

    /**
     * Display final results
     * @param {Object} results - Results object with scores and timer stats
     */
    displayResults(results) {
        // Update score
        this.finalCorrectSpan.textContent = results.correct;
        this.finalWrongSpan.textContent = results.wrong;

        // Update timer statistics
        this.finalTotalTime.textContent = results.timerStats.totalTimeFormatted;
        this.finalAvgTime.textContent = timerManager.formatTime(results.timerStats.averageTime);
        this.finalQuestionsAnswered.textContent = results.timerStats.questionsAnswered;

        // Display detailed question times
        this.displayQuestionTimes(results.timerStats.questionTimes);

        // Show/hide review button
        if (results.wrongQuestions.length > 0 && !results.isReviewMode) {
            this.reviewButton.classList.remove('hidden');
            this.reviewButton.textContent = `Review Your Mistakes (${results.wrongQuestions.length} questions)`;
        } else {
            this.reviewButton.classList.add('hidden');
        }
    }

    /**
     * Display detailed question times list
     * @param {Array} questionTimes - Array of question time objects
     */
    displayQuestionTimes(questionTimes) {
        if (!this.questionTimesList) return;

        this.questionTimesList.innerHTML = '';

        if (questionTimes.length === 0) {
            this.questionTimesList.innerHTML = '<p style="color: var(--text-80);">No timing data available</p>';
            return;
        }

        questionTimes.forEach((qt, index) => {
            const timeEntry = document.createElement('div');
            timeEntry.className = 'flex justify-between items-center py-1';
            
            const questionPreview = qt.questionText.length > 50 
                ? qt.questionText.substring(0, 50) + '...' 
                : qt.questionText;
            
            timeEntry.innerHTML = `
                <span>Q${qt.questionNumber}: ${questionPreview}</span>
                <span class="font-bold" style="color: #60a5fa;">${timerManager.formatTime(qt.timeSeconds)}</span>
            `;
            
            this.questionTimesList.appendChild(timeEntry);
        });
    }

    /**
     * Shuffle array utility
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Reset file input
     */
    resetFileInput() {
        const csvFileInput = document.getElementById('csv-file');
        if (csvFileInput) {
            csvFileInput.value = '';
        }
    }
}

// Export for use in other modules
const uiManager = new UIManager();
