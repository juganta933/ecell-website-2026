"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/lib/api";
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

interface BlogCardProps {
  blog: Blog;
  isLoggedIn?: boolean;
  initialLiked?: boolean;
  animationDelayMs?: number;
}

export default function BlogCard({
  blog,
  isLoggedIn = false,
  initialLiked = false,
  animationDelayMs = 0,
}: BlogCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(blog.likes ?? 0);

  // const readTime = useMemo(() => {
  //   const text = (blog.fullContent || blog.description).replace(/<[^>]*>/g, "");
  //   const words = text.trim().split(/\s+/).length;
  //   return Math.max(1, Math.ceil(words / 200));
  // }, [blog.fullContent, blog.description]);

  const handleLike = useCallback(async () => {
    if (!isLoggedIn) {
      toast("Please log in to like a blog", { icon: "🔒" });
      return;
    }
    try {
      const { data } = await api.post<{ liked: boolean; likesCount: number }>(
        `/api/blog/toggleLike/${blog.id}`,
      );
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch {
      toast.error("Failed to update like");
    }
  }, [blog.id, isLoggedIn]);

  return (
    <div
      className="group relative h-full animate-[fadeInUp_0.55s_ease-out_both] motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <div className="absolute inset-2 rounded-[1.75rem] bg-blue-500/8 opacity-0 blur-2xl transition-opacity duration-700 ease-in-out group-hover:opacity-100" />

      <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-slate-950/60 transition-[transform,border-color,box-shadow] duration-700 ease-out group-focus-within:-translate-y-0.5 group-hover:-translate-y-0.5 group-hover:border-blue-400/20 group-hover:shadow-[0_16px_48px_-32px_rgba(37,99,235,0.35)] motion-reduce:transition-none">
        {/* Featured image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            placeholder="empty"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent opacity-70" />
        </div>

        {/* CONTENT */}
        <div className="flex grow flex-col p-5 sm:p-6">
          <div className="mb-5 flex min-h-6 flex-wrap items-center gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-400/15 bg-blue-400/6 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-blue-200/80 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="text-[10px] font-medium text-slate-500">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 p-0.5">
              <Image
                src={
                  blog.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={`${blog.author} avatar`}
                width={40}
                height={40}
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-100 sm:text-sm">
                {blog.author}
              </p>
              <p className="mt-0.5 text-[9px] tracking-wide text-slate-500 uppercase sm:text-[10px]">
                {blog.role}
              </p>
            </div>
          </div>

          <h3 className="mb-3 line-clamp-2 min-h-13 text-lg leading-snug font-black tracking-tight text-white uppercase italic transition-colors duration-700 ease-out group-hover:text-blue-300 sm:text-xl">
            {blog.title}
          </h3>

          <p className="mb-6 line-clamp-3 grow text-sm leading-6 text-slate-400">
            {blog.description.replace(/<[^>]*>/g, "")}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              {/* Like button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors ${
                  liked ? "text-rose-400" : "text-slate-400"
                } hover:text-rose-400`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${liked ? "scale-110" : "scale-100"}`}
                  aria-hidden="true"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
                <span className="text-xs font-semibold">{likesCount}</span>
              </button>

              {/* Read time */}
              <div className="flex items-center gap-1.5 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
                <span className="text-[11px] font-medium whitespace-nowrap sm:text-xs">
                  {blog.readTime}
                </span>
              </div>
            </div>

            <Link
              href={`/blog2/${blogSlug(blog.title)}`}
              className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-blue-300 uppercase transition-colors hover:text-white sm:text-xs"
            >
              Read more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
