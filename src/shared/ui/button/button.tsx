import { ButtonProps, CustonButton } from "./button.types";

// 색상 입력, 텍스트 입력
export const Button = ({ children, className ='', ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-p12 font-inter flex items-center justify-center px-4 py-3.5 leading-[1.45] font-medium shrink-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const BaseButton = ({
  color,
  children,
  className,
  rounded,
  ...props
}:CustonButton) => {
  const colorMapping = {
    green:
      "bg-button-green-light text-white hover:bg-button-green-light/90 dark:bg-button-green-dark  dark:hover:bg-button-green-dark/90",
    gold: "bg-button-gold-light text-white hover:bg-button-gold-light/90 dark:bg-button-gold-dark  dark:hover:bg-button-gold-dark/90",
    blue: "bg-button-blue-light text-white hover:bg-button-blue-light/90 dark:bg-button-blue-dark  dark:hover:bg-button-blue-dark/90",
    none: "bg-transparent border-inside shadow-color-util-input-text text-black dark:border-white dark:text-white !text-p16",
  };

  return (
    <Button className={`text-p18 h-p44 tab:h-p47 pc:h-p50 tracking-mp5 hover:cursor-pointer ${rounded ? rounded : "rounded-p12"} ${colorMapping[color]} ${className}`} 
    {...props}>
      {children}
    </Button>
  );
};

export const LongButton = ({ color, children, rounded, className,...props }: CustonButton) => {
  const colorMapping = {
    green: "bg-button-green-light text-white hover:bg-button-green-light/90 dark:bg-button-green-dark  dark:hover:bg-button-green-dark/90",
    gold: "bg-button-gold-light text-white hover:bg-button-gold-light/90 dark:bg-button-gold-dark  dark:hover:bg-button-gold-dark/90",
    blue: "bg-button-blue-light  text-white hover:bg-button-blue-light/90 dark:bg-button-blue-dark  dark:hover:bg-button-blue-dark/90",
    none: "bg-transparent border-inside shadow-color-util-input-text text-black dark:border-white dark:text-white !text-p16",
  };
  return (
    <Button
      className={`text-p18 h-[46px] tab:h-[48px] pc:h-p50 tracking-mp25 pc:w-p194 tab:w-p172 w-p140 ${rounded ? rounded : "rounded-p20"} font-bold text-white px-p38 ${colorMapping[color]} ${className}`}
      {...props}
    >{children}
    </Button>
  );
};
