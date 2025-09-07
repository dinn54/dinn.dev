// import { B4F } from "@/shared/ui/text/text";
import { ArrowUpRight } from "lucide-react";
import { LuNotebook } from "react-icons/lu";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

import Link from "next/link";

export const LinkTab = ({ name, link }: { name: string; link: string }) => {
  const getTitle = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return "링크드인";
      case "Github":
        return "깃허브";
      case "Email":
        return "이메일";
      case "Resume":
        return "이력서";
      default:
        return "새창으로 이동";
    }
  };
  const getIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return (
          <FaLinkedin className="darkMode-animate h-full w-full text-black dark:text-white" />
        );
      case "Github":
        return (
          <FaGithub className="darkMode-animate h-full w-full text-black dark:text-white" />
        );
      case "Email":
        return (
          <IoMailOutline className="darkMode-animate h-full w-full text-black dark:text-white" />
        );
      case "Resume":
        return (
          <LuNotebook className="darkMode-animate h-full w-full text-black dark:text-white" />
        );
      default:
        return (
          <ArrowUpRight className="darkMode-animate h-full w-full text-black dark:text-white" />
        );
    }
  };

  return (
    <Link
      href={link}
      target="_blank"
      title={getTitle(name)}
      className="tab:h-[2.8rem] mx-auto flex h-[2.4rem] w-fit max-w-1/4 hover:cursor-default"
    >
      <div className="tab:gap-1 flex h-full w-auto items-center justify-center gap-0.5 p-2 hover:cursor-pointer">
        {getIcon(name)}
      </div>
    </Link>
  );
};
