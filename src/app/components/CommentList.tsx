"use client";
import { Button } from "@/components/ui/button";
import { deleteCommentById } from "@/lib/api/post";
import { useRouter } from "next/navigation";
import React from "react";

type Comment = {
  id: string;
  content: string;
};

function CommentList({ comments }: { comments: Comment[] }) {
  const router = useRouter();

  const handleDeleteComment = async (commentId: string) => {
    const { success } = await deleteCommentById(commentId);
    if (success) {
      router.refresh();
    }
  };
  return (
    <ul>
      {comments.map((comment) => {
        const { id, content } = comment;
        return (
          <li key={id}>
            {content}
            <Button
              className="bg-red-400"
              onClick={() => handleDeleteComment(id)}
            >
              Delete
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
