"use client";
import React, { useState } from "react";
import { registerComment } from "@/lib/api/post";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerComment(postId, content);
    setContent("");
    router.refresh();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Write your comment..."
        />
        <Button type="submit" className="bg-purple-500" disabled={!content.trim()}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
