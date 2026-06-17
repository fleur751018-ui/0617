import { NextResponse } from "next/server";
import { insertPost, listPosts } from "@/lib/db";
import type { NewPost } from "@/lib/posts";

// SQLite 파일 접근이 필요하므로 Node.js 런타임에서 동작해야 한다. (Edge 불가)
export const runtime = "nodejs";
// 항상 최신 데이터를 반환하도록 캐시를 끈다.
export const dynamic = "force-dynamic";

/** GET /api/posts — 최신순 게시글 목록 */
export function GET() {
  return NextResponse.json(listPosts());
}

/** POST /api/posts — 게시글 생성 */
export async function POST(request: Request) {
  let body: Partial<NewPost>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const team = body.team?.trim();
  const title = body.title?.trim();
  const content = body.content?.trim();

  if (!team || !title || !content) {
    return NextResponse.json(
      { error: "팀명, 제목, 내용을 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  const post = insertPost({ team, title, content });
  return NextResponse.json(post, { status: 201 });
}
