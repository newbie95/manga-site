
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Menu as MenuIcon } from 'lucide-react'; // Added MenuIcon for mobile
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile nav
import { useState } from 'react';

// Temporary SVG for MANGATOON style logo
const MangaToonLogo = () => (
  <svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
    <text x="0" y="25" style={{fontFamily: "'Arial Black', Gadget, sans-serif", fontSize: "26px", fontWeight: "900"}} fill="hsl(var(--primary))">
      MANGA
    </text>
    <text x="103" y="25" style={{fontFamily: "'Arial Black', Gadget, sans-serif", fontSize: "26px", fontWeight: "900"}} fill="hsl(var(--primary))">
      T
      <tspan fill="hsl(var(--foreground))">OO</tspan>
      N
    </text>
    {/* Simple smile - adjusted positioning */}
    <circle cx="108" cy="10" r="1.5" fill="hsl(var(--primary))" transform="translate(2, 1.5)" />
    <circle cx="118" cy="10" r="1.5" fill="hsl(var(--primary))" transform="translate(2, 1.5)" />
    <path d="M110 15 Q 115 18 120 15" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" transform="translate(0, 1.5)" />
  </svg>
);


export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'Comics' }, // Placeholder href
    { href: '#', label: 'NovelToon' },// Placeholder href
    { href: '#', label: 'Booklist' },// Placeholder href
    { href: '#', label: 'Contribute' },// Placeholder href
    { href: '#', label: 'Games' },// Placeholder href
    { href: '#', label: 'Purchase Coins' },// Placeholder href
  ];

  const NavLinkItems = ({isMobile = false}: {isMobile?: boolean}) => (
    <>
      {navLinks.map((link) => (
        <Link key={link.label} href={link.href} legacyBehavior>
          <a 
            className={`text-foreground hover:text-primary transition-colors ${isMobile ? 'block py-2 text-lg' : 'text-sm'}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-background/95 border-b border-border shadow-sm sticky top-0 z-40 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <MangaToonLogo />
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-5">
          <NavLinkItems />
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="ghost" size="sm">History</Button>
          <Button variant="ghost" size="sm" className="items-center">
            English <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button size="sm">Publish</Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <Link href="/" className="flex items-center mb-6" onClick={() => setMobileMenuOpen(false)}>
                  <MangaToonLogo />
                </Link>
                <nav className="flex flex-col space-y-4">
                  <NavLinkItems isMobile={true} />
                </nav>
                <div className="border-t border-border pt-6 flex flex-col space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">Sign In</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">History</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start items-center">
                    English <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                   <Button variant="primary" size="sm" className="w-full">Publish</Button>
                </div>
                <div className="relative mt-6">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      placeholder="Search..."
                      className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
