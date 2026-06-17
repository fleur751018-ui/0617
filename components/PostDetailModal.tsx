"use client";

import Modal from "./Modal";
import { timeAgo, type Post } from "@/lib/posts";

type PostDetailModalProps = {
  post: Post | null;
  onClose: () => void;
};

/** 게시글 상세 보기 */
export default function PostDetailModal({
  post,
  onClose,
}: PostDetailModalProps) {
  return (
    <Modal open={!!post} onClose={onClose} labelledBy="detail-title">
      {post && (
        <div className="flex flex-col">
          <span className="pill self-start">{post.team}</span>
          <h2
            id="detail-title"
            className="mt-3 text-[24px] font-medium leading-[1.3] tracking-[-0.04em] text-graphite"
          >
            {post.title}
          </h2>
          <span className="mt-2 text-[12px] text-smoke">
            {timeAgo(post.createdAt)} · 익명
          </span>

          <div className="my-5 h-px w-full bg-hairline" />

          <p className="whitespace-pre-wrap text-[15px] leading-[1.7] tracking-[-0.01em] text-felt-gray">
            {post.content}
          </p>

          <div className="mt-7 flex justify-end">
            <button className="btn-outline" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
