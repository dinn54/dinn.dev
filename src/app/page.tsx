import I18nWrapper from "@/entities/i18n/i18nWrapper";
import { WrappedTrans } from "@/entities/i18n/wrappedTrans";
import Header from "@/widget/ui/header";
import { JSX } from "react";
import { LiaGithub } from "react-icons/lia";
import { RiNotionFill } from "react-icons/ri";
import { FaLinkedin , FaInstagramSquare, FaTelegram } from "react-icons/fa";
import { MdChangeCircle } from "react-icons/md";


const Home = ()=> {

  const initialLang = 'en';
  
  return (
    <I18nWrapper lang={initialLang}>
    <div id="rootElement" className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header />
      <main className="flex w-full h-fit flex-shrink-0">
        <div className="flex w-[35%] h-[100vh] max-h-[calc(100vw*0.35*1.5)] pt-[10%] p-[5%] bg-navyBlack justify-center items-center ">
          <div className="flex flex-col w-full max-w-[20rem] h-full items-end">
            <div className="flex relative w-full h-[68%] max-h-[20.5rem] ">
              <div className="flex absolute w-full aspect-square bg-[#d7d7d7] rounded-2xl z-[1]" />
              <div className="flex absolute top-[1.5%] left-[1.5%] w-full aspect-square bg-[#858e96] rounded-2xl" />
            </div>
            <div className="flex w-[10%] aspect-square rounded-[0.3rem] z-[2]">
              <MdChangeCircle className="flex" size={'100%'} color="white"/>
            </div>
            <div className="flex flex-col w-full h-fit">
              <div className="flex w-full h-[50%] max-h-[10rem] gap-[0.5vh] p-[0.5vh]">
                <ProfileThirdPartyLinkButton bgColor={"bg-black"}>
                  <LiaGithub className="flex" size={'100%'} color="white"/>
                </ProfileThirdPartyLinkButton>
                <ProfileThirdPartyLinkButton bgColor={"bg-black"}>
                    <RiNotionFill className="flex" size={'90%'} color="white"/>
                </ProfileThirdPartyLinkButton>
              </div>
              <div className="flex w-full h-[50%] max-h-[10rem] gap-[0.5vh] p-[0.5vh]">
                <ProfileThirdPartyLinkButton bgColor={"bg-black"}>
                  <FaLinkedin className="flex" size={'75%'} color="white"/>
                </ProfileThirdPartyLinkButton>
                <ProfileThirdPartyLinkButton bgColor={"bg-black"}>
                  <FaInstagramSquare className="flex" size={'75%'} color="white"/>
                </ProfileThirdPartyLinkButton>
                <ProfileThirdPartyLinkButton bgColor={"bg-black"}>
                  <FaTelegram className="flex" size={'75%'} color="white"/>
                </ProfileThirdPartyLinkButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative w-[65%] h-[100vh] max-h-[calc(100vw*0.35*1.5)] bg-lightGreen">
          <div className="flex absolute top-[20%] left-[5%] w-[50%] h-[30%]">
            <WrappedTrans i18nKey="profileIntroduction">
              <div className="flex w-full h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-full h-full items-center text-[0.78rem]" />
            </WrappedTrans>
          </div>
        </div>
      </main>

      <hr />
      <main className="flex w-full h-fit flex-shrink-0">
        <div className="flex w-[35%] h-[100vh] max-h-[calc(100vw*0.35*1.5)] bg-[#2C3E50] "></div>
        <div className="flex w-[65%] h-[100vh] max-h-[calc(100vw*0.35*1.5)] bg-[#278036]/[0.09] "></div>
      </main>

    </div>
    </I18nWrapper>
  );
}

const ProfileThirdPartyLinkButton = ({bgColor, children}: {bgColor: string, children: JSX.Element}) =>{

  return (
    <div className="flex relative w-[15%] h-full items-center z-10">
    <button className={`flex w-full aspect-square ${bgColor} rounded-[0.3rem] justify-center items-center`}>
      {children}
    </button>
  </div>
  )
}
export default Home