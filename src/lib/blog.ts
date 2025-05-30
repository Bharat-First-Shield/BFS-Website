
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Define the directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'src/app/blog/blogs');

export interface BlogPostFrontMatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  imageUrl?: string;
  tags: string[];
  category: string;
  [key: string]: any; // Allow other frontmatter fields
}

export interface BlogPost extends BlogPostFrontMatter {
  slug: string;
  content: any; // This will hold the compiled MDX content
}

export interface BlogListItem extends BlogPostFrontMatter {
  slug: string;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content: fileContent } = matter(fileContents);

    const { content } = await compileMDX<BlogPostFrontMatter>({
      source: fileContent,
      options: {
        parseFrontmatter: false, // frontmatter is already parsed by gray-matter
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      },
      components: {
        // You can pass custom components here if needed
        // h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
      }
    });

    return {
      slug: realSlug,
      ...(data as BlogPostFrontMatter),
      content,
    };
  } catch (error) {
    // console.error(`Error reading blog post ${realSlug}:`, error);
    return undefined;
  }
}

export async function getAllBlogPosts(): Promise<BlogListItem[]> {
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    // console.warn("No 'blogs' directory found or it's empty.");
    return [];
  }

  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace(/\.mdx$/, ''),
        ...(data as BlogPostFrontMatter),
      };
    });

  // Sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getRecentBlogPosts(count: number = 3): Promise<BlogListItem[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, count);
}
