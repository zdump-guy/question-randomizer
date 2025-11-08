/**
 * Quiz Manager Module
 * Main quiz logic and state management
 */

class QuizManager {
    constructor() {
        this.shuffledQuestions = [];
        this.currentQuestionIndex = 0;
        this.checkpointIndex = 0;
        this.consecutiveStreak = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.questionAttempts = {};
        this.wrongQuestions = [];
        this.isReviewMode = false;
        this.uniqueCorrectQuestions = new Set();
        this.uniqueWrongQuestions = new Set();
    }

    /**
     * Start a new quiz
     * @param {Array} questions - Array of questions to use
     * @param {boolean} isReview - Whether this is a review mode
     */
    start(questions, isReview = false) {
        // Reset state
        this.currentQuestionIndex = 0;
        this.checkpointIndex = 0;
        this.consecutiveStreak = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.questionAttempts = {};
        this.isReviewMode = isReview;
        this.uniqueCorrectQuestions.clear();
        this.uniqueWrongQuestions.clear();

        if (isReview) {
            this.shuffledQuestions = [...questions];
            this.wrongQuestions = [];
        } else {
            this.shuffledQuestions = this.shuffleArray([...questions]);
            this.wrongQuestions = [];
        }

        // Start timer
        timerManager.start();

        // Update UI
        uiManager.showQuizScreen();
        uiManager.hideSkipButton();
        this.updateStats();
        this.displayCurrentQuestion();
    }

    /**
     * Display current question
     */
    displayCurrentQuestion() {
        if (this.currentQuestionIndex >= this.shuffledQuestions.length) {
            this.endQuiz();
            return;
        }

        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const questionKey = question.question;
        const currentAttempts = this.questionAttempts[questionKey] || 0;

        // Show skip button if 4+ attempts
        if (currentAttempts >= 4) {
            uiManager.showSkipButton();
        } else {
            uiManager.hideSkipButton();
        }

        uiManager.displayQuestion(question, this.currentQuestionIndex + 1);
    }

