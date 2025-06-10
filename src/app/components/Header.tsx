"use client";

import React from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";
import { logoutUser } from "@/lib/api/auth";

export default function Header() {
  const { user, setUser } = useUser();

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  }

  return (
    <header className="w-full px-6 py-4 bg-gray-100 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold">
        Home
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="text-gray-700">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login"  className="text-blue-600 hover:underline">Login</Link>
            <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
