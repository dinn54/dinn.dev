'use client'
import { useI18n } from "@/entities/i18n/i18nContext";
import { WrappedTrans } from "@/entities/i18n/wrappedTrans";

const SwitchLanguageButton = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className='flex hover:cursor-pointer z-[1]' 
    onClick={()=>{
      if(language === 'en'){
        setLanguage('kr')
      }else{
        setLanguage('en')
      }}
      }>
        <WrappedTrans i18nKey={"changeLanguage"} >
          <div className="flex w-fit h-full items-center text-[0.78rem] font-jalnan2 " />
          <div className="flex w-fit h-full items-center text-[0.78rem]" />
        </WrappedTrans>
      </div>
  )
}
export default SwitchLanguageButton