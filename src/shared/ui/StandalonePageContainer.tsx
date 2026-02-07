const StandalonePageContainer = ({
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
      className={`darkMode-animate tab:pt-[4.25rem] pc:pt-[5rem] pc:px-[10%] tab:px-[10%] relative z-[1] flex min-h-screen w-full items-start justify-center px-6 pt-[3.5rem] ${className}`}
      style={{ ...style }}
      {...props}
    >
      <div className="flex w-full max-w-[1440px] flex-col">
        {children}
      </div>
    </div>
  );
};

export default StandalonePageContainer;
