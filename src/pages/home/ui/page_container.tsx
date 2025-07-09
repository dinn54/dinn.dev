import { twMerge } from "tailwind-merge";
/**
 * @param color - 페이지 컨테이너 배경색 ex) #e1eebc
 */
const PageContainer = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={twMerge(
        `relative z-[1] flex h-full min-h-[540px] w-full shrink-0 darkMode-animate`, 
        className,
      )}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
