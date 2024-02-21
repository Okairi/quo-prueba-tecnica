"use client";
import { useRouter } from "next/navigation";
import AuthPage from "../components/AuthPage";
import { useLayoutEffect } from "react";

function LoginPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    if (sessionStorage.getItem("idToken")) {
      router.push("/");
    }
  }, []);

  return <AuthPage isLogin={true}></AuthPage>;
}

export default LoginPage;
