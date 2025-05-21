
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALL_MANGA, type Manga } from "@/lib/manga-data";
import Image from "next/image";
import Link from "next/link";
// LibraryBig icon is removed as the global header handles branding.

export default function Home() {
  // Placeholder for carousel data
  const carouselItems = ALL_MANGA.slice(0, 3).map(manga => ({
    id: manga.id,
    title: manga.title,
    imageUrl: manga.coverImageUrl, // Or a dedicated banner image if available
    dataAiHint: "manga banner"
  }));

  return (
    <div className="flex flex-col space-y-12">
      {/* Placeholder for Carousel - To be implemented later */}
      <section aria-labelledby="carousel-heading" className="bg-muted/50 p-8 rounded-lg shadow">
        <h2 id="carousel-heading" className="sr-only">Featured Manga</h2>
        <div className="text-center text-foreground py-16">
          <p className="text-2xl font-semibold">Image Carousel / Banner Area</p>
          <p className="text-muted-foreground">Displaying: {carouselItems.map(item => item.title).join(', ')}</p>
          {/* Basic representation of carousel items */}
          <div className="mt-4 flex justify-center space-x-4">
            {carouselItems.map(item => (
              <div key={item.id} className="w-32 h-48 relative rounded overflow-hidden shadow-md">
                <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" data-ai-hint={item.dataAiHint} />
              </div>
            ))}
          </div>
           <div className="mt-4 text-sm text-muted-foreground">(Carousel functionality to be implemented)</div>
        </div>
      </section>

      <section aria-labelledby="library-heading">
        <header className="mb-6">
          <h2 id="library-heading" className="text-2xl font-bold text-foreground">
            Read with Editor {/* As per screenshot */}
          </h2>
          <p className="text-muted-foreground">Browse your collection of manga.</p>
        </header>

        {ALL_MANGA.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {ALL_MANGA.map((manga: Manga) => (
              <Card key={manga.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-card">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src={manga.coverImageUrl}
                    alt={`${manga.title} cover`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="manga cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <CardHeader className="p-0 mb-1">
                    <CardTitle className="text-md font-semibold leading-tight line-clamp-2">{manga.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-1">By {manga.author}</CardDescription>
                  </CardHeader>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-grow min-h-[30px]">
                    {manga.description}
                  </p>
                  <CardFooter className="p-0 mt-auto">
                    <Link href={`/manga/${manga.id}`} passHref legacyBehavior>
                      <Button asChild size="sm" className="w-full">
                        <a>Read Now</a>
                      </Button>
                    </Link>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No manga available at the moment.</p>
            <p className="text-sm text-muted-foreground">Please check back later or add some titles.</p>
          </div>
        )}
      </section>
    </div>
  );
}
