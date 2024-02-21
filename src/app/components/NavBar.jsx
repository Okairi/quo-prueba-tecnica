import React from "react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-[#050447] w-full h-[60px] mb-10 flex justify-between px-4 items-center">
      <Link href={"/"} className="text-white text-[20px]">
        Inicio
      </Link>
      <a className="text-white cursor-pointer">Cerrar Sesión</a>
    </nav>
  );
};
