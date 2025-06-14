import { Button } from "@/components/ui/button";
import { ALL_MANGA, type Manga } from "@/lib/manga-data";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-4">
    <h2 className="text-2xl font-semibold text-foreground inline-block">
      {title}
    </h2>
    <div className="h-0.5 w-16 bg-primary mt-1"></div>
  </div>
);


const MangaSeriesRow = ({ title, mangas }: { title: string, mangas: Manga[] }) => {
  // In a real app, these would scroll the content.
  // For now, they are visual placeholders.
  return (
    <section aria-labelledby={`${title.toLowerCase().replace(' ', '-')}-heading`} className="mb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <SectionTitle title={title} />
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
          {mangas.slice(0, 10).map((manga) => ( // Limiting to 10 for example
            <Link href={`/manga/${manga.id}`} key={manga.id} className="block flex-shrink-0 w-36 md:w-40 group">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-lg group-hover:shadow-primary/30 transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src={manga.coverImageUrl}
                  alt={`${manga.title} cover`}
                  fill
                  sizes="(max-width: 768px) 33vw, 160px"
                  className="object-cover"
                  data-ai-hint="manga cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <h3 className="text-white text-sm font-semibold line-clamp-2">{manga.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const heroManga = ALL_MANGA.length > 0 ? ALL_MANGA[0] : null;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      {heroManga && (
        <section className="relative w-full h-[60vh] md:h-[70vh] text-foreground">
          <Image
            src={heroManga.coverImageUrl}
            alt={`${heroManga.title} hero background`}
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark overlay */}
          <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-start max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white shadow-lg">
              {heroManga.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 shadow-sm">
              {heroManga.description}
            </p>
            <Link href={`/manga/${heroManga.id}`} passHref legacyBehavior>
              <Button size="lg" variant="secondary" className="rounded-md text-base px-8 py-3 bg-secondary hover:bg-accent hover:text-accent-foreground">
                Read now
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Spacing after Hero */}
      <div className="py-8"></div>

      {/* Popular Series Section */}
      <MangaSeriesRow title="Popular Series" mangas={ALL_MANGA} />

      {/* Featured Series Section */}
      <MangaSeriesRow title="Featured Series" mangas={[...ALL_MANGA].reverse()} /> {/* Example: reversed list */}
      
      {/* Footer placeholder */}
      <footer className="py-12 mt-10 border-t border-border">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} MangaReader. All rights reserved.</p>
              <p className="text-xs mt-2">This is a fictional website for demonstration purposes.</p>
          </div>
      </footer>
    </div>
  );
}
