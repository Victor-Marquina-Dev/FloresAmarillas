// Clase para manejar el estado de la música
class MusicController {
    constructor() {
        this.currentTrack = 68; // Track número 68
        this.isPlaying = false;
        this.currentTime = 0;
        this.initSpotifyEmbed();
    }

    initSpotifyEmbed() {
        // Buscar el iframe de Spotify existente o crear uno nuevo
        this.spotifyEmbed = document.querySelector('.spotify-embed') || this.createSpotifyEmbed();
        
        // Guardar el estado en localStorage cuando se navega fuera de la página
        window.addEventListener('beforeunload', () => {
            if (this.isPlaying) {
                localStorage.setItem('musicPlaying', 'true');
                localStorage.setItem('currentTrack', this.currentTrack.toString());
                localStorage.setItem('currentTime', this.currentTime.toString());
            }
        });

        // Restaurar el estado si venimos de otra página
        if (localStorage.getItem('musicPlaying') === 'true') {
            this.isPlaying = true;
            this.currentTrack = parseInt(localStorage.getItem('currentTrack') || '68');
            this.currentTime = parseInt(localStorage.getItem('currentTime') || '0');
            this.play();
        }
    }

    createSpotifyEmbed() {
        const embed = document.createElement('div');
        embed.className = 'spotify-embed music-controls';
        embed.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; width: 300px;';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/playlist/5uUvK2zHVqZxE4r4jz8XwE?utm_source=generator&track=${this.currentTrack}&autoplay=1`;
        iframe.width = "100%";
        iframe.height = "80";
        iframe.frameBorder = "0";
        iframe.style.borderRadius = "12px";
        iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        
        embed.appendChild(iframe);
        document.body.appendChild(embed);
        return embed;
    }

    play() {
        const iframe = this.spotifyEmbed.querySelector('iframe');
        if (iframe) {
            const currentSrc = new URL(iframe.src);
            currentSrc.searchParams.set('autoplay', '1');
            iframe.src = currentSrc.toString();
            this.isPlaying = true;
        }
    }

    updatePosition(position) {
        this.currentTime = position;
        localStorage.setItem('currentTime', position.toString());
    }
}

// Inicializar el controlador de música cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.musicController = new MusicController();
});

// Asegurarse de que la música comience cuando el usuario interactúe
document.addEventListener('click', () => {
    if (window.musicController && !window.musicController.isPlaying) {
        window.musicController.play();
    }
}, { once: true });