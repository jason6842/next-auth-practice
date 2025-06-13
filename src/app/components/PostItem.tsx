"use client"
import { Button } from "@/components/ui/button";
import { deletePostById } from "@/lib/api/post";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React from "react";

type PostItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date
};

function PostItem({ id, title, content, createdAt }: PostItemProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    const result = await deletePostById(id);
    if (result.success) {
      router.refresh();
    }
  };
  return (
    <li key={id} className="py-2">
      <Link href={`/posts/${id}`} className="hover:underline text-blue-700">
        <h1>Title: {title}</h1>
      </Link>
      <p>Created at: {new Date(createdAt).toLocaleString()}</p>
      <p>{content}</p>
      <div className="flex gap-2">
        <Button className="bg-blue-400">Edit</Button>
        <Button className="bg-red-400" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default PostItem;
