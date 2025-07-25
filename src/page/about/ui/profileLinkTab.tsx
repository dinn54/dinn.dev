import { B2 } from "@/shared/ui/text/text";
import { LucideExternalLink, LucideGithub, LucideHome } from "lucide-react";
import Link from "next/link";

export const LinkTab = ({ name, link }: { name: string; link: string }) => {
	const getIcon = (name: string) => {
		switch (name) {
			case "Home":
				return <LucideHome className="h-full aspect-square" />;
			case "Github":
				return <LucideGithub className="h-full aspect-square" />;
			case "Posts":
				return <LucideExternalLink className="h-full aspect-square" />;
			default:
				return <LucideExternalLink className="h-full aspect-square" />;
		}
	};

	return (
		<Link
			href={link}
			target="_blank"
			className="group flex max-w-1/3 mx-auto items-start justify-center"
		>
			<div className="flex w-fit h-auto p-2 justify-center items-center gap-1 no-underline hover:underline group-hover:underline group-hover:underline-offset-4">
				{getIcon(name)}
				<B2>{name}</B2>
			</div>
		</Link>
	);
};
