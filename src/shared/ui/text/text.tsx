export const Text = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <span className={`font-inter font-noto-sans-kr ${className}`}>{children}</span>
  )
}

export const H1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p52 font-bold ${className}`}>{children}</Text>
  )
}
export const H2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p40 font-semibold ${className}`}>{children}</Text>
  )
}
export const H3 = ({weight, children, className}: {weight: "bold" | "semibold", children: React.ReactNode, className?: string}) =>{
  const fontWeight = weight === "bold" ? "font-bold" : "font-semibold";
  return (
    <Text className={`text-p36 ${fontWeight} ${className}`}>{children}</Text>
  )
}
export const H4 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p32 font-bold ${className}`}>{children}</Text>
  )
}
export const H5 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p28 font-semibold ${className}`}>{children}</Text>
  )
}
export const H6 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p24 font-bold ${className}`}>{children}</Text>
  )
}
export const B1 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p28 font-medium ${className}`}>{children}</Text>
  )
}
export const B2 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p20 font-medium ${className}`}>{children}</Text>
  )
}
export const B3 = ({children, className}: {children: React.ReactNode, className?: string}) =>{
  return (
    <Text className={`text-p18 font-medium ${className}`}>{children}</Text>
  )
}