// import About from "@/pages/home/about"
// import Contact from "@/pages/home/contact"
// import Introduction from "@/pages/home/introduction"
// import Projects from "@/pages/home/projects"

import { Button, DefaultButton, LongButton } from "@/shared/ui/button/button";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start">
        Maintenance...
        <Button>Hi</Button>
        <DefaultButton color="green">About me</DefaultButton>
        <DefaultButton color="gold">Projects</DefaultButton>
        <DefaultButton color="none">리뷰 남기기</DefaultButton>
        <DefaultButton color="none">Contact</DefaultButton>
				<LongButton color="blue">리뷰 남기기</LongButton>
      </div>
			
      {/* <Introduction />
			<About />
			<Projects />
			<div id="contact-section" className="flex w-full h-full bg-transparent border" />
			<Contact /> */}
    </>
  );
};

export default Home;
