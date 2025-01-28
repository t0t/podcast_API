import { Audio, AudioPlayer } from './types';
import { formatDuration, formatBytes } from './utils';
import { fetchAudios } from './api';

class PodcastPlayer implements AudioPlayer {
    audioList: Audio[] = [];
    loading: boolean = false;
    error: string | null = null;
    private container: HTMLElement;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) throw new Error(`Container with id ${containerId} not found`);
        this.container = element;
        this.init();
    }

    private async init() {
        try {
            this.loading = true;
            this.render();
            this.audioList = await fetchAudios();
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Error al cargar los audios';
        } finally {
            this.loading = false;
            this.render();
        }
    }

    private createAudioCard(audio: Audio): string {
        return `
            <div class="card">
                <h3 class="card-title">${audio.title}</h3>
                <div class="card-content">
                    <audio controls class="audio-player">
                        <source src="${audio.url}" type="audio/${audio.format}">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                    <div class="audio-info">
                        Tamaño: ${formatBytes(audio.bytes)}
                    </div>
                </div>
            </div>
        `;
    }

    private render() {
        if (this.loading) {
            this.container.innerHTML = '<div class="loading">Cargando...</div>';
            return;
        }

        if (this.error) {
            this.container.innerHTML = `<div class="error">${this.error}</div>`;
            return;
        }

        this.container.innerHTML = `
            <h1>Reproductor de Audio</h1>
            <div class="audio-grid">
                ${this.audioList.map(audio => this.createAudioCard(audio)).join('')}
            </div>
        `;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PodcastPlayer('app');
});
