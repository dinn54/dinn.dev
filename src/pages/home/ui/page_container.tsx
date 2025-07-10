import { twMerge } from "tailwind-merge";
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
      className={twMerge(
        `relative z-[1] flex h-full min-h-[540px] w-full shrink-0 darkMode-animate pt-[3.5rem] tab:pt-[4.25rem] pc:pt-[5rem] pc:px-[10%] tab:px-[10%] px-6`, 
        className,
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="relative flex max-w-[1440px] w-full h-full justify-center items-center ">{children}</div>
    </div>
  );
};

export default PageContainer;
