// "use client";
// import { getAllPosts } from "@/lib/api/post";
import { fetchAllPosts } from "@/service/postService";
// import { Post } from "@/types";
import { formatDateTime } from "@/util/formatDate";
import Link from "next/link";
// import React, { useEffect, useState } from "react";

async function PostPage() {
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await getAllPosts();
  //     setPosts(data);
  //   };

  //   fetchData();
  // }, []);

  // Next js is able to determine that it is an async component
  // and calling await, so it knows that this component is SSR instead of

  // data is fetched before rendering
  const posts = await fetchAllPosts();

  console.log(posts);
  return (
    <div className="flex flex-col p-4 items-center">
      PostPage
      {posts.map((post) => {
        const { id, author, content, title, createdAt } = post;
        return (
          <div key={id} className="flex flex-col space-y-1 mb-6">
            <h1>Author: {author?.name ?? "Unknown"}</h1>
            <Link
              href={`/posts/${id}`}
              className="hover:underline text-blue-700"
            >
              <p>Title: {title}</p>
            </Link>
            <p>Content: {content}</p>
            <p>Post created at: {formatDateTime(createdAt)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PostPage;
