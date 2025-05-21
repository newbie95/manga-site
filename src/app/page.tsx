import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="items-center">
          <BookOpen className="w-16 h-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Welcome to Manga Static Reader</CardTitle>
          <CardDescription className="text-center">
            Your personal space for enjoying manga.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg">
            Please select a manga title from the sidebar to start reading.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
