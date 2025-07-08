export const Text = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <span className={`font-inter font-noto-sans-kr ${className}`}>{children}</span>
  )
}

export const H1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p52 tab:text-p40 text-p36 font-bold ${className}`}>{children}</Text>
  )
}
export const H2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p40 tab:text-p36 text-p32 font-semibold ${className}`}>{children}</Text>
  )
}
export const H3 = ({weight, children, className}: {weight: "bold" | "semibold", children: React.ReactNode, className?: string}) =>{
  const fontWeight = weight === "bold" ? "font-bold" : "font-semibold";
  return (
    <Text className={`pc:text-p36 tab:text-p32 text-p28 ${fontWeight} ${className}`}>{children}</Text>
  )
}
export const H4 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p32 tab:text-p28 text-p24 font-bold ${className}`}>{children}</Text>
  )
}
export const H5 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p28 tab:text-p24 text-p20 font-semibold ${className}`}>{children}</Text>
  )
}
export const H6 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p24 tab:text-p20 text-p18 font-bold ${className}`}>{children}</Text>
  )
}
export const B1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p28 tab:text-p24 text-p20 font-medium ${className}`}>{children}</Text>
  )
}
export const B2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p20 tab:text-p18 text-p16 font-medium ${className}`}>{children}</Text>
  )
}
export const B3 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p18 tab:text-p16 text-p14 font-medium ${className}`}>{children}</Text>
  )
}
export const B4 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p16 tab:text-p14 text-p12 font-medium ${className}`}>{children}</Text>
  )
}
export const PlaceholderB1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`pc:text-p18 tab:text-p16 text-p14 font-medium text-util-input-text ${className}`}>{children}</Text>
  )
}
