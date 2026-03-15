const StandalonePageContainer = ({
  children,
  className,
  style,
  withHorizontalPadding = true,
  innerClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  withHorizontalPadding?: boolean;
  innerClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`darkMode-animate tab:pt-[4.25rem] pc:pt-[5rem] relative z-[1] flex min-h-screen w-full items-start justify-center pt-[3.5rem] ${
        withHorizontalPadding ? "px-6 tab:px-[10%] pc:px-[10%]" : ""
      } ${className}`}
      style={{ ...style }}
      {...props}
    >
      <div className={`flex w-full max-w-[1440px] flex-col ${innerClassName ?? ""}`}>
        {children}
      </div>
    </div>
  );
};

export default StandalonePageContainer;
