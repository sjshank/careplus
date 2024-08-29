import React from "react";
import Image from "next/image";
import Link from "next/link";

export const AppLogo = () => {
  return (
    <Link href="/" className="flex flex-row items-start cursor-pointer mb-8">
      <Image
        src="/assets/icons/logo.png"
        alt="app logo"
        width={48}
        height={48}
        className="h-8 w-fit"
      />
      <h4 className="font-bold text-xl ml-2 py-1 tracking-wider">CarePlus+</h4>
    </Link>
  );
};
