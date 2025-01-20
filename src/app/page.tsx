import Image from "next/image";
import { detectMobile } from "./mobileDetct";
import Header from "@/widget/ui/header";


const Home = ()=> {
  
  return (
    <div id="rootElement" className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header />
      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] bg-navyBlack "></div>
        <div className="flex w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-lightGreen"></div>
      </main>
      <hr />
      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#2C3E50] "></div>
        <div className="flex w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#278036]/[0.09] "></div>
      </main>

    </div>
  );
}

export default Home