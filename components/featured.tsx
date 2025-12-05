// components/FeaturedArticle.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { BlogCardProps } from "@/components/blog-card";

export default function FeaturedArticle({ post }: { post: BlogCardProps }) {
  return (
    <article className="relative -mt-16 pt-16"> {/* offsets sticky navbar */}
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden bg-muted">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            priority
            className="object-cover brightness-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-2 pb-16 pt-12 lg:pb-24">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-6 ">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{post.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-relaxed  lg:text-2xl">
              {post.description}
            </p>

            <p className="mt-8 inline-flex items-center text-lg font-medium  hover:underline">
              Read the full article <span className="ml-2">→</span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}