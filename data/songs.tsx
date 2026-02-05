export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export const songs: Track[] = [
  {
    id: 1,
    title: "Neverender",
    artist: "Justice",
    url: "/music/Neverender.m4a", // À placer dans public/music/
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  // Ajoute d'autres morceaux ici
];