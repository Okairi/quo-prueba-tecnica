"use client";
import Image from "next/image";
export const CardBank = (val) => {
  return (
    <article className="container text-white">
      <article class="bank">
        <span> {val.display_name}</span>
        <Image
          className="logo"
          src={val.logo || ""}
          width={200}
          height={92}
          alt=""
        />
      </article>
    </article>
  );
};
