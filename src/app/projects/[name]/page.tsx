import Project from "@/page/projects";

const Projects = async ({ params }: { params: Promise<{ name: string }> }) => {
	const { name: projectName } = await params;
	return <Project name={projectName} />;
};
export default Projects;
