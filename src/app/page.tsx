"use client";
import Link from "next/link";
import { useUser } from "./context/UserContext";

export default function Home() {
  const { user } = useUser();
  return (
    <main>
      {user ? (
        <div className="flex flex-col items-center">
          <h1>Welcome, {user.name}</h1>{" "}
          <Link href="/create" className="bg-blue-950 text-white p-2 w-fit rounded">
            Create Post
          </Link>
          <Link href="/posts" className="bg-blue-500 text-white p-2 w-fit rounded">
            All Posts
          </Link>
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </main>
  );
}
