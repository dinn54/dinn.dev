import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "../home/ui/page_container";
import { getProjectNameByNo } from "@/shared/model/getProjectName";

const Project = ({ name }: { name: string }) => {

	return (
		<PageContainer>
			<div className="flex flex-col h-full w-full ">
				<PageHeader
					title={getProjectNameByNo(Number(name)) ?? ''}
					color="bg-projects-light  dark:bg-projects-dark"
				/>
			</div>
		</PageContainer>
	);
};
export default Project;
