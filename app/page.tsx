// app/blog/page.tsx or wherever
import BlogCard from "@/components/blog-card";
import { blogPosts } from "./mockdata/blog-data";
import Hero from "@/components/hero";
import FeaturedArticle from "@/components/featured";
export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <FeaturedArticle post={blogPosts[0]}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}