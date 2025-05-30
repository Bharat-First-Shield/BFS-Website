
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogPostBySlug, BlogPost } from "@/lib/blog"; // Assuming this function exists
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const blogFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lowercase alphanumeric with hyphens." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  date: z.date({ required_error: "A date is required." }),
  category: z.string().min(3, { message: "Category must be at least 3 characters." }),
  tags: z.string().min(2, { message: "Enter at least one tag." }), // Comma-separated
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }).max(300, { message: "Excerpt must be 300 characters or less." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }), // For HTML/Markdown
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}


export default function CreatePostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPostSlug, setCurrentPostSlug] = useState<string | null>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "Bharat First Shield Team", // Default author
      date: new Date(),
      category: "",
      tags: "",
      imageUrl: "",
      excerpt: "",
      content: "",
    },
  });

  useEffect(() => {
    const slugToEdit = searchParams.get("slug");
    if (slugToEdit) {
      setIsEditMode(true);
      setCurrentPostSlug(slugToEdit);
      const postData = getBlogPostBySlug(slugToEdit); // This is a sync call for prototype
      if (postData) {
        form.reset({
          ...postData,
          date: new Date(postData.date),
          tags: postData.tags.join(", "),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Blog post with slug "${slugToEdit}" not found.`,
        });
        router.push("/dashboard/blog-management");
      }
    }
  }, [searchParams, form, toast, router]);

  const watchedTitle = form.watch("title");
  useEffect(() => {
    if (watchedTitle && !isEditMode && !form.formState.dirtyFields.slug) {
      form.setValue("slug", generateSlug(watchedTitle), { shouldValidate: true });
    }
  }, [watchedTitle, isEditMode, form]);


  async function onSubmit(values: BlogFormValues) {
    setIsLoading(true);
    console.log("Blog post data:", {
      ...values,
      tags: values.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      date: format(values.date, "yyyy-MM-dd"),
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: isEditMode ? "Blog Post Updated!" : "Blog Post Created!",
      description: (
        <>
          <p>The post "{values.title}" has been {isEditMode ? "updated" : "submitted"}.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Note: This is a prototype. Data is not saved to a database.
            To see changes in the public blog, manual updates to `src/lib/blog.ts` are needed.
          </p>
        </>
      ),
    });
    if (!isEditMode) {
      form.reset();
       form.setValue("date", new Date());
       form.setValue("author", "Bharat First Shield Team");
    }
     router.push("/dashboard/blog-management");
  }

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle>{isEditMode ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        <CardDescription>
          {isEditMode ? "Modify the details of the existing blog post." : "Fill in the details to publish a new blog post."}
          <br /> For content, you can use HTML. For a real app, a Markdown or Rich Text Editor is recommended.
        </CardDescription>
      </CardHeader>
      
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="post-slug-here" {...field} disabled={isEditMode} />
                  </FormControl>
                  <FormDescription>Lowercase, alphanumeric, use hyphens for spaces. Auto-generated if empty on create.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publication Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </div>
                </FormControl>
                 <FormDescription>Provide a direct link to the post's feature image. Use https://placehold.co for placeholders.</FormDescription>
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
                    placeholder="Write the full blog post content here. You can use HTML for formatting..."
                    className="min-h-[200px] resize-y"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  For a production app, consider using a Markdown or Rich Text Editor for a better writing experience.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? "Update Post" : "Create Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
