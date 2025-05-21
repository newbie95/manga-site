
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getMangaById, Manga as MangaType, MangaChapter, MangaPage } from '@/lib/manga-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function MangaViewerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const mangaId = params.mangaId as string;

  const [manga, setManga] = useState<MangaType | null | undefined>(undefined); // undefined for loading, null for not found
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (mangaId) {
      const foundManga = getMangaById(mangaId);
      setManga(foundManga || null);
      
      const chapterQuery = searchParams.get('chapter');
      if (chapterQuery) {
        const chapterIdx = parseInt(chapterQuery, 10);
        if (foundManga && chapterIdx >= 0 && chapterIdx < foundManga.chapters.length) {
          setCurrentChapterIndex(chapterIdx);
        }
      } else if (foundManga && foundManga.chapters.length > 0) {
        setCurrentChapterIndex(0);
      }
      setCurrentPageIndex(0); 
    }
  }, [mangaId, searchParams]);

  const currentChapter: MangaChapter | undefined = useMemo(() => {
    return manga?.chapters[currentChapterIndex];
  }, [manga, currentChapterIndex]);

  const currentPage: MangaPage | undefined = useMemo(() => {
    return currentChapter?.pages[currentPageIndex];
  }, [currentChapter, currentPageIndex]);

  const totalPagesInChapter = currentChapter?.pages.length || 0;

  const handleChapterChange = (chapterId: string) => {
    if (!manga) return;
    const newChapterIndex = manga.chapters.findIndex(chap => chap.id === chapterId);
    if (newChapterIndex !== -1) {
      setCurrentChapterIndex(newChapterIndex);
      setCurrentPageIndex(0);
      router.replace(`/manga/${mangaId}?chapter=${newChapterIndex}`);
    }
  };

  const navigatePage = (direction: 'next' | 'prev') => {
    if (!currentChapter) return;
    setImageLoading(true);
    if (direction === 'next') {
      if (currentPageIndex < currentChapter.pages.length - 1) {
        setCurrentPageIndex(prev => prev + 1);
      } else {
        navigateToChapter('next');
      }
    } else {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(prev => prev - 1);
      } else {
        navigateToChapter('prev');
      }
    }
  };
  
  const navigateToChapter = (direction: 'next' | 'prev') => {
    if (!manga) return;
    let newChapterIdx = currentChapterIndex;
    if (direction === 'next' && currentChapterIndex < manga.chapters.length - 1) {
      newChapterIdx = currentChapterIndex + 1;
    } else if (direction === 'prev' && currentChapterIndex > 0) {
      newChapterIdx = currentChapterIndex - 1;
    } else {
      return; 
    }
    
    setCurrentChapterIndex(newChapterIdx);
    setCurrentPageIndex(direction === 'prev' ? (manga.chapters[newChapterIdx].pages.length - 1) : 0);
    router.replace(`/manga/${mangaId}?chapter=${newChapterIdx}`);
  };


  if (manga === undefined) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4 text-lg">
        Loading manga...
      </div>
    );
  }

  if (manga === null) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="items-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <CardTitle className="text-2xl">Manga Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>The manga you are looking for could not be found.</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild variant="outline">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!currentChapter && manga.chapters.length > 0) {
     return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="items-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <CardTitle className="text-2xl">Chapter Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>The selected chapter could not be loaded. Please select another chapter.</p>
            <Select onValueChange={handleChapterChange} defaultValue={manga.chapters[0]?.id}>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {manga.chapters.map((chap) => (
                  <SelectItem key={chap.id} value={chap.id}>
                    {chap.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
           <CardFooter className="justify-center">
            <Button asChild variant="outline">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (manga.chapters.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center flex-1 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="items-center">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">No Chapters Available</CardTitle>
             <CardDescription>{manga.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>This manga currently has no chapters available to read.</p>
          </CardContent>
           <CardFooter className="justify-center">
            <Button asChild variant="outline">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }


  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Manga Info Header */}
      <header className="p-4 bg-sidebar-background text-sidebar-foreground shadow-sm border-b border-sidebar-border">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold truncate" title={manga.title}>{manga.title}</h1>
          {currentChapter && <h2 className="text-md md:text-lg truncate" title={currentChapter.title}>{currentChapter.title}</h2>}
        </div>
      </header>

      {/* Navigation Controls */}
      {manga.chapters.length > 0 && totalPagesInChapter > 0 && (
        <div className="bg-background p-3 border-b border-border shadow-sm">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-3">
              {/* Chapter Navigation */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <Button onClick={() => navigateToChapter('prev')} disabled={currentChapterIndex === 0} variant="outline" size="icon" aria-label="Previous Chapter">
                  <SkipBack />
                </Button>
                <Select onValueChange={handleChapterChange} value={currentChapter?.id}>
                  <SelectTrigger className="w-full sm:w-[200px] md:w-[300px] truncate">
                    <SelectValue placeholder="Select Chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {manga.chapters.map((chap) => (
                      <SelectItem key={chap.id} value={chap.id}>
                        {chap.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => navigateToChapter('next')} disabled={currentChapterIndex === manga.chapters.length - 1} variant="outline" size="icon" aria-label="Next Chapter">
                  <SkipForward />
                </Button>
              </div>

              {/* Page Navigation */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <Button onClick={() => navigatePage('prev')} disabled={currentPageIndex === 0 && currentChapterIndex === 0} variant="outline" size="icon" aria-label="Previous Page">
                  <ChevronLeft />
                </Button>
                <span className="text-sm font-medium text-muted-foreground tabular-nums whitespace-nowrap">
                  Page {currentPageIndex + 1} of {totalPagesInChapter}
                </span>
                <Button onClick={() => navigatePage('next')} disabled={currentPageIndex === totalPagesInChapter - 1 && currentChapterIndex === manga.chapters.length - 1} variant="outline" size="icon" aria-label="Next Page">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Viewer Area */}
      <main className="flex-grow overflow-y-auto flex items-center justify-center p-1 md:p-4 relative">
        {currentPage ? (
          <div className="relative w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out"
               style={{ opacity: imageLoading ? 0.5 : 1 }}>
            <Image
              key={currentPage.imageUrl + currentPageIndex + currentChapterIndex} 
              src={currentPage.imageUrl}
              alt={currentPage.altText}
              width={800} 
              height={1200}
              className="max-w-full max-h-full h-auto object-contain shadow-lg rounded"
              priority={true}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)} 
              data-ai-hint="manga page"
            />
          </div>
        ) : (
           totalPagesInChapter > 0 && <div className="text-muted-foreground">Loading page...</div>
        )}
         { totalPagesInChapter === 0 && currentChapter &&
          <div className="text-center p-8">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">This chapter has no pages.</p>
          </div>
        }
      </main>
    </div>
  );
}
