"use client";

import { TriangleMark } from "./Prism";

/** 상단 고정 내비게이션 — 삼각형 로고 + 워드마크 + 상시 신청 CTA */
export default function Nav({ onApply }: { onApply: () => void }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-hairline bg-marble-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[680px] items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <TriangleMark size={14} />
          <span className="text-[16px] font-medium tracking-[-0.02em]">
            AI 요청 게시판
          </span>
        </div>
        <button className="btn-filled" onClick={onApply}>
          신청하기
        </button>
      </div>
    </nav>
  );
}
