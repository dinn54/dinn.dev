import { B2, H3 } from "@/shared/ui/text/text";

export const AboutIntroduction = () => {
	return (
		<div className="flex px-1 flex-col w-full gap-2 ">
			<H3 weight="semibold">Introduction</H3>
			<B2 className="pl-1">안녕하세요. 주정혁입니다.</B2>
		</div>
	);
};

export const AboutTechStack = () => {
	return (
		<div className="flex flex-col w-full gap-2 ">
			<H3 weight="semibold">Tech Stack</H3>
			<ul className="list-none list-inside space-y-1">
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>React, Next.js, React Native</B2>
				</li>
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>TypeScript, JavaScript</B2>
				</li>
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>TailwindCSS, AnimeJS</B2>
				</li>
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>Github, Workflows, Vercel</B2>
				</li>
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>VS Code, Cursor, Figma</B2>
				</li>
				<li className="space-x-2">
					<B2 className="pl-1">•</B2>
					<B2>Git, Jira, Confluence, Slack, Gitbook</B2>
				</li>
			</ul>
		</div>
	);
};
