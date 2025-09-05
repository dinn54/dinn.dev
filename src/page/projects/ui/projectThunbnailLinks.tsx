"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconHome, IconClockShare } from "@tabler/icons-react";

const ProjectThumbnailLinks = ({
  links,
}: {
  links: { deploy: string[]; github: string } | undefined;
}) => {
  if (!links) return;
  const linkList = [
    {
      title: "Product",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: links.deploy[0],
    },
  ];
  const makeLinkList = (list: typeof linkList) => {
    if (links.deploy.length > 1) {
      list.push({
        title: "Old ver.",
        icon: (
          <IconClockShare className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: links.deploy[1],
      });
    }
    list.push({
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: links.github,
    });
  };
  makeLinkList(linkList);

  return (
    <div className="flex w-full items-center justify-center">
      <FloatingDock items={linkList} />
    </div>
  );
};
export default ProjectThumbnailLinks;
