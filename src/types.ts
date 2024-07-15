// src/types.ts
// Define LibraryItem
export interface LibraryItem {
  id: number;
  name: string;
  dataUrl: string;
}

// Define PlaylistItem (ensuring it includes all necessary properties)
export interface PlaylistItem extends LibraryItem {}

// Define Playlist
export interface Playlist {
  id: number;
  name: string;
  items: PlaylistItem[];
}