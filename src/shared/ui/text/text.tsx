// export const Text = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <span className={`font-inter font-noto-sans-kr leading-[1.2] dark:text-white ${className}`}>{children}</span>
//   )
// }
// /**
//  * @summary pc:52px tab:40px 36px bold
//  */
// export const H1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p52 tab:text-p40 text-p36 font-bold ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:40px tab:36px 32px semibold
//  */
// export const H2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-[clamp(30px,3vw,40px)] tab:text-p36 text-p32 font-bold ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:36px tab:32px 28px bold or semibold
//  */
// export const H3 = ({weight, children, className}: {weight: "bold" | "semibold", children: React.ReactNode, className?: string}) =>{
//   const fontWeight = weight === "bold" ? "font-bold" : "font-semibold";
//   return (
//     <Text className={`pc:text-p36 tab:text-p32 text-p28 ${fontWeight} ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:32px tab:28px 24px bold
//  */
// export const H4 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p32 tab:text-p28 text-p24 font-bold ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:28px tab:24px 20px semibold
//  */
// export const H5 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p28 tab:text-p24 text-p20 font-semibold ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:24px tab:20px 18px bold
//  */
// export const H6 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p24 tab:text-p20 text-p18 font-bold ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:28px tab:24px 20px medium
//  */
// export const B1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p28 tab:text-p24 text-p20 font-medium ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:20px tab:18px 16px medium
//  */
// export const B2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p20 tab:text-p18 text-p16 font-medium ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:18px tab:16px 14px medium
//  */
// export const B3 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p18 tab:text-p16 text-p14 font-medium ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:16px tab:14px 12px medium
//  */
// export const B4 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p16 tab:text-p14 text-p12 font-medium ${className}`}>{children}</Text>
//   )
// }
// /**
//  * @summary pc:18px tab:16px 14px medium
//  */
// export const PlaceholderB1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
//   return (
//     <Text className={`pc:text-p18 tab:text-p16 text-p14 font-medium text-util-input-text ${className}`}>{children}</Text>
//   )
// }

export const Text = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<span
			className={`font-inter font-noto-sans-kr leading-[1.2] dark:text-white ${className}`}
		>
			{children}
		</span>
	);
};

export const H1 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(2.25rem,5vw,3.25rem)] font-bold ${className}`}
		>
			{children}
		</Text>
	);
};

export const H2 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text className={`text-[clamp(2rem,2.1vw,2.5rem)] font-bold ${className}`}>
			{children}
		</Text>
	);
};

export const H3 = ({
	weight,
	children,
	className,
}: {
	weight: "bold" | "semibold";
	children: React.ReactNode;
	className?: string;
}) => {
	const fontWeight = weight === "bold" ? "font-bold" : "font-semibold";
	return (
		<Text
			className={`text-[clamp(1.5rem,1.9vw,2.25rem)] ${fontWeight} ${className}`}
		>
			{children}
		</Text>
	);
};

export const H4 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text className={`text-[clamp(1.4rem,1.7vw,2rem)] font-bold ${className}`}>
			{children}
		</Text>
	);
};

export const H5 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold ${className}`}
		>
			{children}
		</Text>
	);
};

export const H6 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(1.125rem,2vw,1.25rem)] font-bold ${className}`}
		>
			{children}
		</Text>
	);
};

export const B1 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(1.25rem,1.6vw,1.75rem)] font-medium ${className}`}
		>
			{children}
		</Text>
	);
};

export const B2 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(1rem,4.1vw,1.5rem)] font-medium ${className}`}
		>
			{children}
		</Text>
	);
};

export const B3 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(0.875rem,1.7vw,1.125rem)] font-medium ${className}`}
		>
			{children}
		</Text>
	);
};

export const B4 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(0.75rem,3.2vw,1rem)] font-medium ${className}`}
		>
			{children}
		</Text>
	);
};
export const B5 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(0.5rem,2.9vw,0.675rem)] font-medium ${className}`}
		>
			{children}
		</Text>
	);
};

export const PlaceholderB1 = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<Text
			className={`text-[clamp(0.875rem,1.75vw,1.125rem)] font-medium text-util-input-text ${className}`}
		>
			{children}
		</Text>
	);
};
