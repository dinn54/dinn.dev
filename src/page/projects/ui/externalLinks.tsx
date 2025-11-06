import { B4F, H6F } from "@/shared/ui/text/text";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { ProjectMetaData } from "../model/projectMetaData";

const ProjectExternalLinks = ({
  projectMetadata,
}: {
  projectMetadata: ProjectMetaData;
}) => {
  return (
    <>
      {" "}
      <H6F className="font-semibold">관련 링크</H6F>
      <div className="pc:gap-4 tab:gap-2 flex items-center gap-1.5">
        <B4F className="pl-1">🚀 배포 링크:</B4F>
        <Link
          href={projectMetadata?.contents.link.deploy[0] ?? ""}
          target="_blank"
          className="flex"
        >
          <B4F className="flex items-center hover:text-blue-500 hover:underline hover:transition-none dark:hover:text-blue-500">
            {projectMetadata?.contents.link.deploy[0].split("/").pop()}
            <ExternalLinkIcon className="ml-0.5 inline-block aspect-square w-[1em]" />
          </B4F>
        </Link>
      </div>
      <div
        className={`pc:gap-4 tab:gap-2 flex items-center gap-1.5 ${projectMetadata.contents.link.portfolio ? "" : "pb-20"}`}
      >
        <B4F className="pl-1">🔗 Github Link:</B4F>
        <Link
          href={projectMetadata?.contents.link.github ?? ""}
          target="_blank"
          className="flex"
        >
          <B4F className="flex items-center hover:text-blue-500 hover:underline hover:transition-none dark:hover:text-blue-500">
            {projectMetadata?.contents.link.github.split("github.com/").pop()}
            <ExternalLinkIcon className="ml-0.5 inline-block aspect-square w-[1em]" />
          </B4F>
        </Link>
      </div>
      {projectMetadata.contents.link.portfolio && (
        <div className="pc:gap-4 tab:gap-2 flex items-center gap-1.5 pb-20">
          <B4F className="shrink-0 pl-1">📕 포트폴리오 링크:</B4F>
          <Link
            href={projectMetadata.contents.link.portfolio ?? ""}
            target="_blank"
            className="flex w-full max-w-full grow-0"
          >
            <B4F className="flex w-full max-w-full items-center hover:text-blue-500 hover:underline hover:transition-none dark:hover:text-blue-500">
              <span className="max-w-[75%] truncate">
                {projectMetadata.contents.link.portfolio.split("https://")[1]}
              </span>
              <ExternalLinkIcon className="ml-0.5 inline-block aspect-square w-[1em] shrink-0" />
            </B4F>
          </Link>
        </div>
      )}
    </>
  );
};
export default ProjectExternalLinks;
