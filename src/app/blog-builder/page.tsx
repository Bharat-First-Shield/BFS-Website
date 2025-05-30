
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
  content: z.string().min(50, { message: "Content (HTML) must be at least 50 characters." }),
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
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

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
      content: "<p>Start writing your blog content here using HTML...</p>",
    },
  });

  function onSubmit(values: BlogBuilderValues) {
    const slug = generateSlug(values.title);
    const tagsArray = values.tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    const code = `
{
  slug: '${slug.replace(/'/g, "\\'")}',
  title: '${values.title.replace(/'/g, "\\'")}',
  date: '${values.date.replace(/'/g, "\\'")}',
  author: '${values.author.replace(/'/g, "\\'")}',
  excerpt: \`${values.excerpt.replace(/`/g, "\\`")}\`,
  content: \`
    ${values.content.replace(/`/g, "\\`")}
  \`,
  ${values.imageUrl ? `imageUrl: '${values.imageUrl.replace(/'/g, "\\'")}',` : ''}
  tags: [${tagsArray.map(tag => `'${tag.replace(/'/g, "\\'")}'`).join(', ')}],
  category: '${values.category.replace(/'/g, "\\'")}'
},
`;
    setGeneratedCode(code);
    toast({
      title: "Code Generated!",
      description: "Copy the code below and add it to src/lib/blog.ts inside the blogPosts array.",
    });
  }

  const handleCopyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode).then(() => {
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
          <CardTitle>Blog Post Builder</CardTitle>
          <CardDescription>
            Fill in the details for your new blog post. This tool will generate the TypeScript code
            that you can then manually add to the `blogPosts` array in `src/lib/blog.ts`.
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
                    <FormLabel>Content (HTML)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the full blog post content here using HTML..."
                        className="min-h-[250px] resize-y"
                        rows={12}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the main content of your blog post using HTML for formatting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full md:w-auto">
                <Code className="mr-2 h-4 w-4" />
                Generate Blog Post Code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Code</CardTitle>
              <CardDescription>
                Copy this code and paste it into the `blogPosts` array in `src/lib/blog.ts`.
                Make sure to add it inside the array `[]` and add a comma if it's not the last item.
              </CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopyToClipboard} title="Copy to Clipboard">
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
