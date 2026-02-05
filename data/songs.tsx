export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  url: string;
  cover: string;
}

const justiceAlbum: Track[] = [
  {
    id: 1,
    title: "Neverender",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 266,
    url: "/music/01 - Justice - Neverender.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 2,
    title: "Generator",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 282,
    url: "/music/02 - Justice - Generator.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 3,
    title: "Afterimage",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 245,
    url: "/music/03 - Justice - Afterimage.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 4,
    title: "One Night-All Night",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 276,
    url: "/music/04 - Justice - One Night-All Night.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 5,
    title: "Dear Alan",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 333,
    url: "/music/05 - Justice - Dear Alan.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 6,
    title: "Incognito",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 241,
    url: "/music/06 - Justice - Incognito.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 7,
    title: "Mannequin Love",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 207,
    url: "/music/07 - Justice - Mannequin Love.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 8,
    title: "Moonlight Rendez-vous",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 120,
    url: "/music/08 - Justice - Moonlight Rendez-vous.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 9,
    title: "Explorer",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 249,
    url: "/music/09 - Justice - Explorer.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 10,
    title: "Muscle Memory",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 250,
    url: "/music/10 - Justice - Muscle Memory.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 11,
    title: "Harpy dream",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 28,
    url: "/music/11 - Justice - Harpy dream.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 12,
    title: "Saturnine",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 317,
    url: "/music/12 - Justice - Saturnine.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
  {
    id: 13,
    title: "The End",
    artist: "Justice",
    album: "Hyperdrama",
    duration: 254,
    url: "/music/13 - Justice - The End.mp3",
    cover: "https://f4.bcbits.com/img/a0336734541_16.jpg",
  },
];

const otherSongs: Track[] = [
  {
    id: 14,
    title: "Club Party Dance Music",
    artist: "Tatamusic",
    duration: 103,
    url: "/music/tatamusic-club-party-dance-music.mp3",
    cover: "https://cdn.pixabay.com/audio/2026/02/02/12-59-51-96_200x200.png",
  },
  {
    id: 15,
    title: "Sport Techno",
    artist: "Watermello",
    duration: 110,
    url: "/music/watermello-sport-techno.mp3",
    cover: "https://cdn.pixabay.com/audio/2026/01/31/11-40-49-940_200x200.png",
  },
  {
    id: 16,
    title: "Dance Queen",
    artist: "White Records",
    duration: 39,
    url: "/music/white_records-dance-queen.mp3",
    cover: "https://cdn.pixabay.com/audio/2025/10/29/07-59-56-955_200x200.jpg",
  },
];

export const songs: Track[] =
  process.env.NODE_ENV === "development"
    ? [...justiceAlbum, ...otherSongs]
    : otherSongs;
