
import { getBlogPostBySlug, getAllBlogPosts, BlogPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, Tags } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Shield Master Blog`,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    }
  };
}


export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

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
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={`${post.category} ${post.tags[0]}`}
          />
        </div>
      )}
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:list-disc prose-ol:list-decimal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

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
