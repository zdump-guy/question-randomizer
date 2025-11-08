/**
 * Timer Module
 * Handles all timing functionality for the quiz
 */

class TimerManager {
    constructor() {
        this.startTime = null;
        this.timerInterval = null;
        this.questionStartTime = null;
        this.questionTimes = []; // Array to store time for each question
        this.currentQuestionNumber = 0;
        this.timerDisplay = null;
    }

    /**
     * Initialize timer display element
     */
    init() {
        this.timerDisplay = document.getElementById('timer-display');
    }

    /**
     * Start the quiz timer
     */
    start() {
        this.startTime = Date.now();
        this.questionStartTime = Date.now();
        this.questionTimes = [];
        this.currentQuestionNumber = 1;
        
        // Update timer display every second
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
        
        this.updateDisplay();
    }

    /**
     * Stop the timer
     */
    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Record time for current question and move to next
     * @param {string} questionText - The question text for reference
     */
    recordQuestionTime(questionText) {
        if (!this.questionStartTime) return;

        const timeSpent = Math.floor((Date.now() - this.questionStartTime) / 1000);
        this.questionTimes.push({
            questionNumber: this.currentQuestionNumber,
            questionText: questionText,
            timeSeconds: timeSpent
        });

        // Reset for next question
        this.questionStartTime = Date.now();
        this.currentQuestionNumber++;
    }

    /**
     * Update the timer display
     */
    updateDisplay() {
        if (!this.startTime || !this.timerDisplay) return;

        const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        
        this.timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    /**
     * Get total elapsed time in seconds
     * @returns {number}
     */
    getTotalTime() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    /**
     * Get total elapsed time formatted as MM:SS
     * @returns {string}
     */
    getTotalTimeFormatted() {
        const totalSeconds = this.getTotalTime();
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    /**
     * Get average time per question in seconds
     * @returns {number}
     */
    getAverageTime() {
        if (this.questionTimes.length === 0) return 0;
        
        const totalTime = this.questionTimes.reduce((sum, q) => sum + q.timeSeconds, 0);
        return Math.round(totalTime / this.questionTimes.length);
    }

    /**
     * Get all question times
     * @returns {Array}
     */
    getQuestionTimes() {
        return [...this.questionTimes];
    }

    /**
     * Get number of questions answered
     * @returns {number}
     */
    getQuestionsAnswered() {
        return this.questionTimes.length;
    }

    /**
     * Format seconds into readable format
     * @param {number} seconds
     * @returns {string}
     */
    formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    /**
     * Reset the timer
     */
    reset() {
        this.stop();
        this.startTime = null;
        this.questionStartTime = null;
        this.questionTimes = [];
        this.currentQuestionNumber = 0;
        
        if (this.timerDisplay) {
            this.timerDisplay.textContent = '00:00';
        }
    }

    /**
     * Get detailed statistics
     * @returns {Object}
     */
    getStatistics() {
        return {
            totalTime: this.getTotalTime(),
            totalTimeFormatted: this.getTotalTimeFormatted(),
            averageTime: this.getAverageTime(),
            questionsAnswered: this.getQuestionsAnswered(),
            questionTimes: this.getQuestionTimes(),
            fastestQuestion: this.getFastestQuestion(),
            slowestQuestion: this.getSlowestQuestion()
        };
    }

    /**
     * Get the fastest answered question
     * @returns {Object|null}
     */
    getFastestQuestion() {
        if (this.questionTimes.length === 0) return null;
        return this.questionTimes.reduce((fastest, current) => 
            current.timeSeconds < fastest.timeSeconds ? current : fastest
        );
    }

    /**
     * Get the slowest answered question
     * @returns {Object|null}
     */
    getSlowestQuestion() {
        if (this.questionTimes.length === 0) return null;
        return this.questionTimes.reduce((slowest, current) => 
            current.timeSeconds > slowest.timeSeconds ? current : slowest
        );
    }
}

// Export for use in other modules
const timerManager = new TimerManager();
