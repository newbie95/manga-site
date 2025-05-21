
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu as MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const MangaReaderLogo = () => (
  <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
    MangaReader
  </Link>
);

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'Calendar' },
    { href: '#', label: 'Categories' },
    { href: '#', label: 'Bookmarks' },
    { href: '#', label: 'Announcements' },
    { href: '#', label: 'FAQ' },
    { href: '#', label: 'Mobile' },
  ];

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link key={link.label} href={link.href} legacyBehavior>
          <a
            className={`
              ${isMobile ? 'block py-3 text-lg' : 'text-sm px-3 py-2'}
              text-muted-foreground hover:text-foreground transition-colors
            `}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-background/80 border-b border-border shadow-md sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <MangaReaderLogo />
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavLinkItems />
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-secondary border-border pl-10 pr-3 py-2 text-sm h-9 focus:ring-primary focus:border-primary"
            />
          </div>
          <Button variant="secondary" size="sm" className="h-9 rounded-full">TR</Button>
          <Button variant="secondary" size="sm" className="h-9 rounded-full">Login</Button>
          <Button variant="primary" size="sm" className="h-9 rounded-full">Register</Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6 flex flex-col">
              <SheetHeader className="mb-4"> {/* Added SheetHeader */}
                <SheetTitle className="text-left"> {/* Added SheetTitle */}
                  <MangaReaderLogo />
                </SheetTitle>
                {/* You could add a SheetDescription here if needed */}
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mb-6">
                <NavLinkItems isMobile={true} />
              </nav>
              <div className="mt-auto space-y-3">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-full bg-secondary border-border pl-10 pr-3 py-2 text-sm h-9"
                  />
                </div>
                <Button variant="secondary" size="sm" className="w-full rounded-full">TR</Button>
                <Button variant="secondary" size="sm" className="w-full rounded-full">Login</Button>
                <Button variant="primary" size="sm" className="w-full rounded-full">Register</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
