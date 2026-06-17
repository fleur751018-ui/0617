"use client";

import { timeAgo, type Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  onClick: () => void;
};

/** 게시글 카드 — 팀명 pill + 제목 + 내용 미리보기 + 상대 시간 */
export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <button
      onClick={onClick}
      className="surface-card group w-full p-5 text-left transition-colors hover:border-ash"
    >
      <span className="pill">{post.team}</span>
      <h3 className="mt-3 text-[17px] font-medium leading-[1.35] tracking-[-0.02em] text-graphite">
        {post.title}
      </h3>
      <p className="clamp-2 mt-1.5 text-[14px] leading-[1.55] tracking-[-0.01em] text-felt-gray">
        {post.content}
      </p>
      <span className="mt-3 block text-[12px] text-smoke">
        {timeAgo(post.createdAt)}
      </span>
    </button>
  );
}
