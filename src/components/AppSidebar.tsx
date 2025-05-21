
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookMarked, Library, Github } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { ALL_MANGA, Manga } from '@/lib/manga-data';
import Image from 'next/image';

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 text-sidebar-foreground">
          <BookMarked className="w-8 h-8 text-sidebar-foreground" />
          <h1 className="text-xl font-semibold">Manga Reader</h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {ALL_MANGA.map((manga: Manga) => (
            <SidebarMenuItem key={manga.id}>
              <Link href={`/manga/${manga.id}`} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/manga/${manga.id}` || pathname.startsWith(`/manga/${manga.id}?`)}
                  tooltip={{ children: manga.title, className: "group-data-[collapsible=icon]:hidden" }}
                  className="flex items-center gap-3"
                >
                  <a>
                    <Image 
                      src={manga.coverImageUrl} 
                      alt={manga.title} 
                      width={24} 
                      height={36} 
                      className="rounded-sm object-cover group-data-[collapsible=icon]:hidden"
                      data-ai-hint="manga cover" 
                    />
                     <Library className="hidden group-data-[collapsible=icon]:block"/>
                    <span className="truncate">{manga.title}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-4">
        <SidebarMenu>
           <SidebarMenuItem>
             <a href="https://github.com/firebase/studio" target="_blank" rel="noopener noreferrer" className="w-full">
                <SidebarMenuButton tooltip="View on GitHub" className="w-full">
                    <Github />
                    <span>View on GitHub</span>
                </SidebarMenuButton>
             </a>
           </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
