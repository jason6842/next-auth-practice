"use client";
import React from "react";
import AuthForm from "../components/AuthForm";
import { fetchUser, loginUser } from "@/lib/api/auth";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthFormValues } from "@/types";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const handleLogin = async (data: AuthFormValues) => {
    try {
      await loginUser(data);
      const me = await fetchUser();
      setUser({
        name: me.name,
        email: data.email,
      });

      console.log("Login successful.");
      router.push("/");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div>
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
