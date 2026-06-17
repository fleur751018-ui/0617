export type Post = {
  id: string;
  team: string; // 팀명
  title: string; // 제목
  content: string; // 내용
  createdAt: number; // 정렬/표시용 타임스탬프 (ms)
};

export type NewPost = Omit<Post, "id" | "createdAt">;

/**
 * 클라이언트용 데이터 접근 계층.
 * 실제 저장소는 서버의 SQLite (lib/db.ts) 이며, 여기서는 /api/posts 를 호출한다.
 * 시그니처(async) 는 그대로라 호출부(usePosts 등)는 수정할 필요가 없다.
 */
const API = "/api/posts";

/** 최신순 게시글 목록 */
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return (await res.json()) as Post[];
}

/** 게시글 생성 후 생성된 글 반환 */
export async function createPost(input: NewPost): Promise<Post> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const message = await res
      .json()
      .then((b) => b?.error as string | undefined)
      .catch(() => undefined);
    throw new Error(message ?? "게시글을 등록하지 못했습니다.");
  }
  return (await res.json()) as Post;
}

/** 상대 시간 표기 ("방금 전", "3시간 전" …) */
export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}일 전`;
  return new Date(ts).toLocaleDateString("ko-KR");
}
