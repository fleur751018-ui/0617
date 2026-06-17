"use client";

import Prism from "./Prism";

/** 첫 화면 히어로 — 엔지니어 그리드 + 프리즘 + 메인 카피 + CTA */
export default function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="engineer-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex max-w-[680px] flex-col items-center px-6 pt-16 pb-14 text-center">
        <Prism />
        <h1 className="mt-2 text-[40px] font-medium leading-[1.15] tracking-[-0.05em] text-graphite">
          부서별 AI 요청 게시판
        </h1>
        <p className="mt-4 max-w-[460px] text-[16px] leading-[1.5] tracking-[-0.02em] text-felt-gray">
          당신의 부서는 AI가 필요하신가요? 어떤 일이 번거롭고 반복되는지,
          편하게 이야기해주세요.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <button className="btn-filled" onClick={onApply}>
            신청하기
          </button>
          <a className="btn-outline" href="#board">
            요청 둘러보기
          </a>
        </div>
      </div>
    </section>
  );
}
