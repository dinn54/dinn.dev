
import { H1 } from "./text/text"

export const PageHeader = ({title, color}: {title: string, color: string}) => {
  return (
    <div className="absolute inset-0 w-full flex justify-center overflow-x-hidden shrink-0">
    <div className={`relative flex w-full h-[9rem] tab:h-[10rem] pc:h-[13rem] ${color} darkMode-animate max-w-[1440px]`}>
      <div className="group absolute tab:left-10 pc:left-0 bottom-5 flex w-full items-center gap-4 no-underline">
        <H1 className="pl-[clamp(2rem,6vw,7rem)] group-hover:underline group-hover:underline-offset-4">{title}</H1>
      </div>
  </div>
  </div>
  )
}