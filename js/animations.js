// Function to create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.getElementById('floatingHearts').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 300);

// Add some sparkle to the flowers
document.querySelectorAll('.flower__light').forEach(light => {
    light.style.animationDelay = Math.random() * 2 + 's';
});