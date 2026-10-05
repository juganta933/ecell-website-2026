/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-argument */
"use client";

import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";

import { Skeleton } from "@/components/ui/skeleton";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEdit,
  FaPlusCircle,
  FaInfoCircle,
  FaHeart,
  FaCalendarAlt,
  FaUserShield,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";

import { blogSlug } from "@/lib/utils";

// Backend blog shape returned by /blog/myBlogs
type MyBlog = {
  id: string;
  title?: string;
  tag?: string;
  intro?: string;
  content?: string;
  writerName?: string;
  writerPic?: string;
  timeStamp?: string;
  topicPic?: string;
  isAccepted?: boolean;
  status?: string;
  likes?: string[];
};

interface DashboardClientWrapperProps {
  initialUser?: null;
  initialAllUsers: never[];
}

export function DashboardClientWrapper({}: DashboardClientWrapperProps) {
  const { user, loading, logout } = useAuth();
  const [myBlogs, setMyBlogs] = useState<MyBlog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";

  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") ?? "published",
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Fetch user's blogs from backend
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        setBlogsLoading(true);
        const res = await api.get("/blog/myBlogs");
        setMyBlogs(res.data.data ?? []);
      } catch {
        toast.error("Failed to load your blogs");
      } finally {
        setBlogsLoading(false);
      }
    };

    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  }, []);

  const publishedBlogs = myBlogs.filter((b) => b.isAccepted === true);
  const provisionalBlogs = myBlogs.filter((b) => b.isAccepted !== true);

  if (loading) {
    return (
      <main className="relative flex min-h-screen flex-col">
        <section className="px-6 pt-32 pb-12 lg:px-8">
          <div className="mx-auto max-w-6xl animate-pulse space-y-6">
            <div className="h-48 rounded-3xl bg-white/10" />
            <div className="h-64 rounded-3xl bg-white/10" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Profile Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-12 lg:px-8">
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-6xl animate-[fadeIn_0.8s_ease-out_forwards] opacity-0">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Avatar & Info */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start lg:col-span-12 xl:col-span-7">
                <div className="group relative shrink-0">
                  <div className="relative size-40 cursor-pointer overflow-hidden rounded-full border-4 border-blue-500 bg-[#111722] shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform hover:scale-105 md:size-48">
                    <Image
                      src={user?.picture ?? "/profile_picture_holder.webp"}
                      alt="Profile"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={192}
                      height={192}
                      priority
                    />
                  </div>
                  <div
                    onClick={() => router.push("/dashboard/edit_profile")}
                    className="absolute right-2 bottom-2 flex size-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#020617] bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-90"
                  >
                    <FaEdit className="text-lg" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="animate-[fadeIn_0.6s_ease-out_0.3s_forwards] opacity-0">
                    <h1 className="mb-1 text-4xl font-bold tracking-tight text-white md:text-5xl">
                      {user?.name ?? "User Name"}
                    </h1>
                    <p className="text-xl font-medium text-blue-400">
                      {user?.role === "CLIENT"
                        ? "User"
                        : (user?.role ?? "Role")}
                    </p>
                  </div>

                  <div className="flex animate-[fadeIn_0.6s_ease-out_0.5s_forwards] flex-wrap items-center justify-center gap-4 pt-2 opacity-0 md:justify-start">
                    <button
                      onClick={() => router.push("/dashboard/edit_profile")}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-6 py-2.5 font-semibold transition-all hover:bg-white/20"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/add_blogs")}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                    >
                      <FaPlusCircle /> New Blog
                    </button>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-700"
                      >
                        <FaUserShield /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-2.5 font-semibold text-red-400 transition-all hover:bg-red-500/20"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <Link
                      href="/change-password"
                      className="text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                    >
                      Change Password
                    </Link>
                  </div>

                  {/* Social Icons */}
                  <div className="flex animate-[fadeIn_0.6s_ease-out_0.6s_forwards] flex-wrap items-center justify-center gap-4 pt-2 opacity-0 md:justify-start">
                    {(
                      [
                        {
                          icon: FaFacebook,
                          url: user?.facebook,
                          color: "hover:text-blue-500",
                        },
                        {
                          icon: FaInstagram,
                          url: user?.instagram,
                          color: "hover:text-pink-500",
                        },
                        {
                          icon: FaLinkedin,
                          url: user?.linkedin,
                          color: "hover:text-blue-400",
                        },
                        {
                          icon: FaGithub,
                          url: user?.github,
                          color: "hover:text-white",
                        },
                      ] as const
                    ).map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:-translate-y-1 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-500/10 ${social.color}`}
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="h-full lg:col-span-12 xl:col-span-5">
                <div className="flex h-full animate-[fadeIn_0.6s_ease-out_0.4s_forwards] flex-col rounded-2xl border border-white/10 bg-white/5 p-6 opacity-0 md:p-8">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <FaInfoCircle className="text-blue-400" />
                    About
                  </h3>
                  <p className="custom-scrollbar max-h-[150px] overflow-y-auto pr-4 leading-relaxed text-gray-400">
                    {user?.bio ??
                      "No information provided yet. Click 'Edit Profile' to share something about yourself."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="mb-12 flex flex-wrap items-center gap-6 border-b border-white/10 sm:gap-8">
            {[
              {
                id: "published",
                label: "Published Blogs",
                count: publishedBlogs.length,
              },
              {
                id: "provisional",
                label: "Provisional Blogs",
                count: provisionalBlogs.length,
              },
              {
                id: "activity",
                label: "My Activity",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-sm font-bold tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 text-xs opacity-60">({tab.count})</span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-24 text-center backdrop-blur-md">
              <FaClipboardList className="mb-6 text-5xl text-blue-400/60" />
              <h3 className="mb-3 text-2xl font-bold text-white">
                My Activity
              </h3>
              <p className="max-w-md text-gray-400">
                All your registrations for events will be displayed here.
              </p>
            </div>
          )}

          {/* Blog Grids (published / provisional) */}
          {(activeTab === "published" || activeTab === "provisional") && (
            <>
              {blogsLoading ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
                    >
                      <div className="aspect-video rounded-2xl bg-white/10" />
                      <div className="h-5 w-3/4 rounded bg-white/10" />
                      <div className="h-4 w-full rounded bg-white/10" />
                      <div className="h-4 w-2/3 rounded bg-white/10" />
                    </div>
                  ))}
                </div>
              ) : (
                <BlogGrid
                  blogs={
                    activeTab === "published"
                      ? publishedBlogs
                      : provisionalBlogs
                  }
                  variant={
                    activeTab === "provisional" ? "provisional" : "published"
                  }
                  loadedImages={loadedImages}
                  onImageLoad={handleImageLoad}
                  emptyMessage={
                    activeTab === "published"
                      ? "You don't have any published blogs yet."
                      : "No provisional blogs. All your blogs have been published!"
                  }
                />
              )}
            </>
          )}
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
          transition: all 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}

/* ── Blog grid sub-component ── */
function BlogGrid({
  blogs,
  loadedImages,
  onImageLoad,
  emptyMessage,
  variant = "published",
}: {
  blogs: MyBlog[];
  loadedImages: Set<string>;
  onImageLoad: (url: string) => void;
  emptyMessage: string;
  variant?: "published" | "provisional";
}) {
  if (blogs.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <p className="text-lg text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => {
        const coverImg =
          blog.topicPic ??
          "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&q=80&w=600";
        const tags = blog.tag ? blog.tag.split(",").map((t) => t.trim()) : [];
        const blogLink =
          variant === "provisional"
            ? `/blog/draft/${blog.id}`
            : `/blog/${blogSlug(blog.title ?? "")}`;

        return (
          <div
            key={blog.id}
            className="group relative flex animate-[fadeIn_0.5s_ease-out_forwards] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 opacity-0 transition-all hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Link
              href={blogLink}
              className="relative block aspect-video overflow-hidden bg-white/5"
            >
              {!loadedImages.has(coverImg) && (
                <Skeleton className="absolute inset-0" />
              )}
              <Image
                src={coverImg}
                alt={blog.title ?? "Blog"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={400}
                height={225}
                onLoad={() => onImageLoad(coverImg)}
                loading="lazy"
                placeholder="empty"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              {tags.length > 0 && (
                <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-1.5">
                  {tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-6">
              {/* Status badge + date row */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {variant === "provisional" && (
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-yellow-400 uppercase">
                    Pending Review
                  </span>
                )}
                {blog.timeStamp && (
                  <span className="flex items-center gap-1 text-xs font-bold tracking-widest text-blue-400/80 uppercase">
                    <FaCalendarAlt />
                    {new Date(blog.timeStamp).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                {blog.title}
              </h3>
              <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-400">
                {(blog.intro ?? "").replace(/<[^>]*>/g, "")}
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <Link
                  href={blogLink}
                  className="text-sm font-bold text-blue-500 group-hover:underline"
                >
                  {variant === "provisional" ? "Preview" : "Read More"}
                </Link>
                <div className="flex items-center gap-3 text-gray-400">
                  {variant === "provisional" && (
                    <Link
                      href={`/dashboard/edit_blog/${blog.id}`}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/10"
                    >
                      <FaEdit className="text-[10px]" /> Edit
                    </Link>
                  )}
                  <span className="flex items-center gap-1.5">
                    <FaHeart />
                    <span className="text-xs">{blog.likes?.length ?? 0}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
