"use client";
import React from "react";
import { registerUser } from "@/lib/api/auth";
import AuthForm from "../components/AuthForm";
import { useRouter } from "next/navigation";
import { AuthFormValues } from "@/types";

function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (data: AuthFormValues) => {
    const { name, email, password } = data;
    if (!name) {
      console.error("Name is required for registration.");
      return;
    }

    const { success } = await registerUser({
      name: name,
      email: email,
      password: password,
    });

    if (success === false) {
      console.error("Unable to register user.");
      return;
    }

    console.log("Registration successful.");
    router.push("/login");
  };
  return (
    <div>
      <AuthForm mode="register" onSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
