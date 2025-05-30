
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, BlogPost } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Edit3, Trash2, PlusSquare, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you might fetch posts from an API here
    // For this prototype, we use the static list.
    setPosts(getAllBlogPosts());
  }, []);

  const handleDelete = (slug: string, title: string) => {
    // This is a placeholder for actual delete functionality
    console.log(`Attempting to delete post: ${slug}`);
    toast({
      title: "Delete Action (Prototype)",
      description: (
        <>
          <p>If this were a live system, the post "{title}" would be deleted.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            To actually remove it, you'd need to update `src/lib/blog.ts` and restart the server.
          </p>
        </>
      ),
      variant: "destructive",
    });
    // To simulate deletion in UI (won't persist):
    // setPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Blog Posts</CardTitle>
          <CardDescription>View, edit, or delete existing blog posts.</CardDescription>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-post">
            <PlusSquare className="mr-2 h-4 w-4" /> Create New Post
          </Link>
        </Button>
      </CardHeader>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No blog posts found. Get started by creating one!</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                  <TableHead>Title & Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.slug}>
                    <TableCell className="hidden md:table-cell p-2">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={60}
                          height={40}
                          className="rounded object-cover aspect-[3/2]"
                          data-ai-hint={`${post.category} ${post.tags[0] || 'generic'}`}
                        />
                      ) : (
                        <div className="w-[60px] h-[40px] bg-muted rounded flex items-center justify-center text-muted-foreground">
                          <Eye className="h-5 w-5" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium py-2">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="hover:underline hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                      <div>
                        <Badge variant="secondary" className="text-xs mt-1">{post.category}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden lg:table-cell py-2">{post.author}</TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell py-2">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/create-post?slug=${post.slug}`}>
                                <Edit3 className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                               <Link href={`/blog/${post.slug}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" /> View Public
                              </Link>
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will not actually delete the post in this prototype,
                              but it demonstrates the delete flow.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.slug, post.title)}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

