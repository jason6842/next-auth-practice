"use client"
import { useUser } from "./context/UserContext";

export default function Home() {
  const { user } = useUser();
  return (
    <main>{user ? <h1>Welcome, {user.name}</h1> : <h1>Please log in</h1>}</main>
  );
}
