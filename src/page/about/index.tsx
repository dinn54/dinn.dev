import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";
import Image from "next/image";
import { LinkTab } from "./ui/profileLinkTab";
import { AboutIntroduction, AboutTechStack } from "./ui/aboutMeContents";

const AboutPage = () => {
	return (
		<PageContainer>
			<div className="flex flex-col h-full w-full ">
				<PageHeader
					title="About me"
					color="bg-about-light dark:bg-about-dark"
				/>
				{/* 3.5 4.25 5 */}
				{/* 9 10 13 */}
				<div className="flex flex-col mt-[5.5rem] tab:mt-[5.75rem] pc:mt-[8rem] w-full h-[calc(100%-5.5rem)] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] items-center gap-6 ">
					<div className="flex flex-col w-full justify-center items-center py-8 gap-3">
						<div className="relative flex w-[80%] aspect-square ">
							<Image
								src={"/로딩페이지.png"}
								alt="about-me"
								fill
								className="w-full h-full object-cover object-bottom outline rounded-3xl"
							/>
						</div>
						<div className="flex w-full ">
							<LinkTab name="Home" link="https://dinn.dev" />
							<LinkTab name="Github" link="https://github.com/dinn54" />
							<LinkTab name="Posts" link="https://dinn54.github.io" />
						</div>
					</div>

					<div className="flex flex-col w-full gap-8">
						<AboutIntroduction />
						<AboutTechStack />
					</div>
				</div>
			</div>
		</PageContainer>
	);
};
export default AboutPage;
