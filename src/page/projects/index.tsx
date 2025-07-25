import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";

const Project = ({ name }: { name: string }) => {
	const convertProjectNoToName = (no: string) => {
		switch (no) {
			case "1":
				return "Dinn.dev";
			default:
				return "";
		}
	};
	return (
		<PageContainer>
			<div className="flex flex-col h-full w-full ">
				<PageHeader
					title={convertProjectNoToName(name)}
					color="bg-projects-light  dark:bg-projects-dark"
				/>
			</div>
		</PageContainer>
	);
};
export default Project;
