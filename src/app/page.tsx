import I18nWrapper from "@/entities/i18n/i18nWrapper";
import { WrappedTrans } from "@/entities/i18n/wrappedTrans";
import Header from "@/widget/ui/header";


const Home = ()=> {

  const initialLang = 'en';
  
  return (
    <I18nWrapper lang={initialLang}>
    <div id="rootElement" className="flex flex-col w-screen h-screen overflow-y-auto">
      <Header />
      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] pt-[10%] p-[5%] bg-navyBlack ">
          <div className="flex w-full aspect-square border border-black" />
        </div>
        <div className="flex relative w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-lightGreen">
          <div className="flex absolute top-[20%] left-[5%] w-[50%] h-[30%]">
            <WrappedTrans i18nKey="profileIntroduction">
              <div className="flex w-full h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-full h-full items-center text-[0.78rem]" />
            </WrappedTrans>
          </div>
        </div>
      </main>
      <main className="flex w-full h-full flex-shrink-0">
        <div className="flex w-[35%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#2C3E50] "></div>
        <div className="flex w-[65%] h-full max-h-[calc(100vw*0.35*1.5)] bg-[#278036]/[0.09] "></div>
      </main>

    </div>
    </I18nWrapper>
  );
}

export default Home