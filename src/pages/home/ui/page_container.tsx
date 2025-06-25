import {twMerge} from "tailwind-merge";
/**
 * @param color - 페이지 컨테이너 배경색 ex) #e1eebc
 */
const PageContainer = ({children, color, className, style}: {children: React.ReactNode, color: string, className?: string, style?: React.CSSProperties}) =>{
	return <div className={twMerge("relative flex w-full h-full z-[1] min-h-[540px]", className)} style={{backgroundColor: color, ...style}}>
		{children}
	</div>
}

export default PageContainer;