
import { getAllBlogPosts, BlogListItem } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays, UserCircle, DraftingCompass, FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Bharat First Shield',
  description: 'Latest articles and insights on cybersecurity from Bharat-First-Shield.',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bharat First Shield Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and articles on cybersecurity from the experts at Bharat-First-Shield.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <DraftingCompass className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Blog Posts Yet</h2>
          <p className="text-muted-foreground mb-6">
            It looks like we haven't published any articles yet. Check back soon!
          </p>
          <p className="text-sm text-muted-foreground">
            You can also use the Blog Builder tool to generate code for new posts.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              {post.imageUrl && (
                <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 group">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    style={{objectFit: "cover"}}
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={`${post.category} ${post.tags && post.tags.length > 0 ? post.tags[0] : 'technology'}`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </Link>
              )}
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-xl leading-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0 text-primary text-sm">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Separator className="my-12" />

      <section className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Blog Post</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Use our Blog Builder tool to easily generate the MDX code for your next article.
        </p>
        <Button asChild size="lg">
          <Link href="/blog-builder">
            <FilePlus2 className="mr-2 h-5 w-5" />
            Go to Blog Builder
          </Link>
        </Button>
      </section>
    </div>
  );
}
