export interface Audio {
    url: string;
    title: string;
    format: string;
    duration?: number;
    bytes: number;
    created_at: string;
}

export interface AudioPlayer {
    audioList: Audio[];
    loading: boolean;
    error: string | null;
}
