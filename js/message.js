// Function to close the message
function closeMessage() {
    const message = document.getElementById('messageOverlay');
    message.style.animation = 'fadeOutMessage 0.5s ease-out forwards';
    setTimeout(() => {
        message.style.display = 'none';
    }, 500);
}

// Start music at 10 seconds
window.addEventListener('DOMContentLoaded', (event) => {
    const audioElements = document.getElementsByTagName('audio');
    if (audioElements.length > 0) {
        const audio = audioElements[0];
        audio.currentTime = 10;
        audio.play();
    }
});