/**
 * Audio Manager Module
 * Handles all sound effects and audio controls
 */

class AudioManager {
    constructor() {
        this.soundEnabled = true;
        this.sounds = {
            opening: null,
            correct: null,
            wrong: null,
            checkpoint: null
        };
        this.soundToggleBtn = null;
        this.soundOnIcon = null;
        this.soundOffIcon = null;
    }

    /**
     * Initialize audio elements and controls
     */
    init() {
        // Get audio elements
        this.sounds.opening = document.getElementById('opening-sound');
        this.sounds.correct = document.getElementById('correct-sound');
        this.sounds.wrong = document.getElementById('wrong-sound');
        this.sounds.checkpoint = document.getElementById('checkpoint-sound');

        // Get sound toggle button and icons
        this.soundToggleBtn = document.getElementById('sound-toggle-btn');
        this.soundOnIcon = document.getElementById('sound-on-icon');
        this.soundOffIcon = document.getElementById('sound-off-icon');

        // Add event listener for sound toggle
        if (this.soundToggleBtn) {
            this.soundToggleBtn.addEventListener('click', () => this.toggleSound());
        }

        // Load saved sound preference
        const savedPreference = localStorage.getItem('soundEnabled');
        if (savedPreference !== null) {
            this.soundEnabled = savedPreference === 'true';
            this.updateSoundIcon();
        }
    }

    /**
     * Show the sound toggle button
     */
    showSoundToggle() {
        if (this.soundToggleBtn) {
            this.soundToggleBtn.classList.remove('hidden');
        }
    }

    /**
     * Hide the sound toggle button
     */
    hideSoundToggle() {
        if (this.soundToggleBtn) {
            this.soundToggleBtn.classList.add('hidden');
        }
    }

    /**
     * Toggle sound on/off
     */
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundIcon();
        
        // Save preference to localStorage
        localStorage.setItem('soundEnabled', this.soundEnabled.toString());

        // Play a test sound when enabling
        if (this.soundEnabled) {
            this.play('correct');
        }
    }

    /**
     * Update the sound icon based on current state
     */
    updateSoundIcon() {
        if (!this.soundOnIcon || !this.soundOffIcon) return;

        if (this.soundEnabled) {
            this.soundOnIcon.classList.remove('hidden');
            this.soundOffIcon.classList.add('hidden');
        } else {
            this.soundOnIcon.classList.add('hidden');
            this.soundOffIcon.classList.remove('hidden');
        }
    }

    /**
     * Play a sound effect
     * @param {string} soundName - Name of the sound to play (opening, correct, wrong, checkpoint)
     */
    play(soundName) {
        if (!this.soundEnabled) return;

        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.log('Sound playback prevented:', err);
            });
        }
    }

    /**
     * Play opening sound
     */
    playOpening() {
        this.play('opening');
    }

    /**
     * Play correct answer sound
     */
    playCorrect() {
        this.play('correct');
    }

    /**
     * Play wrong answer sound
     */
    playWrong() {
        this.play('wrong');
    }

    /**
     * Play checkpoint sound
     */
    playCheckpoint() {
        this.play('checkpoint');
    }
}

// Export for use in other modules
const audioManager = new AudioManager();
