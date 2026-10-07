"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

import { Search, ChevronDown } from "lucide-react";

import BlogCard from "./BlogCard";

import { useAuth } from "@/context/AuthContext";

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

export default function BlogsClient() {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();

  const blogs = blogsData as Blog[];

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();

    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query)),
    );

    const sorted = [...filtered];

    const parseDate = (date: string) => {
      const normalized = date.trim().replace(/\//g, "-");
      const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(normalized);

      if (match) {
        const [, day, month, year] = match;
        return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      }

      const parsed = new Date(normalized);
      return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
    };

    switch (sortBy) {
      case "Most Liked":
        sorted.sort((a, b) => b.likes - a.likes);
        break;

      case "Trending":
        sorted.sort((a, b) => {
          const aTime = parseDate(a.date);
          const bTime = parseDate(b.date);

          const aScore = a.likes * 2 + aTime / 1e12;
          const bScore = b.likes * 2 + bTime / 1e12;

          return bScore - aScore;
        });
        break;

      case "Latest":
      default:
        sorted.sort((a, b) => {
          const aTime = parseDate(a.date);
          const bTime = parseDate(b.date);

          return bTime - aTime;
        });
        break;
    }

    return sorted;
  }, [blogs, searchQuery, sortBy]);

  const handleSortSelect = useCallback((option: string) => {
    setSortBy(option);
    setSortOpen(false);
  }, []);

  const handleToggleSort = useCallback(() => {
    setSortOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative z-10 border-b border-white/5 pt-24 pb-10 md:pt-28 md:pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 text-center md:px-8 lg:px-12">
          {/* Insight pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-5 inline-flex rounded-full border border-blue-400/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="text-[9px] font-semibold tracking-[0.2em] text-blue-300 uppercase">
              INSIGHTS FROM THE ECOSYSTEM
            </span>
          </motion.div>

          {/* TITLE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="mb-3 text-4xl leading-[0.98] font-black tracking-tighter text-white uppercase italic sm:text-5xl md:text-6xl lg:text-7xl">
              The Startup
              <br />
              <span className="text-blue-500">Chronicles</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
              Stories, insights, and learnings from the entrepreneurial journey.
              Dive into our curated collection of thought leadership and
              real-world experiences.
            </p>
          </motion.div>

          {/* SEARCH & FILTER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            {/* Search */}
            <div className="group relative w-full sm:max-w-md sm:flex-1">
              <Search
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-xl border border-white/10 bg-white/4 py-3 pr-4 pl-12 text-sm text-white placeholder-gray-500 transition-all outline-none focus:border-blue-400/40 focus:bg-white/7 focus:ring-4 focus:ring-blue-500/5"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={handleToggleSort}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-blue-400/30 hover:bg-white/7 sm:w-auto"
              >
                Sort: {sortBy}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute top-14 right-0 z-50 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1e] shadow-2xl sm:w-44">
                  {["Latest", "Most Liked", "Trending"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className="block w-full px-6 py-3 text-left text-sm font-medium text-gray-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOGS GRID */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  isLoggedIn={!!user}
                  initialLiked={false}
                  blog={blog}
                  animationDelayMs={Math.min(index * 70, 350)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">
                {searchQuery
                  ? "No blogs match your search."
                  : "No blogs available yet."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
