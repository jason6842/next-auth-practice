"use client";

import React from "react";
import { useUser } from "../context/UserContext";
import Link from "next/link";
import { logoutUser } from "@/lib/api/auth";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const { user, setUser } = useUser();
  const pathname = usePathname();

  const linkClass = (href: string) => {
    return clsx("hover:underline", pathname === href && "font-bold underline");
  };

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
      <Link href="/" className={`text-xl font-semibold ${linkClass("/")}`}>
        Home
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link href="/profile" className={linkClass("/profile")}>
              Profile
            </Link>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="text-gray-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link href="/register" className={linkClass("/register")}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
