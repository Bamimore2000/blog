// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative -mt-16 pt-16"> {/* offsets sticky navbar */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero image – replace with your own or keep this excellent Unsplash one */}
        <Image
          src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&h=750&fit=crop"
          alt="National assembly chamber, symbolising state institutions"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Statecraft
          </h1>

          <p className="mt-6 text-xl leading-9 text-white/90 sm:text-2xl">
            Understanding how states are made, unmade, and remade.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Independent, in-depth analysis of institutions, fiscal contracts, elite bargains,
            security sector reform, and the political economy of governance in fragile and emerging states.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Read latest articles
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/newsletter"
              className="text-base font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              Subscribe to newsletter →
            </Link>
          </div>
        </div>
      </div>

      {/* Optional subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}