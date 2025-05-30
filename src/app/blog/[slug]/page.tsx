
import { getPostBySlug, getAllBlogPosts, BlogPostFrontMatter } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, Tags } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Bharat First Shield Blog`,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    }
  };
}


export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-8">
        <div className="mb-4">
          <Badge variant="secondary" className="text-sm">{post.category}</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center space-x-2 md:space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <UserCircle className="h-5 w-5 mr-1.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-1.5" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </header>

      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            style={{objectFit: "cover"}}
            priority
            data-ai-hint={`${post.category} ${post.tags && post.tags.length > 0 ? post.tags[0] : 'technology'}`}
          />
        </div>
      )}
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-md prose-img:shadow-md prose-code:before:content-none prose-code:after:content-none prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
      >
        <MDXRemote source={post.content} />
      </div>

      <Separator className="my-8" />

      {post.tags && post.tags.length > 0 && (
        <div className="mb-8 flex items-center flex-wrap">
          <Tags className="h-5 w-5 mr-2 text-muted-foreground" />
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="mr-2 mb-2">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button asChild variant="outline">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </article>
  );
}
