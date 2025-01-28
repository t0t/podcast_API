import { Audio } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchAudios(): Promise<Audio[]> {
    try {
        const response = await fetch(`${API_URL}/audios`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching audios:', error);
        throw error;
    }
}
