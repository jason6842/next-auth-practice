import { fetchPostsByUserId } from "@/service/postService";
import { getUserFromToken } from "@/service/userService";
import React from "react";
import PostItem from "../components/PostItem";

const ProfilePage = async () => {
  // fetch("/api/auth/me") doesn't work because it doesn't forward the cookies with it
  // in a server component call
  // therefore you should manually get the token from nextjs and verify it and returns the data
  // and use the data to find the user form the database

  // it because in the server side, it doesn't include cookies automatically, thats why you have to manually
  // get the cookies. So when you call fetch("api/auth/me"), it still a valid api call but since it is
  // in the server it doesn't have any cookies attached. But if you make the same api call
  // in the client side, the browser attaches the cookies automatically so you can access it.

  const user = await getUserFromToken();
  console.log(user);

  if (!user) {
    return <div>User not found</div>;
  }

  const { name, id, email } = user;

  const posts = await fetchPostsByUserId(id);

  return (
    <div className="flex flex-col items-center">
      ProfilePage
      <h3>User id: {id}</h3>
      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
      <h1 className="font-bold text-4xl">My Posts</h1>
      <ol className="list-decimal pl-6">
        {posts.map((post) => {
          const { id, title, content, createdAt } = post;
          return (
            <PostItem
              key={id}
              id={id}
              title={title}
              content={content}
              createdAt={createdAt}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default ProfilePage;
