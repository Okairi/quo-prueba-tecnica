"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export const NavBar = () => {
  const router = useRouter();

  const closeSesion = () => {
    console.log("Close");
    sessionStorage.removeItem("idToken");
    router.push("/login");
  };

  return (
    <nav className="bg-[#050447] w-full h-[60px] mb-10 flex justify-between px-4 items-center">
      <Link href={"/"} className="text-white text-[20px]">
        Inicio
      </Link>
      <a
        className="text-white cursor-pointer"
        onClick={() => {
          closeSesion();
        }}
      >
        Cerrar Sesión
      </a>
    </nav>
  );
};
