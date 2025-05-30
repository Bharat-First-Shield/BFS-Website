
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Copy } from "lucide-react";

const blogBuilderSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format." }),
  category: z.string().min(3, { message: "Category must be at least 3 characters." }),
  tags: z.string().min(2, { message: "Enter at least one tag." }), // Comma-separated
  imageUrl: z.string().url({ message: "Please enter a valid URL for image." }).optional().or(z.literal('')),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }).max(300, { message: "Excerpt must be 300 characters or less." }),
  content: z.string().min(50, { message: "Content (Markdown/HTML) must be at least 50 characters." }),
});

type BlogBuilderValues = z.infer<typeof blogBuilderSchema>;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

export default function BlogBuilderPage() {
  const { toast } = useToast();
  const [generatedMdx, setGeneratedMdx] = useState<string | null>(null);
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null);

  const form = useForm<BlogBuilderValues>({
    resolver: zodResolver(blogBuilderSchema),
    defaultValues: {
      title: "",
      author: "Bharat First Shield Team",
      date: new Date().toISOString().split('T')[0], // Default to today in YYYY-MM-DD
      category: "",
      tags: "",
      imageUrl: "",
      excerpt: "",
      content: "## Start Writing Your Blog Content Here\n\nUse Markdown or embed HTML/JSX if needed...",
    },
  });

  function onSubmit(values: BlogBuilderValues) {
    const slug = generateSlug(values.title);
    setGeneratedSlug(slug);
    const tagsArrayString = values.tags.split(",").map(tag => `"${tag.trim()}"`).join(', ');

    const mdxContent = `---
title: "${values.title.replace(/"/g, '\\"')}"
date: "${values.date}"
author: "${values.author.replace(/"/g, '\\"')}"
excerpt: "${values.excerpt.replace(/"/g, '\\"')}"
${values.imageUrl ? `imageUrl: "${values.imageUrl.replace(/"/g, '\\"')}"` : ''}
tags: [${tagsArrayString}]
category: "${values.category.replace(/"/g, '\\"')}"
---

${values.content}
`;
    setGeneratedMdx(mdxContent);
    toast({
      title: "MDX Code Generated!",
      description: `Copy the code below and save it as '${slug}.mdx' in the 'src/app/blog/blogs/' folder.`,
    });
  }

  const handleCopyToClipboard = () => {
    if (generatedMdx) {
      navigator.clipboard.writeText(generatedMdx).then(() => {
        toast({ title: "Copied to clipboard!" });
      }).catch(err => {
        toast({ variant: "destructive", title: "Failed to copy", description: "Could not copy code to clipboard." });
        console.error('Failed to copy text: ', err);
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Builder (MDX)</CardTitle>
          <CardDescription>
            Fill in the details for your new blog post. This tool will generate the MDX content.
            You will then save this content as a new `.mdx` file in the `src/app/blog/blogs/` directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Date</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormDescription>Enter date in YYYY-MM-DD format.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cybersecurity, Industry Trends" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="tag1, tag2, another-tag" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list of tags.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.png" {...field} />
                    </FormControl>
                    <FormDescription>Direct link to the post's feature image. Use https://placehold.co for placeholders.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short summary of the blog post (max 300 characters)..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (Markdown/MDX)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the full blog post content here using Markdown..."
                        className="min-h-[250px] resize-y font-mono"
                        rows={15}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the main content of your blog post using Markdown. You can also include HTML or JSX if needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full md:w-auto">
                <Code className="mr-2 h-4 w-4" />
                Generate MDX Code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedMdx && generatedSlug && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated MDX Code</CardTitle>
              <CardDescription>
                Copy this code and save it as <strong className="text-primary">{generatedSlug}.mdx</strong> in the <code className="bg-muted p-1 rounded text-sm">src/app/blog/blogs/</code> directory.
              </CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopyToClipboard} title="Copy to Clipboard">
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
              <code>{generatedMdx}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
