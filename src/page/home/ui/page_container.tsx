/**
 * @param color - 페이지 컨테이너 배경색 ex) #e1eebc
 */
const PageContainer = ({
	children,
	className,
	style,
	...props
}: {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={`relative snap-section z-[1] snap-start flex h-full min-h-[600px] w-full shrink-0 darkMode-animate pt-[3.5rem] tab:pt-[4.25rem] pc:pt-[5rem] pc:px-[10%] justify-center tab:px-[10%] px-6 items-center ${className}`}
			style={{ ...style }}
			{...props}
		>
			<div className="flex flex-col max-w-[1440px] w-full h-full justify-center items-center">
				{children}
			</div>
		</div>
	);
};

export default PageContainer;
