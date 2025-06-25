import About from "@/pages/home/about"
import Contact from "@/pages/home/contact"
import Introduction from "@/pages/home/introduction"
import Projects from "@/pages/home/projects"

const Home = () =>{
  return (
		<>
			<Introduction />
			<About />
			<Projects />
			<div id="contact-section" className="flex w-full h-full bg-transparent border" />
			<Contact />
		</>
  )
}

export default Home;