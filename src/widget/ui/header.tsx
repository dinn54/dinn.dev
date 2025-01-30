import { HeaderProgress } from './headerProgress'
import { WrappedTrans } from '@/entities/i18n/wrappedTrans'
import SwitchLanguageButton from './switchLangButton'


const Header = ()=>{

  return (
    <header className="fixed flex w-full h-[3.5rem] justify-center backdrop-blur-[0.1rem] z-[1]">
      <div className="flex relative w-[90%] h-full justify-start">
        <div className="flex relative w-[35%] h-full">
          <div className="flex w-[90%] h-full gap-[1rem]">
            <WrappedTrans i18nKey={"headerText_name"}>
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap " />
            </WrappedTrans>
            <WrappedTrans i18nKey={"headerText_job"}>
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap" />
            </WrappedTrans>
          </div>
        </div>
        <div className="flex relative w-[65%] h-full">
          <div className="flex w-full h-full gap-[1rem] justify-end">
            <WrappedTrans i18nKey={"headerText_about"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </WrappedTrans>
            <WrappedTrans i18nKey={"headerText_work"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </WrappedTrans>
            <WrappedTrans i18nKey={"headerText_skill"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </WrappedTrans>
            <SwitchLanguageButton />
          </div>
        </div>

        <div className="flex absolute w-full h-full shadow-[inset_0_-0.05rem_0_rgba(209,213,219,1)] border-gray">
          <HeaderProgress />
        </div>
      </div>
    </header>
  )
}

export default Header