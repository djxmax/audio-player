export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  url: string;
  cover: string;
}

export const songs: Track[] = [
  {
    id: 1,
    title: "Neverender",
    artist: "Justice",
    album: "Hyperdrama",
    url: "/music/01 - Justice - Neverender.mp3", // À placer dans public/music/
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  // Ajoute d'autres morceaux ici
];
