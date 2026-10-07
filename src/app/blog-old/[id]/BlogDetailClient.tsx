"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import BlogEngagement from "../../../components/Blogs/BlogEngagement";

import BlogComments from "../../../components/Blogs/BlogComments";

import { useAuth } from "@/context/AuthContext";

import { blogSlug } from "@/lib/utils";

import blogsData from "@/data/blogs2.json";

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

export default function BlogDetailClient({ slug }: { slug: string }) {
  const { user } = useAuth();

  const [blog, setBlog] = useState<Blog | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");

    const foundBlog = (blogsData as Blog[]).find((blog) => {
      const generatedSlug = blogSlug(blog.title);

      return generatedSlug === normalizedSlug || blog.id === normalizedSlug;
    });

    if (foundBlog) {
      setBlog(foundBlog);
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <section className="px-4 pt-32 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-white/10" />

          <div className="h-12 w-3/4 rounded-lg bg-white/10" />

          <div className="h-6 w-1/2 rounded-lg bg-white/10" />

          <div className="aspect-video w-full rounded-2xl bg-white/10" />

          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />

            <div className="h-4 w-full rounded bg-white/10" />

            <div className="h-4 w-5/6 rounded bg-white/10" />

            <div className="h-4 w-4/5 rounded bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (!blog) return null;

  const formattedDate = (() => {
    const normalized = blog.date.trim().replace(/\//g, "-");
    const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(normalized);

    const parsedDate = match
      ? new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]))
      : new Date(normalized);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  })();

  const mainContent = blog.fullContent;

  const blogIntro = blog.description;

  const readTime = blog.readTime || "5 min read";

  const tags = blog.tags;

  const authorAvatar =
    blog.avatar ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const topicImage =
    blog.image ||
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&q=80&w=900";

  return (
    <>
      {/* Header Section */}
      <section className="relative border-b border-white/5 pt-8">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.8s_ease-out_0.1s_forwards] opacity-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="glass animate-[fadeIn_0.4s_ease-out_forwards] rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[8px] font-black tracking-widest text-blue-400 uppercase opacity-0 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[9px] md:text-[10px]"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <div>
                <h1 className="text-2xl leading-tight font-black tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {blog.title}
                </h1>
              </div>

              {/* Author Meta */}
              <div className="flex flex-col items-start gap-4 border-y border-white/5 py-4 sm:gap-6 sm:py-6 md:flex-row md:items-center md:gap-8 md:py-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    className="h-10 w-10 rounded-full border border-white/10 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
                    src={authorAvatar}
                    alt="author"
                    width={56}
                    height={56}
                    loading="lazy"
                    placeholder="empty"
                  />

                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm md:text-base">
                      {blog.author}
                    </p>

                    <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase sm:text-[9px] md:text-[10px]">
                      {blog.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:gap-4 md:ml-auto md:flex-row md:items-center md:gap-6 lg:gap-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>

                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>

                    <span className="text-[8px] font-bold tracking-widest uppercase sm:text-xs md:text-sm">
                      {readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-8 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0 lg:col-span-2">
              <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-400 sm:space-y-6 sm:text-base md:text-lg">
                {/* Featured Image */}
                <div className="glass relative aspect-video overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl md:rounded-[2.5rem]">
                  <Image
                    alt="blog featured image"
                    className="h-full w-full object-cover"
                    src={topicImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                    placeholder="empty"
                  />
                </div>

                {/* Intro / Description */}
                {blogIntro && (
                  <div className="glass my-6 rounded-lg border-l-4 border-blue-600 bg-white/5 p-4 text-base text-white italic sm:my-8 sm:rounded-2xl sm:p-6 md:rounded-3xl md:p-10 md:text-lg lg:text-xl">
                    &ldquo;{blogIntro}&rdquo;
                  </div>
                )}

                {/* Main Content */}
                {mainContent && (
                  <div className="space-y-3 sm:space-y-4">
                    {mainContent.includes("<") ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: mainContent,
                        }}
                      />
                    ) : (
                      <div className="whitespace-pre-line">{mainContent}</div>
                    )}
                  </div>
                )}

                <BlogEngagement
                  blogId={blog.id}
                  shareUrl={`https://ecellnits.org/blog-old/${blogSlug(blog.title)}`}
                  isLoggedIn={!!user}
                  initialLiked={false}
                  likesCount={blog.likes}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="animate-[fadeIn_0.8s_ease-out_0.3s_forwards] opacity-0 lg:sticky lg:top-32">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Author Card */}
                <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
                  <h4 className="mb-3 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:mb-4 sm:text-[9px] md:mb-8 md:text-[10px]">
                    About Author
                  </h4>

                  <div className="mb-4 flex items-center gap-3 sm:mb-6 md:mb-8">
                    <Image
                      className="h-12 w-12 rounded-lg object-cover sm:h-14 sm:w-14 sm:rounded-xl md:h-20 md:w-20 md:rounded-2xl"
                      src={authorAvatar}
                      alt="author"
                      width={80}
                      height={80}
                      loading="lazy"
                      placeholder="empty"
                    />

                    <div>
                      <h5 className="text-xs font-bold text-white sm:text-sm md:text-lg">
                        {blog.author}
                      </h5>

                      <p className="text-[7px] font-black tracking-widest text-blue-400 uppercase sm:text-[8px] md:text-[10px]">
                        {blog.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <BlogComments blogId={blog.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
