// src/types.ts
export interface PlaylistItem {
    type: 'image' | 'video';
    name: string;
    duration: string;
    dataUrl: string;
  }
  
  export interface Playlist {
    id: number;
    name: string;
    items: PlaylistItem[];
  }