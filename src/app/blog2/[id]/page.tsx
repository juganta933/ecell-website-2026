import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "../../../components/Landing/Navbar";
import Footer from "../../../components/Landing/Footer";
import Background from "../../../components/Landing/Background";
import BackButton from "../../../components/Blogs/BackButton";
import BlogDetailClient from "./BlogDetailClient";

import blogsData from "@/data/blogs2.json";
import { blogSlug } from "@/lib/utils";

interface Blog {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  author: string;
  role: string;
  readTime: string;
  likes: number;
  tags: string[];
  image: string;
  avatar: string;
  date: string;
}

const blogs = blogsData as Blog[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");

  const blog = blogs.find(
    (blog) =>
      blog.id === normalizedSlug || blogSlug(blog.title) === normalizedSlug,
  );

  if (!blog) {
    return {
      title: "Blog | E-Cell NIT Silchar",
    };
  }

  const description =
    blog.description.slice(0, 160) ||
    `Read "${blog.title}" on E-Cell NIT Silchar blog.`;

  return {
    title: blog.title,
    description,

    authors: [{ name: blog.author }],

    openGraph: {
      title: `${blog.title} | E-Cell NIT Silchar`,
      description,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  const blog = blogs.find(
    (blog) =>
      blog.id === normalizedSlug || blogSlug(blog.title) === normalizedSlug,
  );

  if (!blog) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] font-sans text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />

      <section className="pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0">
            <BackButton />
          </div>
        </div>
      </section>

      <BlogDetailClient blog={blog} />

      <Footer />
    </main>
  );
}
