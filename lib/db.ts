import "server-only";

import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { SEED_POSTS } from "./seed";
import type { NewPost, Post } from "./posts";

/**
 * 서버 전용 SQLite 데이터 접근 계층.
 * 기존 localStorage 구현을 대체한다. (호출부 시그니처는 posts.ts 가 동일하게 유지)
 *
 * better-sqlite3 는 동기 API 이므로 별도의 await 가 필요 없다.
 * DB 파일은 프로젝트 루트의 data/app.db 에 저장된다. (.gitignore 처리)
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

// Next.js 개발 모드의 HMR 로 모듈이 재평가될 때 커넥션이 중복 생성되지 않도록 전역에 캐시한다.
const globalForDb = globalThis as unknown as { __db?: Database.Database };

function init(): Database.Database {
  mkdirSync(DATA_DIR, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id        TEXT    PRIMARY KEY,
      team      TEXT    NOT NULL,
      title     TEXT    NOT NULL,
      content   TEXT    NOT NULL,
      createdAt INTEGER NOT NULL
    );
  `);

  seedIfEmpty(db);
  return db;
}

/** 테이블이 비어 있을 때만 예시 게시글을 주입한다. */
function seedIfEmpty(db: Database.Database): void {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM posts").get() as {
    count: number;
  };
  if (count > 0) return;

  const insert = db.prepare(
    "INSERT INTO posts (id, team, title, content, createdAt) VALUES (@id, @team, @title, @content, @createdAt)"
  );
  const insertMany = db.transaction((rows: Post[]) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(SEED_POSTS);
}

function getDb(): Database.Database {
  if (!globalForDb.__db) {
    globalForDb.__db = init();
  }
  return globalForDb.__db;
}

/** 최신순 게시글 목록 */
export function listPosts(): Post[] {
  return getDb()
    .prepare("SELECT id, team, title, content, createdAt FROM posts ORDER BY createdAt DESC")
    .all() as Post[];
}

/** 게시글 생성 후 생성된 글 반환 */
export function insertPost(input: NewPost): Post {
  const post: Post = {
    id: crypto.randomUUID(),
    team: input.team.trim(),
    title: input.title.trim(),
    content: input.content.trim(),
    createdAt: Date.now(),
  };
  getDb()
    .prepare(
      "INSERT INTO posts (id, team, title, content, createdAt) VALUES (@id, @team, @title, @content, @createdAt)"
    )
    .run(post);
  return post;
}
