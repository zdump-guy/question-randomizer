// =================== LOADING SCREEN MODULE ===================
// Handles the initial loading animation timing

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (!loadingScreen) {
            console.error('Loading screen element not found');
            return;
        }
        
        // Total animation duration: 3.5 seconds
        const totalDuration = 3500;
        
        // Hide loading screen after animation completes
        setTimeout(function() {
            loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after fade out
            setTimeout(function() {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 800);
        }, totalDuration);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoadingScreen);
    } else {
        initLoadingScreen();
    }
})();

