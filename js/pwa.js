// PWA Install Prompt Handler
let deferredPrompt;
let installButton;

window.addEventListener('load', () => {
    // Create install button
    createInstallButton();
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show install button
        showInstallButton();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallButton();
        deferredPrompt = null;
    });
});

function createInstallButton() {
    installButton = document.createElement('button');
    installButton.id = 'install-app-btn';
    installButton.className = 'hidden fixed bottom-4 right-4 z-50 py-3 px-6 rounded-full font-semibold text-sm transition-all shadow-lg';
    installButton.style.cssText = `
        background: linear-gradient(180deg, #4ade80, #22c55e);
        color: #000;
        border: 1px solid #4ade80;
    `;
    installButton.innerHTML = `
        <svg class="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Install App
    `;
    
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) {
            return;
        }
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        // Clear the deferredPrompt
        deferredPrompt = null;
        
        // Hide the install button
        hideInstallButton();
    });
    
    document.body.appendChild(installButton);
}

function showInstallButton() {
    if (installButton) {
        installButton.classList.remove('hidden');
    }
}

function hideInstallButton() {
    if (installButton) {
        installButton.classList.add('hidden');
    }
}

// Check if app is already installed
function isAppInstalled() {
    // Check if running as standalone app
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }
    // Check for iOS
    if (window.navigator.standalone === true) {
        return true;
    }
    return false;
}

// Show install instructions for iOS
function showIOSInstructions() {
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
    
    if (isIOS && !isInStandaloneMode) {
        // You can add a banner or instructions for iOS users
        console.log('To install this app on iOS, tap the Share button and then "Add to Home Screen"');
    }
}

// Initialize iOS instructions
window.addEventListener('load', showIOSInstructions);
