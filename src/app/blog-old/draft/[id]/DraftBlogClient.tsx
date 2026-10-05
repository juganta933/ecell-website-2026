/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-argument */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { FaEdit } from "react-icons/fa";

interface DraftBlog {
  id: string;
  title: string;
  intro?: string;
  content?: string;
  tag?: string;
  writerName?: string;
  writerEmail?: string;
  writerPic?: string;
  topicPic?: string;
  timeStamp?: string;
  createdAt?: string;
  subject?: string;
  text?: string;
  isAccepted?: boolean;
  likes?: string[];
  authorId?: string;
  status?: string;
}

export default function DraftBlogClient({ blogId }: { blogId: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [blog, setBlog] = useState<DraftBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchDraft = async () => {
      try {
        const { data } = await api.get(`/blog/draft/${blogId}`);
        const blogData = data.data ?? data;
        setBlog(blogData);
      } catch (err: unknown) {
        const error = err as { response?: { status?: number } };
        if (error.response?.status === 403) {
          setForbidden(true);
        } else {
          toast.error("Blog not found");
          router.push("/dashboard");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [blogId, router, user, authLoading]);

  if (authLoading || loading) {
    return (
      <section className="px-4 pt-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-white/10" />
          <div className="h-12 w-3/4 rounded-lg bg-white/10" />
          <div className="h-6 w-1/2 rounded-lg bg-white/10" />
          <div className="aspect-video w-full rounded-2xl bg-white/10" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (forbidden) {
    return (
      <section className="px-4 pt-8 pb-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl py-32 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Access Denied</h2>
          <p className="mb-8 text-gray-400">
            You don&apos;t have permission to view this draft blog.
          </p>
          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  if (!blog) return null;

  const blogDate = blog.timeStamp ?? blog.createdAt;
  const formattedDate = blogDate
    ? new Date(blogDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const mainContent = blog.content ?? blog.text ?? "";
  const blogIntro = blog.intro ?? blog.subject ?? "";
  const readTime = Math.max(
    1,
    Math.ceil((blogIntro + " " + mainContent).split(/\s+/).length / 200),
  );

  const tags = blog.tag ? blog.tag.split(",").map((t) => t.trim()) : [];
  const authorAvatar =
    blog.writerPic ??
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const topicImage =
    blog.topicPic ??
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&q=80&w=900";

  const isOwner = user && blog.authorId === String(user.id);
  const statusLabel = blog.isAccepted ? "Published" : "Pending Review";
  const statusColor = blog.isAccepted
    ? "border-green-500/30 bg-green-500/10 text-green-400"
    : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

  return (
    <>
      {/* Draft Banner */}
      <section className="border-b border-yellow-500/20 bg-yellow-500/5 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${statusColor}`}
            >
              {statusLabel}
            </span>
            <span className="text-sm text-gray-400">
              This is a draft preview — only you and admins can see this.
            </span>
          </div>
          {isOwner && (
            <Link
              href={`/dashboard/edit_blog/${blog.id}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <FaEdit /> Edit Blog
            </Link>
          )}
        </div>
      </section>

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
                      className="animate-[fadeIn_0.4s_ease-out_forwards] rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[8px] font-black tracking-widest text-blue-400 uppercase opacity-0 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[9px] md:text-[10px]"
                      style={{ animationDelay: `${index * 0.1}s` }}
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
                      {blog.writerName ?? "Anonymous"}
                    </p>
                    <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase sm:text-[9px] md:text-[10px]">
                      Contributor
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
                      {readTime} min
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
          <div className="animate-[fadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">
            <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-400 sm:space-y-6 sm:text-base md:text-lg">
              {/* Featured Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl md:rounded-[2.5rem]">
                <Image
                  alt="blog featured image"
                  className="h-full w-full object-cover"
                  src={topicImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                  placeholder="empty"
                />
              </div>

              {/* Intro */}
              {blogIntro && (
                <div className="my-6 rounded-lg border-l-4 border-blue-600 bg-white/5 p-4 text-base text-white italic sm:my-8 sm:rounded-2xl sm:p-6 md:rounded-3xl md:p-10 md:text-lg lg:text-xl">
                  &ldquo;{blogIntro}&rdquo;
                </div>
              )}

              {/* Main Content */}
              {mainContent && (
                <div className="space-y-3 sm:space-y-4">
                  {mainContent.includes("<") ? (
                    <div dangerouslySetInnerHTML={{ __html: mainContent }} />
                  ) : (
                    <p>{mainContent}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
