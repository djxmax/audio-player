import { Track } from "./songs";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
}

// Données d'exemple - à remplacer par des données réelles si nécessaire
export const playlists: Playlist[] = [
  {
    id: "1",
    name: "My Favorites",
    description: "My favorite tracks collection",
    coverUrl: "https://f4.bcbits.com/img/a0336734541_16.jpg",
    tracks: [],
  },
  {
    id: "2",
    name: "Chill Vibes",
    description: "Relaxing music for work or study",
    coverUrl: "https://f4.bcbits.com/img/a0336734541_16.jpg",
    tracks: [],
  },
  {
    id: "3",
    name: "Workout Mix",
    description: "High energy tracks for workouts",
    coverUrl: "https://f4.bcbits.com/img/a0336734541_16.jpg",
    tracks: [],
  },
];
