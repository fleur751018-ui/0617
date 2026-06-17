"use client";

import type { Post } from "@/lib/posts";
import PostCard from "./PostCard";

type PostListProps = {
  posts: Post[];
  loaded: boolean;
  onSelect: (post: Post) => void;
};

/** 게시글 목록 — 로딩/빈 상태 처리 포함 */
export default function PostList({ posts, loaded, onSelect }: PostListProps) {
  if (loaded && posts.length === 0) {
    return (
      <div className="surface-card flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-[15px] font-medium text-graphite">
          아직 들어온 요청이 없어요
        </p>
        <p className="mt-1.5 text-[14px] text-smoke">
          첫 번째 AI 요청을 남겨보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={() => onSelect(post)} />
      ))}
    </div>
  );
}
