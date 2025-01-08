"use client";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const navbarLinks = [
    { name: "Home", url: "/" },
    { name: "Try-On", url: "/create" },
    { name: "Job History", url: "/job-history" },
    { name: "Profile", url: "/profile" },
  ];

  return (
    <div className="border bg-white px-8 py-2">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={100}
          height={100}
          className="object-scale-cover h-12 w-28 p-2"
        />
        <div className="flex items-center gap-4">
          <ul className="mr-16 flex items-center gap-4 font-sans">
            {navbarLinks.map((link, indx) => (
              <Link
                href={link.url}
                key={indx}
                className={cn(
                  "relative flex h-full items-center justify-center rounded-lg px-4 py-2 hover:cursor-pointer",
                  pathname === link.url && "bg-blue-500 text-white",
                  pathname !== link.url && "hover:bg-blue-500 hover:text-white",
                )}
              >
                {link.name}
                {pathname === link.url && (
                  // <div className="absolute bottom-0 mx-auto w-10/12 border-t border-black"></div>
                  <></>
                )}
              </Link>
            ))}
          </ul>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
