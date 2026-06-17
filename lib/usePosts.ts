"use client";

import { useCallback, useEffect, useState } from "react";
import { createPost, getPosts, type NewPost, type Post } from "./posts";

/** 게시글 상태 + 추가 로직을 묶은 훅. /api/posts (SQLite) 와 동기화한다. */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getPosts().then((list) => {
      if (!active) return;
      setPosts(list);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const addPost = useCallback(async (input: NewPost) => {
    const post = await createPost(input);
    setPosts((prev) => [post, ...prev]);
    return post;
  }, []);

  return { posts, loaded, addPost };
}
