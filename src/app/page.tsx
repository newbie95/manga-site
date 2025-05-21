
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALL_MANGA, type Manga } from "@/lib/manga-data";
import Image from "next/image";
import Link from "next/link";
import { LibraryBig } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col p-4 md:p-8 bg-background">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LibraryBig className="w-8 h-8 text-primary" />
          Manga Library
        </h1>
        <p className="text-muted-foreground">Browse your collection of manga.</p>
      </header>

      {ALL_MANGA.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ALL_MANGA.map((manga: Manga) => (
            <Card key={manga.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardContent className="p-0 flex flex-col sm:flex-row flex-grow">
                <div className="sm:w-1/3 md:w-1/4 relative aspect-[2/3] overflow-hidden flex-shrink-0">
                  <Image
                    src={manga.coverImageUrl}
                    alt={`${manga.title} cover`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="manga cover"
                    className="rounded-l-lg sm:rounded-l-lg sm:rounded-r-none"
                  />
                </div>
                <div className="flex flex-col p-4 sm:p-6 sm:w-2/3 md:w-3/4 flex-grow">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl leading-tight">{manga.title}</CardTitle>
                    <CardDescription className="text-xs">By {manga.author}</CardDescription>
                  </CardHeader>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow min-h-[60px]">
                    {manga.description}
                  </p>
                  <CardFooter className="p-0 mt-auto">
                    <Link href={`/manga/${manga.id}`} passHref legacyBehavior>
                      <Button asChild className="w-full sm:w-auto ml-auto">
                        <a>Read Now</a>
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
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
    </main>
  );
}
