"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deletePostById, updatePostById } from "@/lib/api/post";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type PostItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

function PostItem({ id, title, content, createdAt }: PostItemProps) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

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

  const handleUpdate = async () => {
    const { success } = await updatePostById(id, {
      title: editedTitle,
      content: editedContent,
    });
    if (success) {
      setEditing(false);
      router.refresh();
    }
  };

  return (
    <li key={id} className="py-2">
      {editing ? (
        <div>
          Title:{" "}
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder={title}
          />
          Content:{" "}
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder={content}
          />
          <div className="flex gap-2">
            <Button
              className="bg-green-400"
              onClick={handleUpdate}
              disabled={title === editedTitle && content === editedContent}
            >
              Save
            </Button>
            <Button className="bg-gray-400" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Link href={`/posts/${id}`} className="hover:underline text-blue-700">
            <h1>Title: {title}</h1>
          </Link>
          <p>Created at: {new Date(createdAt).toLocaleString()}</p>
          <p>{content}</p>
          <div className="flex gap-2">
            <Button className="bg-blue-400" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button className="bg-red-400" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
}

export default PostItem;
