// import About from "@/pages/home/about"
// import Contact from "@/pages/home/contact"
// import Introduction from "@/pages/home/introduction"
// import Projects from "@/pages/home/projects"

import Introduction from "./introduction";
import About from "./about";
import Projects from "./projects";
import Contact from "./contact";



const Home = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Introduction />
			<About />
			<Projects />
			<div id="contact-section" className="flex w-full h-full bg-transparent border" />
			<Contact />
    </div>
  );
};

export default Home;
