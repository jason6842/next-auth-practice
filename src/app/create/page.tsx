"use client";
import React from "react";
import PostForm from "../components/PostForm";
import { PostFormValues } from "@/types";
import { registerPost } from "@/lib/api/post";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  const router = useRouter();
  const handleCreatePost = async (data: PostFormValues) => {
    const { title, content } = data;
    console.log({ title, content });

    const { success } = await registerPost({ title, content });

    if (!success) {
      console.error("Unable to create post.");
      return;
    }

    console.log("Post successful");
    router.push("/posts");
  };

  return (
    <div>
      CreatePostPage
      <PostForm onSubmit={handleCreatePost} />
    </div>
  );
}

export default CreatePostPage;
