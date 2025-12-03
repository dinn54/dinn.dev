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
      className={`snap-section darkMode-animate tab:pt-[4.25rem] pc:pt-[5rem] pc:px-[10%] tab:px-[10%] relative z-[1] flex h-full min-h-[600px] w-full shrink-0 snap-start items-center justify-center px-6 pt-[3.5rem] ${className}`}
      style={{ ...style }}
      {...props}
    >
      <div className="flex h-full w-full max-w-[1440px] flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
