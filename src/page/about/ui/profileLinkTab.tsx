// import { B4F } from "@/shared/ui/text/text";
import {
  NotebookPen,
  LucideGithub,
  Mail,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const LinkTab = ({ name, link }: { name: string; link: string }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <Linkedin />;
      case "Github":
        return <LucideGithub />;
      case "Email":
        return <Mail />;
      case "Posts":
        return <NotebookPen />;
      default:
        return <ArrowUpRight />;
    }
  };

  return (
    <Link
      href={link}
      target="_blank"
      className="group mx-auto flex max-w-1/3 items-start justify-center hover:cursor-pointer"
    >
      <div className="tab:gap-1 flex h-auto w-fit items-center justify-center gap-0.5 p-2 no-underline group-hover:underline group-hover:underline-offset-4 hover:underline">
        {getIcon(name)}
      </div>
    </Link>
  );
};
