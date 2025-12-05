import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  description: string;
  date: string; // e.g. "5 December 2025" or "2025-12-05"
  readTime: string; // e.g. "8 min read"
  tags?: string[];
  slug: string;
  image?: string;
  content: string
  author: {
    name: string,
    image: string,
    id: string
  }
}

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  tags = [],
  slug,
  image = "/placeholder.svg",
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full pt-0 flex flex-col overflow-hidden border shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl">
        {/* Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <CardHeader className="pb-3">
          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={date}>{date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title */}
          <CardTitle className="mt-4 text-xl md:text-2xl font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <CardDescription className="text-base leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>

        {/* Tags */}
        {tags.length > 0 && (
          <CardFooter className="pt-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-normal px-2.5 py-0.5 border-muted-foreground/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}