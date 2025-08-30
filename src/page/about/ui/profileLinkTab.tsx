// import { B4F } from "@/shared/ui/text/text";
import { ArrowUpRight } from "lucide-react";
import { LuNotebook } from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

import Link from "next/link";

export const LinkTab = ({ name, link }: { name: string; link: string }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return (
          <FaLinkedin className="h-full w-full text-black dark:text-white" />
        );
      case "Github":
        return (
          <FaGithub className="h-full w-full text-black dark:text-white" />
        );
      case "Email":
        return (
          <IoMailOutline className="h-full w-full text-black dark:text-white" />
        );
      case "Posts":
        return (
          <LuNotebook className="h-full w-full text-black dark:text-white" />
        );
      default:
        return (
          <ArrowUpRight className="h-full w-full text-black dark:text-white" />
        );
    }
  };

  return (
    <Link
      href={link}
      target="_blank"
      className="group tab:h-[2rem] pc:h-[2.5rem] mx-auto flex h-[1.5rem] w-full max-w-1/3 items-start justify-center hover:cursor-pointer"
    >
      <div className="tab:gap-1 flex h-full w-full items-center justify-center gap-0.5 p-2 no-underline group-hover:underline group-hover:underline-offset-4 hover:underline">
        {getIcon(name)}
      </div>
    </Link>
  );
};
