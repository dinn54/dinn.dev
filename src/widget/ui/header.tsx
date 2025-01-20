'use client'
import { Trans, useTranslation } from 'react-i18next'
import '@/entities/i18n'
import { HeaderProgress } from './headerProgress'



const Header = ()=>{
  const {i18n} = useTranslation()
  

  return (
    <header className="fixed flex w-full h-[3.5rem] justify-center backdrop-blur-[0.1rem]">
      <div className="flex relative w-[90%] h-full justify-start">
        <div className="flex relative w-[35%] h-full">
          <div className="flex w-[90%] h-full gap-[1rem]">
            <Trans i18nKey={"headerText_name"}>
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap " />
            </Trans>
            <Trans i18nKey={"headerText_job"}>
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-white text-[0.7rem] whitespace-pre-wrap" />
            </Trans>
          </div>
        </div>
        <div className="flex relative w-[65%] h-full">
          <div className="flex w-full h-full gap-[1rem] justify-end">
            <Trans i18nKey={"headerText_about"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </Trans>
            <Trans i18nKey={"headerText_work"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </Trans>
            <Trans i18nKey={"headerText_skill"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </Trans>
            <div className='flex hover:cursor-pointer z-[1]' 
              onClick={()=>{
                i18n.language === 'en'? i18n.changeLanguage('kr'):i18n.changeLanguage('en')}
                }>
            <Trans i18nKey={"changeLanguage"} >
              <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
              <div className="flex w-fit h-full items-center text-[0.78rem]" />
            </Trans>
            </div>

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