
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALL_MANGA, type Manga } from "@/lib/manga-data";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12">
      <section aria-labelledby="library-heading">
        <header className="mb-6">
          <h2 id="library-heading" className="text-2xl font-bold text-foreground">
            Manga Library
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
                    fill // Use fill with a sized parent
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover rounded-t-lg"
                    data-ai-hint="manga cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-md font-semibold leading-tight line-clamp-2">{manga.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-1">By {manga.author}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow flex flex-col">
                  <p className="text-xs text-muted-foreground line-clamp-3 flex-grow min-h-[calc(1.5em*3)]"> 
                    {manga.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                  <Link href={`/manga/${manga.id}`} passHref legacyBehavior className="w-full">
                    <Button asChild size="sm" className="w-full">
                      <a>Read Now</a>
                    </Button>
                  </Link>
                </CardFooter>
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
