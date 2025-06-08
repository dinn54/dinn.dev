/**
 * @param color - 페이지 컨테이너 배경색 ex) #e1eebc
 */
const PageContainer = ({children, color}: {children: React.ReactNode, color: string}) =>{
	return <div className="relative w-full h-full pt-[5rem] z-[1] min-h-[540px]" style={{backgroundColor: color}}>
		{children}
	</div>
}

export default PageContainer;