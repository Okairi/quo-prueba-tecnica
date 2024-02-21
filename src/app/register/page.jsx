"use client";
import AuthPage from "../components/AuthPage";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

function RegisterPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    if (sessionStorage.getItem("idToken")) {
      router.push("/");
    }
  }, []);

  return <AuthPage isLogin={false}></AuthPage>;
}

export default RegisterPage;
