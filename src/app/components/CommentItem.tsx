"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { deleteCommentById, updateCommentById } from "@/lib/api/post";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CommentItemProps = {
  id: string;
  content: string;
};

function CommentItem({ id, content }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const router = useRouter();

  const handleEditComment = async () => {
    const { success } = await updateCommentById(id, editedContent);
    if (success) {
      setIsEditing(false);
      router.refresh();
    }
  };

  const handleDeleteComment = async () => {
    const { success } = await deleteCommentById(id);
    if (success) {
      router.refresh();
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-between gap-6 p-2 border border-amber-400">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder={content}
          />
          <div className="flex gap-2 items-center">
            <Button
              onClick={handleEditComment}
              className="bg-green-400"
              disabled={content === editedContent}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-400">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-6 p-2 border border-amber-400">
          <p>{content}</p>
          <div className="flex gap-2 items-center">
            <Button onClick={() => setIsEditing(true)} className="bg-blue-400">
              Edit
            </Button>
            <Button className="bg-red-400" onClick={handleDeleteComment}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentItem;
