import { blogPosts } from "@/app/mockdata/blog-data";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);

  // Find the blog post
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
  
      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.image as string}
          alt={post.title}
          fill
          className="object-cover grayscale-[15%] contrast-110"
          priority
        />
      </div>
  
      {/* Optional caption */}
      <p className="text-xs text-muted-foreground mt-2 italic">
        { "Field perspectives on state-building across African regions."}
      </p>
  
      {/* Title */}
      <h1 className="mt-8 text-4xl font-serif font-semibold tracking-tight leading-tight">
        {post.title}
      </h1>
  
      {/* Under-title divider */}
      <div className="w-16 h-[2px] bg-primary mt-3 mb-6"></div>
  
      {/* Meta */}
      <div className="text-sm text-muted-foreground flex gap-3 mb-2 items-center">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src={post.author.image}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <span className="text-sm font-medium text-muted-foreground">
          {post.author.name}
        </span>
      </div>
  
      {/* Tags */}
      {post?.tags && post?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-sm text-xs uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
  
      {/* CONTENT */}
      <div
        className="prose prose-neutral dark:prose-invert prose-lg max-w-none border-l pl-6
                   prose-headings:font-serif prose-headings:tracking-tight prose-headings:font-semibold
                   prose-p:leading-relaxed prose-p:text-[1.03rem]
                   prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
