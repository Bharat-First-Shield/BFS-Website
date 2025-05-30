
# Bharat First Shield - Next.js Showcase

This is a Next.js application built with Firebase Studio, showcasing a professional website for "Bharat First Shield," a cybersecurity and web development services company. It features a dynamic blog system, service pages, and a modern UI built with ShadCN components and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Content**: MDX for blog posts
- **AI (Optional)**: Genkit (for potential AI-driven features, pre-configured)
- **Deployment**: Firebase App Hosting (configured via `apphosting.yaml`)

## Getting Started

To get this project up and running locally:

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

4.  **Genkit Development (Optional):**
    If you plan to work with Genkit AI flows, you can run the Genkit development server in a separate terminal:
    ```bash
    npm run genkit:dev
    ```
    Or with watch mode:
    ```bash
    npm run genkit:watch
    ```

## Key Features

- **Responsive Design**: Adapts to various screen sizes.
- **Modern UI**: Clean and professional interface using ShadCN UI components.
- **Dark Mode**: Supports a dark theme with an animated "outer space" background.
- **Static Pages**: About Us, Contact, Tools Showcase.
- **Dynamic Blog**:
    - Posts are written in MDX format.
    - Blog listing and individual post pages.
    - Recent posts displayed on the homepage.
- **Blog Builder Tool**: A utility page (`/blog-builder`) to help generate the MDX code for new blog posts.

## Managing Blog Posts

The blog content is managed using individual `.mdx` files located in the `src/app/blog/blogs/` directory.

### Creating a New Blog Post:

1.  **Navigate to the Blog Builder Tool**: Go to `/blog-builder` in your browser when the development server is running.
2.  **Fill in the Form**: Provide the title, author, date, category, tags, image URL (optional), excerpt, and the main content (in Markdown/MDX format).
3.  **Generate MDX Code**: Click the "Generate MDX Code" button.
4.  **Copy the Generated Code**: The tool will display the complete MDX content for your post.
5.  **Create a New File**: In your project, create a new file in the `src/app/blog/blogs/` directory. The filename should be the "slug" for your post with an `.mdx` extension (e.g., `my-new-article.mdx`). The blog builder will suggest a slug based on your title.
6.  **Paste the Code**: Paste the copied MDX code into this new file and save it.

The new blog post should now appear on your website. You might need to restart the Next.js development server if it doesn't pick up the new file immediately.

### Frontmatter Fields for Blog Posts:

Each `.mdx` file should start with YAML frontmatter:

```yaml
---
title: "Your Amazing Blog Post Title"
date: "YYYY-MM-DD" # e.g., 2024-05-21
author: "Author Name"
excerpt: "A short, compelling summary of your blog post (max 300 characters)."
imageUrl: "https://placehold.co/1200x600.png" # Optional: URL for the post's feature image
tags: ["tag1", "another-tag", "cybersecurity"] # Comma-separated list, will be converted to an array
category: "Cybersecurity News" # Main category for the post
---

Your main blog content starts here.
You can use **Markdown** and even embed _JSX components_ if needed!
```

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode with Turbopack.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts the production server (after building).
-   `npm run lint`: Lints the project files.
-   `npm run typecheck`: Runs TypeScript to check for type errors.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server in watch mode.

## Deployment

This project is configured for deployment with Firebase App Hosting via the `apphosting.yaml` file.
Ensure your Firebase project is set up and configured for App Hosting.
```

```
