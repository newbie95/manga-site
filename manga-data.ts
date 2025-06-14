import fs from 'fs/promises';
import path from 'path';
import { Manga, MangaChapter, MangaPage } from './src/lib/manga-data';

const STORIES_PATH = path.join(process.cwd(), 'public', 'assets', 'stories');

interface ChapterFiles {
  pages: string[];
  coverImage?: string;
}

async function getMangaFiles(mangaPath: string): Promise<ChapterFiles> {
  const files = await fs.readdir(mangaPath);
  return {
    pages: files.filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i) && !f.match(/cover|poster|thumbnail/i)),
    coverImage: files.find(f => f.match(/cover|poster|thumbnail\.(jpg|jpeg|png|webp)$/i))
  };
}

async function generateMangaData(): Promise<Manga[]> {
  const mangaFolders = await fs.readdir(STORIES_PATH);
  const mangas: Manga[] = [];

  for (const mangaFolder of mangaFolders) {
    const mangaPath = path.join(STORIES_PATH, mangaFolder);
    const stat = await fs.stat(mangaPath);
    
    if (!stat.isDirectory()) continue;

    const { coverImage } = await getMangaFiles(mangaPath);
    const coverImageUrl = coverImage 
      ? `/assets/stories/${mangaFolder}/${coverImage}`
      : '/placeholder-cover.png';

    const chapters: MangaChapter[] = [];
    const chapterFolders = (await fs.readdir(mangaPath))
      .filter(f => f.match(/chapter-\d+/i));

    for (const chapterFolder of chapterFolders) {
      const chapterPath = path.join(mangaPath, chapterFolder);
      const { pages } = await getMangaFiles(chapterPath);

      // Sort pages using natural sort for filenames
      const sortedPages = pages.sort((a, b) => {
        const aMatch = a.match(/\d+/);
        const bMatch = b.match(/\d+/);
        if (!aMatch || !bMatch) return a.localeCompare(b);
        return parseInt(aMatch[0]) - parseInt(bMatch[0]);
      });

      chapters.push({
        id: chapterFolder,
        title: `Chapter ${chapterFolder.replace('chapter-', '')}`,
        pages: sortedPages.map((page, idx) => ({
          id: path.parse(page).name,
          imageUrl: `/assets/stories/${mangaFolder}/${chapterFolder}/${page}`,
          altText: `${mangaFolder} - ${chapterFolder}, Page ${idx + 1}`
        }))
      });
    }

    mangas.push({
      id: mangaFolder,
      title: mangaFolder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      coverImageUrl,
      author: 'Unknown Author',
      description: `Read ${mangaFolder} manga online`,
      chapters: chapters.sort((a, b) => {
        const aNum = parseInt(a.id.replace('chapter-', ''));
        const bNum = parseInt(b.id.replace('chapter-', ''));
        return aNum - bNum;
      })
    });
  }

  return mangas;
}

// Add to package.json:
// "scripts": {
//   "generate-manga": "tsx src/scripts/generate-manga-data.ts"
// }

async function main() {
  try {
    const mangaData = await generateMangaData();
    const outputPath = path.join(process.cwd(), 'src', 'lib', 'manga-data.json');
    await fs.writeFile(outputPath, JSON.stringify(mangaData, null, 2));
    console.log('✓ Manga data generated successfully!');
  } catch (error) {
    console.error('✗ Error generating manga data:', error);
    process.exit(1);
  }
}

main();