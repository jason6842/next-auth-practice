import React from "react";
import CommentItem from "./CommentItem";

type Comment = {
  id: string;
  content: string;
};

function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <ul>
      {comments.map((comment) => {
        const { id, content } = comment;
        return <CommentItem key={comment.id} id={id} content={content} />;
      })}
    </ul>
  );
}

export default CommentList;
