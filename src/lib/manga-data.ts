export interface MangaPage {
  id: string;
  imageUrl: string;
  altText: string;
}

export interface MangaChapter {
  id: string; 
  title: string; 
  pages: MangaPage[];
}

export interface Manga {
  id: string; 
  title: string; 
  coverImageUrl: string;
  chapters: MangaChapter[];
  author: string;
  description: string;
}

export const ALL_MANGA: Manga[] = [
  {
    id: "celestial-odyssey",
    title: "Celestial Odyssey",
    coverImageUrl: "https://placehold.co/300x450.png",
    author: "AI mangaka",
    description: "A grand adventure across galaxies to uncover ancient secrets and save civilizations from an encroaching darkness.",
    chapters: [
      {
        id: "chapter-1",
        title: "Chapter 1: The Call to Adventure",
        pages: Array.from({ length: 15 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Celestial Odyssey - Chapter 1, Page ${i + 1}`,
        })),
      },
      {
        id: "chapter-2",
        title: "Chapter 2: Whispers of the Void",
        pages: Array.from({ length: 20 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Celestial Odyssey - Chapter 2, Page ${i + 1}`,
        })),
      },
    ],
  },
  {
    id: "urban-chronicles",
    title: "Urban Chronicles",
    coverImageUrl: "https://placehold.co/300x450.png",
    author: "AI mangaka",
    description: "Slice-of-life stories intertwined with mysterious occurrences in a bustling, modern metropolis. Every corner holds a new story.",
    chapters: [
      {
        id: "chapter-1",
        title: "Chapter 1: The Hidden Alleyway",
        pages: Array.from({ length: 18 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Urban Chronicles - Chapter 1, Page ${i + 1}`,
        })),
      },
      {
        id: "chapter-2",
        title: "Chapter 2: Night Market Secrets",
        pages: Array.from({ length: 22 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Urban Chronicles - Chapter 2, Page ${i + 1}`,
        })),
      },
      {
        id: "chapter-3",
        title: "Chapter 3: The Rooftop Garden",
        pages: Array.from({ length: 16 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Urban Chronicles - Chapter 3, Page ${i + 1}`,
        })),
      },
    ],
  },
  {
    id: "fantasy-realm",
    title: "Fantasy Realm Online",
    coverImageUrl: "https://placehold.co/300x450.png",
    author: "AI mangaka",
    description: "Trapped in a virtual reality MMORPG, players must unite to conquer dungeons, defeat epic bosses, and find a way back to reality.",
    chapters: [
      {
        id: "chapter-1",
        title: "Chapter 1: Login",
        pages: Array.from({ length: 25 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: `https://placehold.co/800x1200.png`,
          altText: `Fantasy Realm Online - Chapter 1, Page ${i + 1}`,
        })),
      },
    ],
  },
];

export function getMangaById(id: string): Manga | undefined {
  return ALL_MANGA.find(manga => manga.id === id);
}
