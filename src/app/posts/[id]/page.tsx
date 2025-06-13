import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import { fetchPostById } from "@/service/postService";
import { formatDateTime } from "@/util/formatDate";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function PostDetailPage({ params }: Props) {
  // const params = useParams(); client component
  const { id } = await params;

  const post = await fetchPostById(id);

  console.log("Singular post: ", post);

  if (!post) {
    return <div>Post not found.</div>;
  }

  const { title, content, author, createdAt, comments } = post;

  // Only display createdAt if it exists on post
  return (
    <div className="flex flex-col items-center gap-6">
      PostDetailPage
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Author: {author.name}</p>
      <p>Email: {author.email}</p>
      <p>
        Post created at:{" "}
        {"createdAt" in post ? formatDateTime(createdAt) : "N/A"}
      </p>
      <h2>Comments: </h2>
      <CommentList comments={comments} />
      <CommentForm postId={id} />
    </div>
  );
}

export default PostDetailPage;
