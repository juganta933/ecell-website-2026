/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises, @typescript-eslint/no-unsafe-return */
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

interface ApiComment {
  id: string;
  text: string;
  commentAuthor: string;
  commentPic: string;
  userId: string;
  createdAt: string;
}

interface BlogCommentsProps {
  blogId: string;
}

export default function BlogComments({ blogId }: BlogCommentsProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const router = useRouter();

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/api/comment/apiComment/${blogId}`);
        const commentsData = data.data ?? data ?? [];
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch {
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!comment.trim()) return;

      if (!isAuthenticated) {
        toast.error("Please login to comment");
        router.push("/login");
        return;
      }

      setSubmitting(true);
      try {
        const { data } = await api.post(`/api/comment/apicomment/${blogId}`, {
          text: comment,
          commentAuthor: user?.name ?? "Anonymous",
          commentPic: user?.picture ?? "https://i.pravatar.cc/150",
          userId: String(user?.id ?? ""),
        });
        const newComment = data.data ?? data;
        setComments((prev) => [newComment, ...prev]);
        setComment("");
        toast.success("Comment posted! 💬");
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        toast.error(error.response?.data?.message ?? "Failed to post comment");
      } finally {
        setSubmitting(false);
      }
    },
    [
      comment,
      isAuthenticated,
      blogId,
      router,
      user?.id,
      user?.name,
      user?.picture,
    ],
  );

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 60)
        return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
      if (diffHours < 24)
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
      if (diffDays < 7)
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
      return date.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="glass rounded-lg border border-white/10 p-4 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-700 ease-out hover:-translate-y-0.5 hover:border-blue-400/20 hover:shadow-[0_16px_48px_-32px_rgba(37,99,235,0.35)] motion-reduce:transition-none sm:rounded-2xl sm:p-6 md:rounded-[2.5rem] md:p-10">
      <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-8">
        <h4 className="flex items-center gap-2 text-[8px] font-black tracking-widest text-gray-500 uppercase sm:gap-3 sm:text-[9px] md:gap-3 md:text-[10px]">
          💬 Comments ({comments.length})
        </h4>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 space-y-2 sm:mb-6 md:mb-10 md:space-y-4"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={
            isAuthenticated
              ? "Write a comment..."
              : "Login to write a comment..."
          }
          disabled={!isAuthenticated}
          className="min-h-20 w-full resize-none rounded border border-white/10 bg-black/40 p-2 text-[12px] text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-24 sm:rounded-lg sm:p-3 sm:text-xs md:min-h-30 md:rounded-2xl md:p-4 md:text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !isAuthenticated || !comment.trim()}
          className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-blue-600 px-3 py-1.5 text-[12px] font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-2 sm:text-xs md:rounded-2xl md:px-6 md:py-3 md:text-sm"
        >
          {submitting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "Post Comment"
          )}
        </button>
      </form>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {loading ? (
          [...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg bg-white/5 sm:h-24 md:h-28"
            />
          ))
        ) : comments.length > 0 ? (
          comments.map((c) => {
            const userName = c.commentAuthor ?? "Anonymous";
            const userAvatar =
              c.commentPic ?? `https://i.pravatar.cc/150?u=${c.id}`;

            return (
              <div
                key={c.id}
                className="flex gap-2 rounded border border-white/5 bg-black/20 p-2 transition-[border-color,background-color] duration-700 ease-out hover:border-blue-400/15 hover:bg-white/4 sm:gap-3 sm:rounded-lg sm:p-3 md:gap-4 md:rounded-2xl md:p-5"
              >
                <div className="relative size-6 shrink-0 overflow-hidden rounded-full sm:size-8 md:size-10">
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 flex items-center gap-1 sm:mb-1 md:mb-2">
                    <span className="text-[11px] font-bold text-white sm:text-xs md:text-sm">
                      {userName}
                    </span>
                    <span className="text-[9px] text-gray-500 sm:text-[10px] md:text-xs">
                      • {formatTime(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-400 sm:text-xs md:text-sm">
                    {c.text}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <p className="text-xs text-gray-500 sm:text-sm">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
