import React from "react";

import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-[#214fa0] w-full h-[60px] mb-10 flex justify-between px-4 items-center">
      <Link href={"/"} className="text-white text-[20px]">
        Inicio
      </Link>
      <Link href={""} className="text-white">
        User
      </Link>
    </nav>
  );
};
