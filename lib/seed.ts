import type { Post } from "./posts";

const HOUR = 1000 * 60 * 60;
// 모듈 로드 시점 기준 (서버). posts 테이블이 비어 있을 때 한 번만 SQLite 에 기록되고 고정된다.
const now = Date.now();

/**
 * 첫 화면이 비어 보이지 않도록 넣는 예시 게시글.
 * lib/db.ts 의 seedIfEmpty 에서 빈 테이블에 한 번만 주입한다.
 */
export const SEED_POSTS: Post[] = [
  {
    id: "seed-marketing",
    team: "마케팅팀",
    title: "광고 카피 초안을 자동으로 만들고 싶어요",
    content:
      "매주 수십 개의 광고 소재 카피를 직접 쓰고 있는데, 톤이나 길이만 다르고 비슷한 작업이 반복됩니다. 제품 설명과 타깃만 입력하면 A/B 테스트용 카피 후보를 여러 개 뽑아주는 도구가 있으면 정말 좋겠어요.",
    createdAt: now - 2 * HOUR,
  },
  {
    id: "seed-cs",
    team: "고객지원팀",
    title: "반복 문의 응대 초안 추천이 필요합니다",
    content:
      "환불·배송 같은 단순 반복 문의가 전체의 절반이 넘습니다. 이전 답변 이력을 학습해서 상담사에게 답변 초안을 추천해주면 응대 속도가 크게 빨라질 것 같아요. 최종 발송은 사람이 검토하는 방식이면 충분합니다.",
    createdAt: now - 9 * HOUR,
  },
  {
    id: "seed-hr",
    team: "인사팀",
    title: "사내 규정 Q&A 챗봇을 만들 수 있을까요?",
    content:
      "휴가, 복지, 경비 처리 규정에 대한 질문이 슬랙으로 끊임없이 들어옵니다. 사내 문서를 기반으로 답해주는 Q&A 챗봇이 있으면 인사팀 반복 응대를 많이 줄일 수 있을 것 같습니다.",
    createdAt: now - 26 * HOUR,
  },
];
