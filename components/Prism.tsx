/**
 * 시그니처 프리즘 — 검은 삼각형 로고가 conic 그라디언트 위에 놓인다.
 * DESIGN.md 규칙: 페이지당 단 한 번, 히어로에서만 사용한다.
 */
export default function Prism() {
  return (
    <div
      className="relative flex h-[120px] w-[120px] items-center justify-center"
      aria-hidden
    >
      <div
        className="absolute h-[180px] w-[180px] rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 70%, transparent, #eec32d, #ec4b4b, #709ab9, #4dffbf, transparent)",
          filter: "blur(34px)",
          opacity: 0.9,
        }}
      />
      <div
        className="relative"
        style={{
          width: 0,
          height: 0,
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "52px solid #171717",
        }}
      />
    </div>
  );
}

/** 작은 단색 삼각형 마크 (그라디언트 없음) — 모달 헤더 등 보조 위치용 */
export function TriangleMark({ size = 20 }: { size?: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size * 0.6}px solid transparent`,
        borderRight: `${size * 0.6}px solid transparent`,
        borderBottom: `${size}px solid #171717`,
      }}
    />
  );
}
