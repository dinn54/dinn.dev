import {  B4F, H5F} from "@/shared/ui/text/text";

export const AboutIntroduction = () => {
	return (
		<div className="flex pl-1 flex-col w-full gap-2 pc:gap-3 ">
			<H5F className="font-semibold">Introduction</H5F>
			<B4F className="pl-1">안녕하세요. 주정혁입니다.</B4F>
		</div>
	);
};

export const AboutTechStack = () => {
	return (
		<div className="flex flex-col w-full gap-2 pc:gap-3">
			<H5F className="font-semibold">Tech stack</H5F>
			<ul className="list-none list-inside pc:space-y-1">
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>React, Next.js</B4F>
				</li>
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>TypeScript, JavaScript</B4F>
				</li>
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>TailwindCSS, AnimeJS</B4F>
				</li>
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>Github, Workflows, Vercel</B4F>
				</li>
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>VS Code, Cursor, Figma</B4F>
				</li>
				<li className="pl-1 space-x-2">
					<B4F>•</B4F>
					<B4F>Git, Jira, Confluence, Slack, Gitbook</B4F>
				</li>
			</ul>
		</div>
	);
};

export const AboutInterest = () => {
	return (
		<div className="flex flex-col w-full gap-3">
			<H5F className="font-semibold">Interest</H5F>
			<B4F className="pl-1">
				React Native
			</B4F>
		</div>
	)
}