    /**
     * Handle answer selection
     * @param {HTMLElement} selectedButton - The clicked answer button
     */
    handleAnswer(selectedButton) {
        uiManager.disableAnswerButtons();

        const isCorrect = selectedButton.dataset.correct === 'true';
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const questionKey = currentQuestion.question;

        // Record time for this question
        timerManager.recordQuestionTime(currentQuestion.question);

        let nextQuestionIndex = this.currentQuestionIndex;
        let feedbackDelay = 1500;

        if (isCorrect) {
            this.handleCorrectAnswer(selectedButton, questionKey);
            nextQuestionIndex = this.currentQuestionIndex + 1;
        } else {
            const result = this.handleWrongAnswer(selectedButton, questionKey, currentQuestion);
            nextQuestionIndex = result.nextIndex;
            feedbackDelay = result.delay;
        }

        this.updateStats();

        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex = nextQuestionIndex;
            this.displayCurrentQuestion();
        }, feedbackDelay);
    }

    /**
     * Handle correct answer
     * @param {HTMLElement} button - The answer button
     * @param {string} questionKey - Unique question identifier
     */
    handleCorrectAnswer(button, questionKey) {
        uiManager.markAnswerCorrect(button);
        this.consecutiveStreak++;

        // Play correct sound
        audioManager.playCorrect();

        // Track unique correct answer
        if (!this.uniqueWrongQuestions.has(questionKey) && 
            !this.uniqueCorrectQuestions.has(questionKey)) {
            this.uniqueCorrectQuestions.add(questionKey);
            this.totalCorrect++;
        }

        // Clear attempts
        if (this.questionAttempts[questionKey]) {
            delete this.questionAttempts[questionKey];
        }

        uiManager.hideSkipButton();
        uiManager.showFeedback('Correct!', 'correct');

        // Check for checkpoint
        if (this.consecutiveStreak === 5 && !this.isReviewMode) {
            this.checkpointIndex = this.currentQuestionIndex + 1;
            this.consecutiveStreak = 0;

            setTimeout(() => {
                audioManager.playCheckpoint();
                uiManager.showFeedback(
                    `Checkpoint Reached! Progress saved at Q${this.checkpointIndex + 1}`,
                    'checkpoint'
                );
            }, 750);
        }
    }

    /**
     * Handle wrong answer
     * @param {HTMLElement} button - The answer button
     * @param {string} questionKey - Unique question identifier
     * @param {Object} currentQuestion - Current question object
     * @returns {Object} Object with nextIndex and delay
     */
    handleWrongAnswer(button, questionKey, currentQuestion) {
        uiManager.markAnswerWrong(button);
        this.consecutiveStreak = 0;

        // Play wrong sound
        audioManager.playWrong();

        // Update unique tracking
        if (this.uniqueCorrectQuestions.has(questionKey)) {
            this.uniqueCorrectQuestions.delete(questionKey);
            this.totalCorrect--;
        }

        if (!this.uniqueWrongQuestions.has(questionKey)) {
            this.uniqueWrongQuestions.add(questionKey);
            this.totalWrong++;
        }

        // Increment attempts
        this.questionAttempts[questionKey] = (this.questionAttempts[questionKey] || 0) + 1;
        const currentAttempts = this.questionAttempts[questionKey];

        // Show correct answer
        const correctBtn = uiManager.getCorrectAnswerButton();
        if (correctBtn) {
            uiManager.markAnswerCorrect(correctBtn);
        }

        // Track wrong question
        const questionAlreadyTracked = this.wrongQuestions.some(
            q => q.question === currentQuestion.question
        );
        if (!questionAlreadyTracked) {
            this.wrongQuestions.push({...currentQuestion});
        }

        let nextIndex = this.currentQuestionIndex;
        let delay = 3000;

        // Determine feedback and next action
        if (currentAttempts >= 3) {
            uiManager.showSkipButton();
            uiManager.showFeedback(
                `Wrong! You can skip this question or try again.`,
                'wrong'
            );
        } else if (this.isReviewMode) {
            uiManager.showFeedback(
                `Wrong! Try again. (Attempt ${currentAttempts}/4)`,
                'wrong'
            );
        } else {
            uiManager.showFeedback(
                `Wrong! Returning to checkpoint (Q${this.checkpointIndex + 1})`,
                'wrong'
            );
            nextIndex = this.checkpointIndex;
        }

        return { nextIndex, delay };
    }

    /**
     * Skip current question
     */
    skipQuestion() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const questionKey = currentQuestion.question;

        // Record time even for skipped question
        timerManager.recordQuestionTime(currentQuestion.question);

        // Clear attempts
        if (this.questionAttempts[questionKey]) {
            delete this.questionAttempts[questionKey];
        }

        uiManager.hideSkipButton();
        this.currentQuestionIndex++;
        uiManager.showFeedback('Question skipped.', 'checkpoint');

        setTimeout(() => {
            this.displayCurrentQuestion();
        }, 1000);
    }

    /**
     * End the quiz and show results
     */
    endQuiz() {
        // Stop timer
        timerManager.stop();

        // Get timer statistics
        const timerStats = timerManager.getStatistics();

        // Prepare results
        const results = {
            correct: this.totalCorrect,
            wrong: this.totalWrong,
            wrongQuestions: this.wrongQuestions,
            isReviewMode: this.isReviewMode,
            timerStats: timerStats
        };

        // Display results
        uiManager.displayResults(results);
        uiManager.showResultsScreen();
    }

    /**
     * Update statistics display
     */
    updateStats() {
        uiManager.updateStats({
            currentQuestion: this.currentQuestionIndex + 1,
            totalQuestions: this.shuffledQuestions.length,
            streak: this.consecutiveStreak,
            checkpoint: this.checkpointIndex + 1,
            correct: this.totalCorrect,
            wrong: this.totalWrong
        });
    }

    /**
     * Get wrong questions for review
     * @returns {Array}
     */
    getWrongQuestions() {
        return [...this.wrongQuestions];
    }

    /**
     * Shuffle array utility
     * @param {Array} array
     * @returns {Array}
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Export for use in other modules
const quizManager = new QuizManager();
