

export const ProjectContentsContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col w-full gap-2 pc:gap-3">
      {children}
    </div>
  )
}