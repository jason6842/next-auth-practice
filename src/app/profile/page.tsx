import { getUserFromToken } from "@/service/userService";
import React from "react";

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
  return (
    <div>
      ProfilePage
      <h3>User id: {id}</h3>
      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
    </div>
  );
};

export default ProfilePage;
