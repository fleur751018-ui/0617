"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WelcomeModal from "@/components/WelcomeModal";
import RequestFormModal from "@/components/RequestFormModal";
import PostList from "@/components/PostList";
import PostDetailModal from "@/components/PostDetailModal";
import { usePosts } from "@/lib/usePosts";
import type { Post } from "@/lib/posts";

const WELCOME_KEY = "welcome-seen";

export default function Home() {
  const { posts, loaded, addPost } = usePosts();
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);

  // 첫 방문에만 환영 팝업 노출
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(WELCOME_KEY)) {
      setWelcomeOpen(true);
    }
  }, []);

  const dismissWelcome = () => {
    window.localStorage.setItem(WELCOME_KEY, "1");
    setWelcomeOpen(false);
  };

  const openFormFromWelcome = () => {
    dismissWelcome();
    setFormOpen(true);
  };

  return (
    <main>
      <Nav onApply={() => setFormOpen(true)} />
      <Hero onApply={() => setFormOpen(true)} />

      <section id="board" className="mx-auto max-w-[680px] px-6 pb-24">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-medium tracking-[-0.04em] text-graphite">
              들어온 요청
            </h2>
            <p className="mt-1 text-[13px] text-smoke">
              {loaded ? `${posts.length}건의 요청` : "불러오는 중…"}
            </p>
          </div>
          <button className="btn-filled" onClick={() => setFormOpen(true)}>
            신청하기
          </button>
        </div>

        <PostList posts={posts} loaded={loaded} onSelect={setSelected} />
      </section>

      <WelcomeModal
        open={welcomeOpen}
        onClose={dismissWelcome}
        onApply={openFormFromWelcome}
      />
      <RequestFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={addPost}
      />
      <PostDetailModal post={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
