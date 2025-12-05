"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "Topics", href: "/topics" },
    { name: "About", href: "/about" },
    { name: "Newsletter", href: "/newsletter" },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Statecraft
              </span>
              <span className="hidden text-sm font-medium text-muted-foreground lg:block">
                Understanding how states are made and unmade
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-foreground/80 hover:bg-accent/50 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile navigation animated */}
          <AnimatePresence mode="wait">
            {mobileOpen && (
              <m.nav
                key="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col border-t border-border/40 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-accent/50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </m.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </LazyMotion>
  );
}
