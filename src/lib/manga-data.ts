import managaJSON from './manga-data.json';
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

export const ALL_MANGA: Manga[] = managaJSON;


export function getMangaById(id: string): Manga | undefined {
  return ALL_MANGA.find(manga => manga.id === id);
}
