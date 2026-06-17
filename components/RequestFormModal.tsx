"use client";

import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import type { NewPost } from "@/lib/posts";

type RequestFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewPost) => Promise<unknown>;
};

/** AI 요청 신청 폼 — 팀명 / 제목 / 내용 (익명) */
export default function RequestFormModal({
  open,
  onClose,
  onSubmit,
}: RequestFormModalProps) {
  const [team, setTeam] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTeam("");
    setTitle("");
    setContent("");
    setError("");
    setSubmitting(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!team.trim() || !title.trim() || !content.trim()) {
      setError("팀명, 제목, 내용을 모두 입력해 주세요.");
      return;
    }
    setSubmitting(true);
    await onSubmit({ team, title, content });
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={close} labelledBy="form-title">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2
          id="form-title"
          className="text-[24px] font-medium leading-[1.25] tracking-[-0.04em] text-graphite"
        >
          AI 요청하기
        </h2>
        <p className="mt-2 text-[13px] tracking-[-0.02em] text-smoke">
          익명으로 등록됩니다. 팀명만 함께 표시돼요.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="team" className="text-[13px] text-felt-gray">
              팀명
            </label>
            <input
              id="team"
              className="field-input"
              placeholder="예) 마케팅팀"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              maxLength={30}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-[13px] text-felt-gray">
              제목
            </label>
            <input
              id="title"
              className="field-input"
              placeholder="한 줄로 요약해 주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="content" className="text-[13px] text-felt-gray">
              내용
            </label>
            <textarea
              id="content"
              className="field-input min-h-[120px] resize-y"
              placeholder="어떤 업무가 반복되고 번거로운지, 어떤 도움이 필요한지 적어주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-[13px] text-prism-red">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button type="button" className="btn-outline" onClick={close}>
            취소
          </button>
          <button type="submit" className="btn-filled" disabled={submitting}>
            {submitting ? "등록 중…" : "제출하기"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
