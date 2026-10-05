"use client";

import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface BlogEngagementProps {
  blogId: string;
  shareUrl: string;
  isLoggedIn?: boolean;
  initialLiked?: boolean;
  likesCount?: number;
}

export default function BlogEngagement({
  blogId,
  shareUrl,
  isLoggedIn = false,
  initialLiked = false,
  likesCount: initialLikesCount = 0,
}: BlogEngagementProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLike = useCallback(async () => {
    if (!isLoggedIn) {
      toast("Please log in to like a blog", { icon: "🔒" });
      return;
    }
    try {
      const { data } = await api.post<{ liked: boolean; likesCount: number }>(
        `/api/blog/toggleLike/${blogId}`,
      );
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch {
      toast.error("Failed to update like");
    }
  }, [blogId, isLoggedIn]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .catch(() => {
          // User cancelled share
        });
    }
  }, [shareUrl]);

  return (
    <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:gap-6 sm:pt-8 md:mt-12 md:flex-row md:items-center md:gap-8 md:pt-12">
      {/* Like & Share buttons */}
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto">
        <button
          onClick={handleLike}
          className={`glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold transition-all sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4 ${
            liked
              ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
              : "text-rose-500 hover:bg-rose-500/10"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
          <span>
            {liked ? "Liked" : "Like"} {likesCount > 0 && `(${likesCount})`}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="glass flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-blue-500 transition-all hover:bg-blue-500/10 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm md:rounded-2xl md:px-8 md:py-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Social buttons */}
      <div className="flex gap-2 sm:gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl"
        >
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
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl"
        >
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
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-gray-500 transition-all hover:border-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 md:rounded-2xl"
        >
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
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
