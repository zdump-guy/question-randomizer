/**
 * File Handler Module
 * Handles CSV file loading and parsing
 */

class FileHandler {
    constructor() {
        this.allQuestions = [];
    }

    /**
     * Parse CSV text into questions array
     * @param {string} csvText - Raw CSV text
     * @returns {Array} Array of question objects
     */
    parseCSV(csvText) {
        const questions = [];
        const lines = csvText.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
            const parts = line.split(',');

            if (parts.length === 6) {
                const [question, o1, o2, o3, o4, correct] = parts.map(s => 
                    s.trim().replace(/^"|"$/g, '')
                );
                
                if (question && o1 && o2 && o3 && o4 && correct) {
                    questions.push({
                        question: question,
                        options: [o1, o2, o3, o4],
                        correct: correct
                    });
                }
            } else {
                console.warn('Skipping malformed line:', line);
            }
        }

        this.allQuestions = questions;
        return questions;
    }

    /**
     * Load CSV file from a URL/path
     * @param {string} filePath - Path to CSV file
     * @returns {Promise<Array>} Promise resolving to questions array
     */
    async loadFromURL(filePath) {
        try {
            const response = await fetch(filePath);
            const csvText = await response.text();
            return this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading CSV file:', error);
            throw error;
        }
    }

    /**
     * Handle file input from user
     * @param {File} file - File object from input
     * @returns {Promise<Array>} Promise resolving to questions array
     */
    async loadFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const questions = this.parseCSV(event.target.result);
                    resolve(questions);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = (error) => {
                reject(error);
            };
            
            reader.readAsText(file);
        });
    }

    /**
     * Get all loaded questions
     * @returns {Array}
     */
    getQuestions() {
        return [...this.allQuestions];
    }

    /**
     * Get question count
     * @returns {number}
     */
    getQuestionCount() {
        return this.allQuestions.length;
    }

    /**
     * Validate if questions are loaded
     * @returns {boolean}
     */
    hasQuestions() {
        return this.allQuestions.length > 0;
    }

    /**
     * Clear all loaded questions
     */
    clear() {
        this.allQuestions = [];
    }
}

// Export for use in other modules
const fileHandler = new FileHandler();
