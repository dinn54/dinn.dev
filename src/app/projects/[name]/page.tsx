import Project from "@/page/projects";
import { getProjectNameByNo } from "@/shared/model/getProjectName";
import { notFound } from "next/navigation";

const Projects = async ({ params }: { params: Promise<{ name: string }> }) => {
	const { name: projectNum } = await params;
	if (!getProjectNameByNo(Number(projectNum))) return notFound()
	return <Project projectNum={projectNum} />;
};
export default Projects;
