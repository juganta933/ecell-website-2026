"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import BlogEngagement from "../../../components/Blogs/BlogEngagement";

import BlogComments from "../../../components/Blogs/BlogComments";

import { useAuth } from "@/context/AuthContext";
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

export default function BlogDetailClient({ blog }: { blog: Blog }) {
  const { user } = useAuth();

  const formattedDate = (() => {
    const [day, month, year] = blog.date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
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
  const titleSeparatorIndex = blog.title.indexOf(":");
  const titleAccent =
    titleSeparatorIndex === -1
      ? (blog.title.split(" ")[0] ?? "")
      : blog.title.slice(0, titleSeparatorIndex + 1);
  const titleRemainder =
    titleSeparatorIndex === -1
      ? blog.title.slice(titleAccent.length)
      : blog.title.slice(titleSeparatorIndex + 1);

  return (
    <>
      {/* Header Section */}
      <section className="relative border-b border-white/5 pt-8 pb-8 md:pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="glass animate-[fadeIn_0.4s_ease-out_forwards] rounded-full border border-blue-500/20 bg-white/5 px-3 py-1 text-[8px] font-bold tracking-widest text-blue-300 uppercase opacity-0 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[9px] md:text-[10px]"
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
              <div className="text-center">
                <h1 className="text-2xl leading-tight font-black tracking-tighter text-white uppercase italic sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                  <span className="text-blue-500">{titleAccent}</span>
                  <span className="text-white">{titleRemainder}</span>
                </h1>
              </div>

              {/* Author Meta */}
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-4 sm:flex-row sm:justify-center sm:gap-8 sm:px-6 sm:py-5 md:gap-10">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Image
                    className="h-10 w-10 rounded-full border border-blue-400/20 object-cover sm:h-12 sm:w-12 md:h-14 md:w-14"
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

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-6 lg:gap-x-8">
                  <div className="flex items-center gap-2 text-slate-400">
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

                    <span className="text-[8px] font-semibold tracking-widest uppercase sm:text-xs md:text-sm">
                      {formattedDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
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

                    <span className="text-[8px] font-semibold tracking-widest uppercase sm:text-xs md:text-sm">
                      {readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-8 md:py-14 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-slate-300 sm:space-y-6 sm:text-base md:text-lg">
                {/* Featured Image */}
                <div className="glass group relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-blue-950/20 sm:rounded-3xl">
                  <Image
                    alt="blog featured image"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    src={topicImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                    placeholder="empty"
                  />
                </div>

                {/* Intro / Description */}
                {blogIntro && (
                  <div className="glass my-6 rounded-2xl border border-l-4 border-blue-400/15 border-l-blue-500 bg-white/5 p-4 text-base text-slate-100 italic transition-[border-color,box-shadow] duration-700 ease-out hover:border-blue-400/25 hover:shadow-[0_16px_48px_-32px_rgba(37,99,235,0.35)] motion-reduce:transition-none sm:my-8 sm:p-6 md:p-8 md:text-lg lg:text-xl">
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
                  shareUrl={`https://ecellnits.org/blog2/${blogSlug(blog.title)}`}
                  isLoggedIn={!!user}
                  initialLiked={false}
                  likesCount={blog.likes}
                />
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
              className="lg:sticky lg:top-32"
            >
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Author Card */}
                <div className="glass rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-700 ease-out hover:-translate-y-0.5 hover:border-blue-400/20 hover:shadow-[0_16px_48px_-32px_rgba(37,99,235,0.35)] motion-reduce:transition-none sm:rounded-3xl sm:p-6 md:p-8">
                  <h4 className="mb-4 text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase sm:text-[10px] md:mb-6">
                    About Author
                  </h4>

                  <div className="flex items-center gap-4">
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